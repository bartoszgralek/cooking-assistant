import { hideModal } from '../redux/modalReducer';
import React from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

export default class ConfirmModal extends React.Component {

    render() {
        return (
            <Modal isOpen={true} >
                <ModalHeader style={{margin: 'auto', borderColor: 'white'}}><i className="fas fa-check fa-7x" style={{color: 'green'}}/></ModalHeader>
                <ModalBody style={{margin: 'auto', borderColor: 'white',  fontSize: '24px'}}>
                    {this.props.text}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => {
                        this.props.dispatch(hideModal());
                    }}>OK</Button>{' '}
                </ModalFooter>
            </Modal>
        );
    }
}
