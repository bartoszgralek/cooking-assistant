import { hideModal } from '../../redux/domain/modal'
import React from 'react';

export const EditUserModal = ({ user, dispatch }) => (
    <div>
        <p>Editing user {user.username}</p>
        <button onClick={() => dispatch(hideModal())}>
            Yes
        </button>
        <button onClick={() => dispatch(hideModal())}>
            Nope
        </button>
    </div>
);

