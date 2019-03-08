import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import IndexPage from './routes/IndexPage';
import AccessToken from './components/AccessToken';

const client = new ApolloClient({
  uri: 'https://380odjc5vi.execute-api.us-east-1.amazonaws.com/dev/graphql',
});

function RouterConfig({ history }) {
  return (
    <ApolloProvider client={client}>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={AccessToken} />
          <Route path="/index" component={IndexPage} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default RouterConfig;
