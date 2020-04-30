import { Schema, model } from 'mongoose'

const TodoSchema = new Schema(
  {
    description: {
      required: true,
      type: String,
    },
    completed: {
      default: false,
      type: Boolean,
    },
    book: {
      ref: 'Book',
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export default model('Todo', TodoSchema)
