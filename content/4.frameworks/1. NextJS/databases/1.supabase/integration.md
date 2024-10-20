---
title: Supabase Integration
description: Learn how to integrate Supabase with Prisma in a Next.js project for building scalable and performant applications. This guide provides a step-by-step approach to setting up Prisma, connecting it with Supabase, and configuring your Next.js environment.
---

## Setting Up Prisma and Supabase

### Prerequisites
- `Node.js` installed on your machine.
- A `Supabase` account with access to your dashboard.
- Basic knowledge of PostgreSQL is helpful but not required.

### Installing Dependencies

Start by setting up a new Next.js project and installing Prisma, the Prisma client, and any other necessary dependencies:

```powershell [bash] copy
npx create-next-app@latest my-app
cd my-app
npm install @prisma/client prisma
```

### Initializing Prisma

After installing, initialize Prisma in your Next.js project:

```bash [bash] copy
npx prisma init
```

This command generates a `prisma/` directory containing the `schema.prisma` file and creates a `.env` file for environment variables.

### Setting Up Supabase

1. **Create a New Project**: Log in to Supabase, create a new project, and select the region where your database will be hosted.
2. **Obtain Database Credentials**: Go to Settings > Database in the Supabase dashboard and copy your connection string.

### Connecting Prisma to Supabase

In your `.env` file, add your Supabase database connection string:

```env
DATABASE_URL="postgresql://username:password@db.supabase.co:5432/postgres"
```

### Configuring Prisma with PostgreSQL

In the `prisma/schema.prisma` file, set PostgreSQL as the datasource for Prisma:

```prisma [schema.prisma] copy
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
```

### Running Migrations

Next, you’ll need to run the Prisma migration to synchronize your database schema with your application:

```powershell [bash] copy
npx prisma migrate dev --name init
```

This command applies the initial migration and generates the Prisma Client, which you'll use to interact with your database.

### Testing the Integration (App Router)
With the App Router pattern in Next.js, you use Server Components to fetch and display data on the server-side directly within your components.

Here’s an example of fetching users from the Supabase database using Prisma inside a server component.

#### 1. Create a New Component
In your `app/` directory, create a new file under `app/page.tsx` (or inside the corresponding route folder).

```typescript [page.tsx] copy
// app/page.tsx
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getUsers() {
  const users = await prisma.user.findMany();
  return users;
}

export default async function Home() {
  const users = await getUsers();

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

In this example, Home is a server component (denoted by the async function). The getUsers function performs the database query directly using Prisma.

Run your app:

```bash
npm run dev
```

Once the app is running, you should see the list of users rendered on the page directly from the Supabase database.