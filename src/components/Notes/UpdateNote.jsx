import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Box, Stack, Button } from '@mui/material'
import configData from '../../configData.json'
import NoteFormField from './NoteFormField'
import { NotesContext } from './NotesContext'

export default function UpdateNote() {
  const { handleSubmit, control } = useForm()

  const navigate = useNavigate()

  const { noteState, setNoteState } = React.useContext(NotesContext)

  const updateData = async (data) => {
    const notePutEndpoint = configData.AWS_REST_ENDPOINT + "/note/" + noteState.id.S

    await axios.put(notePutEndpoint, {
      "note": data.note
    })
    navigate('/notes')
  }

  return (
    <Box sx={{padding: '1em'}}>
      <form onSubmit={handleSubmit((data) => updateData(data))}>
        <Stack spacing={2}>
          <NoteFormField 
            control={control}
            value={noteState.note.S}  
          />
          <Button type="submit" variant="contained" size="large">
            Update Note
          </Button>
        </Stack>
      </form>
    </Box>
  )
}
