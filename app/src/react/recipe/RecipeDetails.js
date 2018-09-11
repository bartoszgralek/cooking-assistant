import React, {Component} from 'react';

export default class RecipeDetails extends Component {

    render() {
        return (
            <div>
                {this.props.recipe && this.props.recipe.title}
            </div>
        );
    }
}