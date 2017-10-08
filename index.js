class LocalStorage {
  constructor (namespace) {
    this._namespace = namespace
    this._store = window.localStorage
    this._sep = '\x00'
  }

  static clear () {
    window.localStorage.clear()
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
    if (typeof value === 'undefined') {
      return [new Error(`Invalid parameters to put, ('${key}', undefined)`)]
    }

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

  del (key) {
    if (key) {
      const k = [this._namespace, key].join(this._sep)
      if (!this._store[k]) return [this._notFound(k)]

      delete this._store[k]
      return [null]
    }

    Object.keys(window.localStorage).forEach(k => {
      const ns = k.split(this._sep)[0]
      if (ns === this._namespace) {
        delete this._store[k]
      }
    })
  }

  search (pattern) {
    if (!pattern) {
      throw new Error('A pattern is required')
    }

    const matchKeys = key => {
      const [, _key] = key.split(this._sep)

      if (!_key) return
      if (!pattern.test(_key)) return

      return key
    }

    const makePairs = key => ({
      key: key.split(this._sep)[1],
      value: this._store[key]
    })

    return [null, Object
      .keys(this._store)
      .filter(matchKeys)
      .map(makePairs)]
  }
}

module.exports = LocalStorage
