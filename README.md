# SYNOPSIS
Serialize and deserialize and namespace JSON in localstorage.

# INSTALL

```bash
npm install localstorage
```

# USAGE

```js
const LocalStorage = require('localstorage')
```

```js
const foo = new LocalStorage('foo') // create a `foo` namespace
foo.put('quxx', { foo: 100 })
```

```js
const [err, value] = foo.get('quxx')
value.foo === 100 // true
```

```js
foo.get('quxx') // [null, { foo: 100 }]
foo.get('foo') // [ErrorNotFOund]

foo.has('quxx') // [null, true]
foo.has('foo') // [ErrorNotFound]

foo.delete('quxx') // [null, true]
foo.delete('foo') // [ErrorNotFound]

foo.delete() // delete everything in the `foo` namespace
```
