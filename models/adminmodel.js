const mongoose = require('mongoose');

const adminschema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    }, 

    username : {
        type : String,
        require : true,
        unique : true
    },

    password : {
        type : String,
        require : true
    },

    role : {
        type : String,
        require : true,
        enum : ['admin', 'user'],
        default : 'user'
    }
})

const Admin = mongoose.model('Admin', adminschema);
module.exports = Admin;