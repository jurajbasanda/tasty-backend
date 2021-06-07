import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/configDB.js'
import recipe from './Routes/recipe.js'
import user from './Routes/user.js'
import upload from './Routes/upload.js'

dotenv.config()
connectDB()
const app = express()
//Middleware
app.use(express.json())

app.get('/', (req, res) => {
	res.send('Home screen of server')
})
app.use('/api/recipes', recipe)
app.use('/api/users', user)
app.use('/api/upload', upload)
//Set PORT
const PORT = process.env.PORT || 5000
//Start server
app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
			.inverse
	)
)
