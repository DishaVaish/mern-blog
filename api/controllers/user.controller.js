import { errorHandler } from "../utils/error";

export const test =(req, res) =>{
    res.json({message : 'API is working!! '});
};


export const getUsers =async(req,res,next)=>{
    if(!req.user.isAdmin)
        {
            return next(errorHandler(403,'You are not allowed to see aall users'));
        }
    try 
    {
        const startIndex=parseInt(req.query.startIndex) || 0;
        const limit=parseInt(req.query.limit) || 9;
        const sortDirection= req.query.sort==='asc'? 1:-1 ;

        const users=await User.find()
          .sort({createdAt: sortDirection})
          .skip(startIndex)
          .limit(limit);

          const usersWithoutPassword = users.map((user)={
            const { password, ...rest }= user._doc;
            return rest;
          });

        const totalUsers= await User.countDocuments();

        const now = new Date();

        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth()-1,
            now.getDate()
        );
        const lastMonthUsers= await User.countDocuments({
            createdAg: { $gte: oneMonthAgo },

        });
        res.status(200).json({
            users: usersWithoutPassword,
            totalUsers,
            lastMonthUsers,
        });

    } catch (error)
     {
        next(error);
        
    }
}