---
title: Databases
description: In modern web development, the choice of a database and an ORM (Object-Relational Mapping) tool can significantly impact the scalability, maintainability, and performance of your application. This guide delves deep into using Prisma as an ORM with PostgreSQL databases hosted on Supabase in a Next.js environment. Whether you're an experienced developer or looking to enhance your database skills, this guide covers everything from initial setup to advanced querying and optimization techniques. 
hidden: true
---

## Setting Up Prisma and Supabase


### Prerequisites
- `Node.js` installed on your machine.
- A `Supabase` account.
- `PostgreSQL` knowledge is beneficial but not required.

### Installing Dependencies
Begin by initializing a new Next.js project and installing the necessary dependencies:

```powershell [powershell] 
npx create-next-app my-app
cd my-app
npm install @prisma/client prisma
```

### Configuring Prisma
Initialize Prisma in your project:

```powershell [powershell] 
npx prisma init
```


This command creates a `prisma` directory with a `schema.prisma` file and a `.env` file.

### Setting Up Supabase
1. Create a New Project: Log in to Supabase and create a new project.
2. Obtain Database Credentials: Navigate to Settings > Database to find your connection string.

### Connecting Prisma to Supabase
Update your `.env` file with your Supabase database URL:


```env [.env] 
DATABASE_URL="postgresql://username:password@db.supabase.co:5432/postgres"
```

Ensure your `schema.prisma` file is configured to use PostgreSQL:

```prisma [prisma/schema.prisma] 
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

## Creating Advanced Models
### Defining Models in Prisma Schema
Prisma models represent your database tables. Here's how to define a simple User model:

```prisma [prisma/schema.prisma] 
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  posts     Post[]
  profile   Profile?
  createdAt DateTime @default(now())
}
```

###  Relations

#### **One-to-One Relations**

Example with `User` and `Profile`:

```prisma [prisma/schema.prisma] 
model Profile {
  id     Int    @id @default(autoincrement())
  bio    String
  user   User   @relation(fields: [userId], references: [id])
  userId Int    @unique
}
```

#### **One-to-Many Relations**
Example with User and Post:

```prisma [prisma/schema.prisma] 
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

#### **Many-to-Many Relations**
Example with Post and Category:


```prisma [prisma/schema.prisma] 
model Post {
  // ...other fields
  categories Category[] @relation("PostCategories")
}

model Category {
  id    Int    @id @default(autoincrement())
  name  String @unique
  posts Post[] @relation("PostCategories")
}
```

**Advanced Data Types and Constraints**
- Enums:

```prisma [prisma/schema.prisma] 
enum Role {
  USER
  ADMIN
  SUPERADMIN
}

model User {
  // ...other fields
  role Role @default(USER)
}
```


- Composite Types:

```prisma [prisma/schema.prisma] 
type Address {
  street  String
  city    String
  zipCode String
}

model User {
  // ...other fields
  address Address
}
```

## Seeding your Database

Seeding is crucial for populating your database with initial data.

### Regular Seeding
Create a `seed.js` or `seed.ts` file in the prisma directory:
```ts [prisma/seed.ts] copy
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: 'john.doe@example.com',
      name: 'John Doe',
      posts: {
        create: {
          title: 'Hello World',
          content: 'This is my first post',
        },
      },
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
```

Run the seed script:

```powershell [bash] copy
npx prisma db seed --preview-feature
```

### Seeding with Join Tables
For many-to-many relationships

```ts [prisma/seed.ts] copy
async function main() {
  const category = await prisma.category.create({
    data: {
      name: 'Technology',
    },
  });

  await prisma.post.create({
    data: {
      title: 'Advancements in AI',
      categories: {
        connect: { id: category.id },
      },
    },
  });
}
```

### Using Custom Seed Scripts

You can use libraries like `faker` to generate realistic data:

```ts [prisma/seed.ts] copy
const faker = require('faker');

async function main() {
  for (let i = 0; i < 100; i++) {
    await prisma.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.name.findName(),
      },
    });
  }
}
```

## Organize Code for Database Operations
### Option 1: Place Code Directly in route.ts Files

