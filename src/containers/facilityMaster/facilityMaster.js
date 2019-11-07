import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import UI from '../../components/newUI/superAdminDashboard';
 import {Form,Label,FormGroup,Input,Button} from 'reactstrap';
import {addFacility} from '../../actions/facilityAction';
import {OnKeyPressUserhandler} from '../../validation/validation';
import Spinner from '../../components/spinner/spinner';


class FacilityMaster extends Component{
    constructor(props){
        super(props);
        this.state={
            facilityName:'',
            loading:false,
            errors:{}
        }
    } 

    
    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }

    changePassword=()=>{
        return this.props.history.replace('/superDashboard/changePassword')
      }

      submit=(e)=>{
        e.preventDefault();
        const {facilityName} = this.state;
        let errors = {};
        if(this.state.facilityName===''){
            errors.facilityName="Facility Name can't be empty"
        }
    
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            this.setState({loading: true});
        this.props.addFacility(facilityName)
        .then(()=>this.props.history.push('/superDashboard/facilityDetails'))
        .catch(err=>{
            this.setState({loading:false,message:err.response.data.message})
        })
      
      }}


   
      push=()=>{
        this.props.history.push('/superDashboard/facilityDetails');
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
    

        render(){console.log(this.state)
            let form;
            form=<div>
       
                    <FormGroup>
                        <Label>Facilities</Label>
                        <Input type="text" name="facilityName" placeholder="Facility Name" onChange={this.handleChange} onKeyPress={OnKeyPressUserhandler}/>
                        <span className="error">{this.state.errors.facilityName}</span>
                        <span className="error">{this.state.message}</span>
                    </FormGroup>
                    <FormGroup>
                    <Button type="submit" color="success" className="mr-2" value="submit">Submit</Button>
                    
                    <Button color="danger" onClick={this.push}>Cancel</Button>
                    </FormGroup>
               
            
</div>
 
            return(
                <div>
                    <UI onClick={this.logout} change={this.changePassword}>
                    <Form onSubmit={this.submit} >
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                                    <span aria-hidden="true">&times;</span>
                                </div>
                        <div><h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Facility Master</h3></div>
                        {!this.state.loading ? form : <Spinner /> }       
                        </Form>
                        </UI>
                        </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({addFacility},dispatch)
    
}
export default connect(null,mapDispatchToProps)(FacilityMaster);

