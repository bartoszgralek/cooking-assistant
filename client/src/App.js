import React, {Component} from 'react';
import "./css/bars.css";
import "./css/topnav.css";
import "./css/list.css";
import "./css/content.css"
import {
    NavLink,
    Route
} from "react-router-dom";
import Home from './components/Home.js';
import RecipeList2 from "./components/RecipeList2";
import ModalRoot from './modals/rootModal';
import {logout} from './utils/access';
import RecipeDetails from "./components/RecipeDetails";
import UserList from "./components/UserList";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    toggle = () => {
        this.setState({
            open: !this.state.open
        })
    };

    render() {
        return (
            <div>
                <ModalRoot/>
                <div className={"bars" + (this.state.open ? " open" : "")}>
                    <NavLink exact to="/home" className="logo" onClick={() => {
                        if(this.state.open){
                            this.setState({open: false})
                        }
                    }}>
                        <h2>•&nbsp;Yokka&nbsp;•</h2>
                    </NavLink>
                    <div onClick={this.toggle} className="icon">
                        <i className="fas fa-bars"/>
                    </div>
                </div>
                <div className={"topnav" + (this.state.open ? " open" : "")}>
                    <li onClick={this.toggle}>
                        <NavLink exact to="/home/favourites">
                            <i className="fas fa-heart"/>
                            <p>Favourites</p>
                        </NavLink>
                    </li>
                    <li onClick={this.toggle}>
                        <NavLink to="/home/recipes">
                            <i className="fas fa-utensils"/>
                            <p>Recipes</p>
                        </NavLink>
                    </li>
                    <li className="logo" onClick={this.toggle}>
                        <NavLink exact to="/home" id="logoLink">
                            <h2>•&nbsp;Yokka&nbsp;•</h2>
                        </NavLink>
                    </li>
                    {localStorage.getItem("role") === 'ROLE_ADMIN' ? <li onClick={this.toggle}>
                        <NavLink to="/home/users">
                            <i className="fas fa-users"/>
                            <p>Users</p>
                        </NavLink>
                    </li> : <li></li>}
                    <li onClick={logout}>
                        <NavLink to="/home/logout">
                            <i className="fas fa-sign-out-alt"/>
                            <p>Logout</p>
                        </NavLink>
                    </li>
                </div>
                <div>
                    <Route exact path="/home" component={Home}/>
                    <Route path="/home/favourites" render={() => <RecipeList2 mode="fav"/>} />
                    <Route path="/home/users" component={UserList}/>
                    <Route exact path="/home/recipes" render={() => <RecipeList2 mode="all"/>} />
                    <Route path="/home/recipes/:id" component={RecipeDetails}/>
                    <Route path="/home/logout" component={Home}/>
                </div>
            </div>
        )
    }
}