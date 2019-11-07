import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addCommonArea} from '../../actions/commonAreaAction';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';

class CommonArea  extends Component {
    constructor(props) {
        super(props);
        this.state = {

            commonArea: '',
            errors:{},
            loading:true,
            message:''
           
        }

    }


    OnKeyPressUserhandler=(event) => {
        const pattern = /^[a-zA-Z ]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }


componentDidMount() {
    this.refreshData() ;
}

refreshData() {
this.setState({loading:false})
}

handleChange = (event) => {
    this.setState({message:''});
    if (!!this.state.errors[event.target.name]) {
        let errors = Object.assign({}, this.state.errors);
        delete errors[event.target.name];
        this.setState({ [event.target.name]: event.target.value.trim(''), errors });
    }
    else {
        this.setState({ [event.target.name]: event.target.value.trim('') });
    }
}

changePassword=()=>{ 
    return this.props.history.replace('/superDashboard/changePassword')
}

push=()=>{
    this.props.history.push('/superDashboard/displayCommonAreaMaster')
}

onSubmit = (e) => {
    e.preventDefault();
    const {commonArea} = this.state
    
    let errors = {};
    if(this.state.commonArea===''){
        errors.commonArea="Common Area can't be empty"
    }

    this.setState({ errors });
    const isValid = Object.keys(errors).length === 0
    if(isValid){           
        this.setState({loading:true});
        this.props.addCommonArea(commonArea)
        .then(()=>
        this.props.history.push('/superDashboard/displayCommonAreaMaster'))
        .catch(err=>{
            this.setState({message: err.response.data.message, loading: false})                    
        })
        this.setState({
            commonArea:''
        })   
        }      
    console.log("commonArea",commonArea)
}

logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user-type');
    return this.props.history.replace('/') 
}

close=()=>{
    return this.props.history.replace('/superDashBoard')
}

render() {
    let form;
    form=<div>
                   
                   <FormGroup>
                        <Label>Common Area</Label>                               
                        <Input type="text"  placeholder="Common Area"  onKeyPress={this.OnKeyPressUserhandler}  name="commonArea" maxLength={100} onChange={this.handleChange} ></Input>
                        <span className="error">{this.state.errors.commonArea}</span>
                        <span className="error">{this.state.message}</span>
                    </FormGroup>
                    
                    <Button color="success" className="mr-2">Submit</Button>             
                    <Button color="danger" onClick={this.push}>Cancel</Button>
    </div>
    return(       
            <div>       
                <UI onClick={this.logout} change={this.changePassword}>

                <Form onSubmit={this.onSubmit} >
                <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <div><h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Add Common Area</h3></div>
                        {!this.state.loading ? form : <Spinner />}
                                                                                      
                </Form>
                </UI> 
        </div>
        )
        
    }
}

function mapStateToProps(state) {
     return {
        commonAreaReducer: state.commonAreaReducer

        }
    }

function mapDispatchToProps(dispatch) {
    return bindActionCreators({addCommonArea}, dispatch);
    }

export default connect(mapStateToProps, mapDispatchToProps)(CommonArea);
