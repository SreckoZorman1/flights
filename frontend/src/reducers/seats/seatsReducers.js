import list from 'reducers/seats/seatsListReducers';
import form from 'reducers/seats/seatsFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
