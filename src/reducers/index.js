import { combineReducers } from 'redux';
import transactionReducer from './transactionReducer';
import blockReducer from './blockReducer';
import blockchainReducer from './blockchainReducer';
import statReducer from './statsReducer';
import marketReducer from './marketReducer';
import candleReducer from './candleReducer';
import customCandleReducer from './customCandleReducer';
import tradeReducer from './tradeReducer';
import customTradeReducer from './customTradeReducer';
import tokenReducer from './tokenReducer';
import pairReducer from './pairReducer';
import shieldedCoinReducer from './shieldedCoinReducer';
import networkReducer from './networkReducer';
import pDEXOverviewReducer from './pDEXOverviewReducer';
import shieldedCoinOverviewReducer from './shieldedCoinOverviewReducer';
import privacyCoinOverviewReducer from './privacyCoinOverviewReducer';
import privacyCoinSupplyReducer from './privacyCoinSupplyReducer';
import votesReducer from './votesReducer';
import notificationReducer from './notificationReducer';
import webAccountReducer from './webAccountReducer';

const rootReducer = combineReducers({
  transaction: transactionReducer,
  block: blockReducer,
  blockchain: blockchainReducer,
  market: marketReducer,
  candle: candleReducer,
  customCandle: customCandleReducer,
  trade: tradeReducer,
  customTrade: customTradeReducer,
  pDEXtoken: tokenReducer,
  pair: pairReducer,
  stat: statReducer,
  shieldedCoin: shieldedCoinReducer,
  network: networkReducer,
  pDEXOverview: pDEXOverviewReducer,
  shieldedCoinOverview: shieldedCoinOverviewReducer,
  privacyCoinOverview: privacyCoinOverviewReducer,
  privacyCoinSupply: privacyCoinSupplyReducer,
  notifications: notificationReducer,
  votes: votesReducer,
  webAccount: webAccountReducer
});

export default rootReducer;
