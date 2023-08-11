
//import dependencies
require('dotenv').config();
const cookieParser = require('cookie-parser');
const es6Renderer = require('express-es6-template-engine');
const express = require('express');
const sessions = require('express-session');

//import modules bring in named module export 
const {checkAuth} = require('./middleware');
const {setMainView, setNavs} = require('./utils'); // call it 

const navs = require('./data/navs.json')

//import
const server = express();
const  PORT  = process.env.PORT || 8080;

// setting up - we dont touch this all the time 
server.engine('html', es6Renderer);// rendering files 
server.set('views', 'views'); //config we are telling the computer where to look
server.set('view engine', 'html');

//middleware
server.use(express.static(__dirname + '/public')); // .use is key word that will be used for middleware for every single file
server.use(express.json());
server.use(cookieParser());
server.use(sessions ({ //settings for sessions
    secret: process.env.SECRET,
    saveUninitialized: true,
    cookie: {maxAge: 30000}, //forcing into expiry after 30 secs locked out
    resave:false
}))



// const { Pool } = require("pg");

// // Initialize Express app
const app = express();

// // Configure the database connection
// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "users",
//   password: "test",
//   port: 5432, // Default PostgreSQL port is 5432
// });

// // Test the database connection
// pool.query("SELECT NOW()", (err, res) => {
//   if (err) {
//     console.error("Error connecting to PostgreSQL database:", err);
//   } else {
//     console.log("Connected to PostgreSQL database at:", res.rows[0].now);
//   }
// });



// Start the server
const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


server.get('/', (req,res) =>{
    res.render('index', {
        locals: setNavs (req.url,navs, !!req.session.userId), // req.url is current Href
        partials: setMainView('login')
    }); 
});

server.get("/landing", (req, res) => {
    res.render("index", {
      locals: setNavs(req.url, navs, !!req.session.userId),
  
      partials: setMainView("landing"),
    });
  });



server.get('/about', (req,res) =>{
    res.render('index', {
        locals: setNavs (req.url,navs, !!req.session.userId), // req.url is current Href
        partials: setMainView('about')
    }); 
});



// server.get('/booking', (req,res) =>{
//     res.render('index', {
//         locals: setNavs (req.url,navs, !!req.session.userId), // req.url is current Href
//         bookingId: req.query.id,
//         partials: setMainView('booking')
//     }); 
// });

server.get('/booking', (req,res) =>{
    console.log(req.query.id);
    res.render('index', {
        locals: setNavs (req.url,navs, !!req.session.userId), // req.url is current Href
        //bookingId: req.query.id,
        partials: setMainView('booking')
    }); 
});

server.get('/heartbeat', (req, res) => {
    res.json({
        "is":"working",
        "status": "good"
    })
});

server.get('/login', (req,res) =>{
    res.render('index', {
        locals: setNavs (req.url,navs, !!req.session.userId), // req.url is current Href
        partials: setMainView('login'),
});
});
server.post('/login', (req,res) =>{  // server(post) is receiving what client puts in 
    const afterLogin ={
        isAuthenticated:false,
        redirectTo: '/login'
    };
    const {password, username} = req.body;
    console.log(username,password)
    if (password === validCreds.password && username === validCreds.username) {
        req.session.userId=username;
        afterLogin.isAuthenticated = true;
        afterLogin.redirectTo='/profile';
    } 
    res.json(afterLogin); // send response 
});

server.get('/register', (req,res) =>{
    res.render('index', {
        locals: setNavs (req.url,navs, !!req.session.userId), // req.url is current Href
        partials: setMainView('register'),
});
});

server.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    console.log('first name', firstName)
    // Create new user in the database
    
// db many
    res.send({
      message: `User with id ${newUser.id} has been created`
    });
  });
  
  
server.get('/logout', (req,res) =>{
   req.session.destroy();
   res.redirect('/');
});


server.get('/profile', checkAuth, (req,res) =>{
    res.render('index', {
        locals: setNavs (req.url, navs, !!req.session.userId), // req.url is current Href
        partials: setMainView('profile')
    }); 
});




server.get('/payment',  (req,res) =>{
    console.log("hello payment")
    res.render('index', {
        locals: setNavs (req.url,navs, !!req.session.userId), // req.url is current Href
        partials: setMainView('payment') // this line contact-us is the name of the file that is in the views directory
    }); 
});





server.listen(PORT, () => console.log(`The server is running at PORT ${PORT}.`))