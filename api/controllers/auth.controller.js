//review
import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next)=>{
  const { username, email, password }= req.body;

  if (!username|| !email|| !password || username ===''|| email===''|| password===''){
    // return res.status(400).json({message: 'All fields are required '});
    next(errorHandler( 400, 'All fields are required'));
  }

  //We need to hash the password for security :
  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try{

    await newUser.save();
    res.json('Signup Successful');
}   catch(error){
    // res.status(500).json({message: "error while gaining the details of the user"});
    // res.status(500).json({message: error.message});
    next(error);
}

};

export const signin = async (req, res, next)=>{
  const {email, password} =req.body;

  if(!email|| !password|| email===''||password===''){
    return next (errorHandler(400, 'All fields are Required'));
  }
try{
  //WE have to wait for the results: await
    const validUser = await User.findOne({email});
    if(!validUser){
    return next(errorHandler(404, 'User not Found')); 
    }
  const validPassword= bcryptjs.compareSync(password , validUser.password);
  if(!validPassword){
    return next(errorHandler(400, 'Invalid Password'));  
}

  //For creating a unique token of signin: 
  //It is going to be encrypted just like hashed password 
  //_id is the unique id stored for each user in MongoDB
  const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
  // const token = jwt.sign({id: validUser._id}, 'vsmehta');
  // we can add expiresIn : 'Id' here so after how much time the seesion will be expired
  const {password: pass, ...rest} = validUser._doc;

  res.status(200).cookie('access_token', token, {
    httpOnly: true}).json(validUser);

  // res.cookie('access_token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
  //   res.status(200).json(rest);
  }catch(error){
    next(error);
}

}
