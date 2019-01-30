import React from 'react'
import { connect } from 'react-redux'
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core'
import { AddCircle } from '@material-ui/icons'
import { Link } from 'react-router-dom'

const Header = (props) => {
    const { categories } = props

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
                    <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>Readable</Link>
                </Typography>
                {categories.map(category => (
                    <Button 
                        key={category.path}
                        component={Link}
                        to={`/${category.path}`} 
                        color="inherit">
                        {category.name}
                    </Button>
                ))}
                <IconButton color="inherit" component={Link} to={'/new'}>
                    <AddCircle color="inherit" />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

const mapStateToProps = ({ categories }) => {
    return { categories }
}

export default connect(mapStateToProps)(Header)