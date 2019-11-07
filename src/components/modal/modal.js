import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

const ModalBox = props => {
    return (
        <Modal isOpen={props.openModal} toggle={props.toggle}>
            <ModalHeader toggle={props.toggle}>{props.title}</ModalHeader>
            <ModalBody>
                {props.children}
            </ModalBody>
        </Modal>
    );
}

export default ModalBox;