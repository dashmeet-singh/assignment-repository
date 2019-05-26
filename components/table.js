import React from 'react'
import '../css/table.css'
import ReactTable from 'react-table'
import axios from 'axios'
import PropTypes from 'prop-types'
import { connect } from 'react-redux' // connects component to redux store provided by provider
import { fetchTransactions } from '../redux/actions/transactionActions.js'
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';

const columns = [
  {
    Header: 'Transaction ID',
    accessor: 'transactionID'
  },
  {
    Header: 'User Name',
    accessor: 'username'
  },
  {
    Header: 'Payment Mode',
    accessor: 'paymentMode'
  },
  {
    Header: 'Amount',
    accessor: 'amount'
  }
]

class Table extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading : false
    }
  }

  componentWillMount() {
    var data = this.props.fetchTransactions();
    this.setState({ transactions: data });
  }

  render () {
    const override = css`
    margin-left: 50%;`;

    return (
      <div>
      <ClipLoader
          css={override}
          sizeUnit={"px"}
          size={40}
          color={'#123abc'}
          loading={this.props.loading}
          style={{marginLeft:50}}
        />
      <div disabled={this.props.loading}>
      <ReactTable
        className="container jumbotron trxnTable table-bordered"
        data={this.props.transactions}
        columns={columns}
        defaultPageSize={10}
      />
      </div>
     </div>
    )
  }
}

Table.propTypes = {
  fetchTransactions : PropTypes.func.isRequired,
  transactions : PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  transactions : state.transactions.data,
  loading : state.transactions.loading
})

export default connect(mapStateToProps, {fetchTransactions})(Table)
