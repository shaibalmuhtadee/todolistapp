import React, { useState, useEffect } from "react"
import { Card, Button, Alert, Container, Row, Col } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { TextField } from "@material-ui/core"
import { db } from "../firebase"
import firebase from "firebase"
import TodoListItem from "./Todo"
import TodoListItem2 from "./Todo2"

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);
  
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    getTodos();
    getTodos2();
  }, []); // run only on first launch
  function getTodos() {
    db.collection("todos").onSnapshot(function (querySnapshot) {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          inprogress: doc.data().inprogress
        }))
      );
    });
  }
  function addTodo(e) {
    e.preventDefault();
    
    db.collection("todos").add({
      inprogress: true,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      todo: todoInput,
    });

    setTodoInput("");
  }

  const [todoInput2, setTodoInput2] = useState("");
  const [todos2, setTodos2] = useState([]);
  function getTodos2() {
    db.collection("todos2").onSnapshot(function (querySnapshot) {
      setTodos2(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          inprogress: doc.data().inprogress
        }))
      );
    });
  }
  function addTodo2(e) {
    e.preventDefault();
    
    db.collection("todos2").add({
      inprogress: true,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      todo: todoInput2,
    });

    setTodoInput2("");
  }

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <Card className="h-100">
              <Card.Body>
                <h2 className="text-center mb-4">Profile</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <strong>Email:</strong> {currentUser.email}
                <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                  Update Profile
                </Link>
                <div className="w-100 text-center mt-3">
                  <Button className="btn-primary w-100 text-white" onClick={handleLogout}>
                    Log Out
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="h-100">
              <h2 className="text-center my-4">Good Morning</h2>
              <h4 className="text-center my-4">Today is&#58;&nbsp;
                {' '}
                {dateState.toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </h4>
              <h4 className="text-center my-4">The time is&#58;&nbsp;
                {dateState.toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                })}
              </h4>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <Card className="w-100 text-center my-2 border-0">
              <h4>His</h4>
              <Row className="mx-2 align-items-center">
                <form className="w-100">
                  <TextField 
                    className="col-10 pr-2"
                    id="standard-basic" 
                    label="Write a Todo"
                    value={todoInput}
                    onChange={(e) => setTodoInput(e.target.value)}
                  />
                  <Button type="submit" onClick={addTodo} className="col-2">Add</Button>
                </form>
              </Row>
              {todos.map((todo) => (
                <TodoListItem 
                  todo={todo.todo} 
                  inprogress={todo.inprogress} 
                  id={todo.id} />
              ))}
            </Card>  
          </Col>
          <Col sm={6}>
            <Card className="w-100 text-center my-2 border-0">
              <h4>Hers</h4>
              <Row className="mx-2 align-items-center">
                <form className="w-100">
                  <TextField 
                    className="col-10 pr-2"
                    id="standard-basic" 
                    label="Write a Todo"
                    value={todoInput2}
                    onChange={(e) => setTodoInput2(e.target.value)}
                  />
                  <Button type="submit" onClick={addTodo2} className="col-2">Add</Button>
                </form>
              </Row>
              {todos2.map((todo) => (
                <TodoListItem2
                  todo={todo.todo} 
                  inprogress={todo.inprogress} 
                  id={todo.id} />
              ))}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}