import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Card, CardBody, Container } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { login } from "../modules/authManager";



export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => navigate("/"))
      .catch(() => alert("Invalid email or password"));
  };

  return (
    <main className="main-content">
      <Container>
        <Card>

          <CardBody>
            <Form>
              {/* <Form onSubmit={loginSubmit}> */}
              <fieldset>
                <FormGroup>
                  <div className={"form-floating mb-3"}>
                    <input className="form-control"
                      placeholder="Email Address"
                      id="email"
                      type="text"
                      autoComplete="off"
                      autoFocus
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Label for="email">Email Address</Label>
                  </div>
                </FormGroup>
                <FormGroup>
                  <div className={"form-floating mb-3"}>
                    <input className="form-control"
                      placeholder="Email Address"
                      id="password"
                      autoComplete="off"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Label for="password">Password</Label>
                  </div>
                  <button className="btn btn-primary mt-3"
                    onClick={loginSubmit}>Login</button>
                </FormGroup>
              </fieldset>
            </Form>
          </CardBody>
        </Card>
      </Container>
    </main>

  );
}