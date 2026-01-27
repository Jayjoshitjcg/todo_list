'use client'
import { useState } from 'react'
import axios from 'axios'
import { Box, TextField, Typography, Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import BASE_URL from '@/Services/urlHelper'


const TodoForm = () => {

    const router = useRouter()
    const [title, setTitle] = useState('')



    const handleAddTodo = async () => {
        try {
            await axios.post(`${BASE_URL}/api/todos`, {
                title,
            })
            router.push('/Todo/List')
        } catch (err) {
            console.log(err)
        }


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
                height: '60vh',
                width: '60vw',
                flexDirection: 'column',
                gap: 3,
                background: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            }}>

                <Typography variant='h5' sx={{
                    color: "#000"
                }}><strong>Add Your Today Todo</strong></Typography>

                <TextField
                    label="Task Title"
                    variant="outlined"
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
                        width: '40%'
                    }}
                />



                <Button variant='contained' onClick={handleAddTodo} sx={{
                    backgroundColor: '#1f1db6',
                    borderRadius: '10px',
                    width: '300px',
                    fontSize: '15px'
                }}>
                    Add todo
                </Button>

            </Box>
        </Box>
    )
}

export default TodoForm