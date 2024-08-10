const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const app = express();


app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://127.0.0.1:27017/library', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Book Schema 
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  borrowedDate: Date,
  returnDate: Date,
  email:String,
});

// User Schema
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});


const Book = mongoose.model('Book', bookSchema); //adding bookSchema to Book
const User = mongoose.model("User", UserSchema); //adding UserSchema to User
module.exports = mongoose.model('User', UserSchema);
module.exports = mongoose.model('Book', bookSchema);


// const TransactionSchema = new mongoose.Schema({
//   user_id:{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:"User"
//   },
//   book_id:{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:"Book"
//   }

// })


//User SignUp API 
app.post("/api/signup", async (req, res) =>{
  try {
    const { username, email, password } = req.body;
    console.log(username)
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User signed up successfully." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
});




//User Login API
//User Login API
app.post("/api/login", async (req, res) => {
  try {
    
    const { email , password } = req.body;
    // console.log("1",username1)
    // console.log("1",password)
    const user = await User.find({email:email});

    console.log(email)
    var foundUser = undefined;
    console.log("User-->",user)
    user.find((value,index) => {
        if(value.email == email){
          foundUser = value
            console.log("founduser:",foundUser)
            // console.log("value:",value)
        }
        return foundUser

    
    });
    
    if (!foundUser) {
        // console.log("in user")
      return res.status(401).json({ error: "User not found." });
     
    }
    // console.log("main",password)
    // console.log("user entered",foundUser.password)
    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    const username1 = foundUser.username
    const email1=foundUser.email
    if (!passwordMatch) {
        // console.log("in pass")
      return res.status(401).json({ error: "Invalid password." });
    }
    res.json({email:email1 ,user: username1 });
  }  
 catch (error) {
    console.log("error:",error)
    res.status(500).json({ error: "An error occurred." });
  }  
  
});


app.post('/api/borrow', async (req, res) => {
  try {
    const { title, author, borrowedDate, returnDate, email } = req.body;
    // console.log("server.js")
    //will create new book document and save it to collection 
    // console.log(email)
    const book = new Book({
      title,
      author,
      borrowedDate,
      returnDate,
      email,
    });

    await book.save();
    res.status(200).send('Book borrowed successfully');

  } catch (error) {
    console.error('Error borrowing book:', error);
    res.status(500).send('Internal Server Error');
  }
});




app.get('/api/books', async (req, res) => {
  try {
    const email = req.params.email;
    
    const book = await Book.find({}); // Find books for the specified email
    console.log(book)
    res.send(book);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).send('Internal Server Error');
  }
});




const PORT =  5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
