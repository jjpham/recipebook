const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipeSchema = new Schema({
    name: {type: String, required: true},
    cookTime: {type:Number, required: true},
    description:{type:String, required:true},
    directions:{type:String, required:true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Recipe', recipeSchema)