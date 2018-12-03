import React, { Component } from 'react';
import './App.css';
import {HashRouter, NavLink, Route} from "react-router-dom";
import Stuff from "./components/Stuff";
import Contact from "./components/Contact";
import SpeechDetect from "./components/SpeechDetect";
import SpeechContinuous from "./components/SpeechContinuous";
import Example from "./components/Example";

class App extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <h1>Simple SPA</h1>
                    <ul className="header">
                        <li><NavLink to="/stuff">Stuff</NavLink></li>
                        <li><NavLink to="/contact">Contact</NavLink></li>
                        <li><NavLink to="/detect">Speech Detect</NavLink></li>
                        <li><NavLink to="/continuous">Speech Continuous</NavLink></li>
                        <li><NavLink to="/example">Example</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route path="/stuff" component={Stuff}/>
                        <Route path="/contact" component={Contact}/>
                        <Route path="/detect" component={SpeechDetect}/>
                        <Route path="/continuous" component={SpeechContinuous}/>
                        <Route path="/example" component={Example}/>
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default App;
