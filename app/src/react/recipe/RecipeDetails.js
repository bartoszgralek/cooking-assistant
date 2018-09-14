import React, {Component} from 'react';
import {showModal} from "../../redux/domain/modal";
import {connect} from "react-redux";
import {Loader} from "../loader/Loader";
import {NotAuth} from "../loader/Unauth";
import '../style/List.css';

class RecipeDetails extends Component {

    async componentDidMount() {
        const id = this.props.match.params.id;
        console.log(id);
        await this.props.getRecipe(id);
    }

    render() {
        if(this.props.isLoading) {
            return <Loader/>
        }

        if(this.props.err) {
            return <NotAuth/>
        }

        return (
            <div className="list">
                <div><pre>{JSON.stringify(this.props.recipe, null, 4) }</pre></div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        recipe: state.recipeDetailsReducer.recipe,
        err: state.recipeDetailsReducer.err,
        isLoading: state.recipeDetailsReducer.isLoading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getRecipe: (id) => {
            dispatch({
                type: 'GET',
                payload: {
                    reducer: 'RECIPE_DETAILS',
                    url: "/recipes/"+id,
                }
            });
        }
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(RecipeDetails);