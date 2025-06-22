import bcrypt from "bcryptjs";
import { jwt } from "jsonwebtoken";
import mongoose,{model, Schema} from "mongoose";
import { use } from "react";


const userSchema=new Schema(
    {
        username:{
            type:String,
            required:true,
            index:true,
            trim:true
        },
        fullname:{
            type:String,

        },
        email:{
            type:String
        },
        password:{
            type:String
        },
        avatar:{
            type:String //cloudinary
        },

        coverImage:{
            type:String //cloudinary
        },
        watchHistory:[
            {
                type:Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        refreshToken:String
    },
    {
        timestamps:true
    }
)


// we know about pre hooks ki save krne se phele kuch task ho jae 

userSchema.pre("save",async function(next){

    if(this.isModified("password")) return next();

    await bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.isPasswordCorrect=async function(password){
    const res=await bcrypt.compare(this.password,password)
    return res;
}

userSchema.methods.accessToken=function(){
    jwt.sign(
        {
            _id:this._id,
            fullname:this.fullname,
            email:this.email
        },
        process.env.ACCESS_KEY,
        {
            expiresIn:process.env.ACCESS_EXPIRY
        }
    )
}

userSchema.methods.refreshToken=function(){
    jwt.sign(
        {
            _id:this._id,
        
        },
        process.env.REFRESH_KEY,
        {
            expiresIn:process.env.REFRESH_EXPIRY
        }
    )
}
export const User=mongoose.model("User",userSchema)