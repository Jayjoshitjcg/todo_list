import pool from '../db'

export const getAllTodo = async () => {
    const { rows } = await pool.query("SELECT * FROM todos ORDER BY id DESC")

    return rows
}

export const getTodoById = async (id: string) => {
    const { rows } = await pool.query(
        'SELECT * FROM todos WHERE id = $1',
        [id]
    )

    return rows[0]
}

export const createTodo = async (title: string) => {
    const { rows } = await pool.query(
        "INSERT INTO todos (title) VALUES ($1) RETURNING *",
        [title]
    )

    return rows[0]
}

export const updateTodo = async (
    id: string,
    title: string,
    completeted: boolean,
) => {
    const { rows } = await pool.query(
        'UPDATE todos SET title=$1, completed=$2 WHERE id=$3 RETURNING *',
        [title, completeted, id]
    )

    return rows[0] || null
}

export const deleteTodo = async (
    id: string
) => {
    await pool.query(
        'DELETE FROM todos WHERE id=$1',
        [id]
    )
}