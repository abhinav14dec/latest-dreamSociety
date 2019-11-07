import React,{Component} from 'react';
import {connect} from  'react-redux';
import {bindActionCreators}  from 'redux';
import UI from '../../components/newUI/superAdminDashboard';
import DefaultSelect from '../../constants/defaultSelect';
import Spinner from '../../components/spinner/spinner';
import {AddEmployee,getEmployeeType,getEmployeeWorkType} from '../../actions/employeeTypeMasterAction';
class EmployeeTypeMaster extends Component{
    state ={
        serviceType:'',
        employeeTypeId:'',
        employeeType:'',
        employeeWorkTypeId:'',
        employeeWorkType:'',
        loading:true,
        errors:{},
        message:''
    }

         
    OnKeyPresshandler(event) {
        const pattern = /[a-zA-Z _]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }


    componentDidMount(){
        console.log(this.props.getEmployeeType());
        this.props.getEmployeeType().then(()=> this.setState({loading:false}))
        this.props.getEmployeeWorkType().then(()=> this.setState({loading:false}))
    }


getEmpType({employeeType}){
    console.log(employeeType,"emptype");
    if(employeeType){
        return(
            employeeType.employeeType.map((item)=>{
                return(
                    <option key={item.employeeTypeId} value ={item.employeeTypeId} > 
                    {item.employeeType}
                    </option>
                )
            })
        )
    }
}

getEmpWorkType({employeeWorkType}){
console.log(employeeWorkType,"emp")
if(employeeWorkType){
    return(
        employeeWorkType.employeeWorkType.map((item)=>{
            return(
                <option key={item.employeeWorkTypeId} value ={item.employeeWorkTypeId}>
                {item.employeeWorkType}
                </option>
            )
        })
    )
}

}

onChange = (e) => {
    this.setState({message:'' })
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

      e.preventDefault();
      let errors ={};
      const {serviceType,employeeTypeId,employeeWorkTypeId }= this.state   
     
      if(!this.state.serviceType){
        errors.serviceType  = " service Type  can't be empty. Please select."
      
   
    }
    if(!this.state.employeeTypeId){
        errors.employeeTypeId  = " Employee Type Id  can't be empty. Please select."
    }
    if(!this.state.employeeWorkTypeId){
        errors.employeeWorkTypeId  = " Employee WorkType Id  can't be empty. Please select."
    }  
    
this.setState({ errors });
const isValid = Object.keys(errors).length === 0
if (isValid) {
    this.setState({loading:true})
      this.props.AddEmployee(serviceType,employeeTypeId,employeeWorkTypeId).then(()=>this.props.history.push('/superDashboard/displayEmployeeType')).catch((err)=>this.setState({message: err.response.data.message, loading: false}))
   
      
    console.log(this.state.serviceType,this.state.employeeTypeId,this.state.employeeWorkTypeId)
  }
  }
  displayEmployee=()=>{
    
    this.props.history.push('/superDashboard/displayEmployeeType')
}
changePassword=()=>{ 
    return this.props.history.replace('/superDashboard/changePassword')
 }

 close=()=>{
    return this.props.history.replace('/superDashBoard')
}
logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user-type');
    return this.props.history.replace('/') 
}



render(){
    let 
        form1=
    <div>
    <form onSubmit={this.submit}>
    <div>
      
        <div className="form-group">
        <label>Employee Type</label>
    <select  className="form-control"   defaultValue='no-value'  name ="employeeTypeId" onChange={this.onChange} >
        <DefaultSelect/>
         {this.getEmpType(this.props.employeeDetails)}
        </select>
        <span className="error">{this.state.errors.employeeTypeId}</span>
        </div>
        <div  className="form-group">
        <label>Employee  Work Type</label>
    <select  className="form-control" name="employeeWorkTypeId"   defaultValue='no-value' onChange={this.onChange}>
        <DefaultSelect/>
        {this.getEmpWorkType(this.props.employeeDetails)}
        </select>
        <span className="error">{this.state.errors.employeeWorkTypeId}</span>
        </div>
    <div  className="form-group">
    <label>Employee Service Type</label>
    <input type ="text" className="form-control" name="serviceType" placeholder="Service Type"  onKeyPress ={this.OnKeyPresshandler} maxLength="20" onChange={this.onChange} onKeyPress={this.OnKeyPresshandler}/>
    <span className="error">{this.state.errors.serviceType}</span>
    <span className="error">{this.state.message}</span>   
    </div>
  <button className="btn btn-success mr-2">Submit</button>
   
    <button className="btn btn-danger" onClick={this.displayEmployee}>Cancel</button>
    </div>
    </form>
</div>


    return(
      <div>
          <UI onClick={this.logout} change={this.changePassword}>

          <div className="w3-container w3-margin-top w3-responsive">
                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                <h3 align="center">Employee  Type Master </h3>

              {!this.state.loading ?form1:<Spinner/>}
              </div>
          </UI>

      </div>
    )
}

}

function mapStateToProps(state){
    return{
     employeeDetails:state.employeeDetails
    }
}
function mapDispatchToProps(dispatch){
    console.log(AddEmployee,"addEmp")
return bindActionCreators({AddEmployee,getEmployeeType,getEmployeeWorkType},dispatch)

}
export default connect(mapStateToProps,mapDispatchToProps)(EmployeeTypeMaster)