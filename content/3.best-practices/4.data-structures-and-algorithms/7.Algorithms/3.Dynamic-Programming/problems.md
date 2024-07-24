---
title: Problems
description: Dive deep into dynamic programming with engaging and challenging problems. Learn how to approach and solve complex problems with detailed explanations and code examples.
---



## Problem: Minimum Edit Distance

**Story:** Imagine you are a linguist working on a translation program that helps convert words from one language to another. One of the key challenges is to determine the minimum number of operations required to transform one word into another. This problem is crucial in text processing, DNA sequence analysis, and many other fields. Your task is to find the minimum number of operations (insertions, deletions, or substitutions) needed to convert one word into another.

### Problem Statement

Given two strings `word1` and `word2`, return the minimum number of operations required to convert `word1` to `word2`.

You have the following three operations permitted on a word:

1. Insert a character
2. Delete a character
3. Replace a character

### Examples

**Example 1:**

Input: `word1 = "horse"`, `word2 = "ros"`

Output: `3`

**Explanation:**

- horse -> rorse (replace 'h' with 'r')
- rorse -> rose (remove 'r')
- rose -> ros (remove 'e')

**Example 2:**

Input: `word1 = "intention"`, `word2 = "execution"`

Output: `5`

**Explanation:**

- intention -> inention (remove 't')
- inention -> enention (replace 'i' with 'e')
- enention -> exention (replace 'n' with 'x')
- exention -> exection (replace 'n' with 'c')
- exection -> execution (insert 'u')

### Constraints

- `0 <= word1.length, word2.length <= 500`
- `word1` and `word2` consist of lowercase English letters.

## Detailed Explanation

The minimum edit distance problem is a classic example of dynamic programming. The goal is to transform one string into another using a minimum number of operations. Let's break down the approach to solve this problem.

### Approach

1. **Define the Subproblems:**
   - Let `dp[i][j]` be the minimum number of operations required to convert the first `i` characters of `word1` to the first `j` characters of `word2`.

2. **Initialize the Base Cases:**
   - If `i` is 0, we need to insert all `j` characters of `word2` into `word1`, so `dp[0][j] = j`.
   - If `j` is 0, we need to delete all `i` characters of `word1`, so `dp[i][0] = i`.

3. **State Transition:**
   - If the characters `word1[i-1]` and `word2[j-1]` are the same, then no new operation is needed: `dp[i][j] = dp[i-1][j-1]`.
   - If the characters are different, we consider three possible operations:
     - Insert: `dp[i][j] = dp[i][j-1] + 1`
     - Delete: `dp[i][j] = dp[i-1][j] + 1`
     - Replace: `dp[i][j] = dp[i-1][j-1] + 1`
   - The value of `dp[i][j]` will be the minimum of these three operations.

### Solution

Here's the dynamic programming solution to find the minimum edit distance:

## Step-by-Step Explanation
### 1. Initialize the Variables
```js [init-variables.js] copy
const m = word1.length;
const n = word2.length;
const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
```
<div class="explanation">
  <ul>
    <li><strong>m</strong> and <strong>n</strong> store the lengths of <strong>word1</strong> and <strong>word2</strong>, respectively.</li>
    <li><strong>dp</strong> is a 2D array of size <strong>(m+1) x (n+1)</strong>, initialized to zero. This array will store the minimum edit distances for substrings of <strong>word1</strong> and <strong>word2</strong>.</li>
  </ul>
</div>

### 2. Base Cases
```js [base-cases.js] copy
for (let i = 0; i <= m; i++) {
  dp[i][0] = i;
}
for (let j = 0; j <= n; j++) {
  dp[0][j] = j;
}
```
<div class="explanation">
  <ul>
    <li>If <strong>`word2`</strong> is empty, the minimum edit distance to convert <strong>`word1`</strong> to <strong>`word2`</strong> is the length of <strong>`word1`</strong> (all deletions). Thus, <strong>`dp[i][0] = i`</strong>.</li>
    <li>If <strong>`word1`</strong> is empty, the minimum edit distance to convert <strong>`word2`</strong> to <strong>`word1`</strong> is the length of <strong>`word2`</strong> (all insertions). Thus, <strong>`dp[0][j] = j`</strong>.
</li>
  </ul>
</div>

### 3. Fill the DP Table
```js [fill-dp-table.js] copy
for (let i = 1; i <= m; i++) {
  for (let j = 1; j <= n; j++) {
    if (word1[i - 1] === word2[j - 1]) {
      dp[i][j] = dp[i - 1][j - 1];
    } else {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,     // Deletion
        dp[i][j - 1] + 1,     // Insertion
        dp[i - 1][j - 1] + 1  // Replacement
      );
    }
  }
}
```

<div class="explanation">
  <ul>
    <li><strong>•</strong> Loop through each character of  <strong>`word1`</strong> (index <strong>`i`</strong>) and  <strong>`word2`</strong> (index <strong>`j`</strong>).</li>
    <li><strong>•</strong> If the characters <strong>`word1[i-1]`</strong> and <strong>`word2[j-1]`</strong> are the same, no new operation is needed, and <strong>`dp[i][j]`</strong> is set to <strong>`dp[i-1][j-1]`</strong>.</li>
    <li><strong>•</strong> If the characters are different, we consider three operations:</li>
    <ul>
        <li><strong>• <code>Deletion</code> </strong>: The cost of deleting the character from <strong>`word1`</strong>, which is <strong>`dp[i-1][j] + 1</strong>.</li>
        <li><strong>• <code>Insertion</code> </strong>: The cost of inserting the character from <strong>`word1`</strong>, which is <strong>`dp[i][j-1] + 1</strong>.</li>
        <li><strong>• <code>Replacement</code> </strong>: The cost of replacing the character from <strong>`word1`</strong> with the character <strong>`word2`</strong>, which is <strong>`dp[i-1][j-1] + 1`</strong></li>
    </ul>
    <li><strong>`dp[i][j]`</strong> is set to the minimum of these three operations.</li>
  </ul>
</div>




```js [minimum-edit-distance.js] copy
function minDistance(word1, word2) {
  const m = word1.length; // Get the length of word1
  const n = word2.length; // Get the length of word2
  const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0)); // Initialize a 2D DP array with dimensions (m+1) x (n+1)

  // Initialize base cases
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i; // If word2 is empty, the cost is the length of word1 (all deletions)
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j; // If word1 is empty, the cost is the length of word2 (all insertions)
  }

  // Fill the DP table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]; // If characters match, no additional cost
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,     // Cost of deletion
          dp[i][j - 1] + 1,     // Cost of insertion
          dp[i - 1][j - 1] + 1  // Cost of replacement
        );
      }
    }
  }

  return dp[m][n]; // The last cell contains the minimum edit distance
}

console.log(minDistance("horse", "ros")); // Output: 3
console.log(minDistance("intention", "execution")); // Output: 5
```

## Explanation of the Code
1. Initialization:
    - We create a 2D array dp with dimensions (m+1) x (n+1) where m is the length of word1 and n is the length of word2.
    - We initialize the base cases where transforming an empty string to a string of length j requires j insertions and vice versa.

2. Filling the DP Table:
    - We iterate through each character of word1 and word2.
    - If the characters are the same, the value is taken from the diagonal cell dp[i-1][j-1].
    - If the characters are different, we take the minimum of inserting, deleting, or replacing a character, and add 1 to the operation count.

3. Result:
    - The value at dp[m][n] gives the minimum number of operations required to transform word1 into word2.

## Summary
The minimum edit distance problem demonstrates the power of dynamic programming in solving complex problems by breaking them down into simpler subproblems. By carefully defining the state transitions and base cases, we can efficiently compute the minimum number of operations required for transformation.

<div class="explanation">
  <ul>
    <li><strong>Optimal Substructure:</strong> The problem can be broken down into smaller subproblems which are solved optimally.</li>
    <li><strong>Overlapping Subproblems:</strong> The same subproblems are solved multiple times, which makes it ideal for dynamic programming.</li>
  </ul>
</div>

## FAQ
<details>
  <summary><strong>Q: How do I identify if a problem can be solved using dynamic programming?</strong></summary>
  <p><strong>A:</strong> Look for optimal substructure and overlapping subproblems. If the problem can be broken down into smaller subproblems that are reused multiple times, dynamic programming is likely a suitable approach.</p>
</details>
<details>
  <summary><strong>Q: What is the time complexity of this solution?</strong></summary>
  <p><strong>A:</strong> The time complexity is O(m * n), where m is the length of `word1` and n is the length of `word2`. This is because we fill a 2D table of size (m+1) x (n+1).</p>
</details>
<details>
  <summary><strong>Q: Can this solution be optimized further?</strong></summary>
  <p><strong>A:</strong> Yes, the space complexity can be optimized to O(min(m, n)) by using a rolling array to store only the previous row or column of the DP table. However, the time complexity remains O(m * n).</p>
</details>