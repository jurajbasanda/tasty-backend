import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const protect = async (req, res, next) => {
	const token = req.header('auth-token')
	if (!token) res.status(401).send('Access denied')

	try {
		const verified = jwt.verify(token, process.env.JWT_SECRET)
		req.user = verified
		next()
	} catch (err) {
		res.status(400).send('Invalid token')
	}
}

export default protect
