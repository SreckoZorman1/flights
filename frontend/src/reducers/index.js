import auth from 'reducers/auth';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import users from 'reducers/users/usersReducers';

import aircrafts_data from 'reducers/aircrafts_data/aircrafts_dataReducers';

import airports_data from 'reducers/airports_data/airports_dataReducers';

import flights from 'reducers/flights/flightsReducers';

import seats from 'reducers/seats/seatsReducers';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,

    users,

    aircrafts_data,

    airports_data,

    flights,

    seats,
  });
