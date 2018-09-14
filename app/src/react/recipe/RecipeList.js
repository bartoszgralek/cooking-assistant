import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {Loader} from "../loader/Loader";
import '../style/List.css';
import {Button, ButtonGroup} from "reactstrap";
import {showModal} from "../../redux/domain/modal";
import {changeCard} from "../../redux/domain/nav";
import RecipeDetails from "./RecipeDetails";
import {NotAuth} from "../loader/Unauth";
import myHistory from "../history/History";

class RecipeList extends Component{


    async componentDidMount() {
        await this.props.getRecipes();
    }

    render() {
        const recipeList = this.props.recipes.map(el => {
                return <tr key={el.id} onClick={() => myHistory.push("/home/recipes/"+el.id)}>
                    <td>{el.id}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{el.title}</td>
                    <td><ButtonGroup>
                        <Button color="primary" onClick={(ev) => {this.props.editRecipe(el);ev.stopPropagation();}}>Edit</Button>
                        <Button color="danger" onClick={(ev) => {this.props.deleteRecipeById(el.id);ev.stopPropagation();}}>Delete</Button>
                    </ButtonGroup></td>
                </tr>
            }
        );


        if (this.props.isLoading) {
            return <Loader/>;
        }
        if (this.props.error) {
            return <NotAuth/>;
        }

        return (
            <div className="list">
                <h2>Recipe list</h2>
                <table className="table">
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>title</th>
                        <th>actions</th>
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

function mapStateToProps(state){
    return {
        recipes: state.recipesReducer.recipes,
        isLoading: state.recipesReducer.isLoading,
        error: state.recipesReducer.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getRecipes: () => {
            dispatch({
                type: 'GET',
                payload: {
                    reducer: 'RECIPES',
                    url: "/recipes",
                }
            });
        },
        deleteRecipeById: id => {
            dispatch({
                type: 'DELETE',
                payload: {
                    reducer: 'RECIPES',
                    url: '/recipes/'+id
                }
            })
        },
        editRecipe: recipe => {
            dispatch(showModal('EDIT_RECIPE',{recipe, dispatch}));
        },
        changeCard: (card) => dispatch({
            type: 'SET_NAV',
            payload: card
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);
