---
title: Tile Editor
description: 'This guide provides a detailed explanation of a Tileset-Map Editor Game. This game allows users to create and edit maps using a tileset. We will break down the entire JavaScript logic, explaining each part thoroughly and providing references to relevant documentation sections.'
---






## Introduction
The Tileset-Map Editor Game is a tool that allows users to create, edit, and save maps using a predefined set of tiles. This type of tool is commonly used in game development to design levels and environments.

## Setting Up the Project
Before we start coding, ensure you have the following setup:

- A text editor (like VS Code)
- Basic knowledge of HTML, CSS, and JavaScript
- A tileset image to use for creating the map

## JavaScript Logic
The JavaScript logic for our Tileset-Map Editor Game is extensive, so we will break it down into sections:

### Initialization
First, we need to initialize our canvas and context:

```js [script.js] copy
const canvas = document.querySelector("canvas");
const tilesetContainer = document.querySelector(".tileset-container");
const tilesetSelection = document.querySelector(".tileset-container_selection");
const tilesetImage = document.querySelector("#tileset-source");

const selection = [0, 0]; // Which tile we will paint from the menu
let isMouseDown = false;
let currentLayer = 0;
const layers = [
  {}, // Bottom
  {}, // Middle
  {}, // Top
];

// Load the tileset image
tilesetImage.onload = function () {
  layers = defaultState;
  draw();
  setLayer(0);
};
tilesetImage.src = "https://assets.codepen.io/21542/TileEditorSpritesheet.2x_2.png"; // Default tileset image

const defaultState = [
  // Example of default state map
  // Each entry is structured as "x-y": ["tileset_x", "tileset_y"]
  // Example: "1-1": [3, 4],
];
```

### Canvas Setup
Next, we set up the canvas and draw the initial grid:

```js [script.js] copy
function drawGrid() {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  layers.forEach((layer) => {
    Object.keys(layer).forEach((key) => {
      const positionX = Number(key.split("-")[0]);
      const positionY = Number(key.split("-")[1]);
      const [tilesheetX, tilesheetY] = layer[key];

      ctx.drawImage(
        tilesetImage,
        tilesheetX * 32,
        tilesheetY * 32,
        32,
        32,
        positionX * 32,
        positionY * 32,
        32,
        32
      );
    });
  });
}
```

### Event Listeners

In this section, we add event listeners to handle user interactions. Event listeners are crucial for making the canvas interactive, allowing users to draw tiles by clicking and dragging.

To learn more about event listeners, you can [read the detailed guide](../5.%20JavaScript-In-the-Browser/events.md).

```js [script.js] 
canvas.addEventListener("mousedown", () => {
  isMouseDown = true;
});
canvas.addEventListener("mouseup", () => {
  isMouseDown = false;
});
canvas.addEventListener("mouseleave", () => {
  isMouseDown = false;
});
canvas.addEventListener("mousedown", addTile);
canvas.addEventListener("mousemove", (event) => {
  if (isMouseDown) {
    addTile(event);
  }
});
```

### Utility Functions
Utility function to get the coordinates of mouse clicks:

```js [script.js] copy
function getCoords(event) {
  const { x, y } = event.target.getBoundingClientRect();
  const mouseX = event.clientX - x;
  const mouseY = event.clientY - y;
  return [Math.floor(mouseX / 32), Math.floor(mouseY / 32)];
}
```

### Drawing the Grid
Function to draw the grid and map tiles:

```js [script.js] copy
function drawGrid() {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  layers.forEach((layer) => {
    Object.keys(layer).forEach((key) => {
      const positionX = Number(key.split("-")[0]);
      const positionY = Number(key.split("-")[1]);
      const [tilesheetX, tilesheetY] = layer[key];

      ctx.drawImage(
        tilesetImage,
        tilesheetX * 32,
        tilesheetY * 32,
        32,
        32,
        positionX * 32,
        positionY * 32,
        32,
        32
      );
    });
  });
}
```

### Placing Tiles
Function to place tiles on the grid when the user clicks on the canvas:
```js [script.js] copy
function addTile(event) {
  const clicked = getCoords(event);
  const key = `${clicked[0]}-${clicked[1]}`;

  if (event.shiftKey) {
    delete layers[currentLayer][key];
  } else {
    layers[currentLayer][key] = selection;
  }
  drawGrid();
}
```


### Saving and Loading Maps
Functions to save and load the map data:

