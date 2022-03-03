/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  ADD_NOTIFICATION, DELETE_CURRENT_NOTIFICATION
} from 'src/actions/notificationActions';

const initialState = {
  all: []
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION: {
      const notification = action.payload;

      return produce(state, (draft) => {
        draft.all.push(notification);
      });
    }

    case DELETE_CURRENT_NOTIFICATION: {
      return produce(state, (draft) => {
        draft.all.slice(1);
      });
    }

    default: {
      return state;
    }
  }
};

export default notificationReducer;
