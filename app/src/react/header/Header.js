import React from 'react';
import './Header.css';
import {Route, Router} from "react-router-dom";
import RecipeList from "../recipe/RecipeList";
import FakeHome from "../../FakeHome";
import myHistory from "../history/History";
import UserList from "../user/UserList";
import {logout} from "../../redux/domain/logout";
import {connect} from "react-redux";
import ModalRoot from "../modals/rootModal";
import {changeCard} from "../../redux/domain/nav";
import RecipeDetails from "../recipe/RecipeDetails";
import {Switch} from "react-router";

class Header extends React.Component {

    state = {
        active: this.props.card
    };

    navigate = (url) => {
        this.props.changeCard(url);
        myHistory.push(url);
    };

    render() {
        return (
            <div>
                <ModalRoot/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2">
                            <div className={this.props.card === '/home/favourites' ? "flex-container-active" : "flex-container"} onClick={() => this.navigate("/home/favourites")}>
                                <i className="fas fa-heart" style={{ fontSize: '2em' }} />
                                Favourites
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className={this.props.card === '/home/recipes' ? "flex-container-active" : "flex-container"} onClick={() => this.navigate("/home/recipes")}>
                                <i className="fas fa-utensils" style={{ fontSize: '2em' }} />
                                Recipes
                            </div>
                        </div>
                        <div className="col-md-4">
                                <div className={this.props.card === '/home' ? "flex-container-active" : "flex-container"} onClick={() => this.navigate("/home")}>
                                    <h2>•&nbsp;Yokka&nbsp;•</h2>
                                </div>
                        </div>
                        {this.props.admin &&<div className="col-md-2">
                            <div className={this.props.card === '/home/users' ? "flex-container-active" : "flex-container"} onClick={() => this.navigate("/home/users")}>
                                <i className="fas fa-users" style={{ fontSize: '2em' }} />
                                Users
                            </div>
                        </div>}
                        <div className="col-md-2 ml-auto">
                            <div className="flex-container" onClick={this.props.logout}>
                                <i className="fas fa-sign-out-alt" style={{ fontSize: '2em' }} />
                                Logout
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <Switch>
                        <Route exact path="/home" component={FakeHome}/>
                        <Route exact path="/home/recipes" component={RecipeList}/>
                        <Route path="/home/recipes/:id" component={RecipeDetails}/>
                        <Route path="/home/users" component={UserList}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        admin: state.auth.user.role === 'ROLE_ADMIN',
        card: state.nav.card
    }
};

export default connect(mapStateToProps, {logout, changeCard})(Header);