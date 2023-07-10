const jwt = require("jsonwebtoken")
const Recipe = require("../../models/recipe")
const User = require("../../models/user")

async function create(req,res){
    try{
        const recipe = await Recipe.create({
            name: req.body.name,
            cookTime: req.body.cookTime,
            description: req.body.description,
            directions: req.body.directions,
            user: req.user._id
        })
        res.status(201).json(recipe);
    }
    catch(err){
        res.status(400).json(err)
    }
}
async function fetchRecipesForUser(req,res){
    const recipes = await Recipe.find({user:req.params.user_id})
    res.json(recipes)
}
async function fetchOne(req,res){
    try{
        const recipe = await Recipe.findById(req.params.id)
        res.json(recipe)
    } catch(err){
        res.status(400).json(err);
        console.log(err); 
    }
    
}
async function update(req, res){
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body,{new:true})
    res.json(recipe)
}
async function remove(req,res){
    try{
        const recipe = await Recipe.findByIdAndRemove(req.params.id)
        res.json(recipe)
    } catch(err){
        res.status(400).json(err);
        console.log(err);
    }
}
async function fetchAll(req,res){
    try{
        const recipes = await Recipe.find()
        res.json(recipes)
    } catch(err){
        res.status(400).json(err)
    }
}

module.exports = {
    create,
    fetchRecipesForUser,
    fetchOne,
    update,
    remove,
    fetchAll
}