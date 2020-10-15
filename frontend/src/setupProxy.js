const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = app => {
  app.use(
    '/api',
    createProxyMiddleware({
      logLevel: 'silent',
      target: process.env.DEV_PROXY,
      pathRewrite: {
        '^/api': '',
      },
    }),
  )
}
