---
title: CLI Game
description: 'Learn how to create a terminal-based game using JavaScript, complete with interactive features and colorful output.'
---



## Code Breakdown

### Imports and Initialization:
```js [game.js] copy
import chalk from 'chalk'; // Importing chalk for terminal colors
import readline from 'readline'; // Importing readline for handling user input
```
<div class='note'>
  <ul>
    <li><strong><code>chalk</code></strong>A library to add colors to terminal output.</li>
    <li><strong><code>readline</code></strong>A Node.js module to handle input from the terminal.</li>
  </ul>
</div>

### Setting up Readline Interface:
```js [game.js] copy
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
```
<div class='explanation'>
  <ul>
    <li>This sets up the interface for reading input from the user.</li>
  </ul>
</div>

### ASCII Art for the Game Title and Menu:
```js [game.js] copy
const titleArt = `
${chalk.green('╔═╗╦═╗╔═╗╔═╗╔╦╗')}
${chalk.green('║  ╠╦╝║╣ ║╣  ║ ')}
${chalk.green('╚═╝╩╚═╚═╝╚═╝ ╩ ')}
`;

const menuArt = `
${chalk.yellow('1. Explore the cave')}
${chalk.yellow('2. Check inventory')}
${chalk.yellow('3. Exit game')}
`;
```
<div class='explanation'>
  <ul>
    <li>ASCII art is used for a visually appealing menu and title display.</li>
  </ul>
</div>

### Inventory and Rooms
```js [game.js] copy
const inventory = [];
const rooms = {
  cave: {
    description: 'You are in a dark, damp cave. The air smells musty.',
    items: ['a rusty sword', 'a shield'],
  },
  forest: {
    description: 'You are in a lush forest. Birds are chirping.',
    items: ['a bow', 'a quiver of arrows'],
  }
};
```


::callout
#summary
Touch up on Arrays & Objects
#content
- **[JavaScript Objects](../../objects-and-classes/introduction-to-objects)**
- **[JavaScript Arrays](../../arrays-and-collections/introduction-to-array)**
::

### Displaying the Main Menu:
```js [game.js] copy
const displayMenu = () => {
  console.clear(); // Clear the console for a clean menu display
  console.log(titleArt); // Display the game title
  console.log(menuArt); // Display the menu options
  rl.question(chalk.blue('Choose an option: '), handleMenuChoice); // Prompt user for input
};
```


