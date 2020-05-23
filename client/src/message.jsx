import React from "react";
import socket from "./socket";
import { Form, Button, Col, Container, Row } from "react-bootstrap";

export default class Message extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            username: props.username,
            messages: JSON.parse(props.messages)
        };
    };

    render() {
        return (
            <>
                {Object.keys(this.state.messages).map( (x, i) => 
                    <p>
                        {this.state.messages[x].text}
                    </p>
                )}
            </>
        );
    }
}