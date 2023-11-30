import { Formik } from 'formik';
import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actions as airports_dataActions } from 'actions/airports_data/airports_dataListActions';

import * as dataFormat from 'pages/CRUD/Flights/table/FlightsDataFormatters';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Loader from 'components/Loader';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
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
import ItemsList from 'components/FormItems/items/ItemsList';

import flightsFields from 'pages/CRUD/Flights/helpers/flightsFields';
import IniValues from 'components/FormItems/iniValues';
import PreparedValues from 'components/FormItems/preparedValues';
import FormValidations from 'components/FormItems/formValidations';
import Widget from 'components/Widget';

import Airports_dataSelectItem from 'pages/CRUD/Airports_data/helpers/Airports_dataSelectItem';

const FlightsForm = (props) => {
  const { findLoading, record, onCancel } = props;

  const iniValues = () => {
    return IniValues(flightsFields, record || {});
  };
  const dispatch = useDispatch();

  const airports_dataRows = useSelector(
    (store) => store.airports_data.list.rows,
  );

  useEffect(() => {
    dispatch(airports_dataActions.doFetch());
  }, []);

  const renderForm = () => (
    <Widget title={'View flights'} collapse close>
      <Formik initialValues={iniValues()}>
        {(form) => (
          <form>
            <Grid container spacing={3} direction='column'>
              <Grid item>
                <Typography variant='h6' style={{ marginBottom: 10 }}>
                  {flightsFields['scheduled_departure'].label}
                </Typography>
                <Typography>
                  {form.values.scheduled_departure.toLocaleDateString() +
                    ' ' +
                    form.values.scheduled_departure
                      .toLocaleTimeString()
                      .slice(0, -6)}
                </Typography>
              </Grid>

              <Grid item>
                <Typography variant='h6' style={{ marginBottom: 10 }}>
                  {flightsFields['scheduled_arrival'].label}
                </Typography>
                <Typography>
                  {form.values.scheduled_arrival.toLocaleDateString() +
                    ' ' +
                    form.values.scheduled_arrival
                      .toLocaleTimeString()
                      .slice(0, -6)}
                </Typography>
              </Grid>

              <Grid item>
                <Typography variant='h6' style={{ marginBottom: 10 }}>
                  {flightsFields['status'].label}
                </Typography>
                <Typography>{form.values.status}</Typography>
              </Grid>

              <Grid item>
                <Typography variant='h6' style={{ marginBottom: 10 }}>
                  {flightsFields['aircraft_code'].label}
                </Typography>
                <Typography>{form.values.aircraft_code}</Typography>
              </Grid>

              <Grid item>
                <Typography variant='h6' style={{ marginBottom: 10 }}>
                  {flightsFields['actual_departure'].label}
                </Typography>
                <Typography>
                  {form.values.actual_departure.toLocaleDateString() +
                    ' ' +
                    form.values.actual_departure
                      .toLocaleTimeString()
                      .slice(0, -6)}
                </Typography>
              </Grid>

              <Grid item>
                <Typography variant='h6' style={{ marginBottom: 10 }}>
                  {flightsFields['actual_arrival'].label}
                </Typography>
                <Typography>
                  {form.values.actual_arrival.toLocaleDateString() +
                    ' ' +
                    form.values.actual_arrival
                      .toLocaleTimeString()
                      .slice(0, -6)}
                </Typography>
              </Grid>

              <Grid item>
                <Typography variant='h6' style={{ marginBottom: 10 }}>
                  {flightsFields['flight_no'].label}
                </Typography>
                <Typography>{form.values.flight_no}</Typography>
              </Grid>

              <Grid item>
                <Typography variant='h6' style={{ marginBottom: 10 }}>
                  {flightsFields['departure_airport'].label}
                </Typography>
                <Typography>{form.values.departure_airport.id}</Typography>
              </Grid>

              <Grid item>
                <Typography variant='h6' style={{ marginBottom: 10 }}>
                  {flightsFields['arrival_airport'].label}
                </Typography>
                <Typography>{form.values.arrival_airport.id}</Typography>
              </Grid>

              <Grid container ml={3} mt={3}>
                <Grid item>
                  <Button
                    color='primary'
                    variant='outlined'
                    onClick={() => onCancel()}
                  >
                    Back
                  </Button>
                </Grid>
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
  return renderForm();
};
export default FlightsForm;
