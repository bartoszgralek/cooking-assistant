import React, {Component} from "react";
import './Home.css';
import {Button, Jumbotron,} from 'reactstrap';
import * as Auth from '../utils/Auth';
import myHistory from '../history/History';

class Home extends Component {

    handleMove = () => {
        Auth.isAuth() ? myHistory.push("/welcome") : myHistory.push("/login");
    };

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1 className="display-3">Hello, world!</h1>
                    <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
                    <hr className="my-2" />
                    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                    <p className="lead">
                        <Button color="primary" onClick={this.handleMove}>Sign In</Button>
                    </p>
                </Jumbotron>
            </div>
        );
    }
}



export default Home;
