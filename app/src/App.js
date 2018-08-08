import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RecipeList from './RecipeList';
import RecipeEdit from './RecipeEdit';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={Home}/>
                    <Route path='/recipes' exact={true} component={RecipeList}/>
                    <Route path='/recipes/:id' component={RecipeEdit}/>
                </Switch>
            </Router>
        )
    }
}

export default App;
