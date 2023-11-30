import { Formik } from 'formik';
import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as dataFormat from 'pages/CRUD/Airports_data/table/Airports_dataDataFormatters';
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

import airports_dataFields from 'pages/CRUD/Airports_data/helpers/airports_dataFields';
import IniValues from 'components/FormItems/iniValues';
import PreparedValues from 'components/FormItems/preparedValues';
import FormValidations from 'components/FormItems/formValidations';
import Widget from 'components/Widget';

const Airports_dataForm = (props) => {
  const { findLoading, record, onCancel } = props;

  const iniValues = () => {
    return IniValues(airports_dataFields, record || {});
  };
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const renderForm = () => (
    <Widget title={'View airports_data'} collapse close>
      <Formik initialValues={iniValues()}>
        {(form) => (
          <form>
            <Grid container spacing={3} direction='column'>
              <Grid item>
                <Typography variant='h6' style={{ marginBottom: 10 }}>
                  {airports_dataFields['airport_name'].label}
                </Typography>
                <Typography>{form.values.airport_name}</Typography>
              </Grid>

              <Grid item>
                <Typography variant='h6' style={{ marginBottom: 10 }}>
                  {airports_dataFields['city'].label}
                </Typography>
                <Typography>{form.values.city}</Typography>
              </Grid>

              <Grid item>
                <Typography variant='h6' style={{ marginBottom: 10 }}>
                  {airports_dataFields['timezone'].label}
                </Typography>
                <Typography>{form.values.timezone}</Typography>
              </Grid>

              <Grid item>
                <Typography variant='h6' style={{ marginBottom: 10 }}>
                  {airports_dataFields['airport_code'].label}
                </Typography>
                <Typography>{form.values.airport_code}</Typography>
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
                    Flights Departure Airport
                  </Typography>
                  <Divider />
                  <div className='overflow-x-auto'>
                    <Table size='small' aria-label='a dense table'>
                      <TableHead>
                        <TableRow>
                          <TableCell align='left'>
                            scheduled_departure
                          </TableCell>

                          <TableCell align='left'>scheduled_arrival</TableCell>

                          <TableCell align='left'>status</TableCell>

                          <TableCell align='left'>aircraft_code</TableCell>

                          <TableCell align='left'>actual_departure</TableCell>

                          <TableCell align='left'>actual_arrival</TableCell>

                          <TableCell align='left'>flight_no</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {record.flights_departure_airport &&
                          Array.isArray(record.flights_departure_airport) &&
                          record.flights_departure_airport?.map((item) => (
                            <TableRow
                              key={item.id}
                              component='a'
                              href={`#/admin/flights/${item.id}/show`}
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
                                data-label='scheduled_departure'
                              >
                                {dataFormat.dateTimeFormatter(
                                  item.scheduled_departure,
                                )}
                              </TableCell>

                              <TableCell
                                align='left'
                                sx={{
                                  '&:last-child': { borderRight: 0 },
                                  borderRight: 2,
                                  borderColor: '#D8D9DA',
                                  borderWidth: 1,
                                }}
                                data-label='scheduled_arrival'
                              >
                                {dataFormat.dateTimeFormatter(
                                  item.scheduled_arrival,
                                )}
                              </TableCell>

                              <TableCell
                                align='left'
                                sx={{
                                  '&:last-child': { borderRight: 0 },
                                  borderRight: 2,
                                  borderColor: '#D8D9DA',
                                  borderWidth: 1,
                                }}
                                data-label='status'
                              >
                                {item.status}
                              </TableCell>

                              <TableCell
                                align='left'
                                sx={{
                                  '&:last-child': { borderRight: 0 },
                                  borderRight: 2,
                                  borderColor: '#D8D9DA',
                                  borderWidth: 1,
                                }}
                                data-label='aircraft_code'
                              >
                                {item.aircraft_code}
                              </TableCell>

                              <TableCell
                                align='left'
                                sx={{
                                  '&:last-child': { borderRight: 0 },
                                  borderRight: 2,
                                  borderColor: '#D8D9DA',
                                  borderWidth: 1,
                                }}
                                data-label='actual_departure'
                              >
                                {dataFormat.dateTimeFormatter(
                                  item.actual_departure,
                                )}
                              </TableCell>

                              <TableCell
                                align='left'
                                sx={{
                                  '&:last-child': { borderRight: 0 },
                                  borderRight: 2,
                                  borderColor: '#D8D9DA',
                                  borderWidth: 1,
                                }}
                                data-label='actual_arrival'
                              >
                                {dataFormat.dateTimeFormatter(
                                  item.actual_arrival,
                                )}
                              </TableCell>

                              <TableCell
                                align='left'
                                sx={{
                                  '&:last-child': { borderRight: 0 },
                                  borderRight: 2,
                                  borderColor: '#D8D9DA',
                                  borderWidth: 1,
                                }}
                                data-label='flight_no'
                              >
                                {item.flight_no}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                  {!record?.flights_departure_airport?.length && (
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
                    Flights Arrival Airport
                  </Typography>
                  <Divider />
                  <div className='overflow-x-auto'>
                    <Table size='small' aria-label='a dense table'>
                      <TableHead>
                        <TableRow>
                          <TableCell align='left'>
                            scheduled_departure
                          </TableCell>

                          <TableCell align='left'>scheduled_arrival</TableCell>

                          <TableCell align='left'>status</TableCell>

                          <TableCell align='left'>aircraft_code</TableCell>

                          <TableCell align='left'>actual_departure</TableCell>

                          <TableCell align='left'>actual_arrival</TableCell>

                          <TableCell align='left'>flight_no</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {record.flights_arrival_airport &&
                          Array.isArray(record.flights_arrival_airport) &&
                          record.flights_arrival_airport?.map((item) => (
                            <TableRow
                              key={item.id}
                              component='a'
                              href={`#/admin/flights/${item.id}/show`}
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
                                data-label='scheduled_departure'
                              >
                                {dataFormat.dateTimeFormatter(
                                  item.scheduled_departure,
                                )}
                              </TableCell>

                              <TableCell
                                align='left'
                                sx={{
                                  '&:last-child': { borderRight: 0 },
                                  borderRight: 2,
                                  borderColor: '#D8D9DA',
                                  borderWidth: 1,
                                }}
                                data-label='scheduled_arrival'
                              >
                                {dataFormat.dateTimeFormatter(
                                  item.scheduled_arrival,
                                )}
                              </TableCell>

                              <TableCell
                                align='left'
                                sx={{
                                  '&:last-child': { borderRight: 0 },
                                  borderRight: 2,
                                  borderColor: '#D8D9DA',
                                  borderWidth: 1,
                                }}
                                data-label='status'
                              >
                                {item.status}
                              </TableCell>

                              <TableCell
                                align='left'
                                sx={{
                                  '&:last-child': { borderRight: 0 },
                                  borderRight: 2,
                                  borderColor: '#D8D9DA',
                                  borderWidth: 1,
                                }}
                                data-label='aircraft_code'
                              >
                                {item.aircraft_code}
                              </TableCell>

                              <TableCell
                                align='left'
                                sx={{
                                  '&:last-child': { borderRight: 0 },
                                  borderRight: 2,
                                  borderColor: '#D8D9DA',
                                  borderWidth: 1,
                                }}
                                data-label='actual_departure'
                              >
                                {dataFormat.dateTimeFormatter(
                                  item.actual_departure,
                                )}
                              </TableCell>

                              <TableCell
                                align='left'
                                sx={{
                                  '&:last-child': { borderRight: 0 },
                                  borderRight: 2,
                                  borderColor: '#D8D9DA',
                                  borderWidth: 1,
                                }}
                                data-label='actual_arrival'
                              >
                                {dataFormat.dateTimeFormatter(
                                  item.actual_arrival,
                                )}
                              </TableCell>

                              <TableCell
                                align='left'
                                sx={{
                                  '&:last-child': { borderRight: 0 },
                                  borderRight: 2,
                                  borderColor: '#D8D9DA',
                                  borderWidth: 1,
                                }}
                                data-label='flight_no'
                              >
                                {item.flight_no}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                  {!record?.flights_arrival_airport?.length && (
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
export default Airports_dataForm;
