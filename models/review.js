const mongoose = require('mongoose')
const Schema = mongoose.Schema
const reviewSchema = new Schema({
    rating: {type: Number, required: true, min: 1 , max: 5},
    description: {type: String, required: true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe"
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Review', reviewSchema)