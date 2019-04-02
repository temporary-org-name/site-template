import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {inject} from 'mobx-react';

import ThemeProvider from 'ui/theme-provider';

import App from 'views/pages/app';
import Permissions from 'views/pages/permissions';
import Statistics from 'views/pages/statistics';

import Orders from 'views/pages/orders';
import CreateOrder from 'views/pages/orders/create';
import EditOrder from 'views/pages/orders/edit';
import ShowOrder from 'views/pages/orders/show';

import CreateCampaign from 'views/pages/campaigns/create';
import EditCampaign from 'views/pages/campaigns/edit';
import ShowCampaign from 'views/pages/campaigns/show';

import Clients from 'views/pages/clients';
import NotFound from 'views/pages/not-found';
import Unauthorized from 'views/pages/unauthorized';

import Moderation from 'views/pages/moderation';

import {WhoamiModel} from 'models/whoami';

@inject('whoamiModel')
export default class Router extends React.Component<any> {
    private _renderRouter(): JSX.Element {
        const whoamiModel = this.props.whoamiModel as WhoamiModel;

        const {user} = whoamiModel;
        if (!user || !user.isValidUser) {
            return <Unauthorized />;
        }

        const {
            canReadOrders,
            canControlOrders,
            canReadCampaigns,
            canControlCampaigns,
            canReadClients,
            canAddUsers,
            canReadStatistics,
            canModerate
        } = whoamiModel;

        return (
            <Switch>
                {(canReadOrders || canModerate) && <Route exact path="/" component={Orders} />}
                {canReadOrders && <Route exact path="/orders/" component={Orders} />}
                {canControlOrders && <Route exact path="/orders/create/" component={CreateOrder} />}
                {canControlOrders && (
                    <Route exact path="/orders/:id/campaigns/create/" component={CreateCampaign} />
                )}
                {canControlCampaigns && (
                    <Route exact path="/orders/:id/campaigns/:campaign_id/edit/" component={EditCampaign} />
                )}
                {canReadCampaigns && (
                    <Route exact path="/orders/:id/campaigns/:campaign_id/" component={ShowCampaign} />
                )}
                {canControlOrders && <Route exact path="/orders/:id/edit/" component={EditOrder} />}
                {canReadOrders && <Route exact path="/orders/:id/" component={ShowOrder} />}
                {canReadClients && <Route exact path="/clients/" component={Clients} />}
                {canAddUsers && <Route exact path="/permissions/" component={Permissions} />}
                {canReadStatistics && <Route exact path="/statistics/" component={Statistics} />}
                {canModerate && <Route exact path="/moderation" component={Moderation} />}
                <Route exact path="/not-found/" component={NotFound} />
                <Route component={NotFound} />
            </Switch>
        );
    }

    render(): React.ReactNode {
        return (
            <ThemeProvider theme="blue">
                <App>
                    {this._renderRouter()}
                </App>
            </ThemeProvider>
        );
    }
}