### Handling User Menu Choice
```js [game.js] copy
const handleMenuChoice = (choice) => {
  switch (choice) {
    case '1':
      exploreRoom(); // Explore the current room
      break;
    case '2':
      checkInventory(); // Check the inventory
      break;
    case '3':
      exitGame(); // Exit the game
      break;
    default:
      console.log(chalk.red('Invalid choice. Please try again.')); // Handle invalid input
      displayMenu();
      break;
  }
};
```
::callout
#summary
Touch up on Switch Statements
#content
- **[JavaScript Switch](../../control-structures/control-structures#switch-statement)**
::


### Exploring the Room
```js [game.js] copy
const exploreRoom = () => {
  console.clear();
  console.log(chalk.green(rooms[currentRoom].description)); // Display room description
  console.log(chalk.green('You find:'));
  rooms[currentRoom].items.forEach(item => console.log(chalk.yellow(`- ${item}`))); // List items in the room
  rl.question(chalk.blue('Pick up items? (yes/no): '), (answer) => {
    if (answer.toLowerCase() === 'yes') {
      inventory.push(...rooms[currentRoom].items); // Add items to inventory
      rooms[currentRoom].items = []; // Clear items from room
      console.log(chalk.green('Items added to inventory.'));
    }
    displayMenu(); // Return to menu
  });
};
```


::callout
#summary
Touch up on Arrow Functions
#content
- **[JavaScript Arrow Functions](../../functions/arrow-functions)**
::

### Checking Inventory
```js [game.js] 
const checkInventory = () => {
  console.clear();
  console.log(chalk.green('Your inventory:'));
  if (inventory.length === 0) {
    console.log(chalk.yellow('Your inventory is empty.'));
  } else {
    inventory.forEach(item => console.log(chalk.yellow(`- ${item}`))); // List inventory items
  }
  rl.question(chalk.blue('Press Enter to return to menu...'), displayMenu);
};
```
<div class='explanation'>
  <ul>
    <li>Displays the items in the inventory.</li>
  </ul>
</div>

### Exiting the Game
```js [game.js] copy
const exitGame = () => {
  console.clear();
  console.log(chalk.red('Thanks for playing! Goodbye.'));
  rl.close(); // Close readline interface
};
```
<div class='explanation'>
  <ul>
    <li>Closes the game and thanks the player.</li>
  </ul>
</div>

### Adding More to the Game
To extend this game, you can add more rooms, items, and interactions. Here are some ideas:

- New Rooms: Add more rooms with different descriptions and items.
- Combat System: Implement a simple combat system where players can fight enemies.
- Storyline: Create a storyline that guides the player through different challenges.

### Importing Modules
You have the choice between using `require` or `import` to include modules in your project. Here are the steps to set up your project using import:

1. Add `"type": "module"` to `package.json`:
```json [package.json] copy
{
  "type": "module"
}
```

2. Use import Statements:
Replace `require` with `import` statements in your JavaScript files.
```js [game.js] copy
import chalk from 'chalk';
import readline from 'readline';
```


## Detailed Explanations

- **Imports and Initialization**: By using ES6 `import` syntax, you ensure that your project aligns with modern JavaScript standards, which offer better readability and maintainability. 
- **Readline Interface**: This is crucial for interactive terminal applications. It helps handle user input in a straightforward manner.
- **ASCII Art**: Enhances user experience by making the terminal game visually appealing. 
- **Inventory Management**: Demonstrates the use of arrays and object manipulations in a practical context.
- **Modular Functions**: Each function serves a specific purpose, promoting a clean and maintainable codebase.

By following these best practices and detailed explanations, you'll be able to extend and modify the game effectively. This project serves as a great starting point for understanding how to create terminal-based applications in JavaScript.



## Complete Documented Code
Below is the complete documented code for our terminal-based game. This game includes a menu, exploration, and inventory management.

```js [game.js] copy
import chalk from 'chalk'; // Importing chalk for terminal colors
import readline from 'readline'; // Importing readline for handling user input

// Setting up readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ASCII art for the game title
const titleArt = `
${chalk.green('╔═╗╦═╗╔═╗╔═╗╔╦╗')}
${chalk.green('║  ╠╦╝║╣ ║╣  ║ ')}
${chalk.green('╚═╝╩╚═╚═╝╚═╝ ╩ ')}
`;

// ASCII art for the game menu
const menuArt = `
${chalk.yellow('1. Explore the cave')}
${chalk.yellow('2. Check inventory')}
${chalk.yellow('3. Exit game')}
`;

// Inventory array to store collected items
const inventory = [];

// Rooms object to store room descriptions and items
const rooms = {
  cave: {
    description: 'You are in a dark, damp cave. The air smells musty.',
    items: ['a rusty sword', 'a shield'],
  },
  forest: {
    description: 'You are in a lush forest. Birds are chirping.',
    items: ['a bow', 'a quiver of arrows'],
  }
};

// Variable to keep track of the current room
let currentRoom = 'cave';

// Function to display the main menu
const displayMenu = () => {
  console.clear(); // Clear the console for a clean menu display
  console.log(titleArt); // Display the game title
  console.log(menuArt); // Display the menu options
  rl.question(chalk.blue('Choose an option: '), handleMenuChoice); // Prompt user for input
};

// Function to handle user menu choice
const handleMenuChoice = (choice) => {
  switch (choice) {
    case '1':
      exploreRoom(); // Explore the current room
      break;
    case '2':
      checkInventory(); // Check the inventory
      break;
    case '3':
      exitGame(); // Exit the game
      break;
    default:
      console.log(chalk.red('Invalid choice. Please try again.')); // Handle invalid input
      displayMenu();
      break;
  }
};

// Function to explore the current room
const exploreRoom = () => {
  console.clear();
  console.log(chalk.green(rooms[currentRoom].description)); // Display room description
  console.log(chalk.green('You find:'));
  rooms[currentRoom].items.forEach(item => console.log(chalk.yellow(`- ${item}`))); // List items in the room
  rl.question(chalk.blue('Pick up items? (yes/no): '), (answer) => {
    if (answer.toLowerCase() === 'yes') {
      inventory.push(...rooms[currentRoom].items); // Add items to inventory
      rooms[currentRoom].items = []; // Clear items from room
      console.log(chalk.green('Items added to inventory.'));
    }
    displayMenu(); // Return to menu
  });
};

// Function to check the inventory
const checkInventory = () => {
  console.clear();
  console.log(chalk.green('Your inventory:'));
  if (inventory.length === 0) {
    console.log(chalk.yellow('Your inventory is empty.'));
  } else {
    inventory.forEach(item => console.log(chalk.yellow(`- ${item}`))); // List inventory items
  }
  rl.question(chalk.blue('Press Enter to return to menu...'), displayMenu);
};

// Function to exit the game
const exitGame = () => {
  console.clear();
  console.log(chalk.red('Thanks for playing! Goodbye.'));
  rl.close(); // Close readline interface
};

// Initialize by displaying the menu
displayMenu();
```




## FAQ
<details>
  <summary><strong>Q: What is the difference between `require` and `import`?</strong></summary>
  <p><strong>A:</strong> `require` is used in CommonJS modules, while `import` is used in ES modules. `import` provides a cleaner and more flexible syntax and is the standard for modern JavaScript.</p>
</details>
<details>
  <summary><strong>Q: How can I add more rooms to the game?</strong></summary>
  <p><strong>A:</strong> You can add more rooms by expanding the `rooms` object and providing descriptions and items for each new room. Update the game logic to handle new interactions.</p>
</details>
<details>
  <summary><strong>Q: How do I save the player's progress?</strong></summary>
  <p><strong>A:</strong> To save the player's progress, you can use file I/O operations to write the game state to a file and read it back when the game is loaded. Consider using JSON for easy serialization and deserialization.</p>
</details>