import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			min: 3,
			max: 255,
		},
		lastName: {
			type: String,
			required: true,
			min: 3,
			max: 255,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			min: 6,
			max: 255,
		},
		password: {
			type: String,
			required: true,
			min: 6,
			max: 255,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
		date: { type: Date, default: Date.now },
	},
	{ timestamps: true }
)
userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password)
}
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next()
	}

	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})
const User = mongoose.model('User', userSchema)

export default User
