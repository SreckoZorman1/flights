import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { CircularProgress, Box, Grid } from '@mui/material';
import {
  useManagementDispatch,
  useManagementState,
} from '../../context/ManagementContext';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
// styles
import useStyles from './styles';
// components
import Widget from '../../components/Widget/Widget';

const Dashboard = () => {
  let classes = useStyles();
  const managementDispatch = useManagementDispatch();
  const managementValue = useManagementState();

  const [users, setUsers] = useState(0);
  const [aircrafts_data, setAircrafts_data] = useState(0);
  const [airports_data, setAirports_data] = useState(0);
  const [flights, setFlights] = useState(0);
  const [seats, setSeats] = useState(0);

  const [currentUser, setCurrentUser] = useState(null);

  async function loadData() {
    const fns = [
      setUsers,
      setAircrafts_data,
      setAirports_data,
      setFlights,
      setSeats,
    ];

    const responseUsers = axios.get(`/users/count`);
    const responseAircrafts_data = axios.get(`/aircrafts_data/count`);
    const responseAirports_data = axios.get(`/airports_data/count`);
    const responseFlights = axios.get(`/flights/count`);
    const responseSeats = axios.get(`/seats/count`);
    Promise.allSettled([
      responseUsers,
      responseAircrafts_data,
      responseAirports_data,
      responseFlights,
      responseSeats,
    ]).then((res) =>
      res.forEach((el, i) => {
        if (el.status === 'fulfilled') {
          fns[i](el.value.data.count);
        }
      }),
    );
  }
  useEffect(() => {
    setCurrentUser(managementValue.currentUser);
    loadData();
  }, [managementDispatch, managementValue]);

  if (!currentUser) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <h1 className='page-title'>
        Welcome, {currentUser.firstName}! <br />
        <small>
          <small>Your role is {currentUser.role}</small>
        </small>
      </h1>
      <Grid container alignItems='center' columns={12} spacing={3}>
        {
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Link to={'/admin/users'} style={{ textDecoration: 'none' }}>
              <Widget title={'Users'}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <InfoIcon color='primary' sx={{ mr: 1 }} />
                  <p className={classes.widgetText}>
                    Users:{' '}
                    <span className={classes.widgetTextCount}>{users}</span>
                  </p>
                </div>
              </Widget>
            </Link>
          </Grid>
        }

        {
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Link
              to={'/admin/aircrafts_data'}
              style={{ textDecoration: 'none' }}
            >
              <Widget title={'Aircrafts_data'}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <InfoIcon color='primary' sx={{ mr: 1 }} />
                  <p className={classes.widgetText}>
                    Aircrafts_data:{' '}
                    <span className={classes.widgetTextCount}>
                      {aircrafts_data}
                    </span>
                  </p>
                </div>
              </Widget>
            </Link>
          </Grid>
        }

        {
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Link
              to={'/admin/airports_data'}
              style={{ textDecoration: 'none' }}
            >
              <Widget title={'Airports_data'}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <InfoIcon color='primary' sx={{ mr: 1 }} />
                  <p className={classes.widgetText}>
                    Airports_data:{' '}
                    <span className={classes.widgetTextCount}>
                      {airports_data}
                    </span>
                  </p>
                </div>
              </Widget>
            </Link>
          </Grid>
        }

        {
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Link to={'/admin/flights'} style={{ textDecoration: 'none' }}>
              <Widget title={'Flights'}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <InfoIcon color='primary' sx={{ mr: 1 }} />
                  <p className={classes.widgetText}>
                    Flights:{' '}
                    <span className={classes.widgetTextCount}>{flights}</span>
                  </p>
                </div>
              </Widget>
            </Link>
          </Grid>
        }

        {
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Link to={'/admin/seats'} style={{ textDecoration: 'none' }}>
              <Widget title={'Seats'}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <InfoIcon color='primary' sx={{ mr: 1 }} />
                  <p className={classes.widgetText}>
                    Seats:{' '}
                    <span className={classes.widgetTextCount}>{seats}</span>
                  </p>
                </div>
              </Widget>
            </Link>
          </Grid>
        }
      </Grid>
    </div>
  );
};

export default Dashboard;
