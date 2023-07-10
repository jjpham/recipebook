const express = require("express")
const router = express.Router()
const reviewsCtlr = require("../../controllers/api/reviews")

router.post("/create",reviewsCtlr.create)
router.get("/fetchRevsforRcp/:recipe_id",reviewsCtlr.returnRevForRcp)
module.exports = router