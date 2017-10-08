class LocalStorage {
  constructor (namespace) {
    this._namespace = namespace
    this._store = window.localStorage
    this._sep = '\x00'
  }

  _notFound (k) {
    const err = new Error(`Not Found [${k}]`)
    err.notFound = true
    err.key = k
    return err
  }

  get (key) {
    const k = [this._namespace, key].join(this._sep)
    if (!this._store[k]) return [this._notFound(k)]

    try {
      return [null, JSON.parse(this._store[k])]
    } catch (err) {
      return [err]
    }
  }

  put (key, value) {
    try {
      const k = [this._namespace, key].join(this._sep)
      const v = JSON.stringify(value)
      const result = this._store[k] = v
      return [null, result]
    } catch (err) {
      return [err]
    }
  }

  has (key) {
    const k = [this._namespace, key].join(this._sep)
    if (!this._store[k]) return [this._notFound(k)]
    return [null, true]
  }

  delete (key) {
    if (key) {
      const k = [this._namespace, key].join(this._sep)
      if (!this._store[k]) return [this._notFound(k)]

      delete this._store[k]
      return [null]
    }

    Object.keys(window.localStorage).forEach(k => {
      const prefix = k.split(this._sep)[0]
      if (prefix === this._namespace) {
        delete this._store[k]
      }
    })
  }

  search (str) {
    return Object.keys(this._store).map(k => {
      const prefix = k.split(this._sep)[0]
      if (prefix && k.includes(str)) return [k, this._store[k]]
    })
  }
}

module.exports = LocalStorage
