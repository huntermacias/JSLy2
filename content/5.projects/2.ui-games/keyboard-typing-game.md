---
title: Typing Game
description: 'This section goes over the complete implementation of a keyboard typing game.'
---

### DOM Elements

The script starts by initializing references to various DOM elements required for the functionality:
```js [script.js] copy
const theTextBox = document.getElementById('enteredText');
const allTheKeys = document.getElementById('keyboard');
const cursor = document.getElementById('cursor');
const changeKeys = document.getElementsByClassName('shifter');
const capsLockKey = document.getElementById('20');
const shiftKey = document.getElementById('16');

const textToType = document.getElementById('textToType').innerText;
```

This script manages keyboard input handling and dynamic UI updates for a typing game. It dynamically updates the display based on user input, calculates typing speed and accuracy, and handles key press animations. The script starts by initializing references to various DOM elements required for the functionality:


<div class="note">
  <p><strong><em>NOTES:</em></strong></p>
  <ul>
    <li><strong><code>theTextBox</code>:</strong> The element where the typed text is displayed.</li>
    <li><strong><code>allTheKeys</code>:</strong> The container for the visual representation of the keyboard.</li>
    <li><strong><code>cursor</code>:</strong> A visual cursor element in the theTextBox.</li>
    <li><strong><code>changeKeys</code>:</strong> A collection of keys that change when Shift is pressed.</li>
    <li><strong><code>capsLockKey</code>:</strong> The Caps Lock key element.</li>
    <li><strong><code>shiftKey</code>:</strong> The Shift key element.</li>
    <li><strong><code>textToType</code>:</strong> The text the user needs to type.</li>
   
  </ul>
</div>

## Statistics Elements
Additional elements for displaying typing statistics:
```js [script.js] copy
const accuracyElement = document.getElementById('accuracy');
const timeElement = document.getElementById('time');
const wpmElement = document.getElementById('wpm');
```

<div class="note">
  <p><strong><em>NOTES:</em></strong></p>
  <ul>
    <li><strong><code>accuracyElement</code>:</strong> Displays the typing accuracy.</li>
    <li><strong><code>timeElement</code>:</strong> Displays the elapsed time.</li>
    <li><strong><code>wpmElement</code>:</strong> Displays words per minute (WPM).</li>
  </ul>
</div>

## Variables
```js [script.js] copy
let currentIndex = 0;
let correctCount = 0;

let startTime = null;
let timerInterval = null;
```


<div class="note">
  <p><strong><em>NOTES:</em></strong></p>
  <ul>
    <li><strong><code>currentIndex</code>, <code>correctCount</code>, <code>startTime</code>, <code>timerInterval</code>:</strong> General variables used for statistics</li>
    <li><strong><code>currentIndex</code>:</strong> Tracks the current position in the textToType</li>
    <li><strong><code>correctCount</code>:</strong> Counts the number of correctly typed characters</li>
    <li><strong><code>startTime</code>:</strong> Records the start time of the typing session.</li>
    <li><strong><code>timerInterval</code>:</strong> Manages the timer interval for updating the time.</li>
  </ul>
</div>

## Constants
Defined key codes for better readability:
```js [script.js] copy
const SHIFT_KEY_CODE = 16;
const CAPS_LOCK_KEY_CODE = 20;
const BACKSPACE_KEY_CODE = 8;
const TAB_KEY_CODE = 9;

const SHIFTER_ARRAY = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '{', '}', '|', ':', '"', '<', '>', '?'];
let originalShifterArray = Array.from(changeKeys).map(key => key.innerHTML);
```


<div class="note">
  <p><strong><em>NOTES:</em></strong></p>
  <ul>
    <li><strong><code>SHIFT_KEY_CODE</code>, <code>CAPS_LOCK_KEY_CODE</code>, <code>BACKSPACE_KEY_CODE</code>, <code>TAB_KEY_CODE</code>:</strong> Key codes for special keys.</li>
    <li><strong><code>SHIFTER_ARRAY</code>:</strong> Characters to display when Shift is pressed.</li>
    <li><strong><code>originalShifterArray</code>:</strong> Stores original values of the shifter keys for restoring after Shift release.</li>
  </ul>
