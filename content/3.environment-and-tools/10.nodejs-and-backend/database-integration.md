# Database Integration

Integrating databases with JavaScript applications is essential for storing and managing data. This guide will cover various aspects of database integration, including types of databases, popular database management systems (DBMS), how to connect to a database, and performing CRUD (Create, Read, Update, Delete) operations.

## Types of Databases

1. **Relational Databases (SQL)**: Structured databases that use tables to store data. Examples include MySQL, PostgreSQL, and SQLite.
2. **NoSQL Databases**: Flexible databases that store data in various formats like documents, key-value pairs, graphs, or wide-column stores. Examples include MongoDB, Cassandra, and Redis.

## Popular Database Management Systems

### Relational Databases (SQL)

- **MySQL**: An open-source relational database management system.
- **PostgreSQL**: An open-source, object-relational database system with a focus on extensibility and standards compliance.
- **SQLite**: A C-language library that implements a small, fast, self-contained, high-reliability, full-featured SQL database engine.

### NoSQL Databases

- **MongoDB**: A document-based NoSQL database known for its flexibility and scalability.
- **Cassandra**: A distributed NoSQL database designed to handle large amounts of data across many commodity servers.
- **Redis**: An in-memory key-value store known for its speed and versatility.

## Connecting to a Database

### Using MySQL with Node.js

1. **Install MySQL Module**
```bash
   npm install mysql
```
2. **Connect to MySQL Database**

```js [db.js] copy
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'database_name'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as id ' + connection.threadId);
});

// Don't forget to close the connection
connection.end();
```

### Using MongoDB with Node.js

1. **Install MongoDB Module**
```bash copy
    npm install mongodb
```

2. **Connect to MongoDB Database**
```js [db.js] copy
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'database_name';

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Error connecting: ' + err);
    return;
  }
  console.log('Connected successfully to server');
  const db = client.db(dbName);

  // Perform operations

  client.close();
});
```

## Performing CRUD Operations
### CRUD Operations in MySQL

<div class="explanation">
    <p>Let's start by describing what CRUD means and how we use it when integrating databases</p>
    <ul>
        <li><code>C</code> Create</li>
        <li><code>R</code> Read</li>
        <li><code>U</code> Update</li>
        <li><code>D</code>  Delete</li>
    </ul>
</div>

1. **Create**
```js [utils/create.js] copy
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'database_name'
});

connection.connect();

const sql = 'INSERT INTO users (name, age) VALUES (?, ?)';
const values = ['John Doe', 30];

connection.query(sql, values, (err, result) => {
  if (err) throw err;
  console.log('Record inserted, ID: ' + result.insertId);
});

connection.end();
```
2. **Read**
```js [utils/read.js] copy
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'database_name'
});

connection.connect();

const sql = 'SELECT * FROM users';

connection.query(sql, (err, results) => {
  if (err) throw err;
  console.log(results);
});

connection.end();
```
3. **Update**
```js [utils/update.js] copy
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'database_name'
});

connection.connect();

const sql = 'UPDATE users SET age = ? WHERE name = ?';
const values = [35, 'John Doe'];

connection.query(sql, values, (err, result) => {
  if (err) throw err;
  console.log('Record updated, Rows affected: ' + result.affectedRows);
});

connection.end();
```
4. **Delete**
```js [utils/delete.js] copy
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'database_name'
});

connection.connect();

const sql = 'DELETE FROM users WHERE name = ?';
const values = ['John Doe'];

connection.query(sql, values, (err, result) => {
  if (err) throw err;
  console.log('Record deleted, Rows affected: ' + result.affectedRows);
});

connection.end();
```

### CRUD Operations in MongoDB
1. **Create**
```js [utils/create.js] copy
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';  // Connection URL
const dbName = 'database_name';  // Database Name

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) throw err;
  console.log('Connected successfully to server');
  const db = client.db(dbName);  // Database instance

  const collection = db.collection('users');  // Collection instance
  collection.insertOne({ name: 'John Doe', age: 30 }, (err, result) => {
    if (err) throw err;
    console.log('Record inserted, ID: ' + result.insertedId);  // Log the inserted ID
    client.close();  // Close the connection
  });
});
```
2. **Read**
```js [utils/read.js] copy
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';  // Connection URL
const dbName = 'database_name';  // Database Name

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) throw err;
  console.log('Connected successfully to server');
  const db = client.db(dbName);  // Database instance

  const collection = db.collection('users');  // Collection instance
  collection.find({}).toArray((err, docs) => {
    if (err) throw err;
    console.log(docs);  // Log the retrieved documents
    client.close();  // Close the connection
  });
});

```
3. **Update**
```js [utils/update.js] copy
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';  // Connection URL
const dbName = 'database_name';  // Database Name

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) throw err;
  console.log('Connected successfully to server');
  const db = client.db(dbName);  // Database instance

  const collection = db.collection('users');  // Collection instance
  collection.updateOne({ name: 'John Doe' }, { $set: { age: 35 } }, (err, result) => {
    if (err) throw err;
    console.log('Record updated, Matched count: ' + result.matchedCount);  // Log the matched count
    client.close();  // Close the connection
  });
});
```
4. **Delete**
```js [utils/delete.js] copy
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';  // Connection URL
const dbName = 'database_name';  // Database Name

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) throw err;
  console.log('Connected successfully to server');
  const db = client.db(dbName);  // Database instance

  const collection = db.collection('users');  // Collection instance
  collection.deleteOne({ name: 'John Doe' }, (err, result) => {
    if (err) throw err;
    console.log('Record deleted, Deleted count: ' + result.deletedCount);  // Log the deleted count
    client.close();  // Close the connection
  });
});
```

