import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Select, MenuItem } from '@material-ui/core';

class PostList extends Component {

    render() {
        const { posts, match } = this.props
        
        let filteredPosts = posts

        if(match && match.params && match.params.category) {
            const category = match.params.category
            filteredPosts = filteredPosts.filter(post => post.category === category)
        }

        return (
            <Grid container >
                <label style={{ marginLeft: '15px', marginTop: '45px' }}>Order by: </label>
                <Grid item xs={5} sm={2}>
                    <Select 
                        value={'voteScore'}
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
                        value={'asc'}
                        style={{ 
                            width: '100%', 
                            marginLeft: '40px', 
                            marginTop: '40px' 
                        }}>
                        <MenuItem value={'asc'}>Ascending</MenuItem>
                        <MenuItem value={'desc'}>Descending</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    {filteredPosts.length > 0 ? filteredPosts.map(post => (
                        <p key={post.id}>{`${post.id} - ${post.title}`}</p>
                    )) : (<p>{'Posts not found!'}</p>)}
                </Grid>
            </Grid>
        )
    }

}

function mapStateToProps ({ posts }) {
    return { posts }
}

export default connect(mapStateToProps)(PostList)