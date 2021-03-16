const express = require('express');
const ExpressError = require('./ExpressError')
const routes = require('./router')

const app = express();

app.use(express.json());
app.use('/items', routes);

// 404 handler 
app.use((req, res, next) => {
    throw new ExpressError ("Page not foud", 404)
})

// Generic error handler 
app.use((err, req, res, next) => {
    // user default status code 500
    let status = err.status || 500
    return res.status(status).json({
        error: {
            message: err.message,
            status: status
        }
    })
})
module.exports = app;
