import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'SEATS_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'SEATS_FORM_FIND_STARTED',
      });

      axios.get(`/seats/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'SEATS_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'SEATS_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/seats'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'SEATS_FORM_CREATE_STARTED',
      });

      axios.post('/seats', { data: values }).then((res) => {
        dispatch({
          type: 'SEATS_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Seats created' });
        dispatch(push('/admin/seats'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'SEATS_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'SEATS_FORM_UPDATE_STARTED',
      });

      await axios.put(`/seats/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'SEATS_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Seats updated' });
        dispatch(push('/admin/seats'));
      }
    } catch (error) {
      Errors.handle(error);
      showSnackbar({ type: 'error', message: 'Seats update error' });
      dispatch({
        type: 'SEATS_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
