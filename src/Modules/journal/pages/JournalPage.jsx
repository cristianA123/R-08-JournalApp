import { IconButton, Typography } from '@mui/material'
import React from 'react'
import { JournalLayout } from '../layout/JournalLayout'
import { NoteView, NothingSelectedView } from '../views'
import { AddOutlined } from '@mui/icons-material'

export const JournalPage = () => {
  return (
    <JournalLayout>
      {/* <Typography variant='h1' >JournalPage :D</Typography> */}

      <NothingSelectedView />
      {/* <NoteView /> */}

      <IconButton
        size= 'large'
        sx= {{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.5 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>

    </JournalLayout>
  )
}
