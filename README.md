# Random Quote Generator Telegram Bot

#### Random Quote Generator Workflow 007

This is a Telegram bot. This bot randomly picks a quote from the database and sends it to the user.

#### Models- 
- Admin Model => This Model Handels All Backend Routes of Admin.
- Quotes Model => This Model Handel All Quotes and Their Updation, Deletion, etc.
- BotData Model => This Model stores all Telegram Data. Like- Username, Messages, Time, etc.

#### Routes-
- **SignUp** (GET) => **URL**- "/admin/signup", Create a New Admin Account. It returns JWT Token for Other work.
- **LogIn** (GET) => **url**- "/admin/signup", Log in to an Existing Admin Account. It also returns JWT Token for Other work.
- **Get/See All Quotes** (GET) => **url**- "/admin/quotes", **Role**- "admin", Only Admin can **See** All Quotes from the DataBase. This Route also needs to take JWT Token as a Bearer Authentication.
- **Insert Quote** (POST) => **url**- "/admin/quotes", **Role**- "admin", Only Admin can **Post / Insert Data / Quotes** into the DataBase. This Route also needs to take JWT Token as a Bearer Authentication.
- **Update Quote** (PUT) => **url**- "/admin/quotes/:quoteId", **Role**- "admin", Only Admin can **Update Existing Data / Quotes** into the DataBase. This Route also needs to take JWT Token as a Bearer Authentication.
- **Delete Quote** (DELETE) => **url**- "/admin/quotes/:quoteId", **Role**- "admin", Only Admin can **Delete Existing Data / Quotes** into the DataBase. This Route also needs to take JWT Token as a Bearer Authentication.

#### Telegram Commands-
- **/start** => This Command Start the Bot and Return Some Messages.
- **/help** => This Command shows all Existing Commands List with their Short Description.
- **/info** => This Command gives a Short Description of What the Bot does.
- **/EnergyBooster** => Everytime You send this Command, the Bot returns a Random Quote from the DataBase and Stores Telegram User information with Which Quote the Telegram User got into the DataBase.

#### For More Information Please Visit the Code and The Image of the Random Quote Generator.png ####

# Improvement Scopes -
- We don't use BCrypt for **Password Hashing** or **Encoding / Decoding**.
