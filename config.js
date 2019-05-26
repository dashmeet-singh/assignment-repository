var config = {
  dev: {
      dbURL: 'mongodb+srv://user:user@cluster0-nhnjo.mongodb.net/test?retryWrites=true',
      ENDPOINT : {
        CUSTOMER_TRANSACTIONS : 'http://localhost:8080/customer-transactions',
        ADD_TRANSACTION : 'http://localhost:8080/add-transaction'
      }
  },
  prod: {
      dbURL: 'mongodb+srv://user:user@cluster0-nhnjo.mongodb.net/test?retryWrites=true',
      ENDPOINT : {
        CUSTOMER_TRANSACTIONS : 'http://localhost:8080/customer-transactions',
        ADD_TRANSACTION : 'http://localhost:8080/add-transaction'
      }
  }
};

module.exports = config;
