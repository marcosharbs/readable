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
    Delete
} from '@material-ui/icons'
import {
    handleVoteCommentUp,
    handleVoteCommentDown,
    handleDeleteComment,
    handleEditComment
} from '../actions/comments'
import { formatDate } from '../utils/helpers'

class Comment extends Component {

    state = {
        editMode: false
    }

    toggleEditMode = () => {
        const { editMode } = this.state
        this.setState({ editMode: !editMode })
    }

    onVoteUp = () => {
        const { comment, voteUp } = this.props
        voteUp(comment)
    }

    onVoteDown = () => {
        const { comment, voteDown } = this.props
        voteDown(comment)
    }

    onDeleteComment = () => {
        const { comment, deleteComment } = this.props
        deleteComment(comment)
    }

    onEditComment = (event) => {
        event.preventDefault()

        const { comment, editComment } = this.props

        const body = document.getElementById(`comment_message_${comment.id}`).value

        editComment(comment.id, body)
        .then(() => this.toggleEditMode())
    }

    render() {
        const { editMode } = this.state
        const { comment } = this.props

        return (
            <Card style={{ marginTop: '10px', marginLeft: 'auto', marginRight: 'auto' }}>
                {editMode === true 
                    ? (
                        <form onSubmit={this.onEditComment} style={{ margin: '20px' }}>
                            <div>
                                <TextField
                                    id={`comment_message_${comment.id}`}
                                    label="Message"
                                    margin="normal"
                                    defaultValue={comment.body}
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
                    ) : (
                        <Fragment>
                            <CardHeader 
                                title={comment.author}
                                subheader={formatDate(comment.timestamp)}
                            />
                            <CardContent>
                                <Typography component="p">{comment.body}</Typography>
                            </CardContent>
                            <CardActions>
                                <div>
                                    <IconButton color="inherit" onClick={this.onVoteDown}>
                                        <ArrowDropDown color="inherit" />
                                    </IconButton>
                                    {comment.voteScore}
                                    <IconButton color="inherit" onClick={this.onVoteUp}>
                                        <ArrowDropUp color="inherit" />
                                    </IconButton>
                                </div>
                                <div style={{ flexGrow: '1', textAlign: 'right' }}>
                                    <IconButton aria-label="Edit" onClick={this.toggleEditMode}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton aria-label="Delete" onClick={this.onDeleteComment}>
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

const mapDispatchToProps = (dispatch) => {
    return {
        voteUp: (comment) => {
            dispatch(handleVoteCommentUp(comment.parentId, comment.id))
        },
        voteDown: (comment) => {
            dispatch(handleVoteCommentDown(comment.parentId, comment.id))
        },
        deleteComment: (comment) => {
            dispatch(handleDeleteComment(comment.parentId, comment.id))
        },
        editComment: (id, body) => {
            return dispatch(handleEditComment(id, body))
        }
    }
}

export default connect(null, mapDispatchToProps)(Comment)