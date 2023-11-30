import React, { useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import classnames from 'classnames';

import SettingsIcon from '@mui/icons-material/Settings';
import GithubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

import { Fab, IconButton } from '@mui/material';
import { connect } from 'react-redux';
// styles
import useStyles from './styles';

// components
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import { Link } from '../Wrappers';
import ColorChangeThemePopper from './components/ColorChangeThemePopper';

import EditUser from '../../pages/user/EditUser';

// pages
import Dashboard from '../../pages/dashboard';
import BreadCrumbs from '../../components/BreadCrumbs';

// context
import { useLayoutState } from '../../context/LayoutContext';

import UsersFormPage from 'pages/CRUD/Users/form/UsersFormPage';
import UsersFormPageView from 'pages/CRUD/Users/form/UsersFormPageView';
import UsersTablePage from 'pages/CRUD/Users/table/UsersTablePage';

import Aircrafts_dataFormPage from 'pages/CRUD/Aircrafts_data/form/Aircrafts_dataFormPage';
import Aircrafts_dataFormPageView from 'pages/CRUD/Aircrafts_data/form/Aircrafts_dataFormPageView';
import Aircrafts_dataTablePage from 'pages/CRUD/Aircrafts_data/table/Aircrafts_dataTablePage';

import Airports_dataFormPage from 'pages/CRUD/Airports_data/form/Airports_dataFormPage';
import Airports_dataFormPageView from 'pages/CRUD/Airports_data/form/Airports_dataFormPageView';
import Airports_dataTablePage from 'pages/CRUD/Airports_data/table/Airports_dataTablePage';

import FlightsFormPage from 'pages/CRUD/Flights/form/FlightsFormPage';
import FlightsFormPageView from 'pages/CRUD/Flights/form/FlightsFormPageView';
import FlightsTablePage from 'pages/CRUD/Flights/table/FlightsTablePage';

import SeatsFormPage from 'pages/CRUD/Seats/form/SeatsFormPage';
import SeatsFormPageView from 'pages/CRUD/Seats/form/SeatsFormPageView';
import SeatsTablePage from 'pages/CRUD/Seats/table/SeatsTablePage';

const Redirect = (props) => {
  useEffect(() => window.location.replace(props.url));
  return <span>Redirecting...</span>;
};

function Layout(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const id = open ? 'add-section-popover' : undefined;
  const handleClick = (event) => {
    setAnchorEl(open ? null : event.currentTarget);
  };

  // global
  let layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <Header history={props.history} />
      <Sidebar />
      <div
        className={classnames(classes.content, {
          [classes.contentShift]: layoutState.isSidebarOpened,
        })}
      >
        <div className={classes.fakeToolbar} />
        <BreadCrumbs />
        <Switch>
          <Route path='/admin/dashboard' component={Dashboard} />
          <Route path='/admin/user/edit' component={EditUser} />
          <Route
            path={'/admin/api-docs'}
            exact
            component={(props) => (
              <Redirect
                url={
                  process.env.NODE_ENV === 'production'
                    ? window.location.origin + '/api-docs'
                    : 'http://localhost:8080/api-docs'
                }
                {...props}
              />
            )}
          />

          <Route path={'/admin/users'} exact component={UsersTablePage} />
          <Route path={'/admin/users/new'} exact component={UsersFormPage} />
          <Route
            path={'/admin/users/:id/edit'}
            exact
            component={UsersFormPage}
          />
          <Route
            path={'/admin/users/:id/show'}
            exact
            component={UsersFormPageView}
          />

          <Route
            path={'/admin/aircrafts_data'}
            exact
            component={Aircrafts_dataTablePage}
          />
          <Route
            path={'/admin/aircrafts_data/new'}
            exact
            component={Aircrafts_dataFormPage}
          />
          <Route
            path={'/admin/aircrafts_data/:id/edit'}
            exact
            component={Aircrafts_dataFormPage}
          />
          <Route
            path={'/admin/aircrafts_data/:id/show'}
            exact
            component={Aircrafts_dataFormPageView}
          />

          <Route
            path={'/admin/airports_data'}
            exact
            component={Airports_dataTablePage}
          />
          <Route
            path={'/admin/airports_data/new'}
            exact
            component={Airports_dataFormPage}
          />
          <Route
            path={'/admin/airports_data/:id/edit'}
            exact
            component={Airports_dataFormPage}
          />
          <Route
            path={'/admin/airports_data/:id/show'}
            exact
            component={Airports_dataFormPageView}
          />

          <Route path={'/admin/flights'} exact component={FlightsTablePage} />
          <Route
            path={'/admin/flights/new'}
            exact
            component={FlightsFormPage}
          />
          <Route
            path={'/admin/flights/:id/edit'}
            exact
            component={FlightsFormPage}
          />
          <Route
            path={'/admin/flights/:id/show'}
            exact
            component={FlightsFormPageView}
          />

          <Route path={'/admin/seats'} exact component={SeatsTablePage} />
          <Route path={'/admin/seats/new'} exact component={SeatsFormPage} />
          <Route
            path={'/admin/seats/:id/edit'}
            exact
            component={SeatsFormPage}
          />
          <Route
            path={'/admin/seats/:id/show'}
            exact
            component={SeatsFormPageView}
          />
        </Switch>
        <Fab
          color='primary'
          aria-label='settings'
          onClick={(e) => handleClick(e)}
          className={classes.changeThemeFab}
          style={{ zIndex: 100 }}
        >
          <SettingsIcon style={{ color: '#fff' }} />
        </Fab>
        <ColorChangeThemePopper id={id} open={open} anchorEl={anchorEl} />
        <Footer>
          <div>
            <Link
              color={'primary'}
              href={'https://flatlogic.com/'}
              target={'_blank'}
              className={classes.link}
            >
              Flatlogic
            </Link>
            <Link
              color={'primary'}
              href={'https://flatlogic.com/about'}
              target={'_blank'}
              className={classes.link}
            >
              About Us
            </Link>
            <Link
              color={'primary'}
              href={'https://flatlogic.com/blog'}
              target={'_blank'}
              className={classes.link}
            >
              Blog
            </Link>
          </div>
          <div>
            <Link href={'https://www.facebook.com/flatlogic'} target={'_blank'}>
              <IconButton aria-label='facebook'>
                <FacebookIcon style={{ color: '#6E6E6E99' }} />
              </IconButton>
            </Link>
            <Link href={'https://twitter.com/flatlogic'} target={'_blank'}>
              <IconButton aria-label='twitter'>
                <TwitterIcon style={{ color: '#6E6E6E99' }} />
              </IconButton>
            </Link>
            <Link href={'https://github.com/flatlogic'} target={'_blank'}>
              <IconButton
                aria-label='github'
                style={{ padding: '12px 0 12px 12px' }}
              >
                <GithubIcon style={{ color: '#6E6E6E99' }} />
              </IconButton>
            </Link>
          </div>
        </Footer>
      </div>
    </div>
  );
}

export default withRouter(connect()(Layout));
