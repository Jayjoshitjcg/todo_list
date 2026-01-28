'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, TextField, Typography, Button } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import BASE_URL from '@/Services/urlHelper'

const TodoForm = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    const [title, setTitle] = useState('')

    useEffect(() => {
        if (!id) return

        const fetchTodoById = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/todos/${id}`, {
                    headers: {
                        "ngrok-skip-browser-warning": "true",
                    },
                })
                setTitle(res.data.data.title)
            } catch (err) {
                console.log('Fetch todo error:', err)
            }
        }

        fetchTodoById()
    }, [id])

    const handleSubmitTodo = async () => {

        try {
            if (id) {
                await axios.put(
                    `${BASE_URL}/api/todos/${id}`,
                    {
                        title,
                        completed: true
                    },
                    {
                        headers: {
                            "ngrok-skip-browser-warning": "true",
                        },
                    }
                )
            } else {
                await axios.post(
                    `${BASE_URL}/api/todos`,
                    { title },
                    {
                        headers: {
                            "ngrok-skip-browser-warning": "true",
                        },
                    }
                )
            }

            router.push('/Todo')
        } catch (err) {
            console.log('Submit error:', err)
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'column',
                backgroundColor: '#fff',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    pt: 7,
                    height: '60vh',
                    width: '60vw',
                    flexDirection: 'column',
                    gap: 3,
                    background: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                }}
            >
                <Typography variant="h5" sx={{ color: '#000' }}>
                    <strong>{id ? 'Edit Todo' : 'Add Your Today Todo'}</strong>
                </Typography>

                <TextField
                    label="Task Title"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            backgroundColor: 'rgba(255, 255, 255, 0.85)',
                            '& fieldset': {
                                borderColor: '#ddd',
                            },
                            '&:hover fieldset': {
                                borderColor: '#1f1db6',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#1f1db6',
                                borderWidth: 2,
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: '#666',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: '#1f1db6',
                        },
                        width: '40%',
                    }}
                />

                <Button
                    variant="contained"
                    onClick={handleSubmitTodo}
                    sx={{
                        backgroundColor: '#1f1db6',
                        borderRadius: '10px',
                        width: '300px',
                        fontSize: '15px',
                    }}
                >
                    {id ? 'Update Todo' : 'Add Todo'}
                </Button>
            </Box>
        </Box>
    )
}

export default TodoForm
