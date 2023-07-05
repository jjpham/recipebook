require('dotenv').config()
require('./config/database')


const User = require('./models/user')
const Recipe = require('./models/recipe')
const Review = require('./models/review')

let user, review,  recipe
let users, reviews, recipes