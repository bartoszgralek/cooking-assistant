import React, { Component } from "react";
import {stop, play, init, close} from "../utils/voiceContinuous.js";

class SpeechContinuous extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recording: false
        }
    }

    componentDidMount() {
        init();
    }

    componentWillUnmount() {
        close();
    }

    render() {
        return (
            <div>
                <h2>SPEECH CONTINUOUS</h2>
                <p>Cras facilisis urna ornare ex volutpat, et
                    convallis erat elementum. Ut aliquam, ipsum vitae
                    gravida suscipit, metus dui bibendum est, eget rhoncus nibh
                    metus nec massa. Maecenas hendrerit laoreet augue
                    nec molestie. Cum sociis natoque penatibus et magnis
                    dis parturient montes, nascetur ridiculus mus.</p>

                <p>Duis a turpis sed lacus dapibus elementum sed eu lectus.</p>
                {!this.state.recording ?
                    <button type="button" className="btn btn-primary" onClick={
                        () => {play();this.setState({recording: true});}
                    }>Play</button> :
                    <button type="button" className="btn btn-danger" onClick={
                        () => {stop();this.setState({recording: false});}
                    }>Stop</button>
                }
            </div>
        );
    }
}

export default SpeechContinuous;