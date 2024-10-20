const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const apiRouter = require('./src/routes/route');
const passport = require('passport');
const passportJwtStrategy = require('./src/configs/strategy/passport-jwt-strategy');
const session = require('express-session');

app.use(session({
    secret: 'session-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 24 * 60 * 60 * 1000
    }
}));
app.use(express.json());
app.use(passport.initialize());
// Configure Passport JWT strategy
passportJwtStrategy(passport);
app.use(apiRouter);
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});