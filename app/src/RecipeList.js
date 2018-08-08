import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class RecipeList extends Component {

    constructor(props) {
        super(props);
        this.state = {recipes: [], isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('api/recipes')
            .then(response => response.json())
            .then(data => this.setState({recipes: data._embedded.recipes, isLoading: false}));
    }

    async remove(href) {
        console.log(href);
        await fetch(href, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedRecipes = [...this.state.recipes].filter(i => i._links.self.href !== href);
            this.setState({recipes: updatedRecipes});
        });
    }

    getIdFromHref(href) {
        return href.slice(-1);
    }

    render() {
        const {recipes, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const recipeList = recipes.map(recipe => {
            return <tr key={recipe._links.self.href}>
                <td style={{whiteSpace: 'nowrap'}} align="center" >{recipe.title}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/recipes/" + this.getIdFromHref(recipe._links.self.href)}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(recipe._links.self.href)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/recipes/new">Add recipe</Button>
                    </div>
                    <h3>Recipes</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="80%" className="text-center">Title</th>
                            <th width="20%" >Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {recipeList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default RecipeList;