import { Modal } from '@mui/material'
import React from 'react'

const CustomModal = (props) => {

    return (
        <>
            <Modal
                open={true}
                onClose={props.onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {props.children}
            </Modal>
        </>
    )
}

export default CustomModal