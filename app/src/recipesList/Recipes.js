import React, {Component} from 'react';
import {Loader} from "../loader/Loader";
import './Recipes.css';
import {SENDREQUEST} from "../utils/WebUtils";

export default class Recipes extends Component{
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            isLoading: true,
            err: false
        }
    }


    async componentDidMount() {
        const response = await SENDREQUEST("/recipes", 'GET');
        if(response.ok) {
            const recipes = await response.json();
            this.setState({
                recipes: recipes,
                isLoading: false
            });
        }else {
            this.setState({
                err: true,
                isLoading: false
            });
        }
    }

    render() {
        const recipeList = this.state.recipes.map(el =>
            {
                return <tr key={el.id}>
                    <td>{el.id}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{el.title}</td>
                </tr>
            }
        );


        if(this.state.isLoading){
            return <Loader/>
        }
        if(this.state.error) {
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
