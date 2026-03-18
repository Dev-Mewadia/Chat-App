import User from "../models/User.js";


// Middleware to protect routes

export const protectRoute = async (req,res,next) =>{
  try {
    const token = req.headers.token;

    const decoded = JsonWebTokenError.verify((token, process.env.JWT_SECRET))

    const user = await User.findById(decoded.userId).select("-password");

    if(!user) return res.json({success:false, message:"User Not Found"});

    req.user = user;
    next();
  } catch (error) {
    res.json({ success:false, message:"User Not Found"});
  }
}

//Controller to check if user is authenticated
export const checkAuth =(req,res)=>{
  res.json({success:true,user:req.user});
  
}