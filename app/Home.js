import React, { Component } from "react";
import axios from 'axios';
import {initialize, close, start, stop, isConnected} from "./SpeechClient";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recording: false
        }
    }

    start = async() => {
        if(!isConnected()) {
            await initialize();
        }
        start();

        this.setState({
            recording: true,
        });
    };

    stop = () => {
        if(isConnected()) {
            stop();
        }

        this.setState({
            recording: false
        });
    };

    componentWillUnmount() {
        if(isConnected()) {
            close();
        }
    }


    sendRequest = () => {
        axios.defaults.headers.common['Authorization'] = "Basic " + btoa("user:user");
        axios.get('http://localhost:8080/login')
            .then(response => console.log(response))
            .catch(error => console.log(error))
            .then(() => console.log("end"));
    };

    render() {
        let recording = this.state.recording;
        return (
            <div>
                <h2>HELLO</h2>
                <p>Cras facilisis urna ornare ex volutpat, et
                    convallis erat elementum. Ut aliquam, ipsum vitae
                    gravida suscipit, metus dui bibendum est, eget rhoncus nibh
                    metus nec massa. Maecenas hendrerit laoreet augue
                    nec molestie. Cum sociis natoque penatibus et magnis
                    dis parturient montes, nascetur ridiculus mus.</p>

                <p>Duis a turpis sed lacus dapibus elementum sed eu lectus.</p>
                <button className="btn btn-primary" onClick={this.sendRequest}>Send request</button>
                {!recording ?
                    <button className="btn btn-info" onClick={this.start}>Start Assistant</button> :
                    <button className="btn btn-danger" onClick={this.stop}>Stop Assistant</button>
                }
            </div>
        );
    }
}

export default Home;