const flightsFields = {
  id: { type: 'id', label: 'ID' },

  scheduled_departure: { type: 'datetime', label: 'scheduled_departure' },

  scheduled_arrival: { type: 'datetime', label: 'scheduled_arrival' },

  status: { type: 'string', label: 'status' },

  aircraft_code: { type: 'string', label: 'aircraft_code' },

  actual_departure: { type: 'datetime', label: 'actual_departure' },

  actual_arrival: { type: 'datetime', label: 'actual_arrival' },

  flight_no: { type: 'string', label: 'flight_no' },

  departure_airport: {
    type: 'relation_one',
    label: 'Departure Airport',

    options: [{ value: 'value', label: 'value' }],
  },

  arrival_airport: {
    type: 'relation_one',
    label: 'Arrival Airport',

    options: [{ value: 'value', label: 'value' }],
  },
};

export default flightsFields;
