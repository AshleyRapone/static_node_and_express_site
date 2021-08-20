const express = require('express');
const data = require('./data.json');
const path = require('path');

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
    res.locals.projects = data.projects;
    res.render('project');
})

app.use((req, res, next) => {
    const err = new Error();
    err.status = 404
    err.message = "Route not found. Please enter in correct route"
    console.log(err.status)
    console.log(err.message)
  })

app.use((err, req, res, next) => {
    err.status = 500
    err.message = "Global error handler called"
    console.log(err.status);
    console.log(err.message)
}) 

app.listen(3000);
console.log('The app is listening on port 3000')