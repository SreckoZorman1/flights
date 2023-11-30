import list from 'reducers/aircrafts_data/aircrafts_dataListReducers';
import form from 'reducers/aircrafts_data/aircrafts_dataFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
