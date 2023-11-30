import { Formik } from 'formik';
import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as dataFormat from 'pages/CRUD/Aircrafts_data/table/Aircrafts_dataDataFormatters';
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

import aircrafts_dataFields from 'pages/CRUD/Aircrafts_data/helpers/aircrafts_dataFields';
import IniValues from 'components/FormItems/iniValues';
import PreparedValues from 'components/FormItems/preparedValues';
import FormValidations from 'components/FormItems/formValidations';
import Widget from 'components/Widget';

const Aircrafts_dataForm = (props) => {
  const { findLoading, record, onCancel } = props;

  const iniValues = () => {
    return IniValues(aircrafts_dataFields, record || {});
  };
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const renderForm = () => (
    <Widget title={'View aircrafts_data'} collapse close>
      <Formik initialValues={iniValues()}>
        {(form) => (
          <form>
            <Grid container spacing={3} direction='column'>
              <Grid item>
                <Typography variant='h6' style={{ marginBottom: 10 }}>
                  {aircrafts_dataFields['model'].label}
                </Typography>
                <Typography>{form.values.model}</Typography>
              </Grid>

              <Grid item>
                <Typography variant='h6' style={{ marginBottom: 10 }}>
                  {aircrafts_dataFields['range'].label}
                </Typography>
                <Typography>{form.values.range}</Typography>
              </Grid>

              <Grid item>
                <Typography variant='h6' style={{ marginBottom: 10 }}>
                  {aircrafts_dataFields['constraint'].label}
                </Typography>
                <Typography>{form.values.constraint}</Typography>
              </Grid>

              <Grid item>
                <Typography variant='h6' style={{ marginBottom: 10 }}>
                  {aircrafts_dataFields['aircraft_code'].label}
                </Typography>
                <Typography>{form.values.aircraft_code}</Typography>
              </Grid>

              <>
                <Box
                  ml={3}
                  mt={3}
                  mr={3}
                  sx={{ border: 1, borderRadius: 3, borderColor: '#D8D9DA' }}
                >
                  <Typography
                    variant='h5'
                    style={{
                      marginBottom: 10,
                      marginTop: 10,
                      marginLeft: 15,
                      fontWeight: 'bold',
                    }}
                  >
                    Seats Aircraft code
                  </Typography>
                  <Divider />
                  <div className='overflow-x-auto'>
                    <Table size='small' aria-label='a dense table'>
                      <TableHead>
                        <TableRow>
                          <TableCell align='left'>seat_no</TableCell>

                          <TableCell align='left'>fare_conditions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {record.seats_aircraft_code &&
                          Array.isArray(record.seats_aircraft_code) &&
                          record.seats_aircraft_code?.map((item) => (
                            <TableRow
                              key={item.id}
                              component='a'
                              href={`#/admin/seats/${item.id}/show`}
                              style={{ textDecoration: 'none' }}
                              sx={{ '&:last-child td': { borderBottom: 0 } }}
                            >
                              <TableCell
                                align='left'
                                sx={{
                                  '&:last-child': { borderRight: 0 },
                                  borderRight: 2,
                                  borderColor: '#D8D9DA',
                                  borderWidth: 1,
                                }}
                                data-label='seat_no'
                              >
                                {item.seat_no}
                              </TableCell>

                              <TableCell
                                align='left'
                                sx={{
                                  '&:last-child': { borderRight: 0 },
                                  borderRight: 2,
                                  borderColor: '#D8D9DA',
                                  borderWidth: 1,
                                }}
                                data-label='fare_conditions'
                              >
                                {item.fare_conditions}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                  {!record?.seats_aircraft_code?.length && (
                    <Typography
                      style={{
                        marginBottom: 10,
                        marginTop: 10,
                        marginLeft: 15,
                      }}
                    >
                      Empty
                    </Typography>
                  )}
                </Box>
              </>

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
export default Aircrafts_dataForm;
