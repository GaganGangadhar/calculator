import Operation from '../models/Operation.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

class OperationsController {
  async calculate(req, res) {
    const { operation, operands } = req.body

    if (!operation || !Array.isArray(operands) || operands.length < 2) {
      return res.status(400).json({ error: 'Invalid input' })
    }

    let result
    try {
      switch (operation) {
        case 'add':
          result = operands.reduce((a, b) => a + b, 0)
          break
        case 'subtract':
          result = operands.reduce((a, b) => a - b)
          break
        case 'multiply':
          result = operands.reduce((a, b) => a * b, 1)
          break
        // case 'divide':
        //   if (operands.includes(0)) {
        //     return res.status(400).json({ error: 'Division by zero' })
        //   }
        //   result = operands.reduce((a, b) => a / b)
        //   break
        default:
          return res.status(400).json({ error: 'Invalid operation' })
      }

      const operationRecord = new Operation({
        operation,
        operands,
        result,
        timestamp: new Date(),
      })

      await operationRecord.save()
      return res.status(200).json({ result })
    } catch (error) {
      console.error('Calculation error:', error)
      return res
        .status(500)
        .json({ error: 'An error occurred while processing the request' })
    }
  }

  async getHistory(req, res) {
    try {
      const history = await Operation.find()
      return res.status(200).json(history)
    } catch (error) {
      return res
        .status(500)
        .json({ error: 'An error occurred while retrieving history' })
    }
  }

  async getOperationById(req, res) {
    const { id } = req.params

    try {
      const operation = await Operation.findById(id)
      if (!operation) {
        return res.status(404).json({ error: 'Operation not found' })
      }
      return res.status(200).json(operation)
    } catch (error) {
      return res
        .status(500)
        .json({ error: 'An error occurred while retrieving the operation' })
    }
  }

  async deleteOperation(req, res) {
    const { id } = req.params

    try {
      const operation = await Operation.findByIdAndDelete(id)
      if (!operation) {
        return res.status(404).json({ error: 'Operation not found' })
      }
      return res.status(204).send()
    } catch (error) {
      return res
        .status(500)
        .json({ error: 'An error occurred while deleting the operation' })
    }
  }

  async register(req, res) {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' })
    }
    try {
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' })
      }
      const hashedPassword = await bcrypt.hash(password, 10)
      const user = new User({ email, password: hashedPassword })
      await user.save()
      return res.status(201).json({ message: 'User registered successfully' })
    } catch (error) {
      return res.status(500).json({ error: 'Registration failed' })
    }
  }

  async login(req, res) {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' })
    }
    try {
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' })
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' })
      }
      const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', {
        expiresIn: '1h',
      })
      return res.status(200).json({ token })
    } catch (error) {
      return res.status(500).json({ error: 'Login failed' })
    }
  }
}

export default new OperationsController()
