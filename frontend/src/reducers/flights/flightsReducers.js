import list from 'reducers/flights/flightsListReducers';
import form from 'reducers/flights/flightsFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
