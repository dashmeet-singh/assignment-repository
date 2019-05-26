import React from 'react'
import '../css/form.css'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { transferTransaction, fetchTransactions } from '../redux/actions/transactionActions.js'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import StringBuffer from 'stringbuffer';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

class Form extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      amount : '',
      paymentMode: '',
      username: '',
      errors : []
    }

   this.handleChange = this.handleChange.bind(this);
   this.onSubmit = this.onSubmit.bind(this);
   this.onClickUser = this.onClickUser.bind(this);
   this.getClassNames = this.getClassNames.bind(this);
 };

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  };

  onClickUser(user) {
    console.log(user.currentTarget.value);
    this.setState({username: user.currentTarget.value,
                  condition:true});
  };

  validateForm() {
    var errors = [];
    this.state.username?errors:errors.push('user');
    this.state.amount?errors:errors.push('amount');
    this.state.paymentMode?errors:errors.push('paymentMode');

    if (errors.length >0) {
      this.setState({ errors : errors });
      return false;
    }

    this.setState({ errors : [] });
    return true;
  }

  onSubmit(e) {
    e.preventDefault();
    if(!this.validateForm()) return;

    const trxn = {
      paymentMode : this.state.paymentMode,
      amount: this.state.amount,
      username: this.state.username
    };

    this.props.transferTransaction(trxn);
  };

  getClassNames(user, field) {
      var sb = new StringBuffer();

      if(field === 'user') {
          this.state.username == user?sb.append("buttonGrp "):sb.append("buttonGrp trxnButton ");
          this.state.errors.includes('user')?sb.append("error "):sb;
      }

      this.state.errors.includes(field)?sb.append("error "):sb;
      return sb.toString();
  };

  //Label texts to come from localization JSON file
  render () {
     const { errors } = this.state;

    return (
      <div className="container jumbotron  paymentForm" disabled={this.props.loading}>
      <ToastContainer autoClose={5000} />
      <form onSubmit={this.onSubmit}>

      {errors.length>0 && (
      <div className="row">
          <div className="col-lg-5 errorMesg">
            Please select the fields highlighted in red
         </div>
      </div>
    )}

      <div className="row">

      <div className="col-lg-3">
      <div className="btn-group-vertical">
      <Button className={this.getClassNames("USER-A","user")} value="USER-A" variant="secondary" onClick={this.onClickUser}>USER-A</Button>
      <Button className={this.getClassNames("USER-B","user")} value="USER-B" variant="secondary" onClick={this.onClickUser}>USER-B</Button>
      <Button className={this.getClassNames("USER-C","user")} value="USER-C" variant="secondary" onClick={this.onClickUser}>USER-C</Button>
      </div>

      </div>

      <div className="col-lg-3 marginTop">
      <div>
        <label>
          <input type='radio' className={this.getClassNames(null, "paymentMode")} name="paymentMode" value="American Express" onChange={this.handleChange}/>
          American Express
        </label>
      </div>

          <div>
            <label>
            <input type='radio' className={this.getClassNames(null, "paymentMode")} name="paymentMode" value="VISA"  onChange={this.handleChange}/>
            VISA
          </label>
          </div>

          <div>
          <label>
          <input type='radio' className={this.getClassNames(null, "paymentMode")} name="paymentMode" value="DBS PayLah" onChange={this.handleChange}/>
          DBS PayLah
          </label>
          </div>
      </div>

          <div className='col-lg-2 padding'>
            <label>
            <input type='number' name="amount" className={this.getClassNames(null, "amount")} value={this.state.amount} max='5000' onChange={this.handleChange}/>
            <br/>
            <p className='helpText'>***Maximum Allowed amount is 5000 INR</p>
            </label>
          </div>

          <div className="col-lg-3 padding">
            <input className="button btn btn-primary transferBtn" type='submit' disabled={this.props.loading} value='Transfer' />
            <ClipLoader
                sizeUnit={"px"}
                size={40}
                color={'#123abc'}
                loading={this.props.loading}
              />
          </div>

      </div>
      </form>
      </div>
    )
  }
}

Form.propTypes = {
  transferTransaction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loading : state.transactions.formLoading
});

export default connect(mapStateToProps, { transferTransaction })(Form);
