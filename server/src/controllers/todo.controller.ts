import { Request, Response } from "express";
import * as Todo from '../models/todo.model'

export const getTodos = async (req: Request, res: Response) => {
    try {
        const todos = await Todo.getAllTodo()

        res.status(200).json({
            status: 200,
            message: 'Record fetched successfully',
            data: todos
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send("Internal Server error")
    }

}

export const getTodoById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string

        const todo = await Todo.getTodoById(id)

        if (!todo) res.status(404).json({ message: 'Not Found' })

        res.status(200).json({
            status: 200,
            message: 'Record fetched successfully',
            data: todo
        })

    } catch (err) {
        console.error(err)
        return res.status(500).send("Internal Server error")
    }

}

export const addTodo = async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body

        if (!title) return res.status(400).json({ message: 'Title Required' })

        await Todo.createTodo(title, description)

        res.status(200).json({
            status: 200,
            message: 'Record Added successfully'
        })

    } catch (err) {
        res.status(500).send("Internal Server error")
    }
}

export const editTodo = async (req: Request, res: Response) => {
    // const { title, completed } = req.body

    // const todo = await Todo.updateTodo(
    //     String(req.params.id),
    //     title,
    //     completed
    // )

    // res.status(200).json(todo)

    try {
        const id = req.params.id as string
        const { title, description, completed } = req.body

        if (!id) {
            return res.status(400).json({
                status: 400,
                message: 'Invalid todo id'
            })
        }

        if (typeof title !== 'string' || typeof completed !== "boolean") {
            return res.status(400).json({
                status: 400,
                message: 'Invalid Request Data'
            })
        }

        const todo = await Todo.updateTodo(id, title, description, completed)

        if (!todo) {
            return res.status(404).json({
                status: 404,
                message: 'Data not Found'
            })
        }

        return res.status(200).json({
            status: 200,
            message: 'Data updated successfully',
            data: todo
        })

    } catch (err) {
        res.status(500).send("Internal Server error")
    }
}

export const removeTodo = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string

        await Todo.deleteTodo(id)

        return res.status(200).json({
            status: 200,
            message: 'Record deleted successfully'
        })

    } catch (err) {
        return res.status(500).send("Internal Server Error")
    }

}