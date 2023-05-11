import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Container, Card, CardBody } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { register } from "../modules/authManager";

export default function Register() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      const userProfile = {
        firstName,
        lastName,
        email,
        phoneNumber
      };
      register(userProfile, password).then(() => navigate("/"));
    }
  };

  return (
    <main className="main-content">
      <Container>
        <Card>

          <CardBody>
            <Form>
              <fieldset>
                <FormGroup>
                  <div className="form-floating mb-3">
                    <input
                      autoComplete="off"
                      className="form-control"
                      id="firstName"
                      type="text"
                      placeholder="First Name"
                      autoFocus
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <Label htmlFor="firstName" >First Name</Label>
                  </div>
                </FormGroup>
                <FormGroup>
                  <div className="form-floating mb-3">
                    <input
                      autoComplete="off"
                      className="form-control"
                      id="lastName"
                      placeholder="First Name"
                      type="text"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <Label htmlFor="lastName">Last Name</Label>
                  </div>
                </FormGroup>
                <FormGroup>
                  <div className="form-floating mb-3">
                    <input
                      autoComplete="off"
                      className="form-control"
                      placeholder="Display Name"
                      id="email"
                      type="text"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Label for="email">Email</Label>
                  </div>
                </FormGroup>
                <FormGroup>
                  <div className="form-floating mb-3">
                    <input
                      autoComplete="off"
                      className="form-control"
                      placeholder="Phone Number"
                      id="phoneNumber"
                      type="text"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                  </div>
                </FormGroup>
                <FormGroup>
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      autoComplete="off"
                      placeholder="Password"
                      id="password"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Label for="password">Password</Label>
                  </div>
                </FormGroup>
                <FormGroup>
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      autoComplete="off"
                      placeholder="Confirm Password"
                      id="confirmPassword"
                      type="password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Label for="confirmPassword">Confirm Password</Label>
                  </div>
                </FormGroup>
                <FormGroup>
                  <button className="btn btn-primary mt-3"
                    onClick={registerClick}>Register</button>
                </FormGroup>
              </fieldset>
            </Form>
          </CardBody>
        </Card>
      </Container>
    </main>
  );
}
