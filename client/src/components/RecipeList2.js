import React, {Component} from 'react';
import {connect} from "react-redux";
import {Loader} from "./utils/Loader";
import '../css/list.css';
import {Button} from "reactstrap";
import {showModal} from "../redux/modalReducer";
import axios from 'axios';
import {NotAuth} from "./utils/NotAuth";
import history from '../utils/history';
import "../css/recipeItem.css";
import "../css/grid.css";

class RecipeList2 extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            err: null,
            role: localStorage.getItem("role"),
            recipes: []
        }
    }

    async componentDidMount() {
        console.log(this.props.mode);
        let url = this.props.mode === "all" ? "/recipes" : "/users/" + localStorage.getItem("id") + "/favourites";
        axios.get(url)
            .then(response => {
                console.log(response);
                this.setState({recipes: response.data, loading: false})
            })
            .catch(err => this.setState({err: err, loading: false}))
    }

    render() {
        const recipeList = this.state.recipes.map(el => {
                return (
                    <li>
                        <div className="recipeItem" key={el.id} onClick={() => history.push("/home/recipes/"+el.id)}>
                            <h4>{el.title}</h4>
                            <img src={"http://192.168.0.165:8080/downloadFile/" + el.picture} alt=""/>
                            <div className="info">
                                <div>Author</div>
                                <div>{el.author}</div>
                            </div>
                        </div>
                    </li>
                );
            }
        );

        if(this.state.loading) {
            return <Loader/>;
        }

        if(this.state.err) {
            return <NotAuth/>;
        }

        return (
            <div className="content">
                <ul className="grid">
                    {recipeList}
                </ul>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editRecipe: recipe => {
            dispatch(showModal('EDIT_RECIPE', {recipe, dispatch}));
        },
        newRecipe: () => {
            dispatch(showModal('RECIPE_MODAL'), {mode: 'new', dispatch})
        }
    }
};

export default connect(null, mapDispatchToProps)(RecipeList2);
