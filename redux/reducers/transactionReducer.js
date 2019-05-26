import { FETCH_TRANSACTIONS,
         TRANSFER_TRANSACTION,
         SET_PROGRESS_BAR,
         SET_FORM_PROGRESS_BAR } from '../actions/types';

const initialState = {
  data : [],
  loading : false,
  formLoading : false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_TRANSACTIONS :
      console.log('FETCH_TRANSACTIONS inside reducer called');
      return {
        ...state,
        data : action.payload
      };

    case TRANSFER_TRANSACTION :
      console.log('TRANSFER_TRANSACTION inside reducer called');
      return {
        ...state,
        item : action.payload
      };

    case SET_PROGRESS_BAR :
      console.log('SET_PROGRESS_BAR inside reducer called');
      return {
        ...state,
        loading : action.payload
      };

    case SET_FORM_PROGRESS_BAR :
        console.log('SET_FORM_PROGRESS_BAR inside reducer called');
        return {
          ...state,
          formLoading : action.payload
       };

    default :
      return state;
  }
}
