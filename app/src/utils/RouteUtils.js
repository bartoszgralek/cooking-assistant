import React from "react";
import {Redirect} from "react-router";
import {ISAUTHED} from "./WebUtils";

export default (ProtectedRoute) => {
    class AuthHOC extends React.Component {

        render () {
            // Return a Loading component while the isLoading function is 'true'
            if (!ISAUTHED()) {
                return <Redirect to="/login"/>
            }
            // Pass the received 'props' and created functions to the ProtectedRoute component
            return (
                <ProtectedRoute
                    {...this.props}
                />
            )
        }
    }

    return AuthHOC;
};
