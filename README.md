# Random_Quote_Generator

#### Voting App Workflow

This is a Telegram bot. This bot randomly picks a quote from the database and sends it to the user.

#### Models- 
- Admin Model => This Model Handel All Backend Routes of Admin.
- Quotes Model => This Model Handel All Quotes and Their Updation, Deletion, etc.
- BotData Model => This Model store all Telegram Data. Like- Username, Messages, Time, etc.

#### Routes-
- **SignUp** (GET) => **url**- "/admin/signup", Create a New Admin Account. It returns JWT Token for Other work.
- **LogIn** (GET) => **url**- "/admin/signup", Log in to an Existing Admin Account. It also returns JWT Token for Other work.
- **Get/See All Quotes** (GET) => **url**- "/admin/quotes", **Role**- "admin", Only Admin can **See** All Quotes from the DataBase. And This Route also need take JWT Token as an Bearer Authentication.
- **Insert Quote** (POST) => **url**- "/admin/quotes", **Role**- "admin", Only Admin can **Post / Insert Data / Quotes** into the DataBase. And This Route also need take JWT Token as an Bearer Authentication.
- **Update Quote** (PUT) => **url**- "/admin/quotes/:quoteId", **Role**- "admin", Only Admin can **Update Existing Data / Quotes** into the DataBase. And This Route also need take JWT Token as an Bearer Authentication.
- **Delete Quote** (DELETE) => **url**- "/admin/quotes/:quoteId", **Role**- "admin", Only Admin can **Delete Existing Data / Quotes** into the DataBase. And This Route also need take JWT Token as an Bearer Authentication.

#### Telegram Commands-
- **/start** => This Command Start the Bot and Return Some Messages.
- **/help** => This Command Show All Existing Commands List with their Short Description.
- **/info** => This Command give a Short Description What is the Bot does.
- **/EnergyBooster** => Everytime You send this Command, Bot return a Random Quote from the DataBase and Store Telegram User information with Which Quote Telegram User got into DataBase.

#### For More Information Please Visit the Code and The Image of the Random Quote Generator.png ####
