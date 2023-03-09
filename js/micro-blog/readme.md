== Summary ==
- Webpack is used for downgrading updated code like ES6 to ES5, so the code works properly in all browsers

Define & call module using Common JS way:
```
module1.js
module.exports = {
    name: 'Alberuni',
    email: 'azad.bbc@gmail.com'
}

const person = require('./module1'); // Call in another file
//const person = require('express'); // This is how we can call module from NPM
```

Define module using ES2015 way:
```
module2.js
export const person = {
    name: 'Alberuni',
    email: 'azad.bbc@gmail.com'
}

export const person2 = {
    name: 'Zenaul',
    email: 'zenaul@gmail.com'
}

export function sayHello(){
    return `Hello ${person2.name}`;
}

// Call in another file
// Importing multiple modules
// import { person, person2, sayHello } from './module2';
// console.log(sayHello()); // need () for the function calling

// Import all modules of a file
import * as myallmodule from './module2'; // All modules are exported into the myallmodule alias/variable
console.log(myallmodule.person.name);
console.log(myallmodule.sayHello());

```

- In one file we can export default only one module
- json-server package used to create fake REST API