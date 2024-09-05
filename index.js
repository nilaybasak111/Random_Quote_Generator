const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();

const bodyparser = require("body-parser");
app.use(bodyparser.json()); 

const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters')

// Initiateing Database Connection
const connectdb = require("./Database/dbconnect")
connectdb();

// Importing the Routes
const adminroute = require('./route/adminroute')

// Importing the Models
const Quotes = require('./models/quotesmodel')
const BotData = require('./models/bot_datamodel')

// Using the Routes
app.use("/admin", adminroute);

const PORT = process.env.PORT ;
app.listen(PORT, ()=>{
    console.log(`Server is on Port ${PORT}`);
});


const bot = new Telegraf(process.env.BOT_TOKEN);
console.log(process.env.BOT_TOKEN)

// Define your commands and their descriptions
const commands = [
    { command: '/start', description: 'Start the bot' },
    { command: '/help', description: 'Get a list of available commands' },
    { command: '/info', description: 'Get information about the bot' },
    { command: '/EnergyBooster', description: `Get Today's Special Motivation Quote` }
];

// Start the Bot
bot.start((ctx) => {
    ctx.reply('Welcome to Our Daily Motivation Journey 💪❤️ \n For More Details Use /help');
})

// This Function handle /help command
bot.command('help', (ctx) => {
    let message = 'Here are the available commands:\n\n';

    commands.forEach((cmd) =>{
        message += `${cmd.command} - ${cmd.description}\n`; 
    });

    ctx.reply(message);
})

// This Function handle /info command
bot.command('info', (ctx) => {
    ctx.reply('Get the Daily Dose of Motivation \nStay With Us & Enjoy Your Life 🔥');
})

// This Function handle /EnergyBooster command
bot.command('EnergyBooster', async (ctx) => {
    try{
        // Perform the aggregation query to get a random document
        const result = await Quotes.aggregate([{ $sample: {size:1}}]);
        //console.log('This is Result', result[0].quotes)
        
        
        ctx.reply(result[0].quotes);
        console.log("this is ctx", ctx);

        // After Sending ctx, Sending data to the BotData Database
        const botData = new BotData({
            username : ctx.update.message.from.username,
            chat : ctx.update.message.text,
            chat_time : Date.now(),
            given_quote : result[0].quotes
        })

        // Save the New Quote Data to the Database
        const response = await botData.save();
        console.log("This is the Data that Store in the Database \n", response);

    } catch(error){
        console.log("This is Error", error);
        ctx.reply('Server Error')
    }
})

// When Someone Sends Stickers then Bot reply 👍
bot.on(message('sticker'), (ctx) => ctx.reply('👍'))

// Here We Launching the Bot
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

// token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5pbGJhc3UwMDciLCJwYXNzd29yZCI6IjEyMzQ1Njc4OSIsImlhdCI6MTcyNTE2MTUwMH0.oNv40o20uS-OGx2ACJ0mb1dj5q3XjjRAfQl-z47lF1g