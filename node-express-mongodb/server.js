const {User} = require('./models')
const express = require('express');
const jwt = require('jsonwebtoken')
const app = express();
const bodyParser = require('body-parser');//used for req.body to get value

const SECRET = 'ewgfvwergvwsgw5454gsrgvsvsd'
const safeList = ['http://127.0.0.1:5500'];

// check connect
app.use(bodyParser.json());
// create application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    let origin = req.headers.origin || req.headers.referer || "";

    console.log(origin);

    origin = origin.replace(/\/$/g, '');
    origin = !safeList.includes(origin) ? '' : origin;
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Methods", 'GET,POST,DELETE,HEAD,OPTIONS,PATCH,PUT');
    res.header("Access-Control-Allow-Headers", 'DNT,authorzation,web-token,app-token,Authorization,Accept,Origin,Keep-Alive,User-Agent,X-Mx-ReqToken,X-Data-Type,X-Auth-Token,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,x-token');
    res.header("Access-Control-Allow-Credentials", true);
    req.method === 'OPTIONS' ? res.send() : next();
});

app.get('/api/test',async(req,res) =>{
    res.send('ok')
})


app.get('/api/user',async(req,res) =>{
    //see all users
    const users = await User.find()
    res.send(users)
})

app.post('/api/register',async(req,res) =>{
    const user = await User.create({
        username:req.body.username,
        password:req.body.password
    })
    res.send(user)
})


app.post('/api/login',async(req,res) =>{
    const user = await User.findOne({
        username:req.body.username
    })
    if(!user) {
        return res.status(422).send({
            message:"User does not exist"
        })
    }

    const isPasswordValid = require('bcryptjs').compareSync(
        req.body.password,
        user.password
    )
    if(!isPasswordValid){
        return res.status(422).send({
            message:"The password is invalid"
        })
    }
    

    const token = jwt.sign({
        id:String(user._id)
    },SECRET)

    
    res.send({
        user,
        token
    })
})


const auth = async(req,res) =>{
    const raw = String(req.headers.authorization).split(' ').pop();
    // verification
    const {id} = jwt.verify(raw,SECRET)
    req.user = await User.findById(id)
}

app.get('/api/profile',auth,async(req,res) =>{
    res.send(req.user)
})


app.listen(3001,() =>{
    console.log('http://localhost:3001')
})