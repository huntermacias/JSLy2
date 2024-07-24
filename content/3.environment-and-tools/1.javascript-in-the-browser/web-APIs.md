---
title: APIs
description: 'Web APIs are interfaces provided by the browser (or other environments like Node.js) that allow developers to interact with the system and perform various tasks. These APIs are built into the browser and can be accessed using JavaScript.'
---

## What is an API?
An API (Application Programming Interface) is a set of rules and protocols for building and interacting with software applications. It defines the methods and data structures that developers can use to interact with an application or service.

## Making Network Requests
### Fetch API
The Fetch API provides a modern and flexible way to make network requests. It is based on Promises and allows you to make asynchronous requests to servers.

```js [fetchapi-js] copy
// Making a GET request
fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Making a POST request
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'foo',
    body: 'bar',
    userId: 1
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

## Working with JSON
JSON (JavaScript Object Notation) is a lightweight data-interchange format. It is easy for humans to read and write and easy for machines to parse and generate.

### Parsing JSON
```js [parseJSON.js] copy
const jsonString = '{"name": "John", "age": 30, "city": "New York"}';
const jsonObject = JSON.parse(jsonString);
console.log(jsonObject.name); // John
```

### Stringify JSON
```js [stringifyJSON.js] copy
const jsonObject = { name: "John", age: 30, city: "New York" };
const jsonString = JSON.stringify(jsonObject);
console.log(jsonString); // {"name":"John","age":30,"city":"New York"}
```

## Handling Promises
Promises represent the eventual completion (or failure) of an asynchronous operation and its resulting value.

### Creating a Promise
```js [promise.js] copy
const myPromise = new Promise((resolve, reject) => {
  let success = true;
  if (success) {
    resolve("Promise resolved successfully!");
  } else {
    reject("Promise rejected.");
  }
});

myPromise
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

### Using Async/Await
```js [async-await.js] copy
async function fetchData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchData();
```

## Geolocation API
The Geolocation API allows the user to provide their location to web applications.

### Getting the Current Position

```js [geo-api.js] copy
navigator.geolocation.getCurrentPosition(
  position => {
    console.log('Latitude:', position.coords.latitude);
    console.log('Longitude:', position.coords.longitude);
  },
  error => {
    console.error('Error getting location:', error);
  }
);
```


## FAQs
<details>
  <summary><strong>Q: What is the difference between `fetch` and `XMLHttpRequest`?</strong></summary>
  <p><strong>A:</strong> The `fetch` API is a modern and more flexible way to make network requests compared to `XMLHttpRequest`. `fetch` uses Promises and provides a cleaner and more powerful syntax.</p>
</details>
<details>
  <summary><strong>Q: How can I handle network errors gracefully?</strong></summary>
  <p><strong>A:</strong> Always use `.catch()` with Promises or `try...catch` with `async/await` to handle network errors. Provide meaningful feedback to the user when an error occurs.</p>
</details>
<details>
  <summary><strong>Q: What is CORS, and how do I handle it?</strong></summary>
  <p><strong>A:</strong> CORS (Cross-Origin Resource Sharing) is a security feature implemented by browsers to prevent cross-origin requests. To handle CORS issues, ensure your server sends the correct CORS headers.</p>
</details>