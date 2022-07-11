import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import { NotesContext } from "./components/Notes/NotesContext";

import Home from "./components/Home/Home";
import ListNotes from "./components/Notes/ListNotes";
import AddNote from "./components/Notes/AddNote";
import UpdateNote from "./components/Notes/UpdateNote";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [noteState, setNoteState] = React.useState(undefined);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotesContext.Provider value={{ noteState, setNoteState }}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/notes" element={<ListNotes />} />
            <Route path="/notes/add" element={<AddNote />} />
            <Route path="/notes/update" element={<UpdateNote />} />
          </Routes>
        </Router>
      </NotesContext.Provider>
    </ThemeProvider>
  );
}

export default App;
