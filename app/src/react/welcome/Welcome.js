import React, {Component} from 'react';
import "./Welcome.css";
import {connect} from "react-redux";
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import SideNav, {Nav, NavHeader, NavIcon, NavItem, NavText, NavTitle, Toggle} from './StyledSideNav';
import * as Auth from '../utils/Auth';
import UserList from "../usersList/Users";
import {FakeHome} from "../../FakeHome";
import Recipes from "../recipesList/Recipes";
import myHistory from "../history/History";
import {logout} from "../../redux/store";

class Welcome extends Component {
    state = {
        selected: 'home',
        expanded: false
    };

    onSelect = (selected) => {
        this.setState({ selected: selected });
        console.log("selected: " + this.state.selected);
    };
    onToggle = (expanded) => {

        this.setState({ expanded: expanded });
    };

    renderMain() {
        const {selected } = this.state;
        switch(selected) {
            case 'home':
                return <FakeHome/>;
            case 'recipes':
                return <Recipes/>;
            case 'users':
                return <UserList/>;
            case 'logout':
                Auth.logout();
                this.props.logout();
                myHistory.push("/");
                return;
            default:
                return <FakeHome/>;
        }
    };

    render() {
        const { expanded } = this.state;

        return (
            <div>
                <SideNav
                    onSelect={this.onSelect}
                    onToggle={this.onToggle}
                >
                    <Toggle />
                    <NavHeader expanded={expanded}>
                        <NavTitle>Menu</NavTitle>
                    </NavHeader>
                    <Nav defaultSelected="home">
                        <NavItem eventKey="home">
                            <NavIcon>
                                <i className="fas fa-home" style={{ fontSize: '1.75em' }} />
                            </NavIcon>
                            <NavText>
                                Home
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="recipes">
                            <NavIcon>
                                <i className="fas fa-utensils" style={{ fontSize: '1.75em' }} />
                            </NavIcon>
                            <NavText>
                                Recipes
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="favRecipes">
                            <NavIcon>
                                <i className="fas fa-heart" style={{ fontSize: '1.75em' }} />
                            </NavIcon>
                            <NavText>
                                Favourites
                            </NavText>
                        </NavItem>
                        {this.props.admin && <NavItem eventKey="users">
                            <NavIcon>
                                <i className="fas fa-users" style={{ fontSize: '1.75em' }} />
                            </NavIcon>
                            <NavText>
                                Users
                            </NavText>
                        </NavItem>}
                        <NavItem eventKey="logout" style={{position: 'absolute',width: '100%',bottom:0}}>
                            <NavIcon>
                                <i className="fas fa-sign-out-alt" style={{ fontSize: '1.75em' }} />
                            </NavIcon>
                            <NavText>
                                Logout
                            </NavText>
                        </NavItem>
                    </Nav>
                </SideNav>
                <div
                    style={{
                        marginLeft: expanded ? 240 : 64,
                    }}
                >
                    {this.renderMain()}
                </div>
            </div>
        );

    }
}

const mapStateToProps = state => {
  return {
      admin: state.accessReducer.role === 'ROLE_ADMIN'
  }
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
