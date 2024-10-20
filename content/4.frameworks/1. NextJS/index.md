---
title: Next.js
description: We recommend starting a new Next.js app using create-next-app, which sets up everything automatically for you. To create a project, run
icon: vscode-icons:file-type-next
---

## Installation
System Requirements:

- Node.js 18.17 or later.
- macOS, Windows (including WSL), and Linux are supported.

## Automatic Installation
We recommend starting a new Next.js app using create-next-app, which sets up everything automatically for you. To create a project, run:

::steps
  ### Get Starter Template

  ::code-group
    ```bash [npm]
    npx create-next-app@latest
    ```
    ```bash [pnpm]
    pnpm create-next-app@latest
    ```
    ```bash [bun]
    bunx create-next-app@latest
    ```
  ::

  ::alert
  Alternatively, you can clone or download the template from the [GitHub repo](https://github.com/huntermacias/nextjs-tailwind-template.git).
  ::

  On installation, you'll see the following prompts:

::code-group
```bash [terminal]
What is your project named? my-app
Would you like to use TypeScript? No / Yes
Would you like to use ESLint? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like to use `src/` directory? No / Yes
Would you like to use App Router? (recommended) No / Yes
Would you like to customize the default import alias (@/*)? No / Yes
What import alias would you like configured? @/*
```
::

  ### Install Dependencies

  ::code-group
    ```bash [npm]
    npm install
    ```
    ```bash [pnpm]
    pnpm install
    ```
    ```bash [bun]
    bun install
    ```
  ::

  ### Development Server

  ::code-group
    ```bash [npm]
    npm run dev
    ```
    ```bash [pnpm]
    pnpm dev
    ```
    ```bash [bun]
    bun run dev
    ```
  ::
::


### Creating directories
Next.js uses file-system routing, which means the routes in your application are determined by how you structure your files.

The `app` directory
For new applications, we recommend using the `App Router`. This router allows you to use React's latest features and is an evolution of the `Pages Router` based on community feedback.

Create an `app/` folder, then add a `layout.tsx` and `page.tsx` file. These will be rendered when the user visits the root of your application `(/)`.

<img 
  src='https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fapp-getting-started.png&w=1920&q=75'
  alt='demo' 
  class=""
/>

Create a root layout inside `app/layout.tsx` with the required `<html>` and `<body>` tags:

::code
  ```ts [app/layout.tsx]
    export default function RootLayout({
      children,
    }: {
      children: React.ReactNode
    }) {
      return (
        <html lang="en">
          <body>{children}</body>
        </html>
      )
    }
  ```
::

Finally, create a home page `app/page.tsx` with some initial content:
::code
  ```ts [app/page.tsx]
    export default function Page() {
      return <h1>Hello, Next.js!</h1>
    }
  ```
::