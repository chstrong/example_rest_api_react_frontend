import React from 'react'
import { useNavigate } from 'react-router-dom'
import configData from '../../configData.json'
import axios from 'axios'
import { Card, CardContent, CardActions, Typography, Box, Button, IconButton } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh';
import { NotesContext } from './NotesContext'

export default function ListNotes() {
  const navigate = useNavigate()

  const [ notes, setNotes ] = React.useState([])

  const { noteState, setNoteState} = React.useContext(NotesContext)

  async function fetchNotes() {
    const notesGetEndpoint = configData.AWS_REST_ENDPOINT + "/notes"

    try {
      const response = await axios.get(notesGetEndpoint)
      setNotes(response.data)
    } catch(error) {
      console.error(error)
    }

  }

  function refreshNotes() {
    fetchNotes()
  }

  function addNote() {
    navigate('/notes/add')
  }

  function updateNote(note) {
    setNoteState(note)
    navigate('/notes/update')
  }

  async function deleteNote(note) {
    const noteDeleteEndpoint = configData.AWS_REST_ENDPOINT + "/note/" + note.id.S
  
    try {
      await axios.delete(noteDeleteEndpoint)
      fetchNotes()
    } catch(error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    fetchNotes()
    console.log(notes)
  }, [])

  return (
    <div>
      <Box sx={{textAlign: 'right', padding: '20px'}}>
        <IconButton color="secondary" onClick={() => {refreshNotes()}}>
          <RefreshIcon/>
        </IconButton>
        <Button variant="contained" onClick={() => {addNote()}}>Create</Button>
      </Box>
      {notes?.length > 0 ? (
        <div>
          {notes.map((note) => (
            <Box key={note.id.S} sx={{paddingLeft: '1em', paddingRight: '1em', paddingBottom: '1em'}}>
              <Card sx={{border: '1px solid gray'}}>
                <CardContent>
                  <Typography>{note.note.S}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => {updateNote(note)}}>Update</Button>
                  <Button size="small" color="error" onClick={() => {deleteNote(note)}}>Delete</Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </div>
      ) : (
        <div>No notes have been found.</div>
      )}
    </div>
  )
}
