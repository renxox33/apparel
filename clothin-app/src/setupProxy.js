const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app){
    app.use('/register', 
            createProxyMiddleware({
                target: 'http://localhost:5000',
                changeOrigin: true
            })
    )

    app.use('/sign-in-with-email', 
            createProxyMiddleware({
                target: 'http://localhost:5000',
                changeOrigin: true
            })
    )

    app.use('/sign-in-with-email-success',
            createProxyMiddleware({
                target: 'http://localhost:5000',
                changeOrigin: true
            })
    )

    app.use('/sign-in-with-email-failed', 
            createProxyMiddleware({
                target: 'http://localhost:5000',
                changeOrigin: true
            })
    )

    app.use('/sign-in-with-google-failed', 
            createProxyMiddleware({
                target: 'http://localhost:5000',
                changeOrigin: true
            })
    )
}   