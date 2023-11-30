import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'AIRPORTS_DATA_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'AIRPORTS_DATA_FORM_FIND_STARTED',
      });

      axios.get(`/airports_data/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'AIRPORTS_DATA_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'AIRPORTS_DATA_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/airports_data'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'AIRPORTS_DATA_FORM_CREATE_STARTED',
      });

      axios.post('/airports_data', { data: values }).then((res) => {
        dispatch({
          type: 'AIRPORTS_DATA_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Airports_data created' });
        dispatch(push('/admin/airports_data'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'AIRPORTS_DATA_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'AIRPORTS_DATA_FORM_UPDATE_STARTED',
      });

      await axios.put(`/airports_data/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'AIRPORTS_DATA_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Airports_data updated' });
        dispatch(push('/admin/airports_data'));
      }
    } catch (error) {
      Errors.handle(error);
      showSnackbar({ type: 'error', message: 'Airports_data update error' });
      dispatch({
        type: 'AIRPORTS_DATA_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