</div>



## Event Listeners
Event listeners for handling key presses and clicks:

<div class="note">
  <p><strong><em>NOTES:</em></strong></p>
  <ul>
    <li><strong><code>document.addEventListener('keydown', handleKeyPress);</code>:</strong> Event listener to listen for key being pressed down</li>
    <li><strong><code>document.addEventListener('keyup', handleKeyUp);</code>:</strong> Event listener to listen for when key is released</li>
    <li><strong><code>document.addEventListener('click', clearText);</code>:</strong> Event listener to listen when screen is clcked to reset text</li>

  </ul>
</div>

## Functions
### `handleKeyPress()`{lang=ts} 
- Handles key press events and updates the UI

```js [script.js] {} copy
function handleKeyPress(e) {
    const keyPressed = e.keyCode;
    const charPressed = e.key;
    const keyElement = document.getElementById(keyPressed);

    if (!startTime) {
        startTime = new Date();
        timerInterval = setInterval(updateTime, 1000);
    }

    if (keyElement) {
        keyElement.classList.add('bg-teal-500/70', 'shadow-lg', 'transform', 'scale-95');
    }

    if (keyPressed === SHIFT_KEY_CODE || keyPressed === CAPS_LOCK_KEY_CODE) {
        allTheKeys.classList.add('uppercase');
    }

    if (keyPressed === BACKSPACE_KEY_CODE) {
        handleBackspace();
        return;
    }

    if (keyPressed === TAB_KEY_CODE) {
        e.preventDefault();
        return;
    }

    if (charPressed.length === 1 && currentIndex < textToType.length) {
        if (textToType[currentIndex] === charPressed) {
            correctCount++;
            addCharacter(charPressed, 'text-green-500');
        } else {
            addCharacter(charPressed, 'text-red-500');
        }
        currentIndex++;
        if (currentIndex === textToType.length) {
            endGame();
        }
    }

    updateStats();
}

```

<div class="note">
  <p><strong><em>NOTES:</em></strong></p>
  <ul>
    <li>Starts the timer on the first key press.</li>
    <li>Highlights the pressed key.</li>
    <li>Handles special keys <code>Shift</code> <code>Caps Lock</code> <code>Backspace</code> <code>Tab</code>.</li>
    <li>Adds typed characters to the text box and updates the index and correct count.</li>


  </ul>
</div>

### `handleKeyUp()`{lang=ts} 
- Handles key release events:

```js [script.js] {} copy
function handleKeyUp(e) {
    const keyDepressed = e.keyCode;
    const keyElement = document.getElementById(keyDepressed);

    if (keyElement) {
        keyElement.classList.remove('bg-teal-500/70', 'shadow-lg', 'transform', 'scale-95');
    }

    if (keyDepressed === SHIFT_KEY_CODE || keyDepressed === CAPS_LOCK_KEY_CODE) {
        allTheKeys.classList.remove('uppercase');
    }

    if (keyDepressed === SHIFT_KEY_CODE) {
        Array.from(changeKeys).forEach((key, index) => {
            key.innerHTML = originalShifterArray[index];
        });
    }
}

```

<div class="note">
  <p><strong><em>NOTES:</em></strong></p>
  <ul>
    <li>Removes highlighting from the released key.</li>
    <li>Restores original values of shifter keys after Shift release.</li>
  </ul>
</div>

### `addCharacter()`{lang=ts} 
- Adds a character to the text box

```js [script.js] {} copy
function addCharacter(char, className) {
    const span = document.createElement('span');
    span.innerText = char;
    span.classList.add(className);
    theTextBox.insertBefore(span, cursor);
}
```

<div class="note">
  <p><strong><em>NOTES:</em></strong></p>
  <ul>
    <li>Creates a span element for the character and inserts it before the cursor.</li>
  </ul>
</div>

### `clearText()`{lang=ts} 
- Clears the text box and resets variables

