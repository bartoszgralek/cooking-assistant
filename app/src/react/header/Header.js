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

class Header extends React.Component {

    state = {
        active: '/welcome/home'
    };

    navigate = (url) => {
        this.props.changeCard(url);
        myHistory.push(url);
    };

    render() {
        return (
            <Router history={myHistory}>
            <div>
                <ModalRoot/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2">
                            <div className={this.props.card === '/welcome/favourites' ? "flex-container-active" : "flex-container"} onClick={() => this.navigate("/welcome/favourites")}>
                                <i className="fas fa-heart" style={{ fontSize: '2em' }} />
                                Favourites
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className={this.props.card === '/welcome/recipes' ? "flex-container-active" : "flex-container"} onClick={() => this.navigate("/welcome/recipes")}>
                                <i className="fas fa-utensils" style={{ fontSize: '2em' }} />
                                Recipes
                            </div>
                        </div>
                        <div className="col-md-4">
                                <div className={this.props.card === '/welcome/home' ? "flex-container-active" : "flex-container"} onClick={() => this.navigate("/welcome/home")}>
                                    <h2>•&nbsp;Yokka&nbsp;•</h2>
                                </div>
                        </div>
                        {this.props.admin &&<div className="col-md-2">
                            <div className={this.props.card === '/welcome/users' ? "flex-container-active" : "flex-container"} onClick={() => this.navigate("/welcome/users")}>
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
                    <Route path="/welcome/home" component={FakeHome}/>
                    <Route path="/welcome/recipes" component={RecipeList}/>
                    <Route path="/welcome/users" component={UserList}/>
                </div>
            </div>
            </Router>
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