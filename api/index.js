import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.routes.js';

// mongoose.connect('mongodb://localhost:27017/Login-signup',{
  // mongoose.connect('mongodb://127.0.0.1:27017/Login-signup', {
  mongoose.connect('mongodb+srv://vedangmehta07:6S6sRQubtBGL293k@mern-blog.nfbdcuk.mongodb.net/mern-blog?retryWrites=true&w=majority', {
    //Warning: useNewUrlParser is a deprecated option: useNewUrlParser has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
  //(Use `node --trace-warnings ...` to show where the warning was created)
import postRoutes from './routes/post.route.js';

mongoose.connect('mongodb://localhost:27017/Login-signup',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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

app.use('/api/post',postRoutes);

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
