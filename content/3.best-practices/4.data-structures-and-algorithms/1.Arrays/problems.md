---
title: Array Problems
description: Engage with these practical problems designed to help you master array operations. Each problem is crafted to provide a hands-on approach to learning and applying array concepts in various scenarios. 
---


## Problem: Galactic Market Inventory

**Story:** You are a space merchant managing an inventory of exotic goods across different planets. Each planet has a unique set of goods, and you need to manage your stock efficiently.

### Tasks

1. **Add New Items to the Inventory**:

Implement a function to add new items to the inventory.
   
```js [addItem.js] copy
   function addItem(inventory, item) {
     inventory.push(item);
   }
```

<div class='explanation'>
    <ul>
      <li><strong><code>addItem</code>:</strong> Adds a new item to the end of the inventory array. This method uses the <code>push</code> method, which is an efficient way to append items to an array.</li>
    </ul>
</div>

2. **Remove Sold Items from the Inventory**:

Implement a function to remove sold items from the inventory.

```js [removeItem.js] copy
function removeItem(inventory, item) {
  const index = inventory.indexOf(item);
  if (index > -1) {
    inventory.splice(index, 1);
  }
}
```

<div class='explanation'>
  <ul>
    <li><strong><code>removeItem</code>:</strong> Finds the item in the inventory and removes it using <code>splice</code>. The <code>indexOf</code> method is used to locate the item's position in the array.</li>
  </ul>
</div>

3. **Find the Most Expensive Item in the Inventory**:

Implement a function to find the most expensive item in the inventory.
```js [mostExpensive.js] copy
function findMostExpensiveItem(inventory) {
  return inventory.reduce((max, item) => (item.price > max.price ? item : max), inventory[0]);
}
```

<div class='explanation'>
  <ul>
    <li><strong><code>findMostExpensiveItem</code>:</strong> Uses the <code>reduce</code> method to iterate through the array and find the item with the highest price. This method efficiently reduces the array to a single value (the most expensive item).</li>
  </ul>
</div>

4. **Merge Inventories from Two Different Planets**:

Implement a function to merge inventories from two different planets into one.
```js [mergeInventories.js] copy
function mergeInventories(inventory1, inventory2) {
  return inventory1.concat(inventory2);
}
```

<div class='explanation'>
  <ul>
    <li><strong><code>mergeInventories</code>:</strong> Combines two arrays into one using the <code>concat</code> method. This method does not modify the original arrays but returns a new array that contains all elements from both inventories.</li>
  </ul>
</div>


## 1. The Mysterious Island
### The Treasure Map
`Problem`:
You find an old treasure map hidden in an ancient chest. The map is represented by an array of coordinates. Your task is to find the shortest path to the treasure, which is located at the coordinates [treasureX, treasureY].

`Task`:
Write a function findShortestPath(map, treasureX, treasureY) that takes an array of coordinates and the treasure's coordinates as input. The function should return the shortest path to the treasure.

```js [starter-code.js] copy
const findShortestPath = (map, treasureX, treasureY) => {
  // Your code here
};

const map = [
  [0, 0],
  [1, 2],
  [3, 4],
  [6, 1],
  [treasureX, treasureY]
];

console.log(findShortestPath(map, 6, 1)); // Output should be the path to [6, 1]
```
Hint:
Use a breadth-first search (`BFS`) algorithm to find the shortest path.

## 2. The Code Cipher
### Decoding the Message
`Problem`:
As you follow the map, you come across a mysterious door with a coded lock. The lock is controlled by an array of numbers. To unlock the door, you need to decode the message hidden in the array. The message is decoded by reversing the array and summing every second element.

`Task`:
Write a function decodeMessage(codeArray) that takes an array of numbers and returns the decoded message.

```js [starter-code.js] copy
const decodeMessage = (codeArray) => {
  // Your code here
};

const codeArray = [4, 8, 15, 16, 23, 42];

console.log(decodeMessage(codeArray)); // Output should be the sum of every second element in the reversed array
```

Hint:
First, reverse the array, then sum every second element starting from the first element of the reversed array.





## Additional Problems
To further enhance your skills, consider solving these additional array problems:

1. **Intergalactic Shipping**:

    - Create a function to calculate the total weight of all items in the inventory.
    - Write a function to sort items by their shipping priority.

2. **Planetary Trade Routes:**

    - Develop a function to find common items between two different inventories.
    - Implement a function to calculate the total value of items traded between planets.

3. **Cosmic Crafting**:

    - Write a function to combine similar items and update their quantities.
    - Create a function to split large quantities of an item into smaller, more manageable batches.

By working through these problems, you will not only understand how to manipulate arrays but also develop strategies for solving complex problems efficiently. Remember, the key to mastering arrays is consistent practice and applying what you've learned to real-world scenarios.