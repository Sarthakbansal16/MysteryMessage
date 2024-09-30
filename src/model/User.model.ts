import mongoose,{Schema,Document, mongo} from "mongoose";

export interface Message extends Document{
    content: string;
    createdAt: Date;
}

const messageSchema: Schema<Message> = new Schema({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default: Date.now
    }
})

export interface User extends Document{
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    message: Message[] 
}

const userSchema: mongoose.Schema<User> = new mongoose.Schema({
    username: {
      type: String,
      required: [true, "username is required"],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      // to check that you enter valid email we use regex
      match: [
        /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/,
        "please enter valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    verifyCode: {
      type: String,
      required: [true, "verify code is required"],
    },
    verifyCodeExpiry: {
      type: Date,
      required: [true, "verify code expiry is required"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAcceptingMessage: {
      type: Boolean,
      default: false,
    },
    message: [messageSchema], // message is a field which is of type {messageSchema}
  });
  
  //in nextjs,most code is running at edge time,it doesnt know if the site is booted for first time or not

  const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",userSchema)
  // preExisting || new Schema

  export default UserModel