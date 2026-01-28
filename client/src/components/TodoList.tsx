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
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
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
                setTodos(res.data.data)
            } catch (err) {
                console.log("error...", err)
            }
        }
        fetchTodos()
    }, [])

    const handleaddtaskform = () => {
        router.push('/Todo/Form')
    }

    const handleDeleteTodo = async (id: string) => {
        try {
            await axios.delete(`${BASE_URL}/api/todos/${id}`, {
                headers: {
                    "ngrok-skip-browser-warning": "true",
                },
            })
            setTodos(prev => prev.filter(todo => todo.id !== id))
        } catch (error) {
            console.log("Delete error:", error)
        }
    }

    const handleEditTodo = (id: string) => {
        router.push(`/Todo/Form?id=${id}`)
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
                height: '95vh',
                width: '95vw',
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


                <Button variant='contained' onClick={handleaddtaskform} sx={{
                    backgroundColor: '#1f1db6',
                    borderRadius: '10px',
                    width: '300px',
                    fontSize: '15px'
                }}>
                    Add new todo
                </Button>

                <TableContainer component={Paper} sx={{ mt: 2, }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#dddada' }}>
                            <TableRow>
                                <TableCell><b>Task Title</b></TableCell>
                                <TableCell><b>Actions</b></TableCell>
                                <TableCell><b>Check To Complete</b></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {todos?.map((todo) => (
                                <TableRow key={todo.id}>
                                    <TableCell>{todo.title}</TableCell>
                                    <TableCell>
                                        <Box sx={{
                                            display: 'flex',
                                            gap: 2
                                        }}>
                                            <DeleteIcon
                                                sx={{ cursor: 'pointer', color: 'red' }}
                                                onClick={() => handleDeleteTodo(todo.id)}
                                            />

                                            <EditIcon
                                                sx={{ cursor: 'pointer', color: 'blue' }}
                                                onClick={() => handleEditTodo(todo.id)}
                                            />

                                        </Box>
                                    </TableCell>
                                    <TableCell><Checkbox /></TableCell>
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