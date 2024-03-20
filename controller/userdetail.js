import User from '../model/models.js'
import bcrypt from "bcryptjs";
export const create=async(req,res)=>{
    let exist;
    const email=req.body.email;
    try{
        exist=await User.findOne({email})
    }
    catch(error){
        console.log(error);
    }
    if(exist){
        return res.status(400).json({msg:"user already exist"})
    }
    try{
    const hashedPassword=bcrypt.hashSync(req.body.password);
    const name=req.body.name;
    const userData=new User({
        name,
        email,
        password:hashedPassword,
    });
    if(!userData){
        return res.status(404).json({msg:"user not found"});
    }
    const saveDat=await userData.save();
    res.status(200).json(saveDat);
}
catch(error){
    res.status(500).json({error:error})
    console.log(error)
}
}

export const login=async(req,res)=>{
    const {email,password}=req.body;
    let exist;
    
    try{
        exist=await User.findOne({email})
    }
    catch(error){
        console.log(error);
    }
    if(!exist){
        return res.status(400).json({msg:"could not find user"})
    }

    const ispassword=bcrypt.compareSync(password,exist.password);
    if(!ispassword)
    {
        return res.status(400).json({msg:"Invalid password"});
    }
    return res.status(200).json({msg:"Login successful"})
}

