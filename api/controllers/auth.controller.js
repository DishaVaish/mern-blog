//review
import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next)=>{
  const { username, email, password }= req.body;

  if (!username|| !email|| !password || username ===''|| email===''|| password===''){
    // return res.status(400).json({message: 'All fields are required '});
    next(errorHandler( 400, 'All fields are required'));
  }

  const newUser = new User({
    username,
    email,
    password,
  });

  try{

    await newUser.save();
    res.json('Signup Successful');
} catch(error){
    // res.status(500).json({message: "error while gaining the details of the user"});
    // res.status(500).json({message: error.message});
    next(error);
}

};

//missing one step of 1:39:35(skipped) for2-3 mins - npm i bcryptjs
