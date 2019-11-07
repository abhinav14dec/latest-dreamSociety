import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import UI from '../../components/newUI/superAdminDashboard';
import {Form,Label,FormGroup,Input,Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import {addRF} from '../../actions/rfIdAction';


class RFId extends Component{
    constructor(props){
        super(props);
        this.state={
            rfId:'',
            errors:{},
            message:''
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
        this.props.addRF(this.state.rfId)
        .then(()=>this.props.history.push('/superDashboard/rfIdDetail'))
        .catch(err=>{
            this.setState({message:err.response.data.message})
        })
      }
      onChangeHandler=(e)=>{
        this.setState({
            rfId:e.target.value
        })
      }
    render(){
        return(
            <div>
                <UI onClick={this.logout} change={this.changePassword}>
                <Form onSubmit={this.submit} >
                <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                                <span aria-hidden="true">&times;</span>
                            </div>
                    <div><h3 style={{ textAlign: 'center', marginBottom: '10px' }}>RF Id Master</h3></div>
                    <FormGroup>
                        <Label>RF ID</Label>
                        <Input type="text" placeholder="Enter Rf Id" onChange={this.onChangeHandler}/>
                        <span className="error">{this.state.message}</span> 
                    </FormGroup>
                    <FormGroup>
                        <Button className="btn btn-success mr-2">Submit</Button>
                        <Link to='/superDashboard/rfIdDetail'>
                          <Button color="danger" id="addAssets" >Cancel</Button>
                         </Link>
                    </FormGroup>
                </Form>
                </UI>

            </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({addRF},dispatch)
    
}
export default connect(null,mapDispatchToProps)(RFId);

