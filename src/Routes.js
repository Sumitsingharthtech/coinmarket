/* eslint-disable react/no-array-index-key */
import React, {
  lazy,
  Suspense,
  Fragment
} from 'react';
import {
  Switch,
  Redirect,
  Route
} from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import LoadingScreen from 'src/components/LoadingScreen';

const routesConfig = [
  {
    path: '/',
    layout: DashboardLayout,
    routes: [
      {
        exact: true,
        path: '/',
        component: lazy(() => import('src/views/Dashboard/SimpleView'))
      },
      {
        exact: true,
        path: '/dashboard/simple',
        component: () => <Redirect to="/" />
      },
      {
        exact: true,
        path: '/dashboard/advanced',
        component: lazy(() => import('src/views/Dashboard/AdvancedView'))
      },
      {
        exact: true,
        path: '/blockchain',
        component: lazy(() => import('src/views/Blockchain/OverviewView'))
      },
      {
        exact: true,
        path: '/blockchain/overview',
        component: () => <Redirect to="/blockchain" />
      },
      {
        exact: true,
        path: '/blockchain/beacon-chain',
        component: lazy(() => import('src/views/Blockchain/BeaconBlocksView'))
      },
      {
        exact: true,
        path: '/blockchain/beacon-chain/:hash',
        component: lazy(() => import('src/views/Blockchain/BeaconBlockView'))
      },
      {
        exact: true,
        path: '/blockchain/shard-blocks',
        component: lazy(() => import('src/views/Blockchain/ShardBlocksView'))
      },
      {
        exact: true,
        path: '/blockchain/shard-blocks/:hash',
        component: lazy(() => import('src/views/Blockchain/ShardBlockView'))
      },
      {
        exact: true,
        path: '/blockchain/transactions',
        component: lazy(() => import('src/views/Blockchain/TransactionsView'))
      },
      {
        exact: true,
        path: '/tx/:hash',
        component: lazy(() => import('src/views/Blockchain/TransactionView'))
      },
      {
        exact: true,
        path: '/blockchain/transactions/:hash',
        component: (props) => <Redirect to={`/tx/${props.match.params.hash}`} />
      },
      {
        exact: true,
        path: '/blockchain/mempool',
        component: lazy(() => import('src/views/Blockchain/MempoolView'))
      },
      {
        exact: true,
        path: '/pdex',
        component: lazy(() => import('src/views/PDEX/OverviewView'))
      },
      {
        exact: true,
        path: '/pdex/simple',
        component: () => <Redirect to="/pdex" />
      },
      {
        exact: true,
        path: '/pdex/trades',
        component: lazy(() => import('src/views/PDEX/TradesView'))
      },
      {
        exact: true,
        path: '/pdex/tokens',
        component: lazy(() => import('src/views/PDEX/TokensView'))
      },
      {
        exact: true,
        path: '/pdex/markets/:pair?/:interval?',
        component: lazy(() => import('src/views/PDEX/MarketsView'))
      },
      {
        exact: true,
        path: '/pdex/markets-custom-token/:pair?/:interval?',
        component: lazy(() => import('src/views/PDEX/CustomMarketsView'))
      },
      {
        exact: true,
        path: '/privacy-coin',
        component: lazy(() => import('src/views/PrivacyCoin/OverviewView'))
      },
      {
        exact: true,
        path: '/privacy-coin/overview',
        component: () => <Redirect to="/privacy-coin" />
      },
      {
        exact: true,
        path: '/privacy-coin/supply/:interval?',
        component: lazy(() => import('src/views/PrivacyCoin/SupplyView'))
      },
      {
        exact: true,
        path: '/shielded-coins',
        component: lazy(() => import('src/views/ShieldedCoins/OverviewView'))
      },
      {
        exact: true,
        path: '/shielded-coins/overview',
        component: () => <Redirect to="/shielded-coins" />
      },
      {
        exact: true,
        path: '/shielded-coins/list',
        component: lazy(() => import('src/views/ShieldedCoins/ListView'))
      },
      {
        exact: true,
        path: '/shielded-coins/evolution/:token?',
        component: lazy(() => import('src/views/ShieldedCoins/ChartsView'))
      },
      {
        exact: true,
        path: '/shielded-coins/history',
        component: lazy(() => import('src/views/ShieldedCoins/HistoryView'))
      },
      {
        exact: true,
        path: '/custom-tokens',
        component: lazy(() => import('src/views/CustomTokens/ListView'))
      },
      {
        exact: true,
        path: '/custom-tokens/trades',
        component: lazy(() => import('src/views/CustomTokens/TradesView'))
      },
      {
        exact: true,
        path: '/custom-tokens/:tokenId',
        component: lazy(() => import('src/views/CustomTokens/TokenView'))
      },
      {
        exact: true,
        path: '/network/validators',
        component: lazy(() => import('src/views/Network/ValidatorsView'))
      },
      {
        exact: true,
        path: '/about/us',
        component: lazy(() => import('src/views/About/AboutView'))
      }/*,
      {
        exact: true,
        path: '/votes',
        component: lazy(() => import('src/views/Vote/OverviewView'))
      },
      {
        exact: true,
        path: '/votes/all-time',
        component: lazy(() => import('src/views/Vote/AllTimeView'))
      }*/,
      {
        component: () => <Redirect to="/" />
      }
    ]
  },
  {
    exact: true,
    path: '/404',
    component: lazy(() => import('src/views/pages/Error404View'))
  }
];

const renderRoutes = (routes) => (routes ? (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes
                    ? renderRoutes(route.routes)
                    : <Component {...props} />}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
) : null);

function Routes() {
  return renderRoutes(routesConfig);
}

export default Routes;
