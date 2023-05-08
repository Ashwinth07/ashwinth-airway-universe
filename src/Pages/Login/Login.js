import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Utilis/Authentication";
import "./login.css";
import Navbars from "../../components/Navbar";

function Login() {
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
  
    // To show the pass
    const [showpass, setShowpass] = useState(false);
    const [noMatch, setNoMatch] = useState(false);
  
    //to use the authendication and the other
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
  
    const removeMargin = {
      marginBottom: 0,
    };
  
    const submit = async (e) => {
      e.preventDefault();
      const response = await fetch("https://lemon-cygnet-fez.cyclic.app/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          newpassword: password,
        }),
      });
      const json = await response.json();
      console.log(json);
      if (json.status === "Success") {
        auth.login(json.data[0].username);
        localStorage.setItem("username", json.data[0].username);
        localStorage.setItem("id", json.data[0]._id);
        localStorage.setItem("admin", json.data[0].isAdmin);
        navigate(location.state ? location.state.path : "/", { replace: true });
        setPassword("");
        setemail("");
      } else {
        setNoMatch(true);
        navigate("/login");
      }
    };
    const forgotPassword = () => {
      navigate("/forgetpassword");
    };
    return (
      <>
       <Navbars></Navbars>
        <div className="loginMainContainter">
          <div className="loginFormContainer">
            <h5 style={{ textAlign: "center", marginBottom: "10px" }}>login</h5>
            <Form onSubmit={submit}>
              <Form.Group controlId="login-form-name" className="mb-3">
                <Form.Label style={removeMargin}>Username or email</Form.Label>
                <Form.Control
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setemail(e.target.value);
                    setNoMatch(false);
                  }}
                  autoComplete="off"
                  placeholder="Username or Email"
                />
              </Form.Group>
              <Form.Group controlId="login-form-password">
                <Form.Label style={removeMargin}>Password</Form.Label>
                <Form.Control
                  type={showpass ? "text" : "password"}
                  value={password}
                  autoComplete="off"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setNoMatch(false);
                  }}
                  placeholder="Password"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Show password"
                  onChange={() => setShowpass(!showpass)}
                />
                {noMatch && (
                  <div className="centerContents">
                    <Form.Text style={{ color: "red" }}>
                      username and password mismatches
                    </Form.Text>
                  </div>
                )}
              </Form.Group>
              <div className="loginButtonContainer">
                <Button
                  variant="outline-primary"
                  type="button"
                  onClick={() => forgotPassword()}
                >
                  Forgot password
                </Button>
                <Button variant="outline-primary" type="submit">
                  Login
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </>
    );
}

export default Login;