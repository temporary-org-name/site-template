import React from 'react';
import {render} from 'react-dom';

import AdminPage from 'client/views/pages/admin/admin';

import './admin.scss';

window.onload = () => {
    render(
        <AdminPage />,
        document.getElementById('mount')
    );
};