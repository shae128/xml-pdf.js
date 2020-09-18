const path = require('path');
const fs = require('fs');
const express = require('express');
const pg = require('./pdf_generator_http');

// express app
const app = express();

// listen for requests
app.listen(3000);

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


// *****************************
// *********Reading files*******
// *****************************

let filesName = [];
//joining path of directory 
const directoryPath = path.join(__dirname, 'public/CodicePelavicino');
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
      //push files name to it's array
      filesName.push(file)
    });
});

// *****************************


//app.use((req, res, next) => {
//  console.log('new request made:');
//  console.log('host: ', req.hostname);
//  console.log('path: ', req.path);
//  console.log('method: ', req.method);
//  next();
//});

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get('/', (req, res) => {
  res.render('index', { title: 'Home', filesName: filesName });
});

app.post('/', (req, res) => {
  if (req.body.filesName == '')
    res.redirect('/');
  else
    pg.init(req, res);

});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

