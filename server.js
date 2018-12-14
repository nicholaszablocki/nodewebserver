//node is a run time environment that allows us to execute
//javascript outside of a browser. express os a framework that
//allows us to create web applications and APIs. its allows us
//use javascript for back end tasks. express is basically a
//framework that allows us to create a server using javascript
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next)=>{
  var now = new Date().toString();
  const log = `${now} ${req.method} ${req.url}`
  console.log(log);
  fs.appendFIle('server.log', log + '\n', (err)=>{
    if(err){
      console.log('Unable to append to server.log')
    }
  });
  next();
});

// app.use((req, res, next)=>{
//   res.render('mainenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear()
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});


app.get('/', (req, res)=>{
  res.render('home.hbs', {
    pageTitle: 'About Page',
    greeting:'Hello. This is a template injection.'
  });
});

app.get('/about', (req, res)=>{
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res)=>{
  res.send({
    error: 'Request Cannot Be Completed'
  })
});
//we define what happens when our web app is pinged, the / means
//this is what happens when you ping the 'base' page, server.js
//and the result is sending some HTML
app.listen(3000, ()=>{
  console.log('Server is up on port 3000')
});
//here we bind our app to port 3000
//so we can actually visit it
