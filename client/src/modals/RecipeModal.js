import { hideModal } from '../redux/modalReducer'
import React from 'react';
import {Button, Modal, ModalBody, ModalFooter} from "reactstrap";
import Search from "../components/utils/Search";

export default class RecipeModal extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            ingredients: []
        }
    }

    removeIngredient = ing => {
        this.setState( oldState => {
            return {
                ingredients: oldState.ingredients.filter(element => element !== ing)
            }
        })
    };


    onSuggestionSelected = (event, { suggestion }) => {
        console.log("selected: " + suggestion);
        this.setState(oldstate => {
            return {
                ingredients: [...oldstate.ingredients, suggestion]
            };
        });
    };

    render() {

        const ingredients = this.state.ingredients.map(e => {
                return <div>
                    <li>{e}</li>
                    <button style={{float: 'right'}} onClick={() => this.removeIngredient(e)}>X</button>
                </div>;
            }
        );

        return (
            <Modal isOpen={true}>
                <ModalBody>
                    <Search onSuggestionSelected={this.onSuggestionSelected}/>
                    <ol>
                        {ingredients}
                    </ol>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.props.dispatch(hideModal())}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={() => this.props.dispatch(hideModal())}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}
