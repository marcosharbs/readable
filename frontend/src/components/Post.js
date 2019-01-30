import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { 
    Card, 
    CardHeader, 
    CardContent, 
    Typography, 
    CardActions, 
    IconButton,
    Button,
    TextField 
} from '@material-ui/core'
import { 
    ArrowDropDown,
    ArrowDropUp,
    Edit,
    Delete,
    Comment 
} from '@material-ui/icons'
import { 
    handleVotePostUp,
    handleVotePostDown,
    handleDeletePost,
    handleEditPost 
} from '../actions/posts'
import { Link, withRouter } from 'react-router-dom'
import { formatDate } from '../utils/helpers'

class Post extends Component {

    state = {
        editMode: false
    }

    toggleEditMode = () => {
        const { editMode } = this.state
        this.setState({ editMode: !editMode })
    }

    onVoteUp = () => {
        const { id, voteUp } = this.props
        voteUp(id)
    }

    onDeletePost = () => {
        const { id, redirectOnDelete, deletePost, history } = this.props
        deletePost(id)
        .then(() => {
            if(redirectOnDelete === true) {
                history.push('/')
            }
        })
    }

    onVoteDown = () => {
        const { id, voteDown } = this.props
        voteDown(id)
    }

    onEditPost = (event) => {
        event.preventDefault()

        const { id, editPost } = this.props

        const title = document.getElementById(`post_title_${id}`).value
        const body = document.getElementById(`post_body_${id}`).value

        editPost(id, title, body)
        .then(() => this.toggleEditMode())
    }

    render() {
        const { editMode } = this.state
        const { id, posts } = this.props

        const post = posts.find(post => post.id === id)

        return (
            <Card style={{ maxWidth: 800, marginTop: '20px', marginLeft: 'auto', marginRight: 'auto' }}>
                {editMode === true 
                    ? (
                        <form onSubmit={this.onEditPost} style={{ margin: '20px' }}>
                            <div>
                                <TextField
                                    id={`post_title_${post.id}`}
                                    label="Title"
                                    margin="normal"
                                    defaultValue={post.title}
                                    required
                                    style={{ width: '100%' }}
                                />
                                <TextField
                                    id={`post_body_${post.id}`}
                                    label="Text"
                                    margin="normal"
                                    defaultValue={post.body}
                                    required
                                    style={{ width: '100%' }}
                                />
                            </div>
                            <div style={{ marginTop: '20px' }}>
                                <Button 
                                    onClick={this.toggleEditMode}
                                    variant="contained" 
                                    style={{ marginRight: '20px' }}>
                                    CANCELAR
                                </Button>
                                <Button 
                                    type={'submit'} 
                                    variant="contained" 
                                    color="primary">
                                    SALVAR
                                </Button>
                            </div>
                        </form>
                    )
                    : (
                        <Fragment>
                            <Link to={`/${post.category}/${post.id}`}>
                                <CardHeader 
                                    title={post.title} 
                                    subheader={`Posted by ${post.author} - ${formatDate(post.timestamp)} - ${post.category}`}
                                />
                            </Link>
                            <CardContent>
                                <Typography component="p">{post.body}</Typography>
                            </CardContent>
                            <CardActions>
                                <div style={{ display: 'flex', alignItems: 'center', marginLeft: '15px' }}>
                                    <Comment/>
                                    <span style={{ marginLeft: '10px' }}>{`${post.commentCount} comments`}</span>
                                </div>
                                <div>
                                    <IconButton color="inherit" onClick={this.onVoteDown}>
                                        <ArrowDropDown color="inherit" />
                                    </IconButton>
                                    {post.voteScore}
                                    <IconButton color="inherit" onClick={this.onVoteUp}>
                                        <ArrowDropUp color="inherit" />
                                    </IconButton>
                                </div>
                                <div style={{ flexGrow: '1', textAlign: 'right' }}>
                                    <IconButton aria-label="Edit" onClick={this.toggleEditMode}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton aria-label="Delete" onClick={this.onDeletePost}>
                                        <Delete />
                                    </IconButton>
                                </div>
                            </CardActions>
                        </Fragment>
                    )}
            </Card>
        )
    }

}

const mapStateToProps = ({ posts }) => {
    return { posts: Object.values(posts) }
}

const mapDispatchToProps = (dispatch) => {
    return {
        voteUp: (id) => {
            dispatch(handleVotePostUp(id))
        },
        deletePost: (id) => {
            return dispatch(handleDeletePost(id))
        },
        voteDown: (id) => {
            dispatch(handleVotePostDown(id))
        },
        editPost: (id, title, body) => {
            return dispatch(handleEditPost(id, title, body))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))