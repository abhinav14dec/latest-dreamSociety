import React, { Component } from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import UI from '../../components/newUI/superAdminDashboard';
import { Form,FormGroup, Input, Button, Label } from 'reactstrap';
import Spinner from '../../components/spinner/spinner';
import {Link} from 'react-router-dom';
import {getAssets} from '../../actions/assetsAction';
import {fetchAssets} from '../../actions/assetsSubAction';
import {addInventory} from '../../actions/inventoryAction';
import {PlaceHolder} from '../../actionCreators/index'

class Inventory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            assetId:'',
            assetName: '',
            assetSubType: '',
            assetSubTypeId:'',
            numberOfInventory: '',
            ratePerInventory:'',
            autoGenerate:false,
            serialNumbers:[],
            serialNo:[],
            loading: true ,
            errors: {},
            disabled:true,
            dateOfPurchase:''
        }
    }
    componentDidMount() {
        this.props.fetchAssets().then(()=>this.setState({loading:false}))
        this.props.getAssets().then(() => this.setState({ loading: false }));
    }
    getAssetsName = ({ AssetsList }) => {
        if (AssetsList) {
            return AssetsList.assets.map((item) => {
                return (

                    <option key={item.assetId} value={item.assetId}>{item.assetName}</option>
                )
            })
        }

    }

    getAssetsDropDown({AssetsList}){
        if (AssetsList) {
            return AssetsList.assets.map((item) => {
                return (
                {...item,label:item.assetName,value:item.assetId}               
                )
            }
            );
        }
        return [];
    }
    getAssetsSubName = ({ getAssetsType }) => {
        if (getAssetsType) {
            return getAssetsType.assetsType.map((item) => {
                return (
                    <option key={item.assetTypeId} value={item.assetTypeId}>{item.assetType}</option>
                )
            })
        }

    }
    getAssetsTypeDropDown=({getAssetsType})=>{
        if (getAssetsType) {
            return getAssetsType.assetsType.map((item) => {
                return (
        {...item,label:item.assetType,value:item.assetTypeId}
                )
            })
        }
        return [];
    }


    onSubmit = (e) => {assetSubTypeId
        e.preventDefault();
        const {assetId,assetSubTypeId,numberOfInventory,ratePerInventory,serialNo,dateOfPurchase,autoGenerate, serialNumbers } = this.state
        let errors = {};
        if(assetId===''){
            errors.assetId="Assets Name can't be empty"
        }
        else if(assetSubTypeId===''){
            errors.assetSubTypeId="Assets Sub Type can't be empty"
        }
        else if(numberOfInventory===''){
            errors.numberOfInventory="Number of Iventory can't be empty"
        }
        else if(ratePerInventory===''){
            errors.ratePerInventory="Rate Per Inventory can't be empty"
        }

        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            this.setState({loading: true})
            this.props.addInventory(assetId,assetSubTypeId,numberOfInventory,ratePerInventory,serialNumbers,dateOfPurchase,autoGenerate)
            .then(() => this.props.history.push('/superDashBoard/inventoryDetails'))
        }
       ;
    }
onChangeHandler=(event)=>{

    if (!!this.state.errors[event.target.name]) {
        let errors = Object.assign({}, this.state.errors);
        delete errors[event.target.name];
        this.setState({ [event.target.name]: event.target.value.trim(''), errors });
    }
    else {
        this.setState({ [event.target.name]: event.target.value.trim('') });
    }

}

    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }
    close=()=>{
        return this.props.history.replace('/superDashBoard')
    }