You can write your `CRUD` operations directly within your API route handler files (`route.ts`). This approach is straightforward and keeps your API logic in one place, but it can become unwieldy as your application grows.

**Example Structure:**
```md [markdown] copy
app/
├── api/
│   ├── users/
│   │   └── route.ts
│   ├── posts/
│   │   └── route.ts
│   └── comments/
│       └── route.ts
```

Example `app/api/users/route.ts`:

```ts [route.ts] copy
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Assuming you have a Prisma client setup

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany({
    // TODO: Advanced querying here
  });
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const user = await prisma.user.create({
    data,
  });
  return NextResponse.json(user);
}

// TODO: Similarly for PUT, DELETE, etc.
```


### Option 2: Use a Separate services or lib Directory
For better code organization and reusability, it's recommended to separate your database logic from your route handlers. You can create a `services` or `lib` directory to house all your database interaction code. This way, your API routes remain clean and focused on handling HTTP requests and responses.


**Example Structure:**
```md [markdown] copy
app/
├── api/
│   ├── users/
│   │   └── route.ts
│   ├── posts/
│   │   └── route.ts
│   └── comments/
│       └── route.ts
├── lib/
│   ├── prisma.ts
│   └── services/
│       ├── userService.ts
│       ├── postService.ts
│       └── commentService.ts
```

#### Steps to Implement This Structure:

#### 1. Create a `lib` Directory:

At the root of your project (inside the `app` directory), create a `lib` folder:

```powershell [bash] copy
app/
└── lib/
```

#### 2. Set Up Prisma Client:

Inside `lib`, set up your Prisma client in a `prisma.ts` file:

```ts [prisma.ts] copy
// app/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
```

#### 3. Create a `services` Directory:

Inside `lib`, create a services directory to house your business logic:


```md [bash] copy
app/
└── lib/
    └── services/
```

#### 4. Write Service Modules:

For each model (e.g., `User`, `Post`), create a corresponding service file:

- `User Service`:
```ts [app/lib/services/userService.ts] copy
// app/lib/services/userService.ts
import prisma from '../prisma';

export async function getAllUsers() {
  return prisma.user.findMany({
    // Advanced querying options
  });
}

export async function createUser(data: any) {
  return prisma.user.create({ data });
}

// Additional CRUD operations...
```

- `Post Service`:
``` ts [app/lib/services/postService.ts] copy
// app/lib/services/postService.ts
import prisma from '../prisma';

export async function getAllPosts() {
  return prisma.post.findMany({
    // Advanced querying options
  });
}

export async function createPost(data: any) {
  return prisma.post.create({ data });
}

// Additional CRUD operations...
```

#### 5. Import Services in API Routes:

In your `route.ts` files, import the service functions:


```ts [app/api/users/route.ts] copy
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getAllUsers, createUser } from '@/lib/services/userService';

export async function GET(request: NextRequest) {
  const users = await getAllUsers();
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const user = await createUser(data);
  return NextResponse.json(user);
}
```

```ts [app/api/posts/route.ts] copy
// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts, createPost } from '@/lib/services/postService';

export async function GET(request: NextRequest) {
  const posts = await getAllPosts();
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const post = await createPost(data);
  return NextResponse.json(post);
}
```

### Advantages of Using a Separate services Directory

- **Separation of Concerns**: Keeps your API routes clean and separates business logic from request handling.
- **Reusability**: Service functions can be reused across different parts of your application.
- **Testability**: Easier to write unit tests for your business logic without involving HTTP layers.
- **Maintainability**: Simplifies debugging and future code enhancements.

### Alternative: Using a utils Directory
Some developers prefer to use a utils directory for utility functions, including database operations.

**Example Structure:**

```md [markdown] 
app/
├── api/
│   └── [foldername]/
│       └── route.ts
├── utils/
│   ├── prisma.ts
│   ├── dbHelpers.ts
│   └── otherUtils.ts
```

Note: The choice between `lib`, `services`, or `utils` is largely a matter of personal or team preference. The key is consistent organization and clear separation of responsibilities.

- For Smaller Projects: Writing CRUD operations directly in your route.ts files might suffice.
- For Larger or Growing Projects: It's better to organize your code by creating a services or lib directory to house your database operations and advanced querying logic.