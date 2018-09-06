import React, {Component} from 'react';
import "./Welcome.css";
import {connect} from "react-redux";
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import SideNav, {Nav, NavHeader, NavIcon, NavItem, NavText, NavTitle, Toggle} from './StyledSideNav';
import UserList from "../usersList/Users";
import {FakeHome} from "../../FakeHome";
import Recipes from "../recipesList/Recipes";
import {changeCard} from "../../redux/domain/nav";
import {logout} from "../../redux/domain/logout";

class Welcome extends Component {
    state = {
        expanded: false
    };

    onSelect = (selected) => {
        if(selected === 'logout') {
            this.props.logout();
            return;
        }
        this.props.changeCard(selected);
    };

    onToggle = (expanded) => {

        this.setState({ expanded: expanded });
    };

    renderMain() {
        const selected = this.props.card;
        switch(selected) {
            case 'home':
                return <FakeHome/>;
            case 'recipes':
                return <Recipes/>;
            case 'users':
                return <UserList/>;
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
                    <Nav defaultSelected={this.props.card}>
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
      admin: state.auth.user.role === 'ROLE_ADMIN',
      card: state.nav.card
  }
};

export default connect(mapStateToProps, {logout, changeCard})(Welcome);
