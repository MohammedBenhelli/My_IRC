import React from "react";
import socket from "./socket";
import { Form, Button, Col, Container, Row } from "react-bootstrap";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            chat: [],
            newChat: ""
        };
    };

    componentDidMount() {
        socket.emit("getBoard", "");
        socket.on("board", (val) =>{
            this.setState({chat: JSON.parse(val)});
        })
    };

    setChat = (e) => {
        this.setState({newChat: document.getElementById("chat").value})
    };

    sendChat = (e) => {
        e.preventDefault();
        socket.emit("chat", this.state.newChat);
    };

    render() {
        return(
            <>
                <h2>Hello {this.state.username}</h2>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group controlId="chat">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control onChange={this.setChat} type="text" placeholder="Enter an chat name" />
                            </Form.Group>
                            <Button onClick={this.sendChat} variant="primary">
                                Create
                            </Button>
                        </Form>
                    </Col>
                    <Col>
                        Chat List
                        {
                            this.state.chat.map((x, i) =>
                                <p key={i}>{x.name}</p>
                            )
                        }
                    </Col>
                </Row>
            </>
        )
    };
};