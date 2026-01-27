import express from 'express'
import todoRouts from './routes/todo.routes'
// import pool from './db'

const app = express()
const PORT = 3030

// app.get('/test-db', async (req, res) => {
//     try {
//         const result = await pool.query("SELECT NOW()")
//         res.json(result.rows)
//     }catch (err) {
//         res.status(500).json({
//             error: "DB error"
//         })
//     }
// })

app.use(express.json())

app.use('/api/todos', todoRouts)


app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})

