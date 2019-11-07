import React,{ Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {getTowerName,getFlatType,addFlatDetails, getfloors,fetchParking,getSlotId} from '../../actions/flatDetailMasterAction';
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';
import { Button } from 'reactstrap';
import DefaultSelect from '../../constants/defaultSelect';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes'; 
import { PlaceHolder } from '../../actionCreators/index';

class flatDetailMaster extends Component{
    constructor(props){
        super(props);
        this.state={
            flatNo:'',
            flatId:'',
            floorId:'',
            towerId:'',
            errors:{},
            loading:true,
            message:'',
            parkingId:'',
            slotId:[],
            parkingDetails:[],
            slotNumbers:''
        }
    }

    handleChange = (event) => {
        this.setState({message:'' })
        if (!!this.state.errors[event.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.name];
            this.setState({ [event.target.name]: event.target.value.trim(''), errors });
        }
        else {
            this.setState({ [event.target.name]: event.target.value.trim('') });
        }
    }
    

    componentDidMount(){
        this.refreshData();
        this.props.fetchParking();
    }
    
    refreshData(){
        this.props.getTowerName().then(() => this.setState({ loading: false }));
        this.props.getFlatType().then(() => this.setState({ loading: false }));
    }

    
    floorChange=(event)=>{
        this.setState({message:'' })
        let selected= event.target.value
        this.props.getfloors(selected);

        if (!!this.state.errors[event.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.name];
            this.setState({ [event.target.name]: event.target.value.trim(''), errors });
        }
        else {
            this.setState({ [event.target.name]: event.target.value.trim('') });
        }
    }

    OnKeyPresshandlerPhone(event) {
        const pattern = /^[0-9, a-zA-Z  -]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    OnKeyPressUserhandler(event) {
        const pattern = /[a-zA-Z_ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }


    onSubmit=(event)=> {
        event.preventDefault();
       
        let errors={};
        if(this.state.flatNo===''){
            errors.flatNo="Flat No can't be empty"
        }
        else if(this.state.flatId===''){
            errors.flatId="Flat Type can't be empty"
        }
        else if(this.state.towerId===''){
            errors.towerId="Tower Name can't be empty"
        }

        else if(this.state.floorId===''){
            errors.floorId="Floor can't be empty"
        }
        else if(this.state.parkingId===''){
            errors.parkingId="Parking can't be empty"
        }
        else if(this.state.slotId.length>5){
            errors.slotId="slots can't be more than 5"
        }
        this.setState({errors});
        const isValid=Object.keys(errors).length === 0;
        console.log('this.state',this.state)
        if(isValid){
            this.setState({loading:true});
           console.log('addflatDetails',this.state)
            this.props.addFlatDetails(this.state)
            .then(()=>this.props.history.push('/superDashboard/flatDetails'))
            .catch(err=>{
                this.setState({message: err.response.data.message, loading: false})
            })

            this.setState({
                state: {
                    flatNo:'',
                    flatId:'',
                    floorId:'',
                    towerId:'',
                    parkingId:'',
                    slotId:''

                }
            });
              

        }              
      
        
    }
           
  
    getDropdown=({name})=>{
        if(name){
            return name.map((item)=>{
                    return(
                        <option key={item.towerId} value={item.towerId} >
                        {item.towerName}</option>
                    )
                    
                })

                
            
        }
    }

    getDropdown1=({flattype})=>{
        if(flattype){
            return flattype.flat.map((items)=>{
                return(
                    <option key={items.flatId} value={items.flatId}>
                    {items.flatType}
                    </option>
                )
            })
        }
    }

    getFloorData=({floorDetails})=>{
       
        if(floorDetails){
            return floorDetails.tower.Floors.map((items)=>{
                return(
                    <option key={items.floorId} value={items.floorId}>
                    {items.floorName}
                    </option>
                )
            })
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

    
    push=()=>{
        this.props.history.push('/superDashboard/flatDetails')
    }

    close=()=>{
        return this.props.history.replace('/superDashBoard')
    }
    
    onParkingChangeHandler=(event)=>{
        this.setState({
            parkingId:event.target.value
        },function (){
            this.props.getSlotId(this.state.parkingId,this.state.flatId);
        })
        
    }
    getParking=({parking})=>{
        if(parking){
            return parking.parking.map((items)=>{
                return(
                    <option key={items.parkingId} value={items.parkingId}>
                    {items.parkingName}
                    </option>
                )
            })
        }

    }
    getSlot=({parkingSlot})=>{
        console.log(parkingSlot)
        // this.setState({
        //     slotNumbers:parkingSlot.slotNumbers
        // })
        if(parkingSlot){
            console.log(parkingSlot.slotNumbers)
      
            return parkingSlot.slot.map((items)=>{
                return (
                    {...items,label:items.slots,value:items.slotId}
                )
            })
        }

    }
    slotChangeHandler=(name,selectOption)=>{
        console.log(selectOption)
        this.setState({
            [name]: selectOption.map((item)=>{return item.slotId}),
            parkingDetails:selectOption.map((item)=>{return {
                parkingId:this.state.parkingId,
                floorId:this.state.floorId,
                flatId:this.state.flatId,
                slotId:item.slotId}}),
            errors:''
        })
        
        
        // switch(this.state.slotNumbers){
        //     case 1:
        //     return (
        //         this.setState({
        //             slots:selectOption.label,
        //             slotId:selectOption.value
        //         })
        //     )
        //     case 2:
        //     return (    this.setState({
        //         slots:selectOption.label,
        //         slotId:selectOption.value
        //     }))
        //     case 3:
        //     return (    this.setState({
        //         slots:selectOption.label,
        //         slotId:selectOption.value
        //     }))
        //     case 4:
        //     return (    this.setState({
        //         slots:selectOption.label,
        //         slotId:selectOption.value
        //     }))
        //     default :
        //     return{}
        // }
        //  this.setState({
        //      slots:selectOption.label,
        //      slotId:selectOption.value
        //  })
        }
    

    render (){
        let formData=<div>
             <div>
                        <label>Flat No</label>
                        <input className ="form-control" placeholder="Flat No" type="text" name="flatNo" maxLength={6} onKeyPress={this.OnKeyPresshandlerPhone} onChange={this.handleChange} value={this.state.flatNo} ></input>
                        <span className="error">{this.state.errors.flatNo}</span>
                        <span className="error">{this.state.message}</span>
                    </div>
                    <div>
                        <label>Flat Type</label>
                        <select className ="form-control"  defaultValue='no-value' name="flatId" onChange={this.handleChange}>
                        <DefaultSelect/>
                            {this.getDropdown1(this.props.flatDetailMasterReducer)}
                        </select>
                        <span className="error">{this.state.errors.flatId}</span>
                    </div>
                    <div>    
                        <label>Tower Name</label>
                        <select  required  className ="form-control"  defaultValue='no-value' name="towerId" onChange={this.floorChange}>
                        <DefaultSelect/>
                            {this.getDropdown(this.props.flatDetailMasterReducer)}
                        </select>
                        <span className="error">{this.state.errors.towerId}</span>

                    </div>
                    <div>    
                        <label>Floor</label>
                        <select className ="form-control"  defaultValue='no-value'  name="floorId"   onChange={this.handleChange}>
                        <DefaultSelect/>
                        {this.getFloorData(this.props.flatDetailMasterReducer)}
                        </select>
                      
                        <span className="error">{this.state.errors.floorId}</span>
                    </div>
                    <div>    
                        <label>Parking</label>
                        <select className ="form-control"  defaultValue='no-value'  name="parkingId"   onChange={this.onParkingChangeHandler}>
                        <DefaultSelect/>
                        {this.getParking(this.props.flatDetailMasterReducer)}
                        </select>
                      
                        <span className="error">{this.state.errors.parking}</span>
                    </div>
                    <div>    
                        <label>Slot</label>
                        {/* <select className ="form-control"  defaultValue='no-value'  name="slotId"   onChange={this.handleChange}>
                        <DefaultSelect/>
                        {this.getSlot(this.props.flatDetailMasterReducer)}
                        </select> */}
                        <ReactMultiSelectCheckboxes
                         options={this.getSlot(this.props.flatDetailMasterReducer)}
                         name="slotId"
                         placeholderButtonLabel={PlaceHolder}
                         onChange={this.slotChangeHandler.bind(this,'slotId')}/>
                      
                        <span className="error">{this.state.errors.slotId}</span>
                    </div>
                 
                    <div className="mt-4">
                    <Button type="submit" className="mr-2" color="success" value="submit">Submit</Button>
                    <Button color="danger" onClick={this.push}>Cancel</Button>
                    </div>
        </div>
        return(
            <UI onClick={this.logout} change={this.changePassword}>
            <div>
                <form onSubmit={this.onSubmit}>
                <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                <span aria-hidden="true">&times;</span>
            </div>

                <div><h3 style={{textAlign:'center', marginBottom: '10px'}}>Add Flat Details</h3></div>
                {!this.state.loading ? formData : <Spinner />}
                </form> 
            </div>
            </UI>
        )
    }

}

function mapStateToProps(state){
   
    return{
    flatDetailMasterReducer : state.flatDetailMasterReducer
            }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getTowerName,getFlatType,addFlatDetails, getfloors,fetchParking,getSlotId},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(flatDetailMaster);