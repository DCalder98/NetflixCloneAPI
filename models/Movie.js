const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title:{type: String, required:true, unique:true},
    description:{type: String},
    image:{type:String},
    imageTitle:{type:String},
    imageSmall:{type:String},
    trailer:{type:String},
    movie:{type:String},
    rating:{type: Number},
    genre:{type: String},
    isSeries:{type: Boolean, default: false}

}, {timestamps:true})

module.exports = mongoose.model("Movie", MovieSchema)