import { Schema, model } from 'mongoose'

const BookSchema = new Schema(
  {
    name: {
      required: false,
      type: String,
    },
    description: {
      required: false,
      type: String,
    },
    active: {
      default: true,
      type: Boolean,
    },
    tasks: [
      {
        ref: 'Task',
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
)

export default model('Book', BookSchema)
