const express = require('express');
const app = express();
const jwt = require('express-jwt');
const rsaValidation = require('auth0-api-jwt-rsa-validation');


const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://doncurt.auth0.com/.well-known/jwks.json"
    }),
    audience: 'hamsterwheel back end',
    issuer: "https://doncurt.auth0.com/",
    algorithms: ['RS256']
});

// Enable  jwtCheck middleware in all  routes
app.use(jwtCheck);

// errormessage
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({message:'Missing or invalid token'});
  }
});
