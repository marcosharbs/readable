import React, { Component } from 'react';
import { 
  getCategories, 
  getCategoryPosts,
  getPosts,
  addPost,
  upVotePost,
  downVotePost,
  editPost,
  deletePost,
  getComments,
  addComment,
  upVoteComment,
  downVoteComment,
  editComment,
  deleteComment 
} from './api/ReadableApi'

class App extends Component {

  componentDidMount() {
    getCategories()
    .then(categories => console.log('getCategories', categories))

    getCategoryPosts('react')
    .then(posts => console.log('getCategoryPosts', posts))

    getPosts()
    .then(posts => console.log('getPosts', posts))

    addPost({
      id: 'unique-2',
      timestamp: Date.now(),
      title: 'teste',
      body: 'teste teste',
      author: 'harbs',
      category: 'react'
    })
    .then(post => console.log('addPost', post))

    upVotePost('unique-2')
    .then(post => console.log('upVotePost', post))

    downVotePost('unique-2')
    .then(post => console.log('downVotePost', post))

    editPost('unique-2', 'title edited', 'body edited')
    .then(post => console.log('editPost', post))

    deletePost('unique-2')
    .then(post => console.log('deletePost', post))

    getComments('8xf0y6ziyjabvozdd253nd')
    .then(comments => console.log('getComments', comments))

    addComment({
      id: 'comment-1',
      timestamp: Date.now(),
      body: 'teste comment',
      author: 'harbs',
      parentId: '8xf0y6ziyjabvozdd253nd'
    })
    .then(comment => console.log('addComment', comment))

    upVoteComment('comment-1')
    .then(comment => console.log('upVoteComment', comment))

    downVoteComment('comment-1')
    .then(comment => console.log('downVoteComment', comment))

    editComment('comment-1', Date.now(), 'comment edited')
    .then(comment => console.log('editComment', comment))

    deleteComment('comment-1')
    .then(comment => console.log('deleteComment', comment))
  }

  render() {
    return (
      <div>Hello World!</div>
    );
  }
}

export default App;
