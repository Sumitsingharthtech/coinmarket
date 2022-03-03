/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  GET_PDEX_AGGREGATED_USD_VOLUMES,
  GET_PDEX_AGGREGATED_USD_LIQUIDITY,
  GET_PDEX_AGGREGATED_USD_SIMPLE_VOLUMES,
  GET_PDEX_OVERVIEW,
  GET_PDEX_TOTAL_VOLUME, GET_PDEX_TOTAL_LIQUIDITY, GET_PDEX_TOTAL_24H_VOLUME, GET_PDEX_TOTAL_LIQUIDITY_WITH_PKYBER,
  GET_PDEX_PAIR_SUMMARY
} from 'src/actions/pDEXOverviewActions';

const initialState = {
  aggregatedUsdVolumes: [],
  aggregatedUsdSimpleVolumes: [],
  aggregatedUsdLiquidity: [],
  overview: {},
  total24hVolume: 0
};

const pDEXOverviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PDEX_OVERVIEW: {
      const data = action.payload;

      return produce(state, (draft) => {
        draft.overview = data;
      });
    }

    case GET_PDEX_AGGREGATED_USD_VOLUMES: {
      const data = action.payload;

      return produce(state, (draft) => {
        draft.aggregatedUsdVolumes = data;
      });
    }

    case GET_PDEX_AGGREGATED_USD_SIMPLE_VOLUMES: {
      const data = action.payload;

      return produce(state, (draft) => {
        draft.aggregatedUsdSimpleVolumes = data;
      });
    }

    case GET_PDEX_AGGREGATED_USD_LIQUIDITY: {
      const data = action.payload;

      return produce(state, (draft) => {
        draft.aggregatedUsdLiquidity = data;
      });
    }

    case GET_PDEX_TOTAL_VOLUME: {
      const { total } = action.payload;

      return produce(state, (draft) => {
        draft.totalVolume = total;
      });
    }

    case GET_PDEX_TOTAL_24H_VOLUME: {
      const { total } = action.payload;

      return produce(state, (draft) => {
        draft.total24hVolume = total;
      });
    }

    case GET_PDEX_TOTAL_LIQUIDITY: {
      const { total } = action.payload;

      return produce(state, (draft) => {
        draft.totalLiquidity = total;
      });
    }

    case GET_PDEX_TOTAL_LIQUIDITY_WITH_PKYBER: {
      const { total } = action.payload;

      return produce(state, (draft) => {
        draft.totalLiquidityWithPKyber = total;
      });
    }

    case GET_PDEX_PAIR_SUMMARY: {
      const summary = action.payload;

      return produce(state, (draft) => {
        draft.pairSummary = summary;
      });
    }

    default: {
      return state;
    }
  }
};

export default pDEXOverviewReducer;
