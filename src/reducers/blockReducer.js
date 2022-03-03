/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  GET_BEACON_BLOCKS,
  GET_BEACON_BLOCK,
  GET_SHARD_BLOCKS,
  GET_SHARD_BLOCK,
  GET_SHARD_BLOCKS_BY_BEACON_HEIGHT
} from 'src/actions/blockActions';
import objFromArray from 'src/utils/objFromArray';

const initialState = {
  beaconBlock: {
    byId: {},
    allIds: []
  },
  beaconBlocksCount: 0,
  completeBeaconBlock: {
    byId: {}
  },
  shardBlock: {
    byId: {},
    allIds: []
  },
  shardBlocksCount: 0,
  completeShardBlock: {
    byId: {}
  },
  shardBlocksByBeaconHeight: {
    byId: {}
  }
};

const blockReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BEACON_BLOCKS: {
      const { result, count } = action.payload;

      return produce(state, (draft) => {
        draft.beaconBlock.byId = objFromArray(result, 'hash');
        draft.beaconBlock.allIds = Object.keys(draft.beaconBlock.byId);
        draft.beaconBlocksCount = count;
      });
    }

    case GET_SHARD_BLOCKS_BY_BEACON_HEIGHT: {
      const { blocks, beaconHeight } = action.payload;

      return produce(state, (draft) => {
        draft.shardBlocksByBeaconHeight.byId[beaconHeight] = blocks;
      });
    }


    case GET_SHARD_BLOCKS: {
      const { result, count } = action.payload;

      return produce(state, (draft) => {
        draft.shardBlock.byId = objFromArray(result, 'hash');
        draft.shardBlock.allIds = Object.keys(draft.shardBlock.byId);
        draft.shardBlocksCount = count;
      });
    }

    case GET_BEACON_BLOCK: {
      const block = action.payload;

      return produce(state, (draft) => {
        draft.completeBeaconBlock.byId[block.hash] = block;
      });
    }

    case GET_SHARD_BLOCK: {
      const block = action.payload;

      return produce(state, (draft) => {
        draft.completeShardBlock.byId[block.hash] = block;
      });
    }

    default: {
      return state;
    }
  }
};

export default blockReducer;