onAssetsTypeChange=(name,selectOption)=>{
    this.setState(function(prevState,props){
        return {
            [name]:selectOption.value
        }
    },function (){
    });
    
}   
OnKeyPresshandlerPhone(event) {
    const pattern = /^[0-9]$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
}
changePassword=()=>{
          
    return this.props.history.replace('/superDashboard/changePassword')
  }

  onSerialsChangeHandler=(event,serialIndex)=>{
    let value = event.target.value;
    this.setState((prevState)=>{
        let serialNumbers = [...prevState.serialNumbers];        
        serialNumbers[serialIndex] = value;
        return {serialNumbers}
    });
  }

  onChangeHandlerSerial=(event)=>{
    this.setState({
        autoGenerate:event.target.checked
    })

  }
  maxDate = () => {
    var d = new Date();
    return d.toISOString().split('T')[0];
}


    render() {
        let formData;
        formData=  <div>
        <div>
            <FormGroup>
            <Label>Assets Type</Label>
            <Select options= {this.getAssetsDropDown(this.props.assetsName)} 
		   onChange={this.onAssetsTypeChange.bind(this,'assetId')}
          placeholder={PlaceHolder}/>
            <span className="error">{this.state.errors.assetId}</span>
            </FormGroup>
        </div>
        <Label>Assets Sub Type</Label>
        <Select options= {this.getAssetsTypeDropDown(this.props.assetSubType)}
		  onChange={this.onAssetsTypeChange.bind(this,'assetSubTypeId')} placeholder={PlaceHolder} />
        <span className="error">{this.state.errors.assetSubTypeId}</span>
        <div>
            <Label>Number Of Inventory</Label>
            <Input type="text" onKeyPress={this.OnKeyPresshandlerPhone} maxLength={2} placeholder="Enter Number" onChange={this.onChangeHandler} className="form-control"  name='numberOfInventory' />
            <span className="error">{this.state.errors.numberOfInventory}</span>
        </div>
        <div>
            <Label>Rate Per Inventory</Label>
            <Input type="text" onKeyPress={this.OnKeyPresshandlerPhone} maxLength={10}  placeholder="Enter Rate" onChange={this.onChangeHandler} className="form-control"  name='ratePerInventory' />
            <span className="error">{this.state.errors.ratePerInventory}</span>
        </div> 
        <div>
            <Label>Date Of Purchase</Label>
            <Input type="date" max={this.maxDate()} name="dateOfPurchase" onChange={this.onChangeHandler}/>
            </div>  
        <div>
            <Label>Auto Generate Serial No.</Label>
            <Input type="checkbox" onChange={this.onChangeHandlerSerial} name="autoGenerate" value={!this.state.autoGenerate} style={{marginLeft: "20px"}}/>
        </div>
        <div>
            <Label>Serial Number 1</Label>    
            <Input type="text" maxLength={6} disabled={this.state.autoGenerate} placeholder="Enter Serial Number" onChange={(e)=>{this.onSerialsChangeHandler(e,0)}} className="form-control" name='serialNo' />
            <span className="error">{this.state.errors.serialNo}</span>
        </div>
        <div>
            <Label>Serial Number 2</Label>    
            <Input type="text" maxLength={6} disabled={this.state.autoGenerate} placeholder="Enter Serial Number" onChange={(e)=>{this.onSerialsChangeHandler(e,1)}} className="form-control" name='serialNo' />
            <span className="error">{this.state.errors.serialNo}</span>
        </div>
        <div>
            <Label>Serial Number 3</Label>    
            <Input type="text" maxLength={6} disabled={this.state.autoGenerate} placeholder="Enter Serial Number" onChange={(e)=>{this.onSerialsChangeHandler(e,2)}} className="form-control" name='serialNo' />
            <span className="error">{this.state.errors.serialNo}</span>
        </div>
        <div>
            <Label>Serial Number 4</Label>    
            <Input type="text" maxLength={6} disabled={this.state.autoGenerate} placeholder="Enter Serial Number" onChange={(e)=>{this.onSerialsChangeHandler(e,3)}} className="form-control" name='serialNo' />
            <span className="error">{this.state.errors.serialNo}</span>
        </div>
        <div>
            <Label>Serial Number 5</Label>    
            <Input type="text" maxLength={6} disabled={this.state.autoGenerate} placeholder="Enter Serial Number" onChange={(e)=>{this.onSerialsChangeHandler(e,4)}} className="form-control" name='serialNo' />
            <span className="error">{this.state.errors.serialNo}</span>
        </div>
        <div>
            <Button className="btn btn-success" id="addAssets" >Add Inventory</Button>
            <Link to='/superDashBoard/inventoryDetails'>
                <Button color="danger" id="addAssets" >Cancel</Button>
            </Link>
        </div>
    </div>
        return (
            <div>
                <UI onClick={this.logout} change={this.changePassword}>
            <Form onSubmit={this.onSubmit}>
            <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
            <span aria-hidden="true">&times;</span>
             </div>
             <div><h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Inventory</h3></div>
             {!this.state.loading ? formData : <Spinner />}
             </Form>
             </UI>
            </div>

        );
    }
}
function mapStateToProps(state){
return{
    assetsName: state.AssetsReducer,
    assetSubType:state.AssetsTypeReducer
}
}
function mapDispatchToProps(dispatch) {
return bindActionCreators({ getAssets, fetchAssets, addInventory}, dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(Inventory);