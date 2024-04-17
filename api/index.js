import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.routes.js';

// mongoose.connect('mongodb://localhost:27017/Login-signup',{
  // mongoose.connect('mongodb://127.0.0.1:27017/Login-signup', {
  // // mongoose.connect('mongodb+srv://vedangmehta07:6S6sRQubtBGL293k@mern-blog.nfbdcuk.mongodb.net/mern-blog?retryWrites=true&w=majority', {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // })
  mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
  
const app = express();
//As a default we are not allowed to send json to te backend
app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

//Here we are using app.use in place of app.get coz we r going to
//use the get req here inside the index part
app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);

//middleware made
app.use((err,req,res, next) =>{
  const statusCode =err.statusCode || 500;
  const message= err.message|| 'Internal Server Error ';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,

  });
} );
