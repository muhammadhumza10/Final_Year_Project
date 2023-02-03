const mongoose= require ('mongoose');


const OrderSchema = new mongoose.Schema({
    product: {type:Object,required:true},
    quantity: {type:Number, required:true},
    subTotal: {type:Number, required:true},
    shipping: {type:Number, required:true},
    total: {type:Number, required:true},
    userid: {type:String, required:true},
    firstname: {type:String, required:true},
    lastname: {type:String, required:true},
    email: {type:String, required:true},
    contact: {type:Number, required:true},
    personaladdress: {type:String, required:true},
    businessname: {type:String, required:true},
    businessaddress: {type:String, required:true},
    city: {type:String, required:true},
    province: {type:String, required:true},
    postalcode: {type:Number, required:true},
    status: {type:String, default:"Active"},
    invoicestatus: {type:String, default:"Unpaid"},
    paymentmethod:{type:String, required:true},
    isReviewed: {type:Boolean, default:false},

    

}, {timestamps:true});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);