```js [script.js] copy
function exportImage() {
  const data = canvas.toDataURL();
  const image = new Image();
  image.src = data;

  const w = window.open("");
  w.document.write(image.outerHTML);
}

function clearCanvas() {
  layers.fill({});
  drawGrid();
}

function setLayer(newLayer) {
  currentLayer = newLayer;
  const oldActiveLayer = document.querySelector(".layer.active");
  if (oldActiveLayer) {
    oldActiveLayer.classList.remove("active");
  }
  document.querySelector(`[tile-layer="${currentLayer}"]`).classList.add("active");
}
```






## Complete Code
Here is the complete code for the game
::code-group

  ::code-block{label="HTML" preview}
    ```html [index.html]
	<!DOCTYPE html>
	<html lang="en">

	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Tile Map Editor</title>
	<link href="style.css" rel="stylesheet" type="text/css" />
	</head>

	<body>
	<div class="card">
		<header>
		<h1>Tile Map Editor</h1>
		<div>
			<button class="button-as-link" onclick="clearCanvas()">Clear Canvas</button>
			<button class="primary-button" onclick="exportImage()">Export Image</button>
		</div>
		</header>
		<div class="card_body">
		<aside>
			<label>Tiles</label>
			<div class="tileset-container">
			<img id="tileset-source" src="https://opengameart.org/sites/default/files/grass_tileset_16x16_preview_0.png" alt="Tileset" />
			<!-- <img id="tileset-source" crossorigin /> -->

			<div class="tileset-container_selection"></div>
			</div>
		</aside>
		<div class="card_right-column">
			<!-- The main canvas -->
			<canvas width="480" height="480"></canvas>
			<p class="instructions">
			<strong>Click</strong> to paint.
			<strong>Shift+Click</strong> to remove.
			</p>
			<!-- UI for layers -->
			<div>
			<label>Editing Layer:</label>
			<ul class="layers">
				<li><button onclick="setLayer(2)" class="layer" tile-layer="2">Top Layer</button></li>
				<li><button onclick="setLayer(1)" class="layer" tile-layer="1">Middle Layer</button></li>
				<li><button onclick="setLayer(0)" class="layer" tile-layer="0">Bottom Layer</button></li>
			</ul>
			</div>
		</div>
		</div>
	</div>
	<script src="script.js"></script>
	</body>

	</html>

    ```
  ::

  ::code-block{label="CSS" preview}
    ```css [styles.css]
    * {
    box-sizing: border-box;
	}

	html { height: 100%; }
	body {
		font-family: 'Source Sans Pro', sans-serif;
		padding: 1em;
		background: linear-gradient(180deg, #1f1f1f 0%, #3a3a3a 100%);
		display: flex;
		justify-content: center;
		align-items: center;
		color: #e0e0e0;
		height: 100%;
		margin: 0;
	}

	.instructions {
		font-size: 0.8em;
		color: #888;
		text-align: center;
		margin: 0;
		margin-bottom: 16px;
	}

	.card {
		background: rgba(255, 255, 255, 0.1);
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.8);
		padding: 16px;
		border-radius: 16px;
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		max-width: 800px;
		width: 100%;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
		margin-bottom: 1em;
		padding-bottom: 8px;
	}

	header h1 {
		margin: 0;
		color: #fff;
	}

	.header-buttons {
		display: flex;
		gap: 10px;
	}

	.button-as-link {
		appearance: none;
		text-decoration: underline;
		background: transparent;
		color: #4e84fa;
		border: 0;
		outline: 0;
		cursor: pointer;
		font-size: 1em;
	}

	.primary-button {
		border: 0;
		background: #4e84fa;
		border-top: 4px solid transparent;
		border-bottom: 4px solid #3166c7;
		color: #fff;
		border-radius: 6px;
		outline: 0;
		padding: 6px 16px;
		cursor: pointer;
		transition: background 0.3s;
	}

	.primary-button:hover {
		background: #3166c7;
	}

	.card_body {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
	}

	aside {
		flex: 1 1 200px;
	}

	aside label {
		text-transform: uppercase;
		margin-bottom: 0.5em;
		font-weight: bold;
		display: block;
		color: #e0e0e0;
	}

	.tileset-container {
		position: relative;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 8px;
		overflow: hidden;
		padding: 8px;
	}

	.tileset-container img {
		display: block;
		width: 100%;
		height: auto;
	}

	.tileset-container_selection {
		position: absolute;
		outline: 3px solid #4e84fa;
		left: 0;
		top: 0;
		width: 32px;
		height: 32px;
	}

	.card_right-column {
		flex: 3 1 480px;
	}

	canvas {
		background: rgba(58, 58, 58, 0.5);
		border-radius: 8px;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.layers {
		list-style-type: none;
		margin: 0;
		padding: 0;
		margin-top: 1em;
	}

	.layers button {
		appearance: none;
		font-family: inherit;
		outline: 0;
		background: transparent;
		border: 0;
		padding: 8px 0;
		display: block;
		width: 100%;
		text-align: left;
		cursor: pointer;
		color: #e0e0e0;
		transition: color 0.3s;
	}

	.layers button:hover {
		color: #4e84fa;
	}

	.layers button.active {
		font-weight: bold;
		color: #4e84fa;
	}

	label {
		text-transform: uppercase;
		margin-bottom: 0.5em;
		font-weight: bold;
		display: block;  
		color: #e0e0e0;
	}
    ```
  ::

  ::code-block{label="JavaScript" preview}
    ```js [script.js]
	var canvas = document.querySelector("canvas");
	var tilesetContainer = document.querySelector(".tileset-container");
	var tilesetSelection = document.querySelector(".tileset-container_selection");
	var tilesetImage = document.querySelector("#tileset-source");

	var selection = [0, 0]; //Which tile we will paint from the menu

	var isMouseDown = false;
	var currentLayer = 0;
	var layers = [
		//Bottom
		{
			//Structure is "x-y": ["tileset_x", "tileset_y"]
			//EXAMPLE: "1-1": [3, 4],
		},
		//Middle
		{},
		//Top
		{}
	];

	//Select tile from the Tiles grid
	tilesetContainer.addEventListener("mousedown", (event) => {
		selection = getCoords(event);
		tilesetSelection.style.left = selection[0] * 32 + "px";
		tilesetSelection.style.top = selection[1] * 32 + "px";
	});

	//Handler for placing new tiles on the map
	function addTile(mouseEvent) {
		var clicked = getCoords(event);
		var key = clicked[0] + "-" + clicked[1];

		if (mouseEvent.shiftKey) {
			delete layers[currentLayer][key];
		} else {
			layers[currentLayer][key] = [selection[0], selection[1]];
		}
		draw();
	}

	//Bind mouse events for painting (or removing) tiles on click/drag
	canvas.addEventListener("mousedown", () => {
		isMouseDown = true;
	});
	canvas.addEventListener("mouseup", () => {
		isMouseDown = false;
	});
	canvas.addEventListener("mouseleave", () => {
		isMouseDown = false;
	});
	canvas.addEventListener("mousedown", addTile);
	canvas.addEventListener("mousemove", (event) => {
		if (isMouseDown) {
			addTile(event);
		}
	});

	//Utility for getting coordinates of mouse click
	function getCoords(e) {
		const { x, y } = e.target.getBoundingClientRect();
		const mouseX = e.clientX - x;
		const mouseY = e.clientY - y;
		return [Math.floor(mouseX / 32), Math.floor(mouseY / 32)];
	}

	//converts data to image:data string and pipes into new browser tab
	function exportImage() {
		var data = canvas.toDataURL();
		var image = new Image();
		image.src = data;

		var w = window.open("");
		w.document.write(image.outerHTML);
	}

	//Reset state to empty
	function clearCanvas() {
		layers = [{}, {}, {}];
		draw();
	}

	function setLayer(newLayer) {
		//Update the layer
		currentLayer = newLayer;

		//Update the UI to show updated layer
		var oldActiveLayer = document.querySelector(".layer.active");
		if (oldActiveLayer) {
			oldActiveLayer.classList.remove("active");
		}
		document.querySelector(`[tile-layer="${currentLayer}"]`).classList.add("active");
	}

	function draw() {
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		var size_of_crop = 32;

		layers.forEach((layer) => {
			Object.keys(layer).forEach((key) => {
				//Determine x/y position of this placement from key ("3-4" -> x=3, y=4)
				var positionX = Number(key.split("-")[0]);
				var positionY = Number(key.split("-")[1]);
				var [tilesheetX, tilesheetY] = layer[key];

				ctx.drawImage(
					tilesetImage,
					tilesheetX * 32,
					tilesheetY * 32,
					size_of_crop,
					size_of_crop,
					positionX * 32,
					positionY * 32,
					size_of_crop,
					size_of_crop
				);
			});
		});
	}

	//Default image for booting up -> Just looks nicer than loading empty canvas
	var defaultState = [{"0-4":[3,2],"1-4":[4,2],"2-4":[4,2],"3-4":[4,2],"4-4":[4,1],"5-5":[4,2],"6-5":[4,2],"7-5":[4,2],"8-5":[4,2],"9-5":[4,2],"10-5":[4,2],"11-6":[3,2],"12-6":[4,2],"13-6":[4,2],"14-6":[4,2],"12-5":[4,1],"5-4":[4,1],"3-3":[4,1],"0-3":[4,1],"1-3":[4,1],"4-3":[4,1],"5-3":[4,1],"7-3":[4,1],"8-3":[4,1],"9-3":[4,1],"10-3":[4,1],"10-4":[4,1],"11-4":[4,1],"11-5":[4,1],"4-5":[3,2],"2-3":[4,1],"6-3":[4,1],"11-3":[4,1],"12-3":[4,1],"13-3":[4,1],"14-3":[4,1],"6-4":[4,1],"7-4":[4,1],"8-4":[4,1],"9-4":[4,1],"12-4":[4,1],"13-4":[4,1],"14-4":[4,1],"13-5":[4,1],"14-5":[4,1],"14-2":[4,1],"13-2":[4,1],"12-2":[4,1],"11-2":[4,1],"10-2":[4,1],"9-2":[4,1],"8-2":[4,1],"7-2":[4,1],"6-2":[4,1],"5-2":[4,1],"4-2":[4,1],"3-2":[4,1],"2-2":[4,1],"1-2":[4,1],"0-2":[4,1],"0-1":[4,1],"1-1":[4,1],"2-1":[4,1],"3-1":[4,1],"4-1":[4,1],"6-1":[4,1],"8-1":[4,1],"9-1":[4,1],"10-1":[4,1],"11-1":[4,1],"12-1":[4,1],"13-1":[4,1],"14-1":[4,1],"7-1":[4,1],"5-1":[4,1],"0-0":[4,1],"1-0":[4,1],"2-0":[4,1],"3-0":[4,1],"4-0":[4,1],"5-0":[4,1],"6-0":[4,1],"7-0":[4,1],"8-0":[4,1],"9-0":[4,1],"10-0":[4,1],"11-0":[4,1],"12-0":[4,1],"13-0":[4,1],"14-0":[4,1],"14-14":[2,6],"7-14":[3,6],"6-14":[2,6],"5-14":[3,6],"4-13":[3,6],"3-13":[2,6],"1-11":[2,10],"1-10":[2,10],"0-8":[0,6],"0-10":[2,10],"3-10":[3,6],"4-10":[2,6],"0-5":[3,6],"0-6":[0,6],"0-7":[1,6],"0-9":[1,6],"0-11":[2,10],"0-12":[2,10],"0-13":[2,10],"0-14":[0,6],"1-14":[1,6],"1-13":[2,10],"1-12":[3,6],"1-9":[2,6],"1-8":[1,6],"1-7":[0,6],"1-6":[3,6],"1-5":[2,6],"2-5":[3,6],"2-6":[2,6],"2-7":[3,6],"2-8":[0,6],"2-9":[3,6],"2-13":[2,10],"2-14":[0,6],"3-14":[1,6],"3-12":[3,6],"3-11":[2,6],"3-9":[2,6],"3-8":[3,6],"3-7":[2,6],"3-6":[3,6],"3-5":[2,6],"4-6":[2,6],"4-7":[3,6],"4-8":[2,6],"4-9":[3,6],"4-11":[3,6],"4-12":[2,6],"4-14":[2,6],"5-13":[2,6],"5-12":[4,10],"5-11":[4,10],"5-10":[4,10],"5-9":[4,10],"5-8":[3,6],"5-7":[2,6],"5-6":[3,6],"6-6":[2,6],"6-7":[3,6],"6-8":[2,6],"6-9":[4,10],"6-10":[4,10],"6-11":[4,10],"6-12":[4,10],"6-13":[3,6],"7-13":[2,6],"7-12":[4,10],"7-10":[4,10],"7-9":[4,10],"7-8":[3,6],"7-7":[2,6],"7-6":[3,6],"8-6":[2,6],"8-7":[3,6],"8-10":[4,10],"8-11":[4,10],"8-12":[4,10],"8-14":[2,6],"8-13":[3,6],"9-14":[3,6],"9-13":[2,6],"9-12":[4,10],"9-11":[4,10],"9-10":[4,10],"9-7":[2,6],"9-6":[3,6],"10-7":[3,6],"10-8":[2,6],"10-9":[3,6],"10-10":[2,6],"10-11":[3,6],"10-12":[2,6],"10-13":[3,6],"10-14":[2,6],"10-6":[2,6],"11-7":[2,6],"12-7":[3,6],"13-7":[2,6],"14-7":[2,6],"14-8":[2,6],"14-9":[3,6],"14-10":[4,3],"14-11":[4,4],"14-12":[2,6],"14-13":[3,6],"13-14":[3,6],"12-14":[2,6],"11-14":[3,6],"11-13":[2,6],"12-13":[3,6],"13-13":[2,6],"13-12":[3,6],"12-12":[2,6],"11-12":[3,6],"11-11":[2,6],"12-11":[3,6],"13-11":[4,4],"13-10":[2,6],"12-10":[2,6],"11-10":[3,6],"12-9":[3,6],"13-9":[2,6],"13-8":[3,6],"12-8":[2,6],"11-9":[2,6],"11-8":[3,6],"2-10":[2,10],"2-11":[2,10],"2-12":[2,10],"8-9":[4,10],"8-8":[4,10],"9-9":[4,10],"9-8":[4,10],"7-11":[4,10]},{"5-9":[2,7],"6-9":[2,7],"7-9":[2,7],"3-9":[0,6],"3-11":[0,6],"3-13":[0,6],"1-9":[0,6],"2-9":[1,6],"1-10":[1,7],"3-10":[1,6],"3-12":[1,6],"2-10":[1,7],"1-12":[2,10],"0-8":[1,2],"1-8":[1,2],"2-8":[1,2],"2-7":[2,1],"2-6":[2,0],"1-6":[1,0],"0-6":[1,0],"1-7":[1,1],"0-7":[1,1],"11-11":[3,3],"12-11":[4,3],"13-11":[4,4],"14-11":[4,4],"11-12":[3,4],"11-13":[3,5],"12-13":[4,5],"13-13":[4,5],"14-13":[4,5],"12-12":[4,4],"13-12":[4,4],"14-12":[4,4],"0-10":[0,7],"13-10":[3,3],"11-5":[3,1],"4-4":[3,1],"8-8":[2,7],"9-8":[2,7]},{"0-5":[4,12],"1-5":[4,12],"2-5":[4,12],"3-5":[4,12],"4-6":[4,12],"5-6":[4,12],"6-6":[4,12],"7-6":[4,12],"8-6":[4,12],"9-6":[4,12],"10-6":[4,12],"11-7":[4,12],"12-7":[4,12],"13-7":[4,12],"14-7":[4,12],"0-9":[4,12],"1-9":[4,12],"2-9":[4,12],"11-14":[4,12],"12-14":[4,12],"13-14":[4,12],"14-14":[4,12],"6-2":[2,15],"6-3":[0,13],"7-3":[3,12],"8-3":[0,14],"9-3":[1,16],"10-3":[1,15],"11-3":[4,15],"4-2":[4,14],"5-2":[0,12],"4-1":[0,13],"3-1":[3,14],"1-1":[1,16],"2-1":[0,14],"11-1":[4,2],"12-1":[4,2],"13-1":[5,2],"11-0":[4,0],"12-0":[4,0],"13-0":[5,0],"10-1":[4,2],"9-1":[3,2],"10-0":[4,0],"9-0":[3,0],"9-2":[4,12],"10-2":[4,12],"11-2":[4,12],"12-2":[4,12],"13-2":[4,12],"5-13":[4,13],"9-13":[5,13],"6-13":[4,11],"7-13":[4,11],"8-13":[4,11],"0-14":[4,11],"1-14":[4,11],"2-14":[5,13]}]

	//Initialize app when tileset source is done loading
	tilesetImage.onload = function() {
	layers = defaultState;
	draw();
	setLayer(0);
	}
	tilesetImage.src = "https://assets.codepen.io/21542/TileEditorSpritesheet.2x_2.png";
    ```
  ::


::

::alert{type="info"}
This example demonstrates how to set up a simple tileset-map editor using HTML, CSS, and JavaScript. You can switch between the tabs to see the different parts of the code and understand how they work together to create the final application.
::


