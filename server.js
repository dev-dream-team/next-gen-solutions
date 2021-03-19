const path = require("path");
const express = require("express");
const sequelize = require("./config/connection");

// const exphbs = require("express-handlebars");
// const session = require("express-session");
// const helpers = require("./utils/helpers");
// const routes = require("./controllers");
// const hbs = exphbs.create({ helpers });
// const SequelStore = require("connect-session-sequelize")(session.Store);


// const sess = {
//   secret: "Super secret secret",
//   resave: true,
//   saveUnitialized: true,
//   // https://stackoverflow.com/questions/46630368/how-to-extend-express-session-timeout
//   rolling: true, // <-- Set `rolling` to `true`
//   store: new SequelStore({
//     db: sequelize,
//   }),
//   cookie: {
//     maxAge: 60*1000, // 60 sec
//   },
// };

const app = express();
const PORT = process.env.PORT || 3001;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(session(sess));
app.use(express.static(path.join(__dirname, "public")));
// Turn on routes
// app.use(routes);

// Set handlebars as a template engine
// app.engine("handlebars", hbs.engine);
// app.set("view engine", "handlebars");

// Turn on connection to db.
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening to port " + PORT));
});
