import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Snackbar from 'material-ui/Snackbar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios'

var log = console.log.bind()

class BugForm extends React.Component {
    constructor (props){
        super(props)
        this.state = {
            reporter: '',
            desc: '',
            feedbackShow: false,
            feedbackMsg: '提交成功.',
            submitDisabled: true,
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleFeedbackClose = this.handleFeedbackClose.bind(this)
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
                <div className='container'>
                    <TextField
                        name='reporter'
                        floatingLabelText='提交人'
                        style={styles.reporter}
                        value = {this.state.reporter}
                        onChange = {this.handleChange}
                    />
                    <TextField 
                        name='desc'
                        floatingLabelText='问题描述'
                        multiLine={true}
                        rows={5}
                        value = {this.state.desc}
                        textareaStyle={styles.desc}
                        onChange = {this.handleChange}
                    />

                    <RaisedButton 
                        label='提交' 
                        primary={true} 
                        style={styles.button} 
                        disabled = {this.state.submitDisabled}
                        onClick = {
                            () => {
                                this.handleSubmit()
                            }
                        }
                    />
                    <Snackbar
                        open={this.state.feedbackShow}
                        message={this.state.feedbackMsg}
                        autoHideDuration={3000}
                        onRequestClose={this.handleFeedbackClose}
                    />
                </div>
            </MuiThemeProvider>
        )
    }

    handleChange(event){
        const name = event.target.name
        const value = event.target.value

        this.setState({
            [name]: value,
            }, 
            () => {
            if (this.state.reporter !== '' && this.state.desc !== '') {
                this.setState({
                    submitDisabled: false,
                })
            } else {
                this.setState({submitDisabled: true,})
            }
        })

    }
    handleSubmit() {
        axios.post('http://localhost:8023/api/new', {
            reporter: this.state.reporter,
            desc: this.state.desc,
        }).then( res => {
            if (res.data.result === 'success') {
               this.setState({
                   feedbackShow: true,
               }) 
               this.setState({
                   reporter: '',
                   desc: '',
               })
               
            }
        })
    }
    handleFeedbackClose () {
        this.setState({
            feedbackShow: false,
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