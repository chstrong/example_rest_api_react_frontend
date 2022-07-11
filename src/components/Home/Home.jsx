import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Link } from '@mui/material'

export default function Home() {
  return (
    <div>
      <h1>Home Sweet Home</h1>
      <Link component={RouterLink} variant="body1" to="/notes">Notes</Link>
    </div>
  )
}
