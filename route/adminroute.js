const express = require('express');
const router = express.Router();

// Exporting JWT Middleware
const { jwtmiddleware, generatetoken, checkAdmin } = require('../middlewares/jwt_middlewares');

// Importing the Models
const Admin = require('../models/adminmodel');
const Quotes = require('../models/quotesmodel');

// Here We are creating SignUp Endpoint for an Admin
router.get("/signup", async(req, res)=> {
    try{
        // We are sending Admin Data into the Body
        const data = req.body;

        // Here We are checking, Is User an Adminuser or not
        if(data.role === 'user'){
            return res.status(400).json({ error : "User isn't Allowed"})
        }

        // Check that the Username is already exists or not
        const checkUsername = await Admin.findOne({ username: data.username });
        if(checkUsername){
            return res.status(400).json({ error : "Username is already taken, Please choose another Username"})
        }

        // Create a new User document using the Mongoose model
        const newAdmin = new Admin(data);

        // Save the New User to the Database
        const saveAdmin = await newAdmin.save();
        //console.log(saveAdmin)
        console.log("New Admin Created Successfully")

        const tokenPayload = {
            username : saveAdmin.username,
            password : saveAdmin.password,
        }
        //console.log("this is token", tokenPayload)

        const token = generatetoken(tokenPayload);
        res.status(200).json({ response : tokenPayload, msg : token})

    } catch(error){
        console.log(error)
        res.send({ msg : "Internal Server Error" })
    }
    
})


// He We are Creating Login Endpoint for an Admin
router.get("/login", async(req, res)=> {
    try{
        // Extracting the Username and Password form the Body
        const { username, password } = req.body;

        if(!username || !password ){
            return res.status(400).json({ error : "Username and Password is Require"})
        }

        const findAdmin = await Admin.findOne({ username: req.body.username });
        if(!findAdmin || findAdmin.password !== password ){
            return res.status(400).json({ error: "Please, Enter the Correct Password" });
        }

        const tokenPayload = {
            username : findAdmin.username,
            password : findAdmin.password
        }

        const token = generatetoken(tokenPayload);
        res.status(200).json({ response : tokenPayload, msg : token});


    } catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


// Here Admin can see all Existing Quotes from the Database
router.get("/quotes", jwtmiddleware, async(req,res)=>{
    try{
        if(!( await checkAdmin(req.admin.username))){
            return res.status(403).json({message: 'User does not have admin role'});
        }
        
        // Find All Existing Quotes without their Posted_By, Posted_At, Last_Edited Details
        const allQuotes = await Quotes.find({}, 'quotes');
        //const allQuotes = await Quotes.find({}, 'quotes -_id'); // If you don't want id in Your Response, then Use This Line

        // Return the List of All Quotes
        res.status(200).json(allQuotes);

        
    } catch(error){
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

})


// Here Admin can Post / Enter Quotes into the Database
router.post("/quotes", jwtmiddleware, async(req,res)=>{
    try{
        if(!( await checkAdmin(req.admin.username))){
            return res.status(403).json({message: 'User does not have admin role'});
        }

        // We are sending Admin Data into the Body
        const data = req.body;
        //console.log("This is data", data);

        // Fetching Username & Password form req.admin(JWT Middleware)
        const Username = req.admin.username;

        // Create a new Quote document using the Mongoose model
        const newQuote = new Quotes({
            quotes: data.quotes,
            posted_by : Username
        });

        // Checking If the Quote is Already Exist or Not
        const checkQuote = await Quotes.findOne({ quotes : data.quotes });
        if(checkQuote){
            return res.status(400).json({ error: 'Quote is Already Exist' });
        }

        // Save the New Quote Data to the Database
        const response = await newQuote.save();
        console.log("This is response", response);
        res.status(200).json({response: response});

    } catch(error){
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
})


// Here Admin can Update Quotes, which are present into the Database
router.put("/quotes/:quoteId", jwtmiddleware, async(req,res)=>{
    try{
        if(!( await checkAdmin(req.admin.username))){
            return res.status(403).json({message: 'User does not have admin role'});
        }

        // We are sending Admin Data into the Body
        const data = req.body;

        // Fetching the Quote which you want to Update from the Params
        const quoteId = req.params.quoteId;

        // Fetching Username & Password form req.admin(JWT Middleware)
        const Username = req.admin.username; 
        //console.log("this is data.quote", data.quotes)

        // Find the Quote and Update the Quote
        const updateQuote = await Quotes.findByIdAndUpdate(quoteId, {
            quotes : data.quotes,
            last_edited_by : Username,
            last_edited_at : Date.now()},{ 
            new: true, // Return the updated document
            runValidators: true, // Mongoose Run a validation Check according to the Schema
        })

        //console.log("This is UpdateQuote", updateQuote);
        res.status(200).json({ Updated: updateQuote });
        
    } catch(error){
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


// Here Admin can Delete Any Quote, which are present into the Database
router.delete("/quotes/:quoteId", jwtmiddleware, async(req,res)=>{
    try{
        if(!( await checkAdmin(req.admin.username))){
            return res.status(403).json({message: 'User does not have admin role'});
        }

        // Fetching the Quote which you want to Update from the Params
        const quoteId = req.params.quoteId;
        if(!quoteId){
            return res.status(403).json({ error: 'Please, Enter Correct Quote Id' });
        }

        // Find the Quote and Delete the Quote
        const deleteQuote = await  Quotes.findByIdAndDelete(quoteId);
        res.status(200).json({ Deleted: deleteQuote });

    } catch(error){
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


module.exports = router;