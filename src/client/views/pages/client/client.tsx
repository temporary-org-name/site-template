import React from 'react';
import cl from 'classnames';

import bevis from 'client/lib/bevis';

interface Props {
    className?: string;
}

interface State {}

const b = bevis('client-page-container');

export default class ClientPage extends React.Component<Props, State> {
    state = {};

    componentDidMount() {}

    componentWillUnmount() {}

    render(): React.ReactNode {
        const {className} = this.props;

        return (
            <div className={cl(b(), className)}>

            </div>
        );
    }
}
