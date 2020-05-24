import React from "react";
import Board from "./Board";
import {Form, Button} from "react-bootstrap";
import socket from "./socket";
import "./bootstrap.min.css";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            irc: false,
            username: ""
        };
    };

    componentDidMount() {
        // socket.emit("connect", this.getIrc("oui"));
        socket.on("/errorNick", () => alert("Username already taken!"));
        socket.on("/newNick", () => this.setState({irc: true}));
    };

    getIrc = irc => {
        this.setState({connect: irc});
    };

    setUsername = (e) => {
        this.setState({username: document.getElementById("username").value})
    };

    sendUsername = (e) => {
        e.preventDefault();
        if (this.state.username.length > 2)
            socket.emit("/nick", this.state.username);
        else alert("Too short.");
        console.log(this.state.username);
    };

    render() {
        if (!this.state.irc)
            return (
                <>
                    <Form>
                        <Form.Group controlId="username">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control onChange={this.setUsername} type="text" placeholder="Enter an username"/>
                        </Form.Group>
                        <Button onClick={this.sendUsername} variant="primary">
                            Submit
                        </Button>
                    </Form>
                </>
            );
        else return (
            <>
                <Board username={this.state.username}/>
            </>
        )
    };
};