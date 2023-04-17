import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveNote } from '../../../store/journal/journalSilce'

export const SideBarItem = ({title = '', body, id, date, imageUrls}) => {

    const dispatch = useDispatch()
    const newTitle = useMemo( ()=> {
        return title.length > 17
            ? title.substring(0,17) + '...'
            : title
    }, [ title ] )

    const onActive = () => {
        console.log({title, body, id});
        dispatch(setActiveNote({title, body, id, date, imageUrls}))
    }

    return (
        <ListItem key={id} onClick={onActive} >
            <ListItemButton>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={title}></ListItemText>
                    <ListItemText secondary={body}></ListItemText>

                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
