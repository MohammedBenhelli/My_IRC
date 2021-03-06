import React from "react";
import socket from "./socket";
import {Form, Button, Col, Container, Row} from "react-bootstrap";
import Message from "./message";

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            chat: [],
            newChat: "",
            messages: [],
            board: "",
            usernameNew: ""
        };
    };

    componentDidMount() {
        socket.emit("getBoard", "");
        socket.on("board", (val) => {
            this.setState({chat: JSON.parse(val)});
        });
        socket.on("/errorBoard", () => alert("This board already exists!"));
    };

    changeChannel = (e) => {
        if (this.state.board !== "" && e.target.innerHTML !== this.state.board)
            socket.emit("newMessage", {
                message: `${this.state.username} has joined the board.`,
                autor: this.state.username,
                board: this.state.board
            });
        this.setState({board: e.target.innerHTML});
        socket.emit("getBoardMessages", e.target.innerHTML);
        socket.on("sendBoardMessages", (val) => {
            this.setState({messages: JSON.parse(val).messages});
            console.log(this.state.messages)
        });
        socket.on("refreshBoard", (val) => {
            if (val === this.state.board) ;
            socket.emit("getBoardMessages", this.state.board);
        });
    }

    setChat = (e) => {
        this.setState({newChat: document.getElementById("chat").value})
    };

    sendChat = (e) => {
        e.preventDefault();
        socket.emit("chat", this.state.newChat);
        socket.emit("getBoard", "");
    };

    setUsername = (e) => {
        this.setState({usernameNew: document.getElementById("username").value})
    };

    sendUsername = (e) => {
        e.preventDefault();
        if (this.state.usernameNew.length > 2) {
            this.setState({username: this.state.usernameNew})
            socket.emit("/nick", this.state.usernameNew);
        }
        else alert("Too short.");

    };

    render() {
        return (
            <>
                <h2>Hello {this.state.username}</h2>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group controlId="chat">
                                <Form.Label>New channel:</Form.Label>
                                <Form.Control onChange={this.setChat} type="text" placeholder="Enter an chat name"/>
                            </Form.Group>
                            <Button onClick={this.sendChat} variant="primary">
                                Create
                            </Button>
                        </Form>
                        <Form>
                            <Form.Group controlId="username">
                                <Form.Label>Change your username:</Form.Label>
                                <Form.Control onChange={this.setUsername} type="text" placeholder="Enter an username"/>
                            </Form.Group>
                            <Button onClick={this.sendUsername} variant="primary">
                                Change
                            </Button>
                        </Form>
                    </Col>
                    <Col>
                        <Message username={this.state.username} board={this.state.board}
                                 messages={JSON.stringify(this.state.messages)}/>
                    </Col>
                    <Col>
                        Channel
                        {
                            Object.keys(this.state.chat).map((x, i) =>
                                <p style={{cursor: "pointer"}} onClick={this.changeChannel} className="text-primary"
                                   key={i}>{this.state.chat[x].name}</p>
                            )
                        }
                    </Col>
                </Row>
            </>
        )
    };
};