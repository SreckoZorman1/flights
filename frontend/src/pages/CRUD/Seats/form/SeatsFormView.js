import { Formik } from 'formik';
import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actions as aircrafts_dataActions } from 'actions/aircrafts_data/aircrafts_dataListActions';

import * as dataFormat from 'pages/CRUD/Seats/table/SeatsDataFormatters';
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

import seatsFields from 'pages/CRUD/Seats/helpers/seatsFields';
import IniValues from 'components/FormItems/iniValues';
import PreparedValues from 'components/FormItems/preparedValues';
import FormValidations from 'components/FormItems/formValidations';
import Widget from 'components/Widget';

import Aircrafts_dataSelectItem from 'pages/CRUD/Aircrafts_data/helpers/Aircrafts_dataSelectItem';

const SeatsForm = (props) => {
  const { findLoading, record, onCancel } = props;

  const iniValues = () => {
    return IniValues(seatsFields, record || {});
  };
  const dispatch = useDispatch();

  const aircrafts_dataRows = useSelector(
    (store) => store.aircrafts_data.list.rows,
  );

  useEffect(() => {
    dispatch(aircrafts_dataActions.doFetch());
  }, []);

  const renderForm = () => (
    <Widget title={'View seats'} collapse close>
      <Formik initialValues={iniValues()}>
        {(form) => (
          <form>
            <Grid container spacing={3} direction='column'>
              <Grid item>
                <Typography variant='h6' style={{ marginBottom: 10 }}>
                  {seatsFields['seat_no'].label}
                </Typography>
                <Typography>{form.values.seat_no}</Typography>
              </Grid>

              <Grid item>
                <Typography variant='h6' style={{ marginBottom: 10 }}>
                  {seatsFields['fare_conditions'].label}
                </Typography>
                <Typography>{form.values.fare_conditions}</Typography>
              </Grid>

              <Grid item>
                <Typography variant='h6' style={{ marginBottom: 10 }}>
                  {seatsFields['aircraft_code'].label}
                </Typography>
                <Typography>{form.values.aircraft_code.id}</Typography>
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
export default SeatsForm;
