import { hideModal } from '../../redux/domain/modal'
import React from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

export default class ConfirmModal extends React.Component {


    handleConfirm = () => {
        this.props.dispatch({
            type: 'POST_USERS_CONFIRMED'
        });
        this.props.dispatch(hideModal());
    };


    render() {
        return (
            <Modal isOpen={true} >
                <ModalHeader style={{margin: 'auto', borderColor: 'white'}}><i className="fas fa-check fa-7x" style={{color: 'green'}}></i></ModalHeader>
                <ModalBody style={{margin: 'auto', borderColor: 'white',  fontSize: '24px'}}>
                    {this.props.text}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleConfirm}>OK</Button>{' '}
                </ModalFooter>
            </Modal>
        );
    }
}
