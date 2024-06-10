import mongoose from "mongoose";



const ClickSchema=mongoose.Schema({
  
  insertedAt: {type: Date,required:false, default:Date.now()},
  ipAddress:{type:String,required:true,default:"0.0.0.0"}
});


const targetValueSchema=mongoose.Schema({
  name:{type:String},
  value:{type:String}

})


const LinkSchema = mongoose.Schema({
  originalUrl: {type:String,required:true},
  clicks: [ClickSchema],
  targetParamValue: {type:String,default:""},
  targetParamName: { type: String, default: 't' },
  targetValues: [targetValueSchema],

});

export default mongoose.model("links", LinkSchema);
