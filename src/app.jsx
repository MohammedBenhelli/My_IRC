import React from "react";
import socketIOClient from "socket.io-client";
const URL = "http://127.0.0.1:4242";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        const socket = socketIOClient(URL);
        socket.on("connect", data => {
            this.setState({connect: data});
        });
    };

    render() {
        return (
            <>
                test {this.state.connect}
            </>
        );
    };
};