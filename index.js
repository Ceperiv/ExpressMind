const express = require('express');
const {mongoose} = require('mongoose');
const app = express();
require('dotenv').config();

const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const account = require('./routes/account.router');
const {PORT, MONGO_URL} = require("./config/config");
const {mainErrorHandler} = require('./errors')
const {accountRouter, postsRouter, userRouter, roleRouter} = require('./routes')



app.use(express.json())
app.use(express.urlencoded({extended: true}))




// require('./configs/passport')(passport);
// app.use(cors());
// app.use(bodyParser.json());
// app.use(passport.initialize());
// app.use(passport.session());
// mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connection.on('connected', () => {
//     console.log("Successful connection to the database")
// });
// mongoose.connection.on('error', (err) => {
//     console.log("Not successful connection to the database" + err)
// });
app.get('/', (req, res) => {
    res.json('hello:)')
})


app.use('/auth', accountRouter);
app.use('/role', roleRouter);
app.use('/posts', postsRouter);
app.use('/users', userRouter);
app.use('*', (req, res, next) => {
    next(new Error('Route not found'))
})
app.use(mainErrorHandler)

app.listen(PORT, () => {
    console.log("Done... running on the port:" + PORT)
    mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    mongoose.connection.on("connected", () => {
        console.log("Connected to database");
    });
    mongoose.connection.on("error", (err) => {
        console.log("Database error:" + err);
    });
});
