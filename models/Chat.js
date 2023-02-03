const mongoose= require ('mongoose');


const ChatSchema = new mongoose.Schema({
    buyer: {type:String, required:true},
    buyername: {type:String, required:true},
    seller: {type:String, required:true},
    sellername: {type:String, required:true},
    messages: {type:Array,required:true},
    

    

}, {timestamps:true});

export default mongoose.models.Chat || mongoose.model("Chat", ChatSchema);