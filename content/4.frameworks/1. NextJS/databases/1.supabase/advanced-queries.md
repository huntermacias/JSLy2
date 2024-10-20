---
title: Advanced Queries with Prisma and Supabase
description: This guide covers advanced techniques for building highly scalable Next.js applications using Prisma and Supabase. It includes filtering, pagination, caching, error handling, and how to structure APIs using Next.js App Router's `app/api` routing system.
---




As your Next.js app grows, a well-structured codebase becomes vital for maintainability and scalability. In this guide, we’ll cover advanced querying techniques in Prisma, and introduce best practices for structuring API routes, using middlewares, and optimizing performance for large applications.

### Professional Folder Structure for a Large-Scale Application

When building a scalable application, we want to focus on separation of concerns. We'll organize code into **services**, **controllers**, **models**, and **middlewares** to keep API logic clean and maintainable.

```plaintext
📁 app/
 ├── 📁 api/
 │   ├── 📁 users/
 │   │   ├── route.ts         # API route for user-related operations
 │   │   └── validation.ts    # Input validation middleware for user APIs
 │   ├── 📁 posts/
 │   │   ├── route.ts         # API route for post-related operations
 │   │   └── validation.ts    # Input validation middleware for posts APIs
 │   ├── 📁 middlewares/
 │       ├── errorHandler.ts  # Global error handling middleware
 │       └── logger.ts        # Request logging middleware
 ├── 📁 lib/
 │   ├── prisma.ts            # Prisma client setup
 ├── 📁 services/
 │   ├── userService.ts       # Prisma queries related to user actions
 │   └── postService.ts       # Prisma queries related to post actions
 └── 📁 utils/
     ├── pagination.ts        # Utility for cursor-based pagination
     └── response.ts          # Standardized response utility
```

### Setting Up Prisma Client with Connection Pooling
For high-performance applications, efficient database connections are critical. Implement connection pooling to handle large volumes of requests without overwhelming your database.

```ts [lib/prisma.ts] copy
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });
} else {
  // In development, use a global variable to avoid reinitializing Prisma
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
```

### Advanced API Route Design
Let's look at how to structure an API route in `app/api/users/route.ts` to handle user-related actions like `fetching`, `creating`, and `updating` users.

Example: Fetching Users with Pagination

```ts [app/api/users/route.ts] copy
// app/api/users/route.ts
import { NextResponse } from 'next/server';
import { findUsersWithPagination } from '@/services/userService';
import { parsePaginationParams } from '@/utils/pagination';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const { page, pageSize } = parsePaginationParams(searchParams);

  try {
    const users = await findUsersWithPagination(page, pageSize);
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.error();
  }
}
```

Here, we offload the business logic to `userService.ts` to keep API routes clean and reusable.

Example: Advanced Prisma Queries in `userService.ts`

```ts [services/userService.ts] copy
// services/userService.ts
import prisma from '@/lib/prisma';

export async function findUsersWithPagination(page: number, pageSize: number) {
  const users = await prisma.user.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { createdAt: 'desc' },
    include: { profile: true },
  });

  return users;
}
```

By separating the logic, we can also use this service for other parts of the app, such as admin panels or reports.

### Middleware for Error Handling and Logging
Middleware helps in centralizing concerns like logging, error handling, and validation, keeping your routes clean and reusable.

Global Error Handling Middleware

```ts [app/api/middlewares/errorHandler.ts] copy
// app/api/middlewares/errorHandler.ts
export function errorHandler(handler) {
  return async (request, response) => {
    try {
      await handler(request, response);
    } catch (error) {
      console.error('API Error:', error);
      return new Response(JSON.stringify({ message: 'Something went wrong' }), { status: 500 });
    }
  };
}
```

#### Logging Middleware

```ts [app/api/middlewares/logger.ts] copy
// app/api/middlewares/logger.ts
export function logger(handler) {
  return async (request, response) => {
    console.log(`[${new Date().toISOString()}] ${request.method} ${request.url}`);
    return handler(request, response);
  };
}
```

These middlewares can be applied to any API route:

```ts copy
import { logger } from '@/app/api/middlewares/logger';
import { errorHandler } from '@/app/api/middlewares/errorHandler';

export const GET = logger(errorHandler(async (request) => {
  // Handle request
}));
```

