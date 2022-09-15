import React, { useState, useEffect } from "react"
import { Card, Button, Alert, Container, Row, Col } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);

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
          <Col>
            <Card className="w-100 text-center my-2 border-0">
              <h4>Enter task for Shai</h4>
              <input placeholder="Enter"/>
            </Card>
          </Col>
          <Col>
            <Card className="w-100 text-center my-2 border-0">
              <h4>Enter task for Dee</h4>
              <input placeholder="Enter"/>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}


/*
          <Card>
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
*/