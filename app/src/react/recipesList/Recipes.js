import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {Loader} from "../loader/Loader";
import './Recipes.css';
import {Button, ButtonGroup} from "reactstrap";

class Recipes extends Component{

    async componentDidMount() {
        await this.props.getRecipes();
    }

    render() {
        const recipeList = this.props.recipes.map(el =>
            {
                return <tr key={el.id}>
                    <td>{el.id}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{el.title}</td>
                    <td><ButtonGroup>
                        <Button color="primary">Edit</Button>
                        <Button color="danger" onClick={() => this.props.deleteRecipeById(el.id)}>Delete</Button>
                    </ButtonGroup></td>
                </tr>
            }
        );


        if(this.props.isLoading){
            return <Loader/>
        }
        if(this.props.error) {
            return <h2>You are not authorized!</h2>;
        }
        return (
            <div className="recipes">
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
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
