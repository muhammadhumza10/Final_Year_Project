const mongoose= require ('mongoose');

const UserSchema = new mongoose.Schema({
    firstname: {type:String, required:true},
    lastname: {type:String, required:true},
    fullname: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    contact: {type:String, required:true},
    password: {type:String, required:true},
    type: {type:String, required:true},
    gender: {type:String, required:true},
    businessname: {type:String, required:true},
    personaladdress: {type:String, required:true},
    businessaddress: {type:String, required:true},
    city: {type:String, required:true},
    province: {type:String, required:true},
    postalcode: {type:Number, required:true},

}, {timestamps:true});

export default mongoose.models.User || mongoose.model("User", UserSchema);