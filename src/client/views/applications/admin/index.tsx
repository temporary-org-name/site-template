import React from 'react';
import {render} from 'react-dom';

import AdminApp from 'client/views/applications/admin/pages/app';

window.onload = () => {
    render(
        <AdminApp />,
        document.getElementById('mount')
    );
};