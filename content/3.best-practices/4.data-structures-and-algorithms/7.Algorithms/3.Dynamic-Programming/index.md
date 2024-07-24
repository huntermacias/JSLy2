---
title: Dynamic Programming
description: Dynamic Programming (DP) is a method for solving complex problems by breaking them down into simpler subproblems. It is particularly useful for optimization problems where you need to find the best solution among many possible ones.
---


## Core Concepts

### What is Dynamic Programming?

Dynamic Programming is an optimization technique used to solve problems by dividing them into overlapping subproblems and solving each subproblem just once. The results of subproblems are stored, usually in a table, to avoid redundant computations.

### Key Characteristics

1. **Optimal Substructure**: A problem has an optimal substructure if an optimal solution can be constructed from optimal solutions of its subproblems.
2. **Overlapping Subproblems**: A problem has overlapping subproblems if it can be broken down into subproblems that are reused several times.

### Approaches

1. **Top-Down Approach (Memoization)**: Solve the problem recursively and store the results of the subproblems in a memo table to avoid redundant calculations.
2. **Bottom-Up Approach (Tabulation)**: Solve the smallest subproblems first and use their results to build up solutions to larger subproblems.

## Basic Examples

### Fibonacci Sequence

The Fibonacci sequence is a classic example of dynamic programming.

#### Top-Down Approach (Memoization)

```js [fibonacci-top-down.js] copy
function fibonacci(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 2) return 1;
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}

console.log(fibonacci(6)); // Output: 8
console.log(fibonacci(7)); // Output: 13
console.log(fibonacci(50)); // Output: 12586269025
```
