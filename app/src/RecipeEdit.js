import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class RecipeEdit extends Component {

    emptyItem = {
        title: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            isPresent: false,
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const recipe = await (await fetch(`/api/recipes/${this.props.match.params.id}`)).json();
            this.setState({isPresent: true, item: recipe});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {isPresent, item} = this.state;



        await fetch('/api/recipes' + (isPresent ? '/' + item._links.self.href.slice(-1) : ''), {
            method: isPresent ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/recipes');
    }

    render() {
        const {isPresent, item} = this.state;
        const title = <h2>{isPresent ? 'Edit Recipe' : 'Add Recipe'}</h2>;

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="text" name="title" id="title" value={item.title || ''}
                               onChange={this.handleChange} autoComplete="title"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/recipes">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(RecipeEdit);