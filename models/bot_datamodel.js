const mongoose = require('mongoose');

const bot_dataSchema = new mongoose.Schema({
    username : {
        type : String
    }, 

    chat : {
        type : String
    },

    chat_time : {
        type : Date,
        default : Date.now()
    },

    given_quote : {
        type : String
    }
})


const BotData = mongoose.model('BotData', bot_dataSchema);
module.exports = BotData;