# SYNOPSIS
A localStorage helper. Serialize and deserialize JSON, add namspaces, check for
keys not found.

# INSTALL

```bash
npm install voltraco/localstorage
```

# USAGE

```js
const LocalStorage = require('localstorage')
const user = LocalStorage('user') // create the `user` namespace

user.put('quxx', { foo: 100 })

user.get('quxx') // [null, { foo: 100 }]
user.get('foo') // [ErrorNotFOund]

user.has('quxx') // [null, true]
user.has('foo') // [ErrorNotFound]

user.delete('quxx') // [null, true]
user.delete('foo') // [ErrorNotFound]

user.delete() // delete everything in the `user` namespace
```
