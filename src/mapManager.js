// Example of a map is located in public/examplemap.json
import { Light } from "./light.js"

export class ChartManager {
    constructor() {
        this.activeMap = null
        this.lights = {}
        this.layer = new Konva.Layer()

        this.startTime = 0
        this.elapsedTime = 0
        this.currentEventID = 0
        this.currentEvent = null
        this.playing = true
    }

    loadNewMap(mapData) {
        this.activeMap = mapData

        // Add pre-defined lights into lights object
        for (const light of this.activeMap.lights) {
            this.lights[light.id] = light
            this.lights[light.id].instance = new Light(light.config, light.glowConfig)
            this.layer.add(this.lights[light.id].instance.getGroup())
        }
        console.log()
    }

    playActiveMap() {
        this.startTime = Date.now()
        this.elapsedTime = 0
        this.currentEventID = 0
        this.currentEvent = this.activeMap.events[this.currentEventID]
        this.playing = true
    }

    step() {
        this.elapsedTime = Date.now() - this.startTime
        if (this.elapsedTime >= this.currentEvent.time) {
            console.log("New Event")
            const light = this.lights[this.currentEvent.id].instance.getShape()
            const config = this.currentEvent.config
            const tween = this.currentEvent.tween.enabled || false

            const tweenParams = {}

            /*if (this.currentEvent.preconfig) {
                const preconfig = this.currentEvent.preconfig
                for (const parameter in preconfig) {
                    switch (parameter) {
                        case "x":
                            light.x(preconfig[parameter])
                            break
                        case "y":
                            light.y(preconfig[parameter])
                            break
                        case "rotation":
                            light.rotation(preconfig[parameter])

                            break
                        case "brightness":
                            light.opacity(preconfig[parameter])
                            break
                        case "color":
                            light.fill(preconfig[parameter])
                            light.shadowColor(preconfig[parameter])
                            break
                    }
                }
            }*/

            for (const parameter in config) {
                switch (parameter) {
                    case "x":
                        if (tween) {
                            tweenParams.x = config[parameter]
                        } else {
                            light.x(config[parameter])
                        }
                        break
                    case "y":
                        if (tween) {
                            tweenParams.y = config[parameter]
                        } else {
                            light.y(config[parameter])
                        }
                        break
                    case "rotation":
                        if (tween) {
                            tweenParams.rotation = config[parameter]
                        } else {
                            light.rotation(config[parameter])
                        }
                        break
                    case "brightness":
                        if (tween) {
                            tweenParams.opacity = config[parameter]
                        } else {
                            light.opacity(config[parameter])
                        }
                        break
                    case "color":
                        if (tween) {
                            tweenParams.fill = config[parameter]
                            tweenParams.shadowColor = config[parameter]
                        } else {
                            light.fill(config[parameter])
                            light.shadowColor(config[parameter])
                        }
                        break
                }
            }

            if (tween) {
                new Konva.Tween({
                    node: light,
                    duration: (this.currentEvent.tween.duration || 1000) / 1000,
                    ...tweenParams,
                }).play()
            }

            this.currentEventID++;
            this.currentEvent = this.activeMap.events[this.currentEventID]
        }
    }
}