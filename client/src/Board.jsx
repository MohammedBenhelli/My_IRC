import React from "react";
import socket from "./socket";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.username
        };
    };

    componentDidMount() {
        socket.emit("getBoard", "");
    };

    render() {
        return(
            <>
                <h2>Hello {this.state.username}</h2>
            </>
        )
    };
};