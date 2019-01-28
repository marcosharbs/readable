import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Header from './Header'
import LoadingBar from 'react-redux-loading'
import PostList from './PostList'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Fragment>
        <LoadingBar />
        {this.props.loading === true
          ? null
          : <div>
              <BrowserRouter>
                <Fragment>
                  <Header />
                  <Switch>
                    <Route path='/' exact component={PostList} />
                    <Route path='/:category' exact component={PostList} /> 
                  </Switch>
                </Fragment>
              </BrowserRouter>
            </div>
        }
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
