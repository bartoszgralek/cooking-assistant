import React, {Component} from 'react';
import {connect} from "react-redux";
import {Loader} from "./utils/Loader";
import {Button, ButtonGroup} from "reactstrap";
import {showModal} from "../redux/modalReducer";
import axios from 'axios';
import {NotAuth} from "./utils/NotAuth";
import "../css/grid.css";
import "../css/recipeItem.css";

class RecipeList extends Component{
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
        axios.get('/recipes')
            .then(response => {
                console.log(response);
                this.setState({recipes: response.data, loading: false})
            })
            .catch(err => this.setState({err: err, loading: false}))
    }

    deleteRecipe = (recipe) => {
        axios.delete("/recipes/"+recipe.id);
        this.setState(previous => {
            return {
                recipes: previous.recipes.filter(el => el.id !== recipe.id)
            }
        });
    };

    render() {
        const recipeList = this.state.recipes.map(el => {
                return <tr key={el.id} onClick={() => this.props.history.push("/home/recipes/"+el.id)}>
                    <img src={el.picture}/>
                    <td style={{whiteSpace: 'nowrap'}}>{el.title}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{el.author}</td>
                    {this.state.role === 'ROLE_ADMIN' ? <td style={{whiteSpace: 'nowrap'}}>
                        <ButtonGroup>
                            <Button color="primary" onClick={(ev) => {this.props.editRecipe(el); ev.stopPropagation();}}>Edit</Button>
                            <Button color="danger" onClick={(ev) => {this.deleteRecipe(el); ev.stopPropagation();}}>Delete</Button>
                        </ButtonGroup>
                    </td> : null}
                </tr>
            }
        );

        if(this.state.loading) {
            return <Loader/>;
        }

        if(this.state.err) {
            return <NotAuth/>;
        }

        return (
            <div className="list content">
                <h2>Recipe list</h2>
                <table className="table">
                    <thead>
                    <tr>
                        <th>picture</th>
                        <th>title</th>
                        <th>author</th>
                        {this.state.role === 'ROLE_ADMIN' ? <th>actions</th> : null}
                    </tr>
                    </thead>
                    <tbody>
                    {recipeList}
                    </tbody>
                </table>
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

export default connect(null, mapDispatchToProps)(RecipeList);
