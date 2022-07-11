import React from "react"
import { Controller } from 'react-hook-form'
import { TextField } from '@mui/material'

export default function NoteFormField({ control, value=""}) {
  return (
    <Controller
      name="note"
      control={control}
      defaultValue={value}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          label="Note"
          variant="outlined"
          value={value}
          onChange={onChange}
          error={!!error}
          helperText={error ? error.message : null}
        />
      )}
      rules={{ required: "Note is required" }}
    />
  );
}
