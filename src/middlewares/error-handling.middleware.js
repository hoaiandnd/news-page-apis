const { nodeEnv } = require('../utils/env.util')

module.exports = (err, _req, res, _next) => {
  const env = nodeEnv
  res.status(500)
  if (env === 'production') {
    res.json({ message: 'Something went wrong!' })
  } else {
    res.json({ message: err.message })
  }
}
