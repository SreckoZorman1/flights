const seatsFields = {
  id: { type: 'id', label: 'ID' },

  seat_no: { type: 'string', label: 'seat_no' },

  fare_conditions: { type: 'string', label: 'fare_conditions' },

  aircraft_code: {
    type: 'relation_one',
    label: 'Aircraft code',

    options: [{ value: 'value', label: 'value' }],
  },
};

export default seatsFields;
