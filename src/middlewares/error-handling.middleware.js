const { nodeEnv } = require('../utils/env.util')

module.exports = (err, _req, res, _next) => {
  console.log('\n\nError occured!!', err)
  const env = nodeEnv
  res
    .status(500)
    .json(
      env === 'production'
        ? { message: 'Something went wrong!' }
        : { message: err.message }
    )
}
