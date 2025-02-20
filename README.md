# vue-ultimate-query

A Vue 3 API utility using Vue Query, VueUse, and Axios. Simplify API interactions in your Vue 3 applications with predefined API functions and hooks.

## Installation

Install the package via npm:

```bash
npm install vue-ultimate-query
```

## Usage
## Basic Example
```js
import { apiQuery } from "vue-ultimate-query";


const { data, error, isLoading, refetch } = apiQuery("products").useGet();
```


## Available Methods
The package provides hooks for common API actions (GET, POST, PUT, DELETE):

- GET: Fetch data from the server.
- POST: Create a new resource.
- PUT: Update an existing resource.
- DELETE: Remove a resource.

## Custom Hook Example
```js
const { data, error, isLoading } = apiQuery("products").useGet({ page: 1, limit: 10 });
```

## Mutation Hooks
For creating, updating, or deleting resources, the package provides the following hooks:

- useStore – For POST requests (creating new resources).
- useUpdate – For PUT requests (updating resources).
- useDelete – For DELETE requests (removing resources).

```js
const { mutate, isLoading } = apiQuery("products").useStore();

mutate({ name: 'New Product', price: 100 });
```

## Error Handling
The package uses vue-toastification for displaying success and error messages. You can customize how errors are displayed through the handleError function.

## Global Configuration
You can modify the global configuration and set default values as needed.

```js
axios.defaults.headers.post['Content-Type'] = 'application/json';
```

## License
This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License - see the [LICENSE](https://choosealicense.com/licenses/mit/) file for details.

