import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Box, Stack, Button } from '@mui/material'
import configData from '../../configData.json'
import NoteFormField from './NoteFormField'

export default function AddNote() {
  const { handleSubmit, control } = useForm()

  const navigate = useNavigate()

  const saveData = async (data) => {
    const notePostEndpoint = configData.AWS_REST_ENDPOINT + "/note"

    await axios.post(notePostEndpoint, {
      "note": data.note
    })
    navigate('/notes')
  }

  return (
    <Box sx={{padding: '1em'}}>
      <form onSubmit={handleSubmit((data) => saveData(data))}>
        <Stack spacing={2}>
          <NoteFormField control={control}/>
          <Button type="submit" variant="contained" size="large">
            Create Note
          </Button>
        </Stack>
      </form>
    </Box>
  )
}