```js [script.js] {} copy
function clearText() {
    theTextBox.innerHTML = '<span id="cursor" class="cursor"></span>';
    cursor = document.getElementById('cursor');
    currentIndex = 0;
    correctCount = 0;
    startTime = null;
    clearInterval(timerInterval);
    updateStats();
}
```

<div class="note">
  <p><strong><em>NOTES:</em></strong></p>
  <ul>
    <li>Resets the text box, cursor, index, correct count, and timer.</li>
  </ul>
</div>


### `updateStats()`{lang=ts} 
- Updates accuracy and WPM


```js [script.js] {} copy
function updateStats() {
    updateAccuracy();
    updateWPM();
}
```
<div class="note">
  <p><strong><em>NOTES:</em></strong></p>
  <ul>
    <li>Calls functions to update accuracy and WPM.</li>
  </ul>
</div>


### `updateWPM()`{lang=ts} 
- Calculates and updates words per minute

```js [script.js] {} copy
function updateWPM() {
    const minutes = (new Date() - startTime) / 60000;
    const wordsTyped = correctCount / 5;
    const wpm = wordsTyped / minutes || 0;
    wpmElement.innerText = `${wpm.toFixed(2)}`;
}
```

<div class="note">
  <p><strong><em>NOTES:</em></strong></p>
  <ul>
    <li>Calculates WPM based on correct characters and elapsed time.</li>
  </ul>
</div>

### `updateTime()`{lang=ts} 
- Updates the elapsed time

```js [script.js] {} copy
function updateTime() {
    const seconds = Math.floor((new Date() - startTime) / 1000);
    timeElement.innerText = `${seconds}s`;
}
```
<div class="note">
  <p><strong><em>NOTES:</em></strong></p>
  <ul>
    <li>Updates the time display every second.</li>
  </ul>
</div>

### `updateAccuracy()`{lang=ts} 
- Calculates and updates accuracy

```js [script.js] {} copy
function updateAccuracy() {
    const accuracy = (correctCount / currentIndex) * 100 || 0;
    accuracyElement.innerText = `${accuracy.toFixed(2)}%`;
}
```

<div class="note">
  <p><strong><em>NOTES:</em></strong></p>
  <ul>
    <li>Calculates accuracy based on correct characters and total typed characters.</li>
  </ul>
</div>

### `endGame()`{lang=ts} 
- Ends the game and stops the timer:

```js [script.js] {} copy
function endGame() {
    clearInterval(timerInterval);
    document.removeEventListener('keydown', handleKeyPress);
    document.removeEventListener('keyup', handleKeyUp);
}
```
<div class="note">
  <p><strong><em>NOTES:</em></strong></p>
  <ul>
    <li>Clears the timer interval and removes event listeners.</li>
  </ul>
</div>





