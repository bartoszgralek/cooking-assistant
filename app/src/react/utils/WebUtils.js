import {connect} from "react-redux";
import {Base64} from "js-base64";

const fetchData = props => async(url, method, body) => {

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Base64.btoa(props.username + ":" + props.password)
            },
            body: body
        });
        console.log(response);
        return response;
    } catch (err) {
        console.log(err);
    }
};

const mapStateToProps = state => {
    return{
        user: state.auth.user
    }
};

export const SENDREQUEST = connect(mapStateToProps)(fetchData);
