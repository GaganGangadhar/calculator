import mongoose from 'mongoose'

const operationSchema = new mongoose.Schema({
  operation: {
    type: String,
    required: true,
    enum: ['add', 'subtract', 'multiply', 'divide'],
  },
  operands: {
    type: [Number],
    required: true,
  },
  result: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
})

const Operation = mongoose.model('Operation', operationSchema)

export default Operation
