import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {Loader} from "../loader/Loader";
import './Recipes.css';
import {fetchRecipes} from "../../redux/domain/recipes";

class Recipes extends Component{

    componentDidMount() {
        this.props.fetchRecipes();
    }



    render() {
        const recipeList = this.props.recipes.map(el =>
            {
                return <tr key={el.id}>
                    <td>{el.id}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{el.title}</td>
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

export default connect(mapStateToProps,{fetchRecipes})(Recipes);
