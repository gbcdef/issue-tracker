import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios'

class BugForm extends React.Component {
    constructor (props){
        super(props)
        this.state = {
            reporter: null,
            desc: null,

        }

        this.handleChange = this.handleChange.bind(this)
    }

    render() {
        let styles = {
            reporter: {
                // width: '300px',
                display: 'block',
            },
            desc: {
                // width: '300px',
                height: '180px',
            },
            button: {
                display: 'block',
                width: '50px',
            },
        }
        return (
            <MuiThemeProvider>
                <form>
                    <TextField
                        name='reporter'
                        floatingLabelText='提交人'
                        style={styles.reporter}
                        onChange = {this.handleChange}
                    />
                    <TextField 
                        name='desc'
                        floatingLabelText='问题描述'
                        multiLine={true}
                        rows={5}
                        textareaStyle={styles.desc}
                        onChange = {this.handleChange}
                    />

                    <RaisedButton 
                        label='提交' 
                        primary={true} 
                        style={styles.button} 
                        onClick = {
                            () => {
                                this.handleSubmit()
                            }
                        }
                    />
                </form>
            </MuiThemeProvider>
        )
    }

    handleChange(event){
        const name = event.target.name
        const value = event.target.value

        this.setState({
            [name]: value,
        })
    }
    handleSubmit() {
        axios.post('http://localhost:8023/api/new', {
            reporter: this.state.reporter,
            desc: this.state.desc,
        }).then( res => {
            console.log(res.data)
        })
    }
    handleFetch(){
        axios.get('http://localhost:8023/api/all')
        .then(
            res => {
                console.log(res.data)
            }
        )
    }
}

export default BugForm