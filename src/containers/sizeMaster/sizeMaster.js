import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AddSize } from '../../actions/sizeMasterAction';
import 'bootstrap/dist/css/bootstrap.min.css';
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';


import { Form, FormGroup, Input, Button, Label } from 'reactstrap';

class SizeMaster extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sizeType: "",
            menuVisible: false,
            loading:true,
            errors: {},
            message:''
        }

        this.onChange = this.onChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentWillMount(){
        this.refreshData()
    }

    refreshData =()=>{
            this.setState({loading:false})
    }

    onChange(event) {
        this.setState({message:'' })
        if (!!this.state.errors[event.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.name];
            this.setState({ [event.target.name]: event.target.value, errors });
        }
        else {
            this.setState({ [event.target.name]: event.target.value});
        }
    }
 onkeyPresshandle(event){
    const pattern = /[a-zA-Z _]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();

    }
 }

    submit(e) {
        e.preventDefault()
        let errors = {};
        const { sizeType} = this.state
        
        if(!this.state.sizeType){
            errors.sizeType = "Size Type can't be empty. Please select."
        }
        

        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0

        // const isValid = this.validate();
        if (isValid) {
            this.setState({loading: true})
          
                this.props.AddSize(sizeType).then(()=> this.props.history.push('/superDashboard/display-size')).catch(err=>{
                    this.setState({message: err.response.data.message, loading: false})
                })
            
            
           
            
       
    }

}

push=()=>{
    this.props.history.push('/superDashboard/display-size')
}
changePassword=()=>{ 
    return this.props.history.replace('/superDashboard/changePassword')
 }

   
    size=()=>{
        this.props.history.push('/superDashboard/display-size')
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
        let 
        form1=
        <div>
        <Form onSubmit={this.submit}>
  
      
            <FormGroup>
                <Label> Size Type</Label>
                <Input type="text" className="form-control" placeholder="sizeType" value={this.state.size_type} name="sizeType" onChange={this.onChange}  onKeyPress={this.onkeyPresshandle} maxLength ={30} />
                <span className="error">{this.state.errors.sizeType}</span>
                <span className="error">{this.state.message}</span>    
            </FormGroup>
            <FormGroup>
                <Button type="submit" color="success mr-2">Submit</Button>
                <button className=" btn btn-danger" onClick ={this.size}>Cancel</button>
            </FormGroup>
        </Form>
    </div>  
       
        return (
                     
            
            <div>
                <UI onClick={this.logout} change ={this.changePassword}>
          
    <div className="w3-container w3-margin-top w3-responsive">
                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
            
                        <h3 align="center"> Add Size</h3>

{!this.state.loading ?form1:<Spinner/>}
              </div>
           
                </UI>
            </div>
            
        )

    }

}

function mapStateToProps(state) {
    console.log('shub', state);
    return {
        size: state.SizeDetails
    }

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ AddSize }, dispatch);

}


export default connect(mapStateToProps, mapDispatchToProps)(SizeMaster)