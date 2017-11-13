import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import BugForm from './bug-form'
import Navigator from './navigator'

class Test extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data: null,
        }
    }
    render() {
        return(
            <div>
                <Navigator />
                {this.state.data}
                <BugForm />
            </div>
        )
    }

    handleFetch(){
        axios.get('http://localhost:8023/api/all')
        .then(res=>{
            const r=res.data
            console.log(r)
            this.setState({
                data: 'haha',
            })
        })
    }
}

ReactDOM.render(
    <Test />,
    document.querySelector('#root')
)