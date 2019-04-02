
import React from 'react';
import {render} from 'react-dom';

import ClientApp from 'client/views/applications/client/pages/app';

window.onload = function (): void {
    render(
        <ClientApp />,
        document.getElementById('mount')
    );
};