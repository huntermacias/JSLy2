---
title: Trees
description: A tree is a data structure consisting of nodes, with a single node serving as the root from which all other nodes branch out. Each node contains a value and pointers to its child nodes, forming a parent-child relationship. Trees are used to model hierarchical data, such as organizational structures, file systems, and more.

---


## Core Concepts

- **Root**: The top node in a tree.
- **Node**: An element in the tree containing a value and pointers to its child nodes.
- **Edge**: The connection between two nodes.
- **Leaf**: A node with no children.
- **Parent**: A node with child nodes.
- **Child**: A node that descends from another node.
- **Subtree**: A tree formed by a node and its descendants.
- **Depth**: The length of the path from the root to a node.
- **Height**: The length of the path from a node to the deepest leaf.

## Tree Traversal

### Preorder Traversal

Visits nodes in the following order: root, left subtree, right subtree.
```js [preorder-traversal.js] copy
function preorderTraversal(node) {
    if (node == null) return;
    console.log(node.value);
    preorderTraversal(node.left);
    preorderTraversal(node.right);
}
```

### Inorder Traversal
Visits nodes in the following order: left subtree, root, right subtree.

```js [inorder-traversal.js] copy
function inorderTraversal(node) {
    if (node == null) return;
    inorderTraversal(node.left);
    console.log(node.value);
    inorderTraversal(node.right);
}
```

### Postorder Traversal
Visits nodes in the following order: left subtree, right subtree, root.
```js [postorder-traversal.js] copy
function postorderTraversal(node) {
    if (node == null) return;
    postorderTraversal(node.left);
    postorderTraversal(node.right);
    console.log(node.value);
}
```

### Level Order Traversal
Visits nodes level by level from top to bottom, left to right.

```js [level-order-traversal.js] copy
function levelOrderTraversal(root) {
    if (root == null) return;
    const queue = [root];
    while (queue.length > 0) {
        const node = queue.shift();
        console.log(node.value);
        if (node.left != null) queue.push(node.left);
        if (node.right != null) queue.push(node.right);
    }
}
```

## Types of Trees
### Binary Trees
A tree in which each node has at most two children, referred to as the left child and the right child.

### Binary Search Trees
A binary tree with the additional constraint that for each node, all elements in the left subtree are less than the node, and all elements in the right subtree are greater than the node.

### AVL Trees
A self-balancing binary search tree where the difference in heights of left and right subtrees cannot be more than one for all nodes.

## Red-Black Trees
A balanced binary search tree with an extra bit of storage per node: its color, which can be either red or black. The tree maintains balance through a set of rules that involve the node colors.

## N-ary Trees
A tree where each node can have at most N children.


## Common Operations
### Insertion
Inserting a node involves finding the appropriate position in the tree and adding the node while maintaining the tree's properties.
```js [insert-node.js] copy
function insertNode(root, value) {
    if (root == null) return new TreeNode(value);
    if (value < root.value) {
        root.left = insertNode(root.left, value);
    } else {
        root.right = insertNode(root.right, value);
    }
    return root;
}
```

### Deletion
Deleting a node involves removing it and restructuring the tree to maintain its properties.
```js [delete-node.js] copy
function deleteNode(root, value) {
    if (root == null) return null;
    if (value < root.value) {
        root.left = deleteNode(root.left, value);
    } else if (value > root.value) {
        root.right = deleteNode(root.right, value);
    } else {
        if (root.left == null) return root.right;
        if (root.right == null) return root.left;
        let minLargerNode = root.right;
        while (minLargerNode.left != null) {
            minLargerNode = minLargerNode.left;
        }
        root.value = minLargerNode.value;
        root.right = deleteNode(root.right, minLargerNode.value);
    }
    return root;
}
```

### Search
Searching for a node involves traversing the tree to find a node with the specified value.

```js [search-node.js] copy
function searchNode(root, value) {
    if (root == null || root.value === value) return root;
    if (value < root.value) return searchNode(root.left, value);
    return searchNode(root.right, value);
}
```

## Use Cases
- Hierarchical Data: Trees are perfect for representing hierarchical structures such as organizational charts and file systems.
- Databases: B-trees and variants are used in databases to enable efficient data retrieval.
- Compilers: Abstract Syntax Trees (AST) are used to represent the structure of source code.


## Advanced Topics
### Balanced Trees
Balanced trees, such as AVL and Red-Black trees, ensure that the tree remains balanced, providing O(log n) time complexity for insertions, deletions, and searches.

### Segment Trees
Segment trees are used for answering range queries over an array effectively, such as finding the sum of elements in a given range.

### Trie
A Trie, or prefix tree, is a special type of tree used to store associative data structures. A common application of a trie is storing a predictive text or autocomplete dictionary.

## Conclusion
Trees are versatile and powerful data structures that enable efficient data management and retrieval. Understanding trees and their various types, operations, and use cases is essential for solving complex problems in computer science.


## FAQs
<details>
  <summary><strong>Q: What is a binary tree?</strong></summary>
  <p><strong>A:</strong> A binary tree is a tree data structure in which each node has at most two children, referred to as the left child and the right child.</p>
</details>
<details>
  <summary><strong>Q: What is the difference between a binary tree and a binary search tree?</strong></summary>
  <p><strong>A:</strong> A binary search tree (BST) is a type of binary tree where each node has a value greater than all the values in its left subtree and less than all the values in its right subtree.</p>
</details>
<details>
  <summary><strong>Q: What are the advantages of using AVL trees?</strong></summary>
  <p><strong>A:</strong> AVL trees are self-balancing, ensuring that the tree remains balanced, which provides O(log n) time complexity for insertions, deletions, and searches.</p>
</details>