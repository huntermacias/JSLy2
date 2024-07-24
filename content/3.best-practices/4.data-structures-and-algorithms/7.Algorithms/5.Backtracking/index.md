---
title: Backtracking - A Comprehensive Guide
description: Backtracking is a powerful algorithmic technique used to solve problems incrementally, one piece at a time, and remove solutions that fail to satisfy the constraints of the problem. It's a form of recursion where you build a solution step by step, and if at any point you find that the solution cannot be extended further, you backtrack to the previous step and try the next possibility.
---

## Key Ideas
1. Incremental Construction: Build the solution one piece at a time.
2. Feasibility Check: At each step, check if the current solution is feasible.
3. Backtrack: If the current solution is not feasible, remove the last piece and try another.

## Core Concepts
### Recursion
Backtracking relies heavily on recursion, where the function calls itself with modified parameters.

### State Space Tree
A tree that represents all possible states (partial solutions) of the problem.

### Pruning
Eliminating parts of the state space tree that do not lead to a solution.

### Base Case
The condition that stops the recursion when a complete solution is found.

## Thinking About Backtracking
To effectively implement backtracking:

1. Define the Solution Space: Understand what constitutes a complete solution.
2. Identify Constraints: Know the rules that a solution must obey.
3. Design the Recursive Function: Write a function that tries to extend the solution step by step.
4. Implement Pruning: Stop exploring paths that cannot possibly lead to a solution.

## Simple Code Samples
### Example 1: Finding All Subsets:

**Given a set of integers, find all possible subsets.**

```js [find-subsets.js] copy
function findSubsets(nums) {
    let result = [];

    function backtrack(start, path) {
        result.push([...path]);
        for (let i = start; i < nums.length; i++) {
            path.push(nums[i]);
            backtrack(i + 1, path);
            path.pop();
        }
    }

    backtrack(0, []);
    return result;
}

console.log(findSubsets([1, 2, 3]));
```
<div class='explanation'>
    <p>Explanation</p>
    <ul>
        <li><code><strong>Path</strong></code>Current subset being constructed.</li>
        <li><code><strong>Backtrack Function</strong></code>Adds the current subset to the result, then tries to add each remaining element recursively.</li>
    </ul>
</div>

## Medium Code Samples
### Example 2: Solving N-Queens

Place N queens on an N×N chessboard so that no two queens threaten each other.

```js [n-queens.js] copy
function solveNQueens(n) {
    let results = [];
    let board = Array.from({ length: n }, () => Array(n).fill('.'));

    function isValid(board, row, col) {
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') return false;
        }
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') return false;
        }
        for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (board[i][j] === 'Q') return false;
        }
        return true;
    }

    function backtrack(row) {
        if (row === n) {
            results.push(board.map(r => r.join('')));
            return;
        }
        for (let col = 0; col < n; col++) {
            if (isValid(board, row, col)) {
                board[row][col] = 'Q';
                backtrack(row + 1);
                board[row][col] = '.';
            }
        }
    }

    backtrack(0);
    return results;
}

console.log(solveNQueens(4));
```


<div class='explanation'>
    <p>Explanation</p>
    <ul>
        <li><code><strong>Board</strong></code>Represents the chessboard.</li>
        <li><code><strong>isValid Function</strong></code>Checks if placing a queen at (row, col) is valid.</li>
        <li><code><strong>Backtrack Function</strong></code>Tries placing a queen in each column of the current row and recurses to the next row.</li>
    </ul>
</div>

## Advanced Code Samples
### Example 3: Sudoku Solver

