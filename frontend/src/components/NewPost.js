import React, { Component } from 'react'
import {
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@material-ui/core'
import { connect } from 'react-redux'
import { handleAddPost } from '../actions/posts'
import { withRouter } from 'react-router-dom'

class NewPost extends Component {

    state = {
        title: '',
        body: '',
        author: '',
        category: ''
    }

    changeField = (name, value) => {
        this.setState({ [name]: value })
    }

    savePost = (event) => {
        event.preventDefault()

        const { title, body, author, category } = this.state
        const { dispatch } = this.props

        dispatch(handleAddPost(title, body, author, category, () => {
            this.goToHome()
        }))
    }

    goToHome = () => {
        this.props.history.push('/')
    }

    render() {
        const { title, body, author, category } = this.state
        const { categories } = this.props
        const canSave = title && body && author && category

        return (
            <form style={{ margin: '20px' }} onSubmit={this.savePost}>
                <h3>New Post</h3>
                <div>
                    <TextField
                        id={`post_title`}
                        label="Title"
                        onChange={event => this.changeField('title', event.target.value)}
                        value={title}
                        margin="normal"
                        required
                        style={{ width: '100%' }}
                    />
                    <TextField
                        id={`post_body`}
                        label="Text"
                        onChange={event => this.changeField('body', event.target.value)}
                        value={body}
                        margin="normal"
                        required
                        style={{ width: '100%' }}
                    />
                    <TextField
                        id={`post_author`}
                        label="Author"
                        onChange={event => this.changeField('author', event.target.value)}
                        value={author}
                        margin="normal"
                        required
                        style={{ width: '100%' }}
                    />
                    <FormControl style={{ width: '100%' }} required>
                        <InputLabel>Category</InputLabel>
                        <Select
                            onChange={event => this.changeField('category', event.target.value)}
                            value={category}
                            displayEmpty
                        >
                            {categories.map(category => (
                                <MenuItem 
                                    key={category.path} 
                                    value={category.path}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <Button
                        onClick={this.goToHome}
                        variant="contained"
                        style={{ marginRight: '20px' }}>
                        CANCELAR
                    </Button>
                    <Button
                        type={'submit'}
                        variant="contained"
                        disabled={!canSave}
                        color="primary">
                        SALVAR
                    </Button>
                </div>
            </form>
        )
    }

}

function mapStateToProps({ categories }) {
    return { categories }
}

export default withRouter(connect(mapStateToProps)(NewPost))