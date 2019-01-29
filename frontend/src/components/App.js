import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Header from './Header'
import LoadingBar from 'react-redux-loading'
import PostList from './PostList'
import NewPost from './NewPost'
import PostDetail from './PostDetail'
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
          : <div style={{ backgroundColor: '#EEEEEE', minHeight: '100vh', height: '100%' }}>
              <BrowserRouter>
                <Fragment>
                  <Header />
                  <Switch>
                    <Route path='/' exact component={PostList} />
                    <Route path='/new' exact component={NewPost} />
                    <Route path='/:category' exact component={PostList} />
                    <Route path='/:category/:post_id' exact component={PostDetail} /> 
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
