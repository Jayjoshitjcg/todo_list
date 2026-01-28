'use client'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Box,
    Typography
} from '@mui/material'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BASE_URL from '@/Services/urlHelper'

interface Todo {
    id: string
    title: string
}

const TodoList = () => {
    const router = useRouter();
    const [todos, setTodos] = useState<Todo[]>([])

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/todos`, {
                    headers: {
                        "ngrok-skip-browser-warning": "true",
                    },
                })
                console.log("res==>", res)
                setTodos(res.data.data)
            } catch (err) {
                console.log("error...", err)
            }
        }
        fetchTodos()
    }, [])

    const handlegoback = () => {
        router.push('/Todo')
    }

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            flexDirection: 'column',
            backgroundColor: '#fff'
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                pt: 7,
                height: '90vh',
                width: '90vw',
                flexDirection: 'column',
                gap: 3,
                background: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            }}>

                <Typography variant='h4' sx={{
                    color: "#000"
                }}><strong>Todo List</strong></Typography>


                <Button variant='contained' onClick={handlegoback} sx={{
                    backgroundColor: '#1f1db6',
                    borderRadius: '10px',
                    width: '300px',
                    fontSize: '15px'
                }}>
                    Add new todo
                </Button>

                <TableContainer component={Paper} sx={{ mt: 4, backgroundColor: '#dddada' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Task Title</b></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {todos?.map((todo) => (
                                <TableRow key={todo.id}>
                                    <TableCell>{todo.title}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Box>
        </Box>
    )
}

export default TodoList