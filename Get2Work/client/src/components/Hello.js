import React from "react";

export default function Hello() {
  return (
    <span style={{
      position: "fixed",
      left: 0,
      right: 0,
      top: "50%",
      marginTop: "-0.5rem",
      textAlign: "center",
    }}>
      <h1> Congratulations you are successfully registered in the system..</h1>
      <br></br>
      <br></br>
      <h3>You currently have no jobs scheduled. Your manager will notify you after you have been scheduled.</h3>
      <h3>You will use the same user name and password to login in next time and complete jobs assigned to you.</h3>
    </span>
  );
}