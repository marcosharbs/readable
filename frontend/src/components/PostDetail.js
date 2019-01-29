import React, { Component } from 'react'
import Post from './Post'
import NewComment from './NewComment'
import Comment from './Comment'
import { connect } from 'react-redux'
import { handleGetComments } from '../actions/comments'

class PostDetail extends Component {

    componentDidMount() {
        const { postId, dispatch } = this.props
        dispatch(handleGetComments(postId))
    }

    render() {
        const { postId, postsLoaded, postExists, comments } = this.props

        if(postsLoaded === true) {
            if(postExists === true) {
                return (
                    <div>
                        <Post 
                            id={postId} 
                            redirectOnDelete={true} 
                        />
                        <NewComment
                            postId={postId}
                        />
                        {comments && (
                            <div style={{ 
                                maxWidth: '750px', 
                                marginLeft: 'auto', 
                                marginRight: 'auto',
                                marginTop: '40px' 
                            }}>
                                <div>
                                    <h3>{`${comments.length} comments`}</h3>
                                </div>
                                {comments.sort((a,b) => b.voteScore-a.voteScore).map(comment => (
                                    <Comment 
                                        key={comment.id}
                                        comment={comment}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )
            } else {
                return (
                    <div style={{ textAlign: 'center', marginTop: '50px' }}>
                        <h2>Post not found!</h2>
                    </div>
                )
            }
        }
         
        return null 
    }
    
}

function mapStateToProps ({ posts, comments }, props) {

    const postsArray = Object.values(posts) 
    const postId = props.match.params.post_id

    return {
        postExists: postsArray.find(post => post.id === postId) !== undefined,
        postsLoaded: postsArray.length > 0,
        postId,
        comments: comments[postId]
    }
}

export default connect(mapStateToProps)(PostDetail)