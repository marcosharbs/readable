import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Select, MenuItem } from '@material-ui/core';
import Post from './Post'

class PostList extends Component {

    state = {
        field: 'voteScore',
        order: 'desc'
    }

    changeField = (field) => {
        this.setState({ field })
    }

    changeOrder = (order) => {
        this.setState({ order })
    }

    render() {
        const { field, order } = this.state
        const { posts, match } = this.props
        
        let filteredPosts = posts

        if(match && match.params && match.params.category) {
            const category = match.params.category
            filteredPosts = filteredPosts.filter(post => post.category === category)
        }

        filteredPosts = filteredPosts.sort((a, b) => order === 'asc' ? a[field] - b[field] : b[field] - a[field])

        return (
            <Grid container >
                <label style={{ marginLeft: '15px', marginTop: '45px' }}>Order by: </label>
                <Grid item xs={5} sm={2}>
                    <Select
                        onChange={event => this.changeField(event.target.value)} 
                        value={field}
                        style={{ 
                            width: '100%', 
                            marginLeft: '15px', 
                            marginTop: '40px' 
                        }}>
                        <MenuItem value={'voteScore'}>Score</MenuItem>
                        <MenuItem value={'timestamp'}>Creation date</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={5} sm={2}>
                    <Select 
                        onChange={event => this.changeOrder(event.target.value)}
                        value={order}
                        style={{ 
                            width: '100%', 
                            marginLeft: '40px', 
                            marginTop: '40px' 
                        }}>
                        <MenuItem value={'asc'}>A-Z</MenuItem>
                        <MenuItem value={'desc'}>Z-A</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    {filteredPosts.length > 0 ? filteredPosts.map(post => (
                        <Post 
                            key={post.id} 
                            id={post.id} 
                        />
                    )) : (<h2 style={{ textAlign: 'center', marginTop: '50px'}}>{'Posts not found!'}</h2>)}
                </Grid>
            </Grid>
        )
    }

}

const mapStateToProps = ({ posts }) => {
    return { posts: Object.values(posts) }
}

export default connect(mapStateToProps)(PostList)