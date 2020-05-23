import React from "react";
import socket from "./socket";
import { Form, Button, Col, Container, Row, Card } from "react-bootstrap";

export default class Message extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            board: props.board,
            username: props.username,
            messages: JSON.parse(props.messages),
            message: ""
        };
    };

    componentWillReceiveProps(props){
        if(props.messages !== this.state.messages)
            this.setState({messages: JSON.parse(props.messages), board: props.board});
    };

    setMessage = (e) => {
        this.setState({message: document.getElementById("message").value})
    };

    sendMessage = (e) => {
        e.preventDefault();
        socket.emit("newMessage", {
            message: this.state.message,
            autor: this.state.username,
            board: this.state.board
        });
        socket.emit("getBoard", "");
    };

    render() {
        return (
            <>
                {Object.keys(this.state.messages).map( (x, i) => 
                    <Card key={i}>
                        <Card.Subtitle>{this.state.messages[x].autor}</Card.Subtitle>
                        <Card.Body>{this.state.messages[x].text}</Card.Body>
                    </Card>
                )}
                 <Form>
                    <Form.Group controlId="message">
                        <Form.Control onChange={this.setMessage} type="text" placeholder="Enter an new message" />
                    </Form.Group>
                    <Button onClick={this.sendMessage} variant="primary">
                        Send
                    </Button>
                </Form>
            </>
        );
    }
}