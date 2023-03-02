
const express = require('express');
const healthcheck = require('express-healthcheck');
const bodyParser = require('body-parser');
const cors = require('cors');
const app  = express();

app.use(bodyParser.json());
app.use(cors());
const port = 4000;

const tool = require('./tool');

const sql = require('./query');

app.use("/healthcheck", healthcheck({test: ()=>"OK"}));

app.get('/', (req, res)=>{
    res.send('Hello, world');
}) 

app.post('/users', (req, res)=>{
    console.log('req.body: ', req.body);
    console.log('req.query: ', req.query);
    const {name, email, password} = req.body;
    
    let checkRequest = tool.checkData(name, email, password);

    if(req.headers['content-type']!=='application/json'){
        res.status(400);
        res.send('Content-type not matched');
        return;
    }
    if(!req.headers['request-date']){
        res.status(400);
        res.send('Request-Date missing');
        return;
    }

    if(!checkRequest){
        res.status(400);
        res.send('client error');
        return;
    }
    sql.userSignUp(name, email, password, req.headers["request-date"])
        .then((result)=>{
            switch(result){
                case "DUPLICATE_USER_ERROR":
                    res.status(403);
                    res.send("Email Already Exists");
                    break;
                default:
                    res.status(200);
                    res.json(result);
                    break;
            }
        })
});

app.get('/users', (req, res)=>{
    const { id } = req.query;
    if(req.headers['content-type']!=='application/json'){
        res.status(400);
        res.send('Content-Type not matched');
        return;
    }
    if(!req.headers['request-date']){
        res.status(400);
        res.send('Request-Date missing');
        return;
    }
    sql.getUser(id, req.headers["request-date"])
        .then((result)=>{
            switch(result){
                case "USER_NOT_EXISTING":
                    res.status(403);
                    res.send("User Not Existing");
                    break;
                default:
                    res.status(200);
                    res.json(result);
                    break;
            }
            return;
        })
});


app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`);
});