### All MongoDB CRUD Operations in a Single File
Here's how you can combine all CRUD operations into a single file for better management and execution.

```js [project/src/db/crud-operations.js] copy
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';  // Connection URL
const dbName = 'database_name';  // Database Name

// Function to create a document
const createDocument = (db, callback) => {
  const collection = db.collection('users');
  collection.insertOne({ name: 'John Doe', age: 30 }, (err, result) => {
    if (err) throw err;
    console.log('Record inserted, ID: ' + result.insertedId);
    callback(result);
  });
};

// Function to read documents
const readDocuments = (db, callback) => {
  const collection = db.collection('users');
  collection.find({}).toArray((err, docs) => {
    if (err) throw err;
    console.log(docs);
    callback(docs);
  });
};

// Function to update a document
const updateDocument = (db, callback) => {
  const collection = db.collection('users');
  collection.updateOne({ name: 'John Doe' }, { $set: { age: 35 } }, (err, result) => {
    if (err) throw err;
    console.log('Record updated, Matched count: ' + result.matchedCount);
    callback(result);
  });
};

// Function to delete a document
const deleteDocument = (db, callback) => {
  const collection = db.collection('users');
  collection.deleteOne({ name: 'John Doe' }, (err, result) => {
    if (err) throw err;
    console.log('Record deleted, Deleted count: ' + result.deletedCount);
    callback(result);
  });
};

// Connect to the MongoDB server and perform CRUD operations
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) throw err;
  console.log('Connected successfully to server');
  const db = client.db(dbName);

  // Create a document
  createDocument(db, () => {
    // Read documents
    readDocuments(db, () => {
      // Update a document
      updateDocument(db, () => {
        // Delete a document
        deleteDocument(db, () => {
          client.close();  // Close the connection after all operations
        });
      });
    });
  });
});
```
**Here is an example of how your project structure might look**

<div class="project-structure">
  <div class="folder">
    <span class="folder-name">project/</span>
    <div class="folder-content">
      <div class="folder">
        <span class="folder-name">src/</span>
        <div class="folder-content">
          <div class="folder">
            <span class="folder-name">db/</span>
            <div class="folder-content">
              <div class="file">crud-operations.js</div>
              <div class="file">...</div>
            </div>
          </div>
          <div class="file">...</div>
        </div>
      </div>
      <div class="file">...</div>
    </div>
  </div>
</div>



<div class="explanation">
  <p><strong><em>Explanation</em></strong></p>  <ul>
    <li><code>Create Document</code>This function inserts a new document into the users collection.</li>
    <li><code>Read Documents</code>This function retrieves all documents from the users collection.</li>
    <li><code>Update Document</code>This function updates the document with the name "John Doe" to have an age of 35.</li>
    <li><code>Delete Document</code>This function deletes the document with the name "John Doe".</li>
  </ul>
  <p>By combining all CRUD operations into a single file, you can manage your database interactions more efficiently and ensure all operations are executed in sequence.</p>
</div>

<div class="note">
  <p><strong><em>Best Practices</em></strong></p>  <ul>
    <li><code>Use Environment Variables</code>Store sensitive information like database credentials in environment variables instead of hardcoding them.</li>
    <li><code>Use Connection Pooling</code>Manage database connections efficiently to handle multiple concurrent requests.</li>
    <li><code>Handle Errors Gracefully</code>Implement proper error handling to manage database connection errors and query failures.</li>
    <li><code>Use ORM/ODM</code>Use Object-Relational Mapping (ORM) or Object Data Modeling (ODM) libraries like Sequelize for SQL databases or Mongoose for MongoDB to simplify database interactions.</li>
  </ul>
</div>

::alert{type="info"}
Integrating databases with your JavaScript applications allows you to manage and persist data effectively. Understanding the various types of databases and how to interact with them using JavaScript will enable you to build robust and scalable applications.
::


