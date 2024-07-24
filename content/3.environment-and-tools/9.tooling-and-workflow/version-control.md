# Tooling & Workflow: How to use Git and GitHub

This guide is designed to help you become a master at using Git and GitHub, essential tools for any modern software developer. By the end of this guide, you will have a strong understanding of version control, how to manage your projects with Git, and how to collaborate effectively using GitHub.


## Introduction to Version Control
Version control is a system that records changes to a file or set of files over time so that you can recall specific versions later. Git is a distributed version control system that allows multiple developers to work on a project simultaneously without interfering with each other.

<div class="note">
  <ul>
    <li><strong>Version Control Systems (VCS)</strong>: Tools that help track changes in software projects.</li>
    <li><strong>Distributed Version Control</strong>: Each user has a complete copy of the repository.</li>
  </ul>
</div>

## Setting Up Git
To start using Git, you need to install it and configure some basic settings.

### Install Git
Download and install Git from [git-scm.com](https://git-scm.com/).

### Configure Git
After installation, configure your Git settings:

## Basic Git Commands
Initializing a Repository
To create a new Git repository:

```bash
git init
```

## Cloning a Repository
To clone an existing repository:

```bash
git clone https://github.com/username/repo.git
```

## Checking the Status
To check the status of your repository:
```bash
git status
```

## Adding Changes
To add changes to the staging area:
```bash
git add filename
# or to add all changes
git add .
```


## Committing Changes
To commit changes with a message:

```bash
git commit -m "Your commit message"
```

## Viewing Commit History
To view the commit history:
```bash
git log
```

## Advanced Git Commands
### Branching
To create a new branch:
```bash
git branch new-branch
```
To switch to a branch:
```bash
git checkout new-branch
```
To create and switch to a new branch:
```bash
git checkout -b new-branch
```

### Merging
To merge a branch into the current branch:
```bash
git merge branch-name
```
### Rebasing
To rebase your branch:
```bash
git rebase branch-name
```

### Stashing
To stash your changes:
```bash
git stash
```
To apply stashed changes:
```bash
git stash apply
```

## Using GitHub
### Creating a Repository
1. Go to [GitHub](https://www.github.com).
2. Click on the New button to create a new repository.
3. Initialize the repository with a README if desired.
### Pushing Changes to GitHub
To push your changes to a GitHub repository:
```bash
git remote add origin https://github.com/username/repo.git
git push -u origin master
```

### Pulling Changes from GitHub
To pull changes from a GitHub repository:
```bash
git pull origin master
```


## Collaborating with Others
### Forking a Repository
1. Go to the repository on GitHub.
2. Click the Fork button to create a copy of the repository under your GitHub account.

### Creating a Pull Request
1. Make your changes in a new branch.
2. Push your changes to GitHub.
3. Go to the original repository on GitHub.
4. Click the New Pull Request button and follow the instructions.


### References
<div class="explanation">
  <ul>
    <li><strong><code>Version Control</code>:</strong> A system that records changes to a file or set of files over time.</li>
    <li><strong><code>Repository</code>:</strong> A directory or storage space where your projects can live, either locally or online.</li>
  </ul>
</div>



## FAQs
<details>
  <summary><strong>Q: What is the difference between `fetch` and `pull`?</strong></summary>
  <p><strong>A:</strong> `git fetch` downloads new data from a remote repository but does not integrate it with your local repository. `git pull` is a combination of `fetch` and `merge`, fetching the data and then immediately integrating it into your local repository.</p>
</details>
<details>
  <summary><strong>Q: How do I resolve merge conflicts?</strong></summary>
  <p><strong>A:</strong> When a merge conflict occurs, Git will mark the conflicted areas in the file. You need to manually edit the file to resolve the conflicts and then add and commit the resolved file.</p>
</details>
<details>
  <summary><strong>Q: How can I undo a commit?</strong></summary>
  <p><strong>A:</strong> You can use `git revert` to create a new commit that undoes the changes, or `git reset` to move the branch pointer backward to a previous state.</p>
</details>