import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'AIRCRAFTS_DATA_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'AIRCRAFTS_DATA_FORM_FIND_STARTED',
      });

      axios.get(`/aircrafts_data/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'AIRCRAFTS_DATA_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'AIRCRAFTS_DATA_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/aircrafts_data'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'AIRCRAFTS_DATA_FORM_CREATE_STARTED',
      });

      axios.post('/aircrafts_data', { data: values }).then((res) => {
        dispatch({
          type: 'AIRCRAFTS_DATA_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Aircrafts_data created' });
        dispatch(push('/admin/aircrafts_data'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'AIRCRAFTS_DATA_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'AIRCRAFTS_DATA_FORM_UPDATE_STARTED',
      });

      await axios.put(`/aircrafts_data/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'AIRCRAFTS_DATA_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Aircrafts_data updated' });
        dispatch(push('/admin/aircrafts_data'));
      }
    } catch (error) {
      Errors.handle(error);
      showSnackbar({ type: 'error', message: 'Aircrafts_data update error' });
      dispatch({
        type: 'AIRCRAFTS_DATA_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
