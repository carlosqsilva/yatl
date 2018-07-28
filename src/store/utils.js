const url = "_~0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

export const id = (size = 10) => {
  const bytes = crypto.getRandomValues(new Uint8Array(size))
  let id = ""

  while (0 < size--) {
    id += url[bytes[size] & 63]
  }

  return id
}

export const splitArray = (array, property = "category") => {
  let tasks = {}
  array.forEach(obj => {
    const key = obj[property]
    if (key in tasks) {
      tasks[key].push(obj)
    } else {
      tasks[key] = [obj]
    }
  })
  return tasks
}
