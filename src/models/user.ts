import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

const SALT_WORK_FACTOR = 10

const UserSchema = new Schema(
  {
    username: {
      required: true,
      type: String,
      index: {
        unique: true,
      },
    },
    email: {
      required: true,
      type: String,
      index: {
        unique: true,
      },
    },
    password: {
      required: true,
      type: String,
    },
    books: [
      {
        ref: 'Book',
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
)

// middleware to hash the password
UserSchema.pre('save', function (next) {
  let user = this
  // if no changse in password skip
  if (!user.isModified('password')) return next()

  // generate a salt
  return bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)
    // hash the password
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err)

      // override the password with the hash
      user.password = hash
      return next()
    })
  })
})

// Method to compare the passwords
UserSchema.methods.comparePassword = function (challenge, fn) {
  bcrypt.compare(challenge, this.password, (err, isMatch) => {
    if (err) return fn(err)
    fn(null, isMatch)
  })
}

export default model('User', UserSchema)
