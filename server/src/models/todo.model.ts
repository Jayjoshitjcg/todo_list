// models/todo.model.ts

import pool from '../db/db'
import Todo from './Todo'

export const getAllTodo = async () => {
    // const { rows } = await pool.query("SELECT * FROM todos ORDER BY id DESC")

    // return rows

    return await Todo.findAll({
        order: [['id', 'DESC']]
    })
}

export const getTodoById = async (id: string) => {
    // const { rows } = await pool.query(
    //     'SELECT * FROM todos WHERE id = $1',
    //     [id]
    // )

    // return rows[0]

    return await Todo.findByPk(id)
}

export const createTodo = async (title: string, description: string) => {
    // const { rows } = await pool.query(
    //     "INSERT INTO todos (title) VALUES ($1) RETURNING *",
    //     [title]
    // )

    // return rows[0]

    return await Todo.create({ title, description })
}

export const updateTodo = async (
    id: string,
    title: string,
    description: string,
    completed: boolean,
) => {
    // const { rows } = await pool.query(
    //     'UPDATE todos SET title=$1, description=$2, completed=$3 WHERE id=$4 RETURNING *',
    //     [title, description, completeted, id]
    // )

    // return rows[0] || null

    const todo = Todo.findByPk(id)

    if (!todo) {
        return null
    }

    await Todo.update({
        title,
        description,
        completed
    }, {
        where: { id }
    })

    return todo
}

export const deleteTodo = async (id: string) => {
    // await pool.query(
    //     'DELETE FROM todos WHERE id=$1',
    //     [id]
    // )

    await Todo.destroy({ where: { id } })
}