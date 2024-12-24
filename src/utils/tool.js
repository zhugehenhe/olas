export function validateEmail (email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export function isValidNumber (num) {
  return /^(?:[1-9]\d?\.\d|0\.\d|1\.\d|2\.0)$/.test(num.toString())
}
export function isPositiveInteger (num) {
  return /^[1-9]\d*$/.test(num)
}