import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {assignRole,assignOwner,assignChanges,assignPost} from '../../actions/assignRolesAction';
import UI from '../../components/newUI/superAdminDashboard';
import {Form, Button,  FormGroup,  Input, Label } from 'reactstrap';
import Spinner from '../../components/spinner/spinner';
import DefaultSelect from './../../constants/defaultSelect';


class AssignRoles extends Component{
    constructor(props){
        super(props);
        this.state={
           roleId:'',
           userId:'',
           id:'',
           
           loading:true,
           errors:{},
           message:''
        }
    }

    componentDidMount=()=>{
        this.refreshData();
    }

    refreshData=()=>{
        this.props.assignRole().then(() => this.setState({loading: false}));
        this.props.assignChanges().then(() => this.setState({loading: false}));
    }


    onChangeRoles= (event)=>{
        this.setState({loading: false})
        this.onChange(event);

        let selected= event.target.value
        console.log(selected)


        this.props.assignOwner(selected);

    }

    onChange=(e) =>{
        this.setState({message:'' })
        let selected= e.target.value
        console.log(selected)
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value.trim(''), errors });
        }
        else {
            this.setState({ [e.target.name]: e.target.value.trim('') });
        }
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        let errors={};
        if(this.state.roleId==='') {
            errors.roleId= "cant be empty"
        }
        else if(this.state.userId ==='') {
          errors.userId = "cant be empty"
        }

        else if(this.state.id ==='') {
            errors.id = "cant be empty"
        }

       
        this.setState({errors})

        console.log("submitted-----------------", this.state);
        const isValid=Object.keys(errors).length === 0

        if(isValid){
            this.setState({loading:true})
          this.props.assignPost(this.state)
          .then(()=> this.props.history.push('/superDashboard/assignRolesDetail'))
          .catch(err=>{
            this.setState({message: err.response.data.message, loading: false})
        })
        }
    }

    
    dashbordPage=()=>{
        this.props.history.push('/superDashboard/assignRolesDetail');
    }

    roleDetail=({getRoles})=>{
        console.log(getRoles)
        if(getRoles && getRoles.role){
           return(
            getRoles.role.map((item) =>{
                   return(
                       <option key={item.roleName} value={item.id}>
                        {item.roleName}
                       </option>
                   )
               })
           )

        }
    }

    roleOwner=({getOwner})=>{
        console.log(getOwner)
        if(getOwner  &&  getOwner.users){    
           return(
            getOwner.users.map((item) =>{
                   return(
                       <option key={item.userId} value={item.userId}>
                        {item.fullName}
                       </option>
                   )
               })
           )

        }
    }

    roleChanges=({getChanges})=>{
        console.log(getChanges)
        if(getChanges){
       
           return(
            getChanges.map((item) =>{
                   if(item){
                    return(
                        <option key={item.roleName} value={item.id}>
                         {item.roleName}
                        </option>
                    )
                   }
               })
           )

        }
        else return [];
    }

    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }

        
    changePassword=()=>{ 
    return this.props.history.replace('/superDashboard/changePassword')
    }


    render(){
       
        let formData=<div>
              <FormGroup>
                <Label>Type</Label>
                <Input  type="select" defaultValue='no-value' name="roleId" onChange={this.onChangeRoles}>
                <DefaultSelect/>
                {this.roleDetail(this.props.AssignRolesReducer)}
                </Input> 
                <span className="error">{this.state.errors.roleId}</span>  
          </FormGroup>


            <FormGroup>
                <Label>Name</Label>
                <Input  type="select" defaultValue='no-value' name="userId" onChange={this.onChange}>
                <DefaultSelect/>
                {this.roleOwner(this.props.AssignRolesReducer)}
                </Input>
                <span className="error">{this.state.errors.userId}</span>          
            </FormGroup>

            <FormGroup>
                <Label>Roles</Label>
                <Input  type="select" defaultValue='no-value' name="id" onChange={this.onChange}> 
                <DefaultSelect/>
                {this.roleChanges(this.props.AssignRolesReducer)}
                </Input>
                <span className="error">{this.state.errors.id}</span>          
            </FormGroup>

            <Button color="success" className="mr-2">Submit Role</Button>
            <Button color="danger" onClick={this.dashbordPage}>Cancel</Button>
            </div>
        return(
                  <div>
                <UI onClick={this.logout} change={this.changePassword}>
                <Form onSubmit={this.handleSubmit}>
                <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                  <span aria-hidden="true">&times;</span>
                   </div>
                    <h3 style={{textAlign:'center', marginBottom: '10px'}}>Assign Roles</h3>
                   
                    {!this.state.loading ? formData: <Spinner />}
                </Form>
                </UI>
           </div>
        )
    }
}

function mapStateToProps(state) {
    
    return {
       AssignRolesReducer: state.AssignRolesReducer
    }

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ assignRole, assignOwner,assignChanges, assignPost }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(AssignRoles));