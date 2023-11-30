import { Formik } from 'formik';
import React, { Component } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Loader from 'components/Loader';
// eslint-disable-next-line no-unused-vars
import InputFormItem from 'components/FormItems/items/InputFormItem';
// eslint-disable-next-line no-unused-vars
import SwitchFormItem from 'components/FormItems/items/SwitchFormItem';
// eslint-disable-next-line no-unused-vars
import RadioFormItem from 'components/FormItems/items/RadioFormItem';
// eslint-disable-next-line no-unused-vars
import SelectFormItem from 'components/FormItems/items/SelectFormItem';
// eslint-disable-next-line no-unused-vars
import DatePickerFormItem from 'components/FormItems/items/DatePickerFormItem';
// eslint-disable-next-line no-unused-vars
import ImagesFormItem from 'components/FormItems/items/ImagesFormItem';
// eslint-disable-next-line no-unused-vars
import FilesFormItem from 'components/FormItems/items/FilesFormItem';
// eslint-disable-next-line no-unused-vars

import flightsFields from 'pages/CRUD/Flights/helpers/flightsFields';
import IniValues from 'components/FormItems/iniValues';
import PreparedValues from 'components/FormItems/preparedValues';
import FormValidations from 'components/FormItems/formValidations';
import Widget from 'components/Widget';

import Airports_dataSelectItem from 'pages/CRUD/Airports_data/helpers/Airports_dataSelectItem';

const FlightsForm = (props) => {
  const {
    isEditing,
    isProfile,
    findLoading,
    saveLoading,
    record,
    onSubmit,
    onCancel,
    modal,
  } = props;

  const iniValues = () => {
    return IniValues(flightsFields, record || {});
  };

  const formValidations = () => {
    return FormValidations(flightsFields, record || {});
  };

  const handleSubmit = (values) => {
    const { id, ...data } = PreparedValues(flightsFields, values || {});
    onSubmit(id, data);
  };

  const title = () => {
    if (isProfile) {
      return 'Edit My Profile';
    }
    return isEditing ? 'Edit Flights' : 'Add Flights';
  };

  const renderForm = () => (
    <Widget title={title()} collapse close>
      <Formik
        onSubmit={handleSubmit}
        initialValues={iniValues()}
        validationSchema={formValidations()}
      >
        {(form) => (
          <form onSubmit={form.handleSubmit}>
            <Grid container spacing={3} direction='column'>
              <Grid item>
                <DatePickerFormItem
                  name={'scheduled_departure'}
                  schema={flightsFields}
                  showTimeInput
                />
              </Grid>

              <Grid item>
                <DatePickerFormItem
                  name={'scheduled_arrival'}
                  schema={flightsFields}
                  showTimeInput
                />
              </Grid>

              <Grid item>
                <InputFormItem name={'status'} schema={flightsFields} />
              </Grid>

              <Grid item>
                <InputFormItem name={'aircraft_code'} schema={flightsFields} />
              </Grid>

              <Grid item>
                <DatePickerFormItem
                  name={'actual_departure'}
                  schema={flightsFields}
                  showTimeInput
                />
              </Grid>

              <Grid item>
                <DatePickerFormItem
                  name={'actual_arrival'}
                  schema={flightsFields}
                  showTimeInput
                />
              </Grid>

              <Grid item>
                <InputFormItem name={'flight_no'} schema={flightsFields} />
              </Grid>

              <Grid item>
                <Airports_dataSelectItem
                  name={'departure_airport'}
                  schema={flightsFields}
                  showCreate={!modal}
                  form={form}
                />
              </Grid>

              <Grid item>
                <Airports_dataSelectItem
                  name={'arrival_airport'}
                  schema={flightsFields}
                  showCreate={!modal}
                  form={form}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} mt={2}>
              <Grid item>
                <Button
                  color='primary'
                  variant='contained'
                  onClick={form.handleSubmit}
                >
                  Save
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color='primary'
                  variant='outlined'
                  onClick={form.handleReset}
                >
                  Reset
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color='primary'
                  variant='outlined'
                  onClick={() => onCancel()}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Widget>
  );
  if (findLoading) {
    return <Loader />;
  }
  if (isEditing && !record) {
    return <Loader />;
  }
  return renderForm();
};
export default FlightsForm;
