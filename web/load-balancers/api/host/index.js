const express = require("express");
const app = express();

// ** SETUP API AUTHENTICATION **//
// require('./middlewares/authentication')(app);

// ** SETUP API GATEWAY **//
require('./routes/apiGatewayRoutes')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
