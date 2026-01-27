import { Router } from "express";
import { addTodo, editTodo, getTodoById, getTodos, removeTodo } from "../controllers/todo.controller";


const router = Router()

router.get('/', getTodos)
router.get('/:id', getTodoById)
router.post('/', addTodo)
router.put('/:id', editTodo)
router.delete('/:id', removeTodo)

export default router