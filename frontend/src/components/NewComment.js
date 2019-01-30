import React from 'react'
import {
    Button,
    TextField
} from '@material-ui/core'
import { handleAddComment } from '../actions/comments'
import { connect } from 'react-redux'

const NewComment = (props) => {

    const clearFields = () => {
        document.getElementById('comment_author').value = ''
        document.getElementById('comment_message').value = ''
    }
    
    const onSaveComment = (event) => {
        event.preventDefault()

        const { postId, saveComment } = props

        const author = document.getElementById('comment_author').value
        const message = document.getElementById('comment_message').value

        saveComment(message, author, postId)
        .then(() => clearFields())
    }

    return (
        <div style={{ 
                maxWidth: '750px', 
                marginLeft: 'auto', 
                marginRight: 'auto',
                marginTop: '40px' 
            }}>
            <h3>New Comment</h3>
            <form onSubmit={onSaveComment}>
                <div>
                    <TextField
                        id={`comment_author`}
                        label="Author"
                        margin="normal"
                        required
                        style={{ width: '100%' }}
                    />
                    <TextField
                        id={`comment_message`}
                        label="Message"
                        margin="normal"
                        required
                        style={{ width: '100%' }}
                    />
                </div>
                <div style={{ marginTop: '20px' }}>
                    <Button
                        onClick={clearFields}
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
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveComment: (message, author, postId) => {
            return dispatch(handleAddComment(message, author, postId))
        }
    }
}

export default connect(null, mapDispatchToProps)(NewComment)