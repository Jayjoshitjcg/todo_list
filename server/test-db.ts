require('dotenv').config()
import pool from './src/db'

(async () => {
    try{
        const result = await pool.query("SELECT NOW() as now")
    }catch (err) {

    }
})