import React from 'react'
import AppBar from 'material-ui/AppBar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Navigator extends React.Component {
    render(){
        return (
            <MuiThemeProvider>
                <AppBar
                    title='Issue Tracker'
                    showMenuIconButton={false}
                />
            </MuiThemeProvider>
        )
    }
}