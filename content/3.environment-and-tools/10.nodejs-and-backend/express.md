# Using Express

Express is a popular Node.js framework that simplifies the development of web applications and APIs by providing a robust set of features and tools. In this section, we'll cover the basics of setting up an Express application, defining routes, using middleware, and connecting to a database.

## Setting Up Express

First, let's set up a basic Express application. Ensure you have Node.js installed, then follow these steps:

### Step 1: Initialize a New Node.js Project

```bash [commands.sh] copy
mkdir my-express-app
cd my-express-app
npm init -y
```

### Step 2: Install Express
```bash [commands.sh] copy
npm install express
```

### Step 3: Create a Basic Server
Create a file named app.js and add the following code to set up a basic Express server.
```js [app.js] copy
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
```

## Defining Routes
Routes are used to define how an application responds to client requests for a specific endpoint. Let's define some basic routes.

### Basic Routing
```js [basic-routing.js] copy
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/about', (req, res) => {
  res.send('About Page');
});

app.get('/contact', (req, res) => {
  res.send('Contact Page');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
```

### Route Parameters
Route parameters are named URL segments used to capture values at specific positions in the URL.
```js [route-params.js] copy
const express = require('express');
const app = express();
const port = 3000;

app.get('/users/:userId', (req, res) => {
  res.send(`User ID: ${req.params.userId}`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
```

```bash
                        localhost:3000/users/{IdNum}
Example running on http://localhost:3000/users/123
```

### Query Parameters
Query parameters are a way to pass additional data to the server via the URL.

```js [query-params.js] copy
const express = require('express');
const app = express();
const port = 3000;

app.get('/search', (req, res) => {
  res.send(`Search Query: ${req.query.q}`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
```

<div class="explanation">
  <p><strong><em>EXPLANATION:</em></strong></p>
  <ul>
    <li>
      <strong><code>const express = require('express');</code></strong>
      <p>First, we import the Express module.</p>
    </li>
    <li>
      <strong><code>const app = express();</code></strong>
      <p>We create an instance of an Express application.</p>
    </li>
    <li>
      <strong><code>app.get('/search', (req, res) => { ... });</code></strong>
      <p>We define a route that listens for GET requests at the <code>/search</code> endpoint.</p>
    </li>
    <li>
      <strong><code>const query = req.query.q;</code></strong>
      <p>We access query parameters using <code>req.query</code>. In this example, <code>req.query.q</code> retrieves the value of the <code>q</code> parameter from the URL.</p>
    </li>
    <li>
      <strong><code>res.send(`Search Query: ${query}`);</code></strong>
      <p>We send a response back to the client that includes the search query.</p>
    </li>
    <li>
      <strong><code>app.listen(3000, () => { ... });</code></strong>
      <p>Finally, we start the server and listen on port 3000.</p>
    </li>
  </ul>
</div>

[Once the server is running, you can open your web browser and navigate to]

<a>http://localhost:3000/search?q=JavaScript<a>


[Expected Output]

  ```bash copy
  Search Query: JavaScript
  ```

### Multiple Parameters
```js [query-params.js] copy
const express = require('express');
const app = express();
const port = 3000;

app.get('/search', (req, res) => {
  const query = req.query.q;
  const language = req.query.lang;
  res.send(`Search Query: ${query}, Language: ${language}`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
```

[Once the server is running, you can open your web browser and navigate to]

<code>http://localhost:3000/search?q=JavaScript&lang=en</code>


  ```bash copy
 Search Query: JavaScript, Language: en
  ```


## Middleware
Middleware functions are a core concept in Express.js, providing a powerful way to handle various aspects of the request-response cycle. Middleware functions have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle.

### What is Middleware?
Middleware functions are functions that can perform the following tasks:

- Execute any code.
- Make changes to the request and response objects.
- End the request-response cycle.
- Call the next middleware function in the stack.

If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

<div class="note">
  <p><strong><em>Types of Middleware</em></strong></p>  <ul>
    <li><code>Application-Level Middleware</code>Bound to an instance of express.Router()</li>
    <li><code>Router-Level Middleware</code> The name of the function, used to call it.</li>
    <li><code>Error-Handling Middleware</code>Has four arguments (err, req, res, next)</li>
    <li><code>Built-in Middleware</code>Provided by Express.js, like express.static, express.json, and express.urlencoded</li>
    <li><code>Third-Party Middleware</code>Creamted by the community, like morgan, body-parser, cors, etc.</li>
  </ul>
</div>

### Using Middleware
```js [using-middleware.js] copy
const express = require('express');
const app = express();
const port = 3000;

// Custom middleware function
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

app.use(logger);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
```

### Built-in Middleware
Express comes with a few built-in middleware functions that you can use.
```js [built-in-middleware.js] copy
const express = require('express');
const app = express();
const port = 3000;

// Built-in middleware to parse JSON bodies
app.use(express.json());

// Built-in middleware to serve static files
app.use(express.static('public'));

app.post('/data', (req, res) => {
  res.send(`Received JSON data: ${JSON.stringify(req.body)}`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
```

::alert{type="info"}
Middleware functions provide a flexible and powerful way to handle the request-response cycle in Express applications. By using middleware, you can modularize your code and handle various tasks effectively.
::

## Connecting to a Database

### Using MongoDB with Mongoose
Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
```js [mongodb.js] copy
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});

// Defining a schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number
});

// Creating a model
const User = mongoose.model('User', userSchema);

// Creating a new user
const newUser = new User({ name: 'John Doe', age: 30 });
newUser.save((err) => {
  if (err) return console.error(err);
  console.log('User saved successfully');
});
```


## Authentication and Authorization
### Implementing JWT Authentication
JSON Web Tokens (JWT) are an open, industry-standard RFC 7519 method for representing claims securely between two parties.

```js [authentication-authorization.js] copy
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

app.use(express.json());

const users = [{ id: 1, username: 'user', password: 'password' }];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    const token = jwt.sign({ userId: user.id }, 'your_jwt_secret');
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization').split(' ')[1];
  if (token) {
    jwt.verify(token, 'your_jwt_secret', (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.get('/protected', authenticateJWT, (req, res) => {
  res.send('This is a protected route');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
```

<div class="note">
  <p><strong><em>NOTES:</em></strong></p>
  <ul>
    <li><strong><code>Express</code>:</strong> A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.</li>
    <li><strong><code>Middleware</code>:</strong>Functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle.</li>
    <li><strong><code>Mongoose</code>:</strong>An Object Data Modeling (ODM) library for MongoDB and Node.js.</li>   
  </ul>
</div>


## FAQ
<details>
  <summary><strong>Q: What is Express?</strong></summary>
  <p><strong>A:</strong> Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.</p>
</details>
<details>
  <summary><strong>Q: How do I install Express?</strong></summary>
  <p><strong>A:</strong> You can install Express using NPM with the command <code>npm install express</code>.</p>
</details>
<details>
  <summary><strong>Q: What is middleware in Express?</strong></summary>
  <p><strong>A:</strong> Middleware functions are functions that have access to the request object (<code>req</code>), the response object (<code>res</code>), and the next middleware function in the application’s request-response cycle.</p>
</details>
<details>
  <summary><strong>Q: How do I connect to MongoDB using Mongoose?</strong></summary>
  <p><strong>A:</strong> You can connect to MongoDB using Mongoose by installing it with <code>npm install mongoose</code> and using the <code>mongoose.connect</code> method with your MongoDB connection string.</p>
</details>