## Complet Code
::code-group
  ::code-block{label="HTML" preview}
    ```html [index.html] copy
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Typing Game</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
        <body class="flex flex-col items-center justify-center w-full min-h-screen m-0 p-0 box-border font-sans text-base bg-gray-900 text-gray-300">
        <!-- Welcome Section -->
        <section class="w-full max-w-7xl bg-gradient-to-r from-purple-950 via-pink-500 to-gray-950 bg-opacity-50 filter backdrop-blur-sm text-white py-2 px-8 mb-2 text-center rounded-lg shadow-2xl">
          <h1 class="text-3xl font-bold mb-6 text-white">Welcome to the Ultimate Typing Game!</h1>
          <p class="text-lg mb-8 text-white">Test your typing speed and accuracy. Press any key to get started.</p>
          <button class="px-8 py-4 bg-white text-purple-700 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition duration-300">
            Start Typing
          </button>
        </section>
          <!-- Input Text and User Stats Section -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start justify-center w-full max-w-5xl p-4">
            <!-- Input Text Section -->
            <div class="col-span-2 bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-lg">
              <p class="text-lg text-white leading-relaxed" id="textToType">
                In a faraway land, amidst enchanted forests and shimmering lakes, lived a curious fox named Felix. Felix loved adventures and often explored the magical realm in search of hidden treasures and mystical creatures. One sunny afternoon, he stumbled upon a sparkling stream that whispered secrets of an ancient riddle. Intrigued, Felix decided to embark on a quest to solve the mystery, knowing that it would lead him to the heart of the enchanted forest where the greatest treasure of all awaited. With courage in his heart and a twinkle in his eye, Felix set off, ready to embrace the unknown and discover the wonders that lay ahead.
              </p>
            </div>
            <!-- User Stats Section -->
            <div class="flex flex-col space-y-4">
              <div class="p-2 bg-gray-800 bg-opacity-50 rounded-lg shadow-lg text-center">
                <h2 class="text-2xl font-bold text-white">Accuracy</h2>
                <p id="accuracy" class="text-3xl text-green-400">100%</p>
              </div>
              <div class="p-2 bg-gray-800 bg-opacity-50 rounded-lg shadow-lg text-center">
                <h2 class="text-2xl font-bold text-white">WPM</h2>
                <p id="wpm" class="text-3xl text-blue-400">0</p>
              </div>
              <div class="p-2 bg-gray-800 bg-opacity-50 rounded-lg shadow-lg text-center">
                <h2 class="text-2xl font-bold text-white">Time</h2>
                <p id="time" class="text-3xl text-yellow-400">0s</p>
              </div>
            </div>
          </div>
        </div>
        <!-- Entered Text Section -->
        <div id="text" class="flex items-start w-3/4 max-w-3xl h-30 text-xl mb-4 text-left overflow-auto bg-gray-800 rounded-lg p-4 shadow-inner">
          <div id="enteredText" class="w-full p-2 break-words"><span id="cursor" class="cursor"></span></div>
        </div>
          <!-- Keyboard -->
          <div id="keyboard" class="flex flex-wrap w-2/3 justify-center items-center mt-6 shadow-xl shadow-green-100/90 bg-gray-950 border-2 border-gray-500 rounded-xl p-2"></div>
          <br>
          <pre class="w-full text-center mb-8">Click the screen or type shift + delete to clear all text.</pre>
          <script src="script.js"></script>
          <script src="createKeyboard.js"></script>
        </body>
      </html>
    ```
  ::

  ::code-block{label="KeyboardJS" preview}
    ```js [createKeyboard.js] copy
      const keys = [
      ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'del'],
      ['tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
      ['caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'return'],
      ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'shift'],
      ['fn', 'ctrl', 'opt', '⌘', ' ', '⌘', 'opt', 'ctrl', 'fn'],
      ['↑'],
      ['←', '↓', '→']
    ];

    const keyIds = [
      [192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 8],
      [9, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 220],
      [20, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 13],
      [16, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 16],
      [188, 17, 18, 91, 32, 91, 18, 17, 188],
      [38],
      [37, 40, 39]
    ];

    const specialWidths = {
      del: 'w-24', tab: 'w-24', caps: 'w-28', return: 'w-24', shift: 'w-36', ' ': 'w-96'
    };

    const keyboard = document.getElementById('keyboard');

    keys.forEach((row, rowIndex) => {
      const rowDiv = document.createElement('div');
      rowDiv.classList.add('flex', 'w-full', 'justify-center', 'items-start');

      row.forEach((key, keyIndex) => {
      const keyElement = document.createElement('kbd');
      keyElement.classList.add('flex', 'items-center', 'justify-center', 'm-1', 'text-center', 'border-2', 'rounded', 'bg-gray-500', 'text-white', 'border-gray-600', 'h-12');

      if (specialWidths[key]) {
        keyElement.classList.add(specialWidths[key]);
      } else {
        keyElement.classList.add('w-16');
      }

      keyElement.id = keyIds[rowIndex][keyIndex];
      keyElement.innerText = key;

      rowDiv.appendChild(keyElement);
      });

      keyboard.appendChild(rowDiv);
    });
    ```
  ::

  ::code-block{label="Script" preview}
    ```js [script.js] copy
    // DOM elements
    const theTextBox = document.getElementById('enteredText');
    const allTheKeys = document.getElementById('keyboard');
    const cursor = document.getElementById('cursor');
    const changeKeys = document.getElementsByClassName('shifter');
    const capsLockKey = document.getElementById('20');
    const shiftKey = document.getElementById('16');

    const textToType = document.getElementById('textToType').innerText;
    let currentIndex = 0;
    let correctCount = 0;

    const accuracyElement = document.getElementById('accuracy');
    const timeElement = document.getElementById('time');
    const wpmElement = document.getElementById('wpm');

    let startTime = null;
    let timerInterval = null;

    // Constants
    const SHIFT_KEY_CODE = 16;
    const CAPS_LOCK_KEY_CODE = 20;
    const BACKSPACE_KEY_CODE = 8;
    const TAB_KEY_CODE = 9;

    const SHIFTER_ARRAY = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '{', '}', '|', ':', '"', '<', '>', '?'];
    let originalShifterArray = Array.from(changeKeys).map(key => key.innerHTML);

    // Event listeners
    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('click', clearText);

    function handleKeyPress(e) {
      const keyPressed = e.keyCode;
      const charPressed = e.key;
      const keyElement = document.getElementById(keyPressed);

      if (!startTime) {
        startTime = new Date();
        timerInterval = setInterval(updateTime, 1000);
      }

      if (keyElement) {
        keyElement.classList.add('bg-teal-500/70', 'shadow-lg', 'transform', 'scale-95');
      }

      if (keyPressed === SHIFT_KEY_CODE || keyPressed === CAPS_LOCK_KEY_CODE) {
        allTheKeys.classList.add('uppercase');
      }

      if (keyPressed === BACKSPACE_KEY_CODE) {
        handleBackspace();
        return;
      }

      if (keyPressed === TAB_KEY_CODE) {
        e.preventDefault();
        return;
      }

      if (charPressed.length === 1 && currentIndex < textToType.length) {
        if (textToType[currentIndex] === charPressed) {
          correctCount++;
          addCharacter(charPressed, 'text-green-500');
        } else {
          addCharacter(charPressed, 'text-red-500');
        }
        currentIndex++;
        if (currentIndex === textToType.length) {
          endGame();
        }
      }

      updateStats();
    }

    function handleKeyUp(e) {
      const keyDepressed = e.keyCode;
      const keyElement = document.getElementById(keyDepressed);

      if (keyElement) {
        keyElement.classList.remove('bg-teal-500/70', 'shadow-lg', 'transform', 'scale-95');
      }

      if (keyDepressed === SHIFT_KEY_CODE || keyDepressed === CAPS_LOCK_KEY_CODE) {
        allTheKeys.classList.remove('uppercase');
      }

      if (keyDepressed === SHIFT_KEY_CODE) {
        Array.from(changeKeys).forEach((key, index) => {
          key.innerHTML = originalShifterArray[index];
        });
      }
    }

    function addCharacter(char, className) {
      const span = document.createElement('span');
      span.innerText = char;
      span.classList.add(className);
      theTextBox.insertBefore(span, cursor);
    }

    function handleBackspace() {
      if (currentIndex > 0) {
        currentIndex--;
        theTextBox.removeChild(theTextBox.children[currentIndex]);
        updateStats();
      }
    }

    function clearText() {
      theTextBox.innerHTML = '<span id="cursor" class="cursor"></span>';
      cursor = document.getElementById('cursor');
      currentIndex = 0;
      correctCount = 0;
      startTime = null;
      clearInterval(timerInterval);
      updateStats();
    }

    function updateStats() {
      updateAccuracy();
      updateWPM();
    }

    function updateWPM() {
      const minutes = (new Date() - startTime) / 60000;
      const wordsTyped = correctCount / 5;
      const wpm = wordsTyped / minutes || 0;
      wpmElement.innerText = `${wpm.toFixed(2)}`;
    }

    function updateTime() {
      const seconds = Math.floor((new Date() - startTime) / 1000);
      timeElement.innerText = `${seconds}s`;
    }

    function updateAccuracy() {
      const accuracy = (correctCount / currentIndex) * 100 || 0;
      accuracyElement.innerText = `${accuracy.toFixed(2)}%`;
    }

    function endGame() {
      clearInterval(timerInterval);
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('keyup', handleKeyUp);
    }
```
::