### Advanced Pagination with Cursor-Based Pagination
For large datasets, using cursor-based pagination is more efficient than using skip and take for deep pagination. Here's how to implement cursor-based pagination:

#### Utility for Cursor Pagination
```ts [utils/pagination.ts] copy
// utils/pagination.ts
export function parsePaginationParams(searchParams: URLSearchParams) {
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);
  return { page, pageSize };
}
```

#### Prisma Query for Cursor Pagination
```ts [services/userService.ts] copy
// services/userService.ts
export async function findUsersWithCursor(cursor: string | null, pageSize: number) {
  const users = await prisma.user.findMany({
    take: pageSize,
    cursor: cursor ? { id: cursor } : undefined,
    skip: cursor ? 1 : 0,
    orderBy: { createdAt: 'desc' },
  });

  return users;
}
```

By using cursors, we can handle large datasets without performance degradation caused by deep pagination.

### Optimistic Updates for Better User Experience
Implement optimistic updates to make your app feel more responsive to users. This involves updating the UI before waiting for the server response.

```ts [app/api/users/route.ts] copy
// app/api/users/route.ts
export async function POST(request: Request) {
  const body = await request.json();

  try {
    // Optimistically update UI while waiting for server response
    const newUser = await createUser(body);
    return NextResponse.json({ user: newUser });
  } catch (error) {
    return NextResponse.error();
  }
}
```


On the frontend, you can update the state immediately, without waiting for the network response.

### Caching Strategies with Redis for Scalability
For high-traffic applications, caching results can significantly improve response times and reduce database load.

Example: Caching User Data with Redis
```ts [services/userService.ts] copy
// services/userService.ts
import { createClient } from 'redis';
import prisma from '@/lib/prisma';

const redisClient = createClient({ url: process.env.REDIS_URL });
await redisClient.connect();

export async function getCachedUsers() {
  const cacheKey = 'users:all';
  const cachedUsers = await redisClient.get(cacheKey);

  if (cachedUsers) {
    return JSON.parse(cachedUsers);
  }

  const users = await prisma.user.findMany();
  await redisClient.set(cacheKey, JSON.stringify(users), { EX: 3600 });

  return users;
}
```

By caching results, you prevent repeated database hits and scale your app to handle more requests.

### Transaction Management for Complex Operations
For large-scale apps, transactions become essential for ensuring atomic operations. Here’s an example using Prisma’s transaction API.

Example: Transferring Credits Between Users

```ts [services/userService.ts]
// services/userService.ts
export async function transferCredits(fromUserId: string, toUserId: string, amount: number) {
  return await prisma.$transaction(async (prisma) => {
    const fromUser = await prisma.user.update({
      where: { id: fromUserId },
      data: { credits: { decrement: amount } },
    });

    const toUser = await prisma.user.update({
      where: { id: toUserId },
      data: { credits: { increment: amount } },
    });

    return { fromUser, toUser };
  });
}
```

### Optimizing Database Queries with Indexing
In large-scale applications, indexing frequently queried fields can greatly improve performance.
```prisma [prisma/schema.prisma] copy
// prisma/schema.prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique @index
  createdAt DateTime @default(now()) @index
}
```

---
### Changelog
1. **Folder Structure**: Updated for maximum scalability using middlewares, services, controllers, and utilities.
2. **Connection Pooling**: Ensures efficient database connections.
3. **Cursor-Based Pagination**: Replaces traditional pagination with a more scalable and performant pattern.
4. **Middlewares**: Added error handling and logging middleware for cleaner routes.
5. **Optimistic Updates**: Provides a better user experience by updating the UI before receiving the network response.
6. **Caching with Redis**: Reduces database load and improves response times for high-traffic applications.
7. **Advanced Transactions**: Added transaction management for complex operations.
8. **Indexing**: Optimized database queries with indexing for commonly queried fields.

---

### Conclusion
By structuring your Next.js application around services, middlewares, and proper error handling, you can create a scalable and maintainable codebase. Leveraging advanced features like connection pooling, cursor-based pagination, optimistic UI updates, and caching strategies allows your app to scale efficiently.