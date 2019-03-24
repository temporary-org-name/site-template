import React from 'react';
import {render} from 'react-dom';

import ClientPage from 'client/views/pages/client/client';

import './client.scss';

window.onload = () => {
    render(
        <ClientPage />,
        document.getElementById('mount')
    );
};