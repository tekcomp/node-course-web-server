//https://www.npmjs.com/package/hbs
//E:\node_projects\al_projects\node-web-server>npm install hbs@4.0.1 -save


const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/Views/partials')
app.set('view engine','hbs');



//app.use(); //register middleware function
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err){
            console.log('Unable to append to server log.')
        }
    })
   
    //next is used when middleware is done
    next();
});

// app.use((req, res, next) => {
//     res.render('Maintenance.hbs', {
//         pageTitle: 'We Will be right back',
//         MaintenanceMessage: 'Welcome our site is in Maintenenace Mode, please return at later time'
//     });
// });

app.use(express.static(__dirname + '/public')); //middleware function

//register Handlebars Helpers used a function call
hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear();
});

//register Handlebars Helpers used a function call w/parameters
hbs.registerHelper('ScreamIt',(text) => {
    return text.toUpperCase();
})

app.get('/', ( req, res) => {
    // resp.send('<h1>Hello Express!</h1>');
    // res.send( {
    //     name: 'Alberto',
    //     likes: [
    //         'Windsurfing',
    //         'LandBoarding',
    //         'Traveling'
    //     ]
    // });
    res.render('home.hbs', {
        pageTitle: 'This is the Home Page',
        welcomMessage: 'Welcome to the Home Page from hbs function'
    });
});

// app.get('/home', (req, res) =>{
//     res.render('home.hbs', {
//         pageTitle: 'Home Page',
//         CurrentYear: new Date().getFullYear()
//     });
// });

app.get('/about', (req, res) =>{
    res.render('about.hbs', {
        pageTitle: 'This is the About Page',
        AboutMessage: 'Welcome to the About Page for user review'
    });
});

app.get('/Maintenance', (req, res) =>{
    res.render('Maintenance.hbs', {
        pageTitle: 'Site is under Maintenance',
        AboutMessage: 'Welcome our site is in Maintenenace Mode, please return at later time'
    });
});

app.get('/bad', (req, res) =>{
    res.send({
        errorMessage: 'Error Handling request!'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});