import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getMemberEvent, deleteMemberEvent, updateMemberEvent,deleteSelectMemberEvent } from '../../actions/societyMemberEventAction';
import { bindActionCreators } from 'redux';
import SearchFilter from '../../components/searchFilter/searchFilter';
import UI from '../../components/newUI/superAdminDashboard';
import { Table, Button, Modal, FormGroup, ModalBody, ModalHeader, Input, Label } from 'reactstrap';
import Spinner from '../../components/spinner/spinner';


class MemberEventsDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMemberEventData: {
                societyMemberEventName: '',
                societyMemberEventId: '',
                
                isActive: false,

            },
            message:'',
            filterName:'societyMemberEventName',
            menuVisible: false,
            search: '',
            modalLoading: false,
            modal: false,
            loading: true,
            errors: {},
            isDisabled: true,
            ids: [],

        };
    }

    onChangeHandler = (event) => {
        this.setState({message:''})
        if (!!this.state.errors[event.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.name];
            this.setState({ [event.target.name]: event.target.value, errors });
        }
        else {
            this.setState({ [event.target.name]: event.target.value });
        }
    }


    toggle = (societyMemberEventId,societyMemberEventName) => {

        this.setState({
            societyMemberEventId,
            societyMemberEventName,
           
            modal: !this.state.modal
        })
    }




    toggleModal = () => {
        this.setState({ modal: !this.state.modal, message:'' })
    }


    componentWillMount() {
        this.refreshData()

    }

    refreshData() {
        this.props.getMemberEvent().then(() => this.setState({ loading: false, modalLoading: false, modal:false }))
       
    }


    editsocietyMemberEventName = (e) => {
        e.preventDefault();
        const { societyMemberEventId, societyMemberEventName } = this.state
        
        let errors = {};
        if(this.state.societyMemberEventName===''){
            errors.societyMemberEventName="Event Name can't be empty"
        }
        this.setState({errors});
        const isValid = Object.keys(errors).length === 0
        
        if (isValid &&  this.state.message === '') {
          
        this.props.updateMemberEvent(societyMemberEventId, societyMemberEventName)
            .then(() => this.refreshData())
            .catch(err=>{ 
                this.setState({modalLoading:false,message: err.response.data.message, loading: false})
                })
                if(this.state.message === ''){
                    this.setState({modal: true})
                }
                else {
                    this.setState({modal: false})
                }
        
        this.setState({
            modalLoading: true
        })
    }
    }

      deleteMemberEventName = (societyMemberEventId) => {
        let { isActive } = this.state.editMemberEventData
        this.setState({ loading: true })
        this.props.deleteMemberEvent(societyMemberEventId, isActive)
            .then(() => this.refreshData())
        this.setState({editMemberEventData: { isActive: false } })
       
      }



    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }

    searchFilter = (search) => {
        return function (x) {
         
            return x.societyMemberEventName.toLowerCase().includes(search.toLowerCase())
                || !search;
        }
    }

    deleteSelected(ids){
        this.setState({loading:true,  isDisabled:true});

        
     
        this.props.deleteSelectMemberEvent(ids)
        .then(() => this.refreshData())
        .catch(err => err.response.data.message);
      
    }

    selectAll = () => {
        let selectMultiple = document.getElementsByClassName('SelectAll');
        let ar =[];
            for(var i = 0; i < selectMultiple.length; i++){
                    ar.push(parseInt(selectMultiple[i].value));
                    selectMultiple[i].checked = true;
            }
            this.setState({ids: ar});
            if(ar.length > 0){
                this.setState({isDisabled: false});
            }
    }

    unSelectAll = () =>{
        
        let unSelectMultiple = document.getElementsByClassName('SelectAll');
        let allIds = [];
        for(var i = 0; i < unSelectMultiple.length; i++){
                unSelectMultiple[i].checked = false
        }
        
        this.setState({ids: [ ...allIds]});
        if(allIds.length === 0){
            this.setState({isDisabled: true});
        }
        
    }

   


    renderMemberEvent = ({ memberEventsResult }) => {   
      
        if (memberEventsResult && memberEventsResult.event) {
           
            return memberEventsResult.event.sort((item1,item2)=>{
                var cmprVal = (item1.societyMemberEventName && item2.societyMemberEventName) ? (item1[this.state.filterName].localeCompare(item2[this.state.filterName])) : ''
                return this.state.sortVal ? cmprVal : -cmprVal;
            }).filter(this.searchFilter(this.state.search)).filter(this.searchFilter(this.state.search)).map((item, index) => {

                return (
                    <tr key={item.societyMemberEventId}>
                     <td><input type="checkbox" name="ids" className="SelectAll" value={item.societyMemberEventId}
                         onChange={(e) => {
                            const {societyMemberEventId} = item
                            if(!e.target.checked){
                                document.getElementById('allSelect').checked=false;
                                let indexOfId = this.state.ids.indexOf(societyMemberEventId);
                                if(indexOfId > -1){
                                    this.state.ids.splice(indexOfId, 1);
                                }
                                if(this.state.ids.length === 0){
                                    this.setState({isDisabled: true});
                                }
                            }
                            else {
                      
                                this.setState({ids: [...this.state.ids, societyMemberEventId]});
                                
                                if(this.state.ids.length >= 0){
                                    this.setState({isDisabled: false})
                                }
                            }
                                
                             }}/></td>
                      
                        <td>{index+1}</td>
                        <td>{item.societyMemberEventName}</td>
                        <td> 
                            <Button color="success mr-2" onClick={this.toggle.bind(this, item.societyMemberEventId, item.societyMemberEventName)} >Edit</Button>
                            <Button color="danger" onClick={this.deleteMemberEventName.bind(this, item.societyMemberEventId)} >Delete</Button>

                        </td>
                    </tr>

                )
            })
        }
    }



    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }

    routeToAddNewMemberEvent = () => {
        this.props.history.push('/superDashboard/societyMemberEvents')
    }


    OnKeyPressUserhandler(event) {
        const pattern = /^[a-zA-Z ]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    close=()=>{
        return this.props.history.replace('/superDashBoard')
    }

    changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword')
    }

    render() {
        let tableData;
        tableData = <div style={{ backgroundColor: 'lightgray' }}>
            <Table className="table table-bordered">
                <thead>
                    <tr>
                    <th style={{width:'4%'}}></th>
                        <th>#</th>
                        <th onClick={()=>{
                             this.setState((state)=>{return {sortVal:!state.sortVal,
                                filterName:'societyMemberEventName'}});
                        }}>Events Name 
                         <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderMemberEvent(this.props.societyMemberEventReducer)}
                </tbody>
            </Table></div>

            let modalData=<div>
                <FormGroup>
                                    <Label>MemberEvent Type</Label>
                                    <Input type="text" id="societyMemberEventId" name="societyMemberEventName" onChange={this.onChangeHandler} value={this.state.societyMemberEventName} maxLength={50} onKeyPress={this.OnKeyPressUserhandler} />
                                    <span className="error">{this.state.errors.societyMemberEventName}</span>
                                    <span className="error">{this.state.message}</span>
                                </FormGroup>


                                <FormGroup>
                                    <Button color="primary mr-2" onClick={this.editsocietyMemberEventName}>Save</Button>

                                    <Button color="danger" onClick={this.toggleModal.bind(this)}>Cancel</Button>
                                </FormGroup>
            </div>
        return (
            <div>

                <UI onClick={this.logout} change={this.changePassword}>
                    <div className="w3-container w3-margin-top w3-responsive">
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                    </div>
                        <div className="top-details">
                            <h3>Society Member Event Name</h3>
                            <Button onClick={this.routeToAddNewMemberEvent} color="primary">Add Event</Button>
                        </div>
                        <SearchFilter type="text" value={this.state.search}
                            onChange={this.searchOnChange} />
                             <Button color="danger" disabled={this.state.isDisabled} className="mb-3"
        onClick={this.deleteSelected.bind(this, this.state.ids)}>Delete Selected</Button>
         <Label htmlFor="allSelect" style={{alignContent:'baseline',marginLeft:"10px",fontWeight:"700"}}>Select All<input className="ml-2"
                    id="allSelect"
                    type="checkbox" onChange={(e) => {
                            if(e.target.checked) {
                                this.selectAll();
                            }
                            else if(!e.target.checked){
                                this.unSelectAll();
                            } 
                        }  
                    }/></Label>

                        {(this.state.loading) ? <Spinner /> : tableData}
                        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggle}>Edit</ModalHeader>
                            <ModalBody>
                            {!this.state.modalLoading  ? modalData : <Spinner />}
                            </ModalBody>
                        </Modal>


                    </div>
                </UI>

            </div>
        );
    }
}


function mapStatToProps(state) {
  
    return {
        societyMemberEventReducer: state.societyMemberEventReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getMemberEvent, deleteMemberEvent, updateMemberEvent,deleteSelectMemberEvent }, dispatch)
}

export default connect(mapStatToProps, mapDispatchToProps)(MemberEventsDetail);