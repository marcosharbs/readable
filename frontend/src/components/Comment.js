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

    voteUp = () => {
        const { comment, dispatch } = this.props
        dispatch(handleVoteCommentUp(comment.parentId, comment.id))
    }

    voteDown = () => {
        const { comment, dispatch } = this.props
        dispatch(handleVoteCommentDown(comment.parentId, comment.id))
    }

    deleteComment = () => {
        const { comment, dispatch } = this.props
        dispatch(handleDeleteComment(comment.parentId, comment.id))
    }

    editComment = (event) => {
        event.preventDefault()

        const { comment, dispatch } = this.props

        const body = document.getElementById(`comment_message_${comment.id}`).value

        dispatch(handleEditComment(comment.id, body, () => {
            this.toggleEditMode()
        }))
    }

    render() {
        const { editMode } = this.state
        const { comment } = this.props

        return (
            <Card style={{ marginTop: '10px', marginLeft: 'auto', marginRight: 'auto' }}>
                {editMode === true 
                    ? (
                        <form onSubmit={this.editComment} style={{ margin: '20px' }}>
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
                                    <IconButton color="inherit" onClick={this.voteDown}>
                                        <ArrowDropDown color="inherit" />
                                    </IconButton>
                                    {comment.voteScore}
                                    <IconButton color="inherit" onClick={this.voteUp}>
                                        <ArrowDropUp color="inherit" />
                                    </IconButton>
                                </div>
                                <div style={{ flexGrow: '1', textAlign: 'right' }}>
                                    <IconButton aria-label="Edit" onClick={this.toggleEditMode}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton aria-label="Delete" onClick={this.deleteComment}>
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

export default connect()(Comment)