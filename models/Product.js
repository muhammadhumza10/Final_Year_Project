const mongoose= require ('mongoose');

const ProductSchema = new mongoose.Schema({
    sellerid: {type:String, required:true},
    selleremail: {type:String, required:true},
    productname: {type:String, required:true},
    fabrictype: {type:String, required:true},
    color: {type:String, required:true},
    quality: {type:String, required:true},
    deliverytime: {type:String, required:true},
    price: {type:Number, required:true},
    paymentterms: {type:String, required:true,default:"Cash on Delivery"},
    moq: {type:String, required:true},
    description: {type:String, required:true},
    delist:{type:Boolean,default:false},
    imageUrl:{type:Array,required:true}

}, {timestamps:true});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);