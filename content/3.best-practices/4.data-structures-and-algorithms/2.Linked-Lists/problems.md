---
title: Linked List Problems
description: Engage with these practical problems designed to help you master linked list operations. Each problem is crafted to provide a hands-on approach to learning and applying linked list concepts in various scenarios.
---

## Problem: Galactic Parcel Service

**Story:** You are working for the Galactic Parcel Service (GPS), and you need to manage a list of parcels being delivered across the galaxy. Each parcel is represented as a node in a linked list, with information about the destination planet and the parcel's unique identifier.

### Tasks

1. **Insert New Parcels into the Delivery List**:
   Implement a function to add new parcels to the linked list.
   
```js [insertParcel.js] {13-24} copy
   class Node {
     constructor(data) {
       this.data = data;
       this.next = null;
     }
   }

   class LinkedList {
     constructor() {
       this.head = null;
     }

     insert(data) {
       const newNode = new Node(data);
       if (!this.head) {
         this.head = newNode;
       } else {
         let current = this.head;
         while (current.next) {
           current = current.next;
         }
         current.next = newNode;
       }
     }
   }

   // Example usage:
   const deliveryList = new LinkedList();
   deliveryList.insert({ id: 1, destination: 'Earth' });
   deliveryList.insert({ id: 2, destination: 'Mars' });
```

<div class='explanation'>
    <ul>
    <li><strong><code>insert</code>:</strong> Adds a new parcel to the end of the linked list. If the list is empty, it sets the new parcel as the head of the list.</li>
    </ul>
</div>

2. **Remove Delivered Parcels from the List**:

Implement a function to remove delivered parcels from the linked list.
```js [removeParcel.js] {4-20} copy
class LinkedList {
  // Existing code...

  remove(id) {
    if (!this.head) return;

    if (this.head.data.id === id) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;
    while (current.next && current.next.data.id !== id) {
      current = current.next;
    }

    if (current.next) {
      current.next = current.next.next;
    }
  }
}

// Example usage:
const deliveryList = new LinkedList();
deliveryList.insert({ id: 1, destination: 'Earth' });
deliveryList.insert({ id: 2, destination: 'Mars' });
deliveryList.remove(1);
```

<div class='explanation'>
  <ul>
    <li><strong><code>remove</code>:</strong> Finds the parcel with the given ID and removes it from the linked list. Special handling is done if the parcel to remove is the head of the list.</li>
  </ul>
</div>

3. **Find a Parcel by ID**:

Implement a function to find a parcel in the linked list by its unique identifier.
```js [findParcel.js] {4-13} copy
class LinkedList {
  // Existing code...

  find(id) {
    let current = this.head;
    while (current) {
      if (current.data.id === id) {
        return current.data;
      }
      current = current.next;
    }
    return null;
  }
}

// Example usage:
const deliveryList = new LinkedList();
deliveryList.insert({ id: 1, destination: 'Earth' });
deliveryList.insert({ id: 2, destination: 'Mars' });
const parcel = deliveryList.find(2);
console.log(parcel); // { id: 2, destination: 'Mars' }
```

<div class='explanation'>
  <ul>
    <li><strong><code>find</code>:</strong> Traverses the linked list to find the parcel with the given ID. If found, it returns the parcel data; otherwise, it returns <code>null</code>.</li>
  </ul>
</div>

4. **Reverse the Delivery List**:

Implement a function to reverse the linked list of parcels.
```js [reverse.js] {4-14} copy
class LinkedList {
  // Existing code...

  reverse() {
    let prev = null;
    let current = this.head;
    while (current) {
      let next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    this.head = prev;
  }
}

// Example usage:
const deliveryList = new LinkedList();
deliveryList.insert({ id: 1, destination: 'Earth' });
deliveryList.insert({ id: 2, destination: 'Mars' });
deliveryList.reverse();
```

<div class='explanation'>
  <ul>
    <li><strong><code>reverse</code>:</strong> Reverses the linked list by iterating through the nodes and reversing the links between them. The head of the list is updated to the last node.</li>
  </ul>
</div>

## Additional Problems

To further enhance your skills, consider solving these additional linked list problems:

1. **Intergalactic Navigation**:

    - Create a function to find the middle parcel in the linked list.
    - Write a function to detect if there is a cycle in the linked list.

2. **Space Station Logistics**:

    - Develop a function to merge two sorted linked lists into one sorted linked list.
    - Implement a function to remove duplicate parcels from the linked list.

3. **Cosmic Sorting**:

    - Write a function to sort the linked list of parcels by their destination planet.
    - Create a function to split the linked list into two separate lists, one for even IDs and one for odd IDs.

By working through these problems, you will not only understand how to manipulate linked lists but also develop strategies for solving complex problems efficiently. Remember, the key to mastering linked lists is consistent practice and applying what you've learned to real-world scenarios.