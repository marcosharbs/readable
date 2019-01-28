import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Fragment>
        {this.props.loading === true
          ? null
          : <div>Hello World!</div>}
      </Fragment>
    );
  }
}

function mapStateToProps ({ categories }) {
  return {
    loading: categories.length === 0
  }
}

export default connect(mapStateToProps)(App);
