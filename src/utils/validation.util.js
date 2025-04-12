/**
 * @param {string} str
 */
const isNumber = str => {
  const numberRegEx = /^\d+$/
  return numberRegEx.test(str)
}

module.exports = { isNumber }
