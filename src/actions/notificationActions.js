export const ADD_NOTIFICATION = '@notification/add';
export const DELETE_CURRENT_NOTIFICATION = '@notification/delete-current';

export function addNotification(title, content) {
  return (dispatch) => {
    dispatch({
      type: ADD_NOTIFICATION,
      payload: {
        title,
        content
      }
    });
  };
}

export function deleteCurrentNotification() {
  return (dispatch) => {
    dispatch({
      type: DELETE_CURRENT_NOTIFICATION
    });
  };
}
