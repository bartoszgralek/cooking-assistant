import { hideModal } from '../../redux/domain/modal'
import React from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

export const RecipeModal = ({ recipe, dispatch }) => (
    <Modal isOpen={true}>
        <ModalHeader>{recipe.title}</ModalHeader>
        <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={() => dispatch(hideModal())}>Do Something</Button>{' '}
            <Button color="secondary" onClick={() => dispatch(hideModal())}>Cancel</Button>
        </ModalFooter>
    </Modal>
);

