import { Button, ListItem, ListItemText } from '@material-ui/core'
import React from 'react'
import { db } from '../firebase'

export default function TodoListItem2({ todo, inprogress, id }) {
  
  function toggleInProgress() {
    db.collection("todos2").doc(id).update({
      inprogress: !inprogress
    });
  }

  function deleteTodo() {
    db.collection("todos2").doc(id).delete();
  }
  
  return (
    <div className='d-flex'>
      <ListItem>
        <ListItemText primary={todo} secondary={inprogress ? "In Progress ⏳" : "Completed ✅"} />
      </ListItem>

      <Button onClick={toggleInProgress}>{inprogress ? "Done" : "Undone"}</Button>
      <Button onClick={deleteTodo}>X</Button>
    </div>
  )
}
