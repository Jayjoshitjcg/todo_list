import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link'

const page = () => {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'column',
      backgroundColor: '#fff',
      gap: 3
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60vh',
        width: '60vw',
        flexDirection: 'column',
        gap: 3,
        background: 'rgba(255, 255, 255, 0.15)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.25)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      }}>
        <Typography variant='h4' sx={{ color: 'black' }}><strong>Welcome aboard! Let’s organize your day</strong></Typography>
        <Button variant='contained' sx={{
          backgroundColor: '#1f1db6',
          borderRadius: '10px',
          width: '300px',
          fontSize: '15px'
        }}>
          <Link href={'/Todo'}>Let’s Begin</Link>
        </Button>
      </Box>
    </Box>
  )
}

export default page