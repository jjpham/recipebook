const express = require("express")
const router = express.Router()
const recipesCtlr = require("../../controllers/api/recipes")

router.post("/create",recipesCtlr.create)
router.get("/fetchRecipesForUser/:user_id", recipesCtlr.fetchRecipesForUser)
router.get("/fetchOne/:id",recipesCtlr.fetchOne)
router.put("/update/:id", recipesCtlr.update)
router.delete("/delete/:id",recipesCtlr.remove)
router.get("/fetchAll",recipesCtlr.fetchAll)
module.exports = router