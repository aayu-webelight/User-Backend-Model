import express, { Request, Response } from 'express'
import { Todo } from 'models/todo'

const router = express.Router()

router.get('/api/todo', async (req: Request, res: Response) => {
  const todo = await Todo.find({})
  return res.status(200).json(todo)
})

router.post('/api/todo', async (req: Request, res: Response) => {
  const todo= await Todo.create(
  req.body
  )
  return res.status(201).send(todo)
})

export { router as todoRouter }