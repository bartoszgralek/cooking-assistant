import React from "react";
import {Redirect} from "react-router";
import connect from "react-redux/es/connect/connect";

export default (ProtectedRoute) => {
    class AuthHOC extends React.Component {

        render () {
            // Return a Loading component while the isLoading function is 'true'
            if (!this.props.user) {
                return <Redirect to="/"/>
            }
            // Pass the received 'props' and created functions to the ProtectedRoute component
            return (
                <ProtectedRoute
                    {...this.props}
                />
            )
        }
    }

    const mapStateToProps = state => {
        return {
            user: state.auth.user
        }
    };

    return connect(mapStateToProps)(AuthHOC);
};
