const mongoose= require ('mongoose');


const RatingSchema = new mongoose.Schema({
    rating: {type:Number, required:true},
    review: {type:String, required:true},
    name: {type:String, required:true},
    email: {type:String, required:true},
    order: {type:Object,required:true},
    

    

}, {timestamps:true});

export default mongoose.models.Rating || mongoose.model("Rating", RatingSchema);