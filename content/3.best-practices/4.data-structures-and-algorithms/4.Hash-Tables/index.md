---
title: Hash Tables
description: A hash table, also known as hash maps, is an implementation of an associative array, a list of key-value pairs that allow you to retrieve a value via a key. Internally a hash table utilizes a hash function to transform a key value into an index that points to where the value is stored in memory. Hash tables have fast search, insertion and delete operations.
---



## Core Concepts
- Key: The identifier used to access the values in the hash table.
- Value: The data associated with a key in the hash table.
- Hash Function: A function that converts a key into a specific index in the array.

There are two main ways to implement a hash table/associative array in JavaScript.

## Using the Object Data Type
The simplest implementation is using the Object data type. This is because all non-scalar objects in JavaScript behave as associative arrays, a mapping from property keys to values. So an Object itself can behave as a basic hash table.

```js [create-obj.js] copy
let simplehash = {};
// or
// let simplehash = new Object();

simplehash['key1'] = 'value1';
simplehash['key2'] = 'value2';
simplehash['key3'] = 'value3';

for (let key in simplehash) {
  // use hasOwnProperty() to filter out properties from Object.prototype
  if (simplehash.hasOwnProperty(key)) {
    console.log(`key is ${key}, value is ${simplehash[key]}`)
  }
}
```


```bash
  - key is key1, value is value1
  - key is key2, value is value2
  - key is key3, value is value3
```


## Operations
### Insertion
Inserting a key-value pair involves computing the index using the hash function and placing the value in the corresponding bucket.

```js [insert-hash.js] copy
function insert(hashTable, key, value) {
    const index = hashFunction(key);
    hashTable[index] = value;
}
```

### Deletion
Deleting a key-value pair involves finding the index using the hash function and removing the value from the bucket.

```js [remove-hash.js] copy
function remove(hashTable, key) {
    const index = hashFunction(key);
    delete hashTable[index];
}
```

### Search
Searching for a value involves computing the index using the hash function and retrieving the value from the bucket.

```js [search-hash.js] copy
function search(hashTable, key) {
    const index = hashFunction(key);
    return hashTable[index];
}
```

## Collision Handling
Collisions occur when two keys hash to the same index. There are several methods to handle collisions:

### Separate Chaining
Separate chaining involves maintaining a list of all elements that hash to the same index.
```js [seperate-chaining.js] copy
function insert(hashTable, key, value) {
    const index = hashFunction(key);
    if (!hashTable[index]) {
        hashTable[index] = [];
    }
    hashTable[index].push({ key, value });
}
```

### Open Addressing
Open addressing involves finding another open slot within the hash table when a collision occurs.

```js [open-addressing.js] copy
function insert(hashTable, key, value) {
    let index = hashFunction(key);
    while (hashTable[index] !== undefined) {
        index = (index + 1) % hashTable.length;
    }
    hashTable[index] = value;
}
```


## Use Cases
- Caching: Storing frequently accessed data for quick retrieval.
- Databases: Indexing and retrieving records efficiently.
- Symbol Tables: Compilers use hash tables to manage identifiers.

## Advantages and Disadvantages
### Advantages
- Fast Lookup: Average-case time complexity of O(1) for search, insertion, and deletion.
- Simple Implementation: Easy to understand and implement.

### Disadvantages
- Collisions: Requires handling collisions which can complicate the implementation.
- Fixed Size: Hash tables have a fixed size, which may need resizing.

## Implementation
### Basic Implementation

```js [hashtable.js] copy
class HashTable {
    constructor(size) {
        this.table = new Array(size);
        this.size = size;
    }

    hashFunction(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % this.size;
    }

    set(key, value) {
        const index = this.hashFunction(key);
        this.table[index] = value;
    }

    get(key) {
        const index = this.hashFunction(key);
        return this.table[index];
    }

    remove(key) {
        const index = this.hashFunction(key);
        this.table[index] = undefined;
    }
}
```

## Advanced Implementation
Advanced hash table implementations may include features like dynamic resizing, better hash functions, and enhanced collision handling.

## Common Problems
- Collision Handling: Choosing the right collision handling technique based on use case.
- Dynamic Resizing: Implementing efficient resizing strategies to handle growing data.
- Optimal Hash Functions: Designing hash functions to minimize collisions.

## Conclusion
Hash tables are powerful data structures that provide efficient data retrieval. Understanding their core concepts, operations, and collision handling techniques is essential for implementing and utilizing hash tables effectively.

## FAQs
<details>
  <summary><strong>Q: What is a hash function?</strong></summary>
  <p><strong>A:</strong> A hash function is a function that converts a key into a specific index in the hash table's array of buckets.</p>
</details>
<details>
  <summary><strong>Q: What are common uses of hash tables?</strong></summary>
  <p><strong>A:</strong> Common uses include caching, databases, and symbol tables in compilers.</p>
</details>
<details>
  <summary><strong>Q: How do hash tables handle collisions?</strong></summary>
  <p><strong>A:</strong> Common collision handling techniques include separate chaining and open addressing.</p>
</details>
