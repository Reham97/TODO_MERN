var path = require('path');
var morgan = require('morgan');
var express = require('express');
var mongoose = require('mongoose');
const MONGODB_URI = require( './data.js');
const routes = require('./routes/api.js');
// const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;
mongoose.connect(process.env.MONGODB_URI || MONGODB_URI || 'mongodb://localhost/mernTodo277' ,{
// mongoose.connect(process.env.MONGODB_URI  || 'mongodb://localhost/mernTodo277' ,{
        //options
    useNewUrlParser:true,
    useUnifiedTopology: true
});

mongoose.connection.once('connected',()=>{
    console.log("Connected to DB");
})

// mechanism that uses additional HTTP headers to tell browsers to give a web application running at one origin,
// app.use(cors());

//parse every thing json come in to obj
app.use(express.json());
// true if extended obj but the comming is simple
app.use(express.urlencoded({extended: false}));

//HTTP Req logger
app.use(morgan('tiny'));
app.use('/api',routes);

if(process.env.NODE_ENV === 'production')
{
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'client','build','index.html'));
    })
}
app.listen(PORT,console.log(`Server Running on ${PORT}`));