import _ from 'lodash';
import { LIMIT_RESULT_SERVICE } from '../utils';

export const handleSuccessList = (state, payload) => {
  const { data, id, page } = payload;
  // Update all item that exist in the repository 
  // if they have the same id with one of the responses received
  data.forEach(obj => {
    _.forEach(state, (value) => {
      _.find(value, (item) => {
        if (item.id === obj.id) {
          Object.assign(item, obj);
        }
      });
    });
  });

  // if the state[id] hasn't exists or refresh state[id]
  const newData = Object.assign({}, state);
  if (!state[id] || page === 1) {
    Object.assign(newData, { [id]: data });
  } else {
    data.forEach((item) => {
      if (!_.some(newData[id], { id: item.id })) {
        newData[id].splice(LIMIT_RESULT_SERVICE * page, 0, item);
      }
    });
  }
  return newData;
};

export const handleSuccessObject = (state, payload) => {
  const newData = Object.assign({}, state);
  Object.assign(newData, { [payload.id]: payload.data });
  return newData;
};
