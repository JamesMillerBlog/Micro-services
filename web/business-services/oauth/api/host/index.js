const express = require("express");
const app = express();

//** SETUP REDIS SESSION STORE **//
require('./services/session')(app);

//** SETUP MIDDLEWARES **//
require('./middlewares/passportSetup')(app);

// ** DECLARE PASSPORT FUNCTIONS **//
require('./services/passport');

// ** SETUP API **//
require('./routes/oauthRoutes')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
