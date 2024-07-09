import { Light } from "./light.js"
import { ChartManager } from "./mapManager.js"

async function fetchMap(url) {
  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const map = await response.json();
      return map;
  } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
      return null; // or handle the error as needed
  }
}

const map = await fetchMap("/public/examplemap.json")
console.log(map.name)




const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight
});

const background = new Konva.Layer()
const backgroundRect = new Konva.Rect({
  x: 0,
  y: 0,
  z: -100,
  width: stage.width(),
  height: stage.height(),
  fill: "black"
})

background.add(backgroundRect)


var lightsLayer = new Konva.Layer();

stage.add(background)
stage.add(lightsLayer);

const manager = new ChartManager()
window.chartManager = manager

stage.add(manager.layer)

manager.loadNewMap(map)
manager.playActiveMap()

console.log("Finished")

function step() {
  if (manager.playing) {
    manager.step()
  }

  stage.width(window.innerWidth)
  stage.height(window.innerHeight)

  backgroundRect.width(window.innerWidth)
  backgroundRect.height(window.innerHeight)

  lightsLayer.draw()
  background.draw()

  console.log("step")

  window.requestAnimationFrame(step)
}


window.requestAnimationFrame(step)