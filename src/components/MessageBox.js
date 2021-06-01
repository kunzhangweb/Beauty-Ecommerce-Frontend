import React from "react";

import { Alert } from "react-bootstrap";

export default function MessageBox(props) {
  return (
    // <div className={`alert alert-${props.variant || "info"}`}>
    //   {props.children}
    // </div>
    <Alert variant={props.variant || "info"}>{props.children}</Alert>
  );
}
