// import express from 'express';
// import mongoose from 'mongoose';


// const app=express();

// app.listen(3000, () => {
//     console.log('server is running on port 3000');

// });
import express from 'express';
import mongoose from 'mongoose';

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

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get('/test', (req, res) => {
    res.json({message: 'API is working!'})
});