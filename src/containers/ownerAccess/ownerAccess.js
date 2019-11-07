import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAccessData } from './../../actions/ownerAccessAction';
import {getMachineDetails,disableMachine} from '../../actions/fingerprint';
import SearchFilter from '../../components/searchFilter/searchFilter';
import UI from '../../components/newUI/ownerDashboard';
import { Form, Button, FormGroup, Input, Label, Table } from 'reactstrap';
import Spinner from '../../components/spinner/spinner';


class OwnerAccess extends Component{
    constructor(props){
        super(props);

        this.state={
            name:'',
            contact:'',
            email:'',
            search: '',
            type:'member',
            modalLoading:false,
            loading:true
        }
    }

    componentDidMount(){
        this.refreshData();
    }

    refreshData=()=>{
        const type= this.state.type
        this.setState({loading: true})
        this.props.getAccessData(type).then(()=>this.setState({ loading:false,modalLoading:false}))
    }

    activatedChange = async (e)=>{
        
        let selected=e.target.value;
        console.log(selected);
       await this.setState({
            type:selected
         })
       this.refreshData()
       this.setState({modalLoading: true})
       
     }

     machineResult=(userId)=>{
        console.log(userId)
    //     this.setState({ loading:true,message:''})
    //     this.props.getMachineDetails(userId)
    //     .then((res)=>{this.setState({message:res.payload.message,userId,loading: false})
        
    //    })   
    }

    disableResult=(userId)=>{
        console.log(userId)
    //     this.setState({loading:true,message:'',})
    //     this.props.disableMachine(userId)
    //     .then((res)=>{this.setState({message:res.payload.message,userId,loading: false})

    // })
        
    }

     searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }

    searchFilter = (search) => {
        return function (x) { console.log(x)
            return x.user.firstName.toLowerCase().includes(search.toLowerCase())  ||
              x.user.contact.toLowerCase().includes(search.toLowerCase()) ||
             x.user.email.toLowerCase().includes(search.toLowerCase())  ||
             !search;
        }
    }

    // handleSubmit=()=>{

    // }
     
    getOwnerResult=({ownerAccess})=>{
        if(ownerAccess){
            console.log(ownerAccess);
         return ownerAccess.sort((item1,item2)=>{ 
            var cmprVal = (item1.user.firstName && item2.user.firstName ) ? (item1[this.state.filterName].localeCompare(item2[this.state.filterName])) : ''
         return this.state.sortVal ? cmprVal : -cmprVal;
         }).filter(this.searchFilter(this.state.search)).map(((item,index)=>{
            return(
                <tr key={item.user.fingerPrintId}>
                    <td>{index+1}</td>
                    <td>{item.user.firstName+" "+item.user.lastName}</td>
                    <td>{item.user.contact}</td>
                    <td>{item.user.email}</td>
                    <td><Button color="success mr-2"  onClick={this.machineResult.bind(this, item.userId)} >Enable</Button> 
                        <Button color="danger"  onClick={this.disableResult.bind(this, item.userId)} >Disable</Button>
                    </td>
                </tr>
            ) 

            }))
            
        
        }
    
    }
    
    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }


    changePassword = () => {
        return this.props.history.replace('/ownerDashboard/changePasswordOwner')
    }

    close = () => {
        return this.props.history.replace('/ownerDashBoard')
    }

    render(){
        let tableData = <Table bordered>
        <thead>
            <tr>
                <th style={{ width: '4%' }}>#</th>
                {/* <th>Name</th> */}
                <th  onClick={()=>{
                         this.setState((state)=>{return {sortVal:!state.sortVal,
                            filterName:'firstName'}});
                    }} >Name <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                <th>Contact</th>
                <th>Email</th>
                <th>Give Access</th>
            </tr>
        </thead>
        <tbody>
            {this.getOwnerResult(this.props.ownerAccessReducer)}
        </tbody>
    </Table>

let radioData=<div>
<Label  style={{alignContent:'baseline',marginLeft:"10px",fontWeight:"700"}}><input className="ml-2"
        id="member"
        type="radio"
        name="member"
        onChange={this.activatedChange}
        value='member'
        checked={ this.state.type === 'member' ? true : false}
        />{' '}Member</Label>

        <Label  style={{alignContent:'baseline',marginLeft:"10px",fontWeight:"700"}}><input className="ml-2"
        id="tenant"
        type="radio"
        name="tenant"
        onChange={this.activatedChange}
        checked={this.state.type === 'tenant' ? true : false}
        value='tenant'
        />{' '}Tenant</Label>

        <Label  style={{alignContent:'baseline',marginLeft:"10px",fontWeight:"700"}}><input className="ml-2"
        id="vendor"
        type="radio"
        name="vendor"
        onChange={this.activatedChange}
        value='vendor'
        checked={this.state.type === 'vendor' ? true : false}
        />{' '}Vendor</Label>
</div>
        return(
            <div>
                <UI onClick={this.logout} change={this.changePassword}>
                <div className="w3-container w3-margin-top w3-responsive">
                    <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                        <span aria-hidden="true">&times;</span>
                    </div>
                    <div className="top-details">
                        <h3 align="center">Access Master</h3>
                        
                    </div>
                    <SearchFilter type="text" value={this.state.search}
                            onChange={this.searchOnChange} />
                    { radioData }
                    {(this.state.loading) ? <Spinner /> : tableData}
                   
                </div>
            </UI>
            </div>
        )
    }


}

function mapStatToProps(state) {
     console.log(state)
    return {
        ownerAccessReducer: state.ownerAccessReducer
    
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getAccessData }, dispatch)
}

export default connect(mapStatToProps, mapDispatchToProps)(OwnerAccess);