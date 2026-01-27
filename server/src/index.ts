//index.ts

import express from 'express'
import todoRouts from './routes/todo.routes'
import sequelize from './db/sequelize'

const app = express()
const PORT = 3030

app.use(express.json())

app.use('/api/todos', todoRouts)

sequelize.authenticate()
    .then(() => console.log("Sequelize connected ✅"))
    .catch(err => console.error("Sequelize connection error ❌", err));

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})



