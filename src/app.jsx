import React from "react";
import socket from "./socket";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            irc: "test"
        };
    };

    componentDidMount() {
        socket.on("connect", this.getIrc);
    };

    getIrc = irc => {
        this.setState({connect: irc});
    };

    render() {
        return (
            <>
                test {this.state.connect}
            </>
        );
    };
};