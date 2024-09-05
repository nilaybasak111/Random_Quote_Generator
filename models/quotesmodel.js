const mongoose = require('mongoose');

const quotesSchema = new mongoose.Schema({
    quotes : {
        type : String,
        required : true,
        unique : true
    }, 

    posted_by : {
        type : String,
        required : 'true'
    },
   
    posted_at : {
        type : Date,
        default : Date.now()
    },

    last_edited_by : {
        type : String,
        require : true,
        default : "Admin"
    },

    last_edited_at: {
        type : Date,
        default : Date.now()
    }

})

const Quotes = mongoose.model('Quotes', quotesSchema);
module.exports = Quotes;