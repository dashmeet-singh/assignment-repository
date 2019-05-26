import { FETCH_TRANSACTIONS, TRANSFER_TRANSACTION, SET_PROGRESS_BAR, SET_FORM_PROGRESS_BAR} from './types';
import axios from 'axios'
import { toast } from "react-toastify";

export const fetchTransactions = () => dispatch => {
    console.log('fetching transactions');
    dispatch({type : SET_PROGRESS_BAR, payload : true});
    axios.get(`http://localhost:8080/customer-transactions`)
        .then(res => {
          dispatch({
            type : FETCH_TRANSACTIONS,
            payload : res.data
          });

          dispatch({type : SET_PROGRESS_BAR, payload : false});

        }).catch(function (error) {
          toast.error("Internal server error, please try again");
          dispatch({type : SET_PROGRESS_BAR, payload : false});
          console.log(error);
        });
}

export const transferTransaction = (trxnData) => dispatch => {
   console.log('transferring transaction');
   dispatch({type : SET_FORM_PROGRESS_BAR, payload : true});

   axios.post('http://localhost:8080/add-transaction', trxnData)
        .then(function (response) {
              console.log(response);
              toast.success("Transaction success - Amount succesfully transferred!");
              dispatch({
                type : TRANSFER_TRANSACTION,
                payload : response.data
              });
              dispatch({type : SET_FORM_PROGRESS_BAR, payload : false});
              dispatch(fetchTransactions());
          })
          .catch(function (error) {
              toast.error("Internal server error, please try again");
              dispatch({type : SET_FORM_PROGRESS_BAR, payload : false});
              console.log(error);
          });
};
