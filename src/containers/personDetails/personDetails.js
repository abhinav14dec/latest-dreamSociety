import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getTower,getFlat,getRoles,addPerson} from '../../actions/personDetailsMasterAction';
import Spinner from '../../components/spinner/spinner'
import DefaultSelect from '../../constants/defaultSelect';
import UI from '../../components/newUI/superAdminDashboard';

 class PersonDetails extends Component{
constructor(props){
    super(props)
this.state={
    userName: '',
    email: '',
    towerId: '',
    flatDetailId: '',
    roles: '',
    menuVisible: false,
    familyMember: '',
    parking: '',
    loading: true,
    errors:{},
    usernameMessage:'',
    emailMessage:''
}                              

}

OnKeyPresshandler(event) {
    const pattern = /[a-zA-Z _]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
}
componentDidMount(){

 
    this.props.getTower().then(()=> this.setState({loading:false}))
    // this.props.getFlat()
    this.props.getRoles().then(()=> this.setState({loading:false}))
    
}

OnKeyPressNumber(event) {
    const pattern = /^[0-9]$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
}

OnKeyPressmail(event){
    const pattern = /^(?!@*?\@\@)[a-zA-Z0-9@._]+$/
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
}

onChange=(e)=>{
        this.setState({usernameMessage:'',emailMessage:''})
    if(!!this.state.errors[e.target.name]){
        let errors =Object.assign({},this.state.errors)
        delete  errors[e.target.name]
        this.setState({[e.target.name]:e.target.value,errors});
    }
    else{
this.setState({[e.target.name]:e.target.value});
}

}


submit=(e)=>{
 e.preventDefault()
 let errors={};
 let {userName,email,towerId,flatDetailId,roles,  familyMember}= this.state 
 if(!this.state.userName){
    errors.userName = "  Username can't be empty. Please select."
}
if(!this.state.email){
    errors.email = "  Email can't be empty. Please select."
}
if(!this.state.towerId){
    errors.towerId = "  Tower Name can't be empty. Please select."
}
// if(!this.state.flatDetailId){
//     errors.familyMember = "   Family Members  can't be empty. Please select."
// }
if(!this.state.roles){
    errors.roles = " Roles can't be empty. Please select."
}

this.setState({ errors });
const isValid = Object.keys(errors).length === 0
if (isValid) {
    this.setState({loading: true})
this.props.addPerson(userName,email,towerId,roles)
.then(()=>
this.props.history.push('/superDashboard/displayPerson')
).catch((err)=>this.setState({usernameMessage: err.response.data.messageUsernameErr, emailMessage:err.response.data.messageEmailErr, loading: false}))
            
}
}


getRole({roles}){
    console.log(roles,'sdfasfsdf')
    if(roles){
        return(
            roles.map((item)=>{
                return(
                <option key={item.id} value={item.roleName}>{item.roleName} </option>
                )
            })
        )
    }

}


Tower({get}){
    console.log('abcd',get)
    if(get){
        return(
  get.map((item)=>{
      return(

      <option key={item.towerId} value={item.towerId}> {item.towerName} </option>
  )
  })
  )
  }
}

person=()=>{
    this.props.history.push('/superDashboard/displayPerson')
}

changePassword=()=>{ 
    return this.props.history.replace('/superDashboard/changePassword')
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
let form1;
  if(!this.state.loading && this.props.personDetails.get && this.props.personDetails.roles){
form1 = <form onSubmit={this.submit}>
      <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
        <span aria-hidden="true">&times;</span>
      </div>

      <h3 align="center">  Add Person </h3>
          <div className="form-group">
              <label>Username</label>
              <input type="text" name="userName" placeholder="Username"  onChange={this.onChange} maxLength={30} className="form-control"  />
         
              <span className="error">{this.state.errors.userName}</span>
              <span className="error">{this.state.usernameMessage}</span>
          </div>
             
          <div className="form-group">
              <label> Email</label>
              <input type="email" name="email"  placeholder="Email" onChange={this.onChange} maxLength={50} className="form-control" onKeyPress={this.OnKeyPressmail}  />
              <span className="error">{this.state.errors.email}</span>
              <span className="error">{this.state.emailMessage}</span>
          </div>
          
          <div className="form-group">
              <label> Roles</label>
              <select name="roles" defaultValue='no-value' onChange={this.onChange} className="form-control" >
                  <DefaultSelect />
                  {this.getRole(this.props.personDetails)}
                   </select>
                   <span className="error">{this.state.errors.roles}</span>
              
          </div>
          
          <div className="form-group">
              <label>Tower</label>
              <select name="towerId" defaultValue='no-value' className="form-control" onChange={this.onChange}>
                  <DefaultSelect />
                  {this.Tower(this.props.personDetails)}
              </select>
              <span className="error">{this.state.errors.towerId}</span>
          </div>
          
        
         
          <button className="btn btn-success mr-2"> Submit</button>
          <button className="btn btn-danger" onClick={this.person}>Cancel</button>
      </form>  
     
  }
  else if(this.submit){
      form1 =<Spinner/>
  }
        return (
            <div>
                <UI onClick={this.logout} change ={this.changePassword}>
                 {form1} 

                 
             </UI>
             </div>
    )
}
}


function mapStateToProps(state){
    console.log(state)
return{
    personDetails :state.personDetails
}
}

function mapDispatchToProps(dispatch){
return bindActionCreators({getTower,getFlat,getRoles,addPerson},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(PersonDetails)