Solve a given 9×9 Sudoku puzzle.
```js [sudoku-solver.js] copy
function solveSudoku(board) {
    function isValid(board, row, col, num) {
        for (let x = 0; x < 9; x++) {
            if (board[row][x] === num || board[x][col] === num || 
                board[3 * Math.floor(row / 3) + Math.floor(x / 3)][3 * Math.floor(col / 3) + x % 3] === num) {
                return false;
            }
        }
        return true;
    }

    function solve() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === '.') {
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(board, row, col, num)) {
                            board[row][col] = String(num);
                            if (solve()) return true;
                            board[row][col] = '.';
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    solve();
    return board;
}

let sudokuBoard = [
    ["5","3",".",".","7",".",".",".","."],
    ["6",".",".","1","9","5",".",".","."],
    [".","9","8",".",".",".",".","6","."],
    ["8",".",".",".","6",".",".",".","3"],
    ["4",".",".","8",".","3",".",".","1"],
    ["7",".",".",".","2",".",".",".","6"],
    [".","6",".",".",".",".","2","8","."],
    [".",".",".","4","1","9",".",".","5"],
    [".",".",".",".","8",".",".","7","9"]
];

console.log(solveSudoku(sudokuBoard));
```

<div class='explanation'>
    <p>Explanation</p>
    <ul>
        <li><code><strong>Board</strong></code>Represents the Sudoku grid.</li>
        <li><code><strong>isValid Function</strong></code>Checks if placing a number in the current cell is valid.</li>
        <li><code><strong>Solve Function</strong></code>Recursively tries to fill each empty cell with a valid number.</li>
    </ul>
</div>

## Advanced Topics

1. Pruning and Optimization
    - `Early Stopping`: Use conditions to stop further exploration if a solution is found or deemed impossible.
    - `Memoization`: Store results of expensive function calls and reuse them when needed.
2. Applications of Backtracking
- `Combinatorial Problems`: Generating permutations, combinations, and subsets.
- `Constraint Satisfaction Problems`: Solving puzzles like Sudoku, N-Queens, and crossword puzzles.
- `Pathfinding Problems`: Solving mazes and finding paths in graphs.

## Time Complexity
The time complexity of backtracking algorithms can vary widely based on the problem and how effectively the solution space is pruned. Generally, backtracking can be exponential in the worst case.

## Space Complexity
The space complexity is typically determined by the maximum depth of the recursion stack, which can be proportional to the size of the input.

## Practical Examples and Problems
### Problem 1: Word Search

Given a 2D board and a word, find if the word exists in the grid.
```js [find-word.js] copy
function exist(board, word) {
    function backtrack(i, j, idx) {
        if (idx === word.length) return true;
        if (i < 0 || i >= board.length || j < 0 || j >= board[0].length || board[i][j] !== word[idx]) {
            return false;
        }

        let temp = board[i][j];
        board[i][j] = '#'; // mark as visited
        let found = backtrack(i + 1, j, idx + 1) || backtrack(i - 1, j, idx + 1) ||
                    backtrack(i, j + 1, idx + 1) || backtrack(i, j - 1, idx + 1);
        board[i][j] = temp; // unmark

        return found;
    }

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (backtrack(i, j, 0)) return true;
        }
    }

    return false;
}

let board = [
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
];

console.log(exist(board, "ABCCED")); // true
console.log(exist(board, "SEE")); // true
console.log(exist(board, "ABCB")); // false
```

<div class='explanation'>
    <p>Explanation</p>
    <ul>
        <li><code><strong>Backtrack Function</strong></code>Recursively searches in all four directions to find the word.</li>
        <li><code><strong>Base Case</strong></code>If all characters of the word are found.</li>
        <li><code><strong>Pruning</strong></code>Stop and return false if the current cell does not match the corresponding character in the word.</li>
    </ul>
</div>

## Conclusion
Backtracking is a versatile and powerful algorithmic technique that helps in solving complex problems by breaking them down into simpler sub-problems. Through recursion and pruning, backtracking explores potential solutions and eliminates those that fail to meet the constraints. Whether you are tackling combinatorial problems, constraint satisfaction problems, or pathfinding issues, backtracking provides a structured approach to finding solutions. With practice and a good understanding of its principles, you can master backtracking and apply it effectively in various computational problems.


