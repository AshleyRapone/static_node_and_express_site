// Require libraries
const express = require('express');
const data = require('./data.json');

// Instantiate Express app 
const app = express();
app.set('view engine', 'pug');
app.use('/static', express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.locals.projects = data.projects;
    res.render('index');
})

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/project/:id', (req, res) => {
    res.locals.project = data.projects[req.params.id];
    res.render('project');
})

// 404 Error handler
app.use((req, res, next) => {
    const err = new Error();
    err.status = 404
    err.message = "Oops!  It looks like the page you're looking for does not exist."
    console.log(err.status)
    console.log(err.message)
    res.render('page-not-found', {err});
  })

// Global error handler
app.use((err, req, res, next) => {
    err.status = 500
    err.message = "Oops!  It looks like something went wrong on the server."
    console.log(err.status);
    console.log(err.message)
    res.render('error', {err});
}) 

// Listener
app.listen(3000);
console.log('The app is listening on port 3000')