import React, { Component } from 'react';
import AddTower from '../../actions/towerMasterAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormGroup, Form, Label, Input, Button } from 'reactstrap';
import { PlaceHolder } from '../../actionCreators/index';
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner'
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes'; 
import {fetchFloor} from '../../actions/floorAction';

class TowerMaster extends Component {

    constructor(props) {
        super(props);


        this.state = {

            towerName: "",
            menuVisible: false,
            loading:true,
            errors: {},
            message:'',
            floorId:[],
            floors:[]

        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentWillMount(){
        this.refreshData()
       
    }
    componentDidMount(){
        this.props.fetchFloor();
    }

    refreshData(){
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
    OnKeyPresshandler(event) {
        const pattern = /[a-zA-Z _]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    onSubmit(event) {
        // this.setState({loading:true})
        event.preventDefault();
        let errors = {};
        const { towerName,floorId,floors} = this.state
  
        console.log('floorId',floorId)
        if(this.state.towerName===''){
            errors.towerName = "Tower Name can't be empty. Please select."
        }
        else if(!this.state.floorId.length){
            console.log('this.state.floorId',this.state.floorId)
            errors.floorId="No. Of Floor can't be empty"
        }
        
       console.log('==============',floorId)
        this.setState({ errors });

        const isValid = Object.keys(errors).length === 0

        // const isValid = this.validate();
        if (isValid) {
            this.setState({loading: true})
        console.log(this.state)
          
                this.props.AddTower(towerName,floorId,floors).then(()=> this.props.history.push('/superDashboard/display-tower')
            
                ).catch((err)=>this.setState({message: err.response.data.message, loading: false})
            
                )
        }
    }
    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }
  tower=()=>{
  this.props.history.push('/superDashboard/display-tower')
  }
  close=()=>{
    return this.props.history.replace('/superDashBoard')
}
getFloor=({floorDetails})=>{
    console.log('getFloor',floorDetails)
    if(floorDetails && floorDetails.floor){
        return floorDetails.floor.map((item)=>{
            return (
                {...item,label:item.floorName,value:item.floorId}
            )
        })
   }
}
floorChangeHandler=(name,selectOption)=>{
    console.log('selectOption',selectOption)
    console.log('event')
//    const data=selectOption.map((item)=>{return item.floorId})
//    this.state.floors.push(data)
    this.setState({
        [name]: selectOption.map((item)=>{return item.floorId}),
        floors:selectOption.map((item)=>{return {floorId:item.floorId}}),
        errors:''
    })
    console.log('jkldfjdsklfjdklfjdklfj',this.state.floorId)
    // const data={floorId:this.state.floorId}
    // console.log(data)
    // this.state.floors.push(data)
     
}
changePassword=()=>{
          
    return this.props.history.replace('/superDashboard/changePassword')
  }
    render() {
      let form;
      if(!this.state.loading){
      form= <div>
        <Form onSubmit={this.onSubmit}>
        <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
        <span aria-hidden="true">&times;</span>
   </div>

        <h3 align="center">  Add Tower</h3>
            <FormGroup>
                <Label>Tower Name</Label>
                <Input type="text" className="form-control" placeholder="Tower Name" name="towerName"  maxLength ={20} onKeyPress={this.OnKeyPresshandler} onChange={this.onChange}  />
                <span className="error">{this.state.errors.towerName}</span>
                <span className="error">{this.state.message}</span>    
            </FormGroup>
            <FormGroup>
                <Label>No. Of Floors</Label>
                <ReactMultiSelectCheckboxes
                 options={this.getFloor(this.props.floor)}
                 name="floorId"
                 placeholderButtonLabel={PlaceHolder}
                 onChange={this.floorChangeHandler.bind(this,'floorId')}/>
                {/* <Input type="text" className="form-control" placeholder="No. Of Floor" name="noOfFloor"  maxLength ={20} onKeyPress={this.OnKeyPresshandler} onChange={this.onChange}  /> */}
                 <span className="error">{this.state.errors.floorId}</span>
               {/* <span className="error">{this.state.message}</span>     */}
            </FormGroup>
            
            <FormGroup>
                <Button color="success" className="mr-2">Submit</Button>

                <button  onClick ={this.tower}   className="btn  btn-danger">Cancel</button>
       
            </FormGroup>
        </Form>                        
        
    </div>
      }
      else if(this.onSubmit){
          form=<Spinner/>
      }
     
        return (
            <div>
                <UI onClick={this.logout} change={this.changePassword}>
                   {form}
                </UI>
            </div>



        );

    }

}

function mapStateToProps(state) {
    console.log(state);
    return {
        Tower: state.TowerDetails,
        floor:state.FloorReducer
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ AddTower,fetchFloor }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(TowerMaster)