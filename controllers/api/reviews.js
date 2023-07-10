const Recipe = require("../../models/recipe")
const Review = require("../../models/review")
const jwt = require("jsonwebtoken")

async function create(req, res) {
    try {
      const review = await Review.create({
        rating: req.body.rating,
        description: req.body.description,
        user: req.user._id,
        recipe: req.body.recipe
      })
      
      res.status(201).json(review)
    } catch (error) {
      res.status(400).json(error)
    }
  }
async function returnRevForRcp(req,res){
    try {    
    const reviews = await Review.find({recipe:req.params.recipe_id}).populate('user')
    res.json(reviews)
    } catch (err){
        res.status(400).json(err)
    }
}
  module.exports = {
    create,
    returnRevForRcp
  }