import React from "react";

export default function UserError() {
    return (
        <span style={{
            position: "fixed",
            left: 0,
            right: 0,
            top: "50%",
            marginTop: "-0.5rem",
            textAlign: "center",
        }}>
            <h1> Unfortunately you have not been registered.</h1>
            <h2>Please try to register again. </h2>
            <br />
            <h3>
                If you are unsuccessful in that attempt please contact your supervisor.
            </h3>
            <br></br>
            <br></br>

        </span>
    );
}