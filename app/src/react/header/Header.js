import React from 'react';
import './Header.css';
import Theme from '../colors/index';

export default class Header extends React.Component {



    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <div className="flex-container">
                            <i className="fas fa-heart" style={{ fontSize: '2em' }} />
                            Favourites
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="flex-container">
                            <i className="fas fa-utensils" style={{ fontSize: '2em' }} />
                            Recipes
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="flex-container">
                            <h2>•&nbsp;Yokka&nbsp;•</h2>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="flex-container">
                            <i className="fas fa-users" style={{ fontSize: '2em' }} />
                            Users
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="flex-container">
                            <i className="fas fa-sign-out-alt" style={{ fontSize: '2em' }} />
                            Logout
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}