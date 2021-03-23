const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const helpers = require("./utils/helpers");

const routes = require("./controllers");
const sequelize = require("./config/connection");

const hbs = exphbs.create({ helpers });
const SequelStore = require("connect-session-sequelize")(session.Store);

// https://stackoverflow.com/questions/46630368/how-to-extend-express-session-timeout
// setting maxAge and rolling:true ensures user's session invalidates after given period of inactivity (no response sent to the server)
const sess = {
  secret: "Super secret secret",
  resave: true,
  saveUninitialized: true,
  // https://stackoverflow.com/questions/46630368/how-to-extend-express-session-timeout
  rolling: true, // <-- Set `rolling` to `true`
  store: new SequelStore({
    db: sequelize,
  }),
  cookie: {
    maxAge: 60 * 1000, // 60 sec
  },
};

const app = express();
const PORT = process.env.PORT || 3008;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sess));

// app.get('/', (req,res) => {
//   res.render('index');
// })

// app.get('/signup', (req,res) => {
//   res.render('signup');
// })

// app.get('/questionnare', (req,res) => {
//   res.render('questionnare');
// })

// app.get('/bio', (req,res) => {
//   res.render('bio');
// })

// The express.static() method is a built-in Express.js middleware function
// that can take all of the contents of a folder and serve them as static assets.
// This is useful for front-end specific files like images, style sheets, and JavaScript files.
app.use(express.static(path.join(__dirname, "public")));

// turn on routes
app.use(routes);

// set up Handlebars.js as your app's template engine of choice
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Turn on connction to db and db server.
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening to port " + PORT));
});
