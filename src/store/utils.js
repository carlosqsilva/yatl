const url = "_~0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

export const id = (size = 10) => {
  const bytes = crypto.getRandomValues(new Uint8Array(size))
  let id = ""

  while (0 < size--) {
    id += url[bytes[size] & 63]
  }

  return id
}

/**
 * @param {array} array of objects
 * @param {string} property to count
 * @param {object} Object to be used as accumulator
 * @returns Object
 */
export const count = (array, property, accumulator = {}) => {
  return array.reduce((acc, value) => {
    let prop = value[property]
    if (prop in acc) {
      acc[prop]++
    } else {
      acc[prop] = 1
    }
    return acc
  }, accumulator)
}

export const remove = (obj, category, options) => {
  const prop = obj[category]
  if (prop in options) {
    options[prop]--
  }
  return options
}

export const add = (category, options) => {
  if (category in options) {
    options[category]++
  }
  return options
}
