const mongoose = require('mongoose')
// connect to database
mongoose.connect('mongodb://localhost:27017/express-auth',{
    useCreateIndex:true,
    useNewUrlParser:true
})

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true 
    },
    password:{
        type:String,
        set(val){
            // use bcryptjs to encode pw，1st is value ,2nd is strengthg of pw
            return require('bcryptjs').hashSync(val,10)
        }
    }
})


const User = mongoose.model('User',UserSchema)
// 全部删除
// User.db.dropCollection('users')
module.exports = {User}