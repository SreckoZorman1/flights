import list from 'reducers/airports_data/airports_dataListReducers';
import form from 'reducers/airports_data/airports_dataFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
