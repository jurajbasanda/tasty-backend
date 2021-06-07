import express from 'express'
import Recipe from '../models/recipeModel.js'
import protect from '../middleware/verifyToken.js'
const router = express.Router()

//Get/recipes => show all recipes
router.get('/', async (req, res) => {
	const keyword = req.query.keyword
		? {
				keywords: { $regex: req.query.keyword, $options: 'i' },
		  }
		: {}
	try {
		const recipes = await Recipe.find({ ...keyword })
		res.json(recipes)
	} catch (err) {
		res.json({ message: err })
		console.error('There was a error, show all')
	}
})
//Get/recipes/:id => show one specific recipe
router.get('/:id', async (req, res) => {
	try {
		const oneRecipe = await Recipe.findById(req.params.id)
		res.json(oneRecipe)
	} catch (err) {
		res.json({ message: err })
		console.error('There was a error, show one')
	}
})
//*Get/recipes/user => show user recipes
router.get('/user/all', async (req, res) => {
	const { userid } = req.headers
	try {
		const userRecipes = await Recipe.find({ userId: userid })
		res.json(userRecipes).status(200)
	} catch (err) {
		res.json({ message: err }).status(400)
	}
})
//Delete/recipes/:id => delete specific recipe
router.delete('/:id', async (req, res) => {
	try {
		const removedRecipe = await Recipe.deleteOne({ _id: req.params.id })
		console.log('Recipe removed')
		res.json(removedRecipe)
	} catch (err) {
		res.json({ message: err })
		console.error('There was a error')
	}
})
//Update/recipes/:id => update specific post
router.patch('/:id', async (req, res) => {
	try {
		const updateRecipe = await Recipe.updateOne({ _id: req.params.id }, {})
		res.json(updateRecipe)
	} catch (err) {
		res.status(404).json({ message: err })
		console.error('There was a error')
	}
})
//Post/recipes => create new recipe
router.post('/', protect, (req, res) => {
	const addRecipe = new Recipe({
		title: req.body.title,
		userId: req.body.userId,
		keywords: req.body.keywords,
		serving: req.body.serving,
		// prepTime: req.body.prepTime,
		// calories: req.body.calories,
		// meat: req.body.meat,
		ingredients: req.body.ingredients,
		directions: req.body.directions,
		// vegeterian: req.body.vegeterian,
		// glutenFree: req.body.glutenFree,
		// hot: req.body.hot,
		img: req.body.img,
	})
	addRecipe
		.save()
		.then(
			(data) =>
				res.status(200).json(data) &&
				console.log(`New Recipe ${data.title} added`)
		)
		.catch((err) => res.json({ message: err }))
})

export default router
