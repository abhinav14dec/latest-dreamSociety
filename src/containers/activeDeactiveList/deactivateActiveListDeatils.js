import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { releaseResource,showActiveList,deactivateMember,showDeactiveList,activateMember,deleteSelectedDeactivatedMember } from '../../actions/activeDeactive';
import { bindActionCreators } from 'redux';
import { Table, Button, Modal,FormGroup, ModalBody, ModalHeader, Label,Input } from 'reactstrap';
import Spinner from '../../components/spinner/spinner';
import SearchFilter from '../../components/searchFilter/searchFilter';
import UI from '../../components/newUI/superAdminDashboard';

class ShowDeactiveListDetails extends Component{

    constructor(){
        super();
       this.state = {
                 ids:[],
                id:'',
                userId:'',
                fullName:'',
                type:'',
                type1:'',
                // code:'',
                // currency:'',
                // phoneCode:'',
                // message:'',
                isDisabled:true,
                loading:true,
                isActive:false ,
                modalLoading: false,
                editUserModal: false,
                 menuVisible: false,
                 search: '',
                 errors:{},
                 filterName:"fullName",
                 
        }
    }

   componentDidMount(){
       this.refreshData()
   }

     refreshData(){;
        const url=window.location.href.slice(window.location.href.lastIndexOf('/')+1);
    this.props.showDeactiveList(url).then(() => this.setState({loading:false, modalLoading: false, editUserModal: false}));
    }  

    toggleEditUserModal() {
        this.setState({
          editUserModal: ! this.state.editUserModal,
          message: '',
          errors:{}
        });
      }

    editCountry(countryId,countryName,code,currency,phoneCode) {
        this.setState({
            countryId,countryName,code,currency,phoneCode, editUserModal: ! this.state.editUserModal
        })
    }


    searchFilter(search) {
        return function (x) {
            return x.fullName.toLowerCase().includes(search.toLowerCase()) ||
                // x.code.toLowerCase().includes(search.toLowerCase()) ||
                // x.currency.toLowerCase().includes(search.toLowerCase()) ||
                // x.phoneCode.toLowerCase().includes(search.toLowerCase()) ||
                !search;
        }
    }

    searchOnChange = (e) => {
        this.setState({search:e.target.value})
    }


    updateBook=(e)=> {

        e.preventDefault();
        let { countryId, countryName, code, currency,phoneCode} = this.state

        let errors = {};

        if (countryName === '') errors.countryName = "Cant be empty";

        if (code === '') errors.code = "Cant be empty";
        else if (this.state.code.length !== 3 && this.state.code.length !==2 ) errors.code = "Country code should be of length 2 or 3"

      

        if (currency === '') errors.currency = "Cant be empty";


        if (phoneCode === '') errors.phoneCode = "Cant be empty";

        this.setState({ errors });

        const isValid = Object.keys(errors).length === 0;
        if(isValid && this.state.message === ''){
        this.props.updateCountry(countryId,countryName,code,currency,phoneCode).then(() => this.refreshData())
        .catch((err)=>{
            this.setState({modalLoading:false, message:err.response.data.message})});
            if(this.state.message === ''){
                this.setState({editUserModal: true})
            }
            else {
                this.setState({editUserModal: false})
            }
         this.setState({
           modalLoading: true
       })
    }

   }
    onChange=(e)=>{
        this.setState({message: ''})
        if (!this.state.errors[e.target.value]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value, errors });
        } else {
            this.setState( {[e.target.name]: [e.target.value]});
         }

    }
    userDeactivate(userId,type){
        this.setState({loading:true});
        this.props.releaseResource(userId,type).then(() => this.refreshData())
        .then(() => this.setState({isActive: false}))

    }
    deleteUser(userId,type){
        this.setState({loading:true});
        // let { isActive } = this.state
        this.props.activateMember(userId,type).then(() => this.refreshData())
        // .then(() => this.setState({isActive: false}))

}

     fetchRoles=({roles2})=>{
         if(roles2 && roles2.users){
            return roles2.users.sort((item1,item2)=>{
                var cmprVal = (item1[this.state.filterName].localeCompare(item2[this.state.filterName]))
                return this.state.sortVal ? cmprVal : -cmprVal;
            }).filter(this.searchFilter(this.state.search)).map((item,index) =>{
                this.state.type1=item.type;
                return (
                    <tr key={item.userId}>
                     <td>
                         <input type="checkbox" name="ids" className="SelectAll"  value={item.userId}
                         onChange={(e) => {
                            let {userId} = item
                            if(!e.target.checked){
                                document.getElementById('allSelect').checked=false;
                                let indexOfId = this.state.ids.indexOf(userId);
                                if(indexOfId > -1){
                                    this.state.ids.splice(indexOfId, 1)
                                }
                                if(this.state.ids.length === 0){
                                    this.setState({isDisabled: true})
                                }
                            }
                            else{
                                this.setState({ids: [...this.state.ids, userId],type:item.type});
                                if(this.state.ids.length >= 0){
                                    this.setState({isDisabled: false,type:item.type})
                                }
                            }


                             }}/>
                             </td>
                        <td>{index+1}</td>
                        <td>{item.fullName}</td>
                        <td>{item.email}</td>
                        {/* <td>{item.code}</td>
                        <td>{item.currency}</td>
                        <td>{item.phoneCode}</td> */}

                        <td>
                            <Button color="danger" size="sm" className="mr-2"onClick={this.userDeactivate.bind(this, item.userId ,item.type)}>Delete</Button>
                            <Button color="success" size="sm" onClick={this.deleteUser.bind(this, item.userId ,item.type)} >Activate</Button>
                        </td>
                    </tr>
                )
            })
        }

     }


     deleteSelectedDeactivatedMember(ids,type){
        this.setState({loading:true, isDisabled: true});
        this.props.deleteSelectedDeactivatedMember(ids,type)
        .then(() => this.refreshData());
        // .catch(err => err.response);
    }

    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }


    onKeyPressHandler=(event)=> {
        const pattern = /^[a-zA-Z. ]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    onKeyPressHandle1=(event)=>{
        const pattern = /^[a-zA-Z$ ]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    onKeyPressHandle=(event)=> {
        const pattern = /^[0-9+ ]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    onKeyPressCode=(event)=>{
        const pattern = /^[a-zA-Z]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    close=()=>{
        return this.props.history.replace('/superDashBoard')
    }

    routeToAddNewUser =() => {
        this.props.history.push('/superDashboard/showList')
    }
    changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword')
     }



    selectAll = (type) => {
        let selectMultiple = document.getElementsByClassName('SelectAll');
        let ar =[];
            for(var i = 0; i < selectMultiple.length; i++){
                    ar.push(parseInt(selectMultiple[i].value));
                    selectMultiple[i].checked = true;
            }
            this.setState({ids: ar,type:this.state.type1});
            if(ar.length > 0){
                this.setState({isDisabled: false,type:this.state.type1})
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
    onChangeCountry=(e)=>{
        // let codeDetails= e.target.value.toUpperCase();
        if (!this.state.errors[e.target.value]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value.toUpperCase().trim(''), errors });
        } else {
       this.setState({code:e.target.value.toUpperCase().trim('')})
           
        }

    }


    render(){
         let tableData;

          tableData= <Table className="table table-bordered">
        <thead>
            <tr>
            <th style={{width: "4%"}}></th>
                        <th>#</th>
                        <th  style={{cursor:'pointer'}} onClick={()=>{
                             this.setState((state)=>{return {sortVal:!state.sortVal,
                                filterName:'fullName'}});
                        }}> Nonactive Members
                         <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                        <th>Member Email</th>
                         <th>Action</th>
               



            </tr>
        </thead>
        <tbody>
            {this.fetchRoles(this.props.activeDeactive)}
        </tbody>
    </Table>

    let deleteSelectedButton = <Button
     disabled={this.state.isDisabled}
     color="danger"
    className="mb-3"
    onClick={this.deleteSelectedDeactivatedMember.bind(this, this.state.ids,this.state.type)}>Activate Selected</Button>
    
    let modalData = <div>
        <FormGroup>
                                    <Label for="roles">Country Name</Label>
                                    <Input
                                        type="textbox"
                                        placeholder="enter countryName"
                                        name="countryName"
                                        value={this.state.countryName}
                                        maxLength='50'
                                        onKeyPress={this.onKeyPressHandler}
                                        onChange={this.onChange}
                                         />
                                         <span  className='error'>{this.state.errors.countryName}</span>
                                         {this.state.message ? <span className='error'>{this.state.message}</span> : ''}
                                </FormGroup>
                                <FormGroup>
                                    <Label for="roles">Country Code</Label>
                                    <Input
                                        type="textbox"
                                        placeholder="enter code"
                                        name="code"
                                        value={this.state.code}
                                        maxLength='3'
                                        onKeyPress={this.onKeyPressCode}
                                        onChange={this.onChangeCountry} />
                                         <span  className='error'>{this.state.errors.code}</span>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="firstName">Currency</Label>
                                    <Input
                                        type="textbox"
                                        placeholder="enter currency"
                                        name="currency"
                                        value={this.state.currency}
                                        onKeyPress={this.onKeyPressHandle1}
                                        maxLength='40'
                                        onChange={this.onChange} />
                                         <span  className='error'>{this.state.errors.currency}</span>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="roles">Phone Code</Label>
                                    <Input
                                        type="textbox"
                                        placeholder="enter currency"
                                        name="phoneCode"
                                        value={this.state.phoneCode}
                                        maxLength='3'
                                        onKeyPress = {this.onKeyPressHandle}
                                        onChange={this.onChange} />
                                         <span  className='error'>{this.state.errors.phoneCode}</span>
                                </FormGroup>
                                <FormGroup>
                                <Button color="primary mr-2" onClick={this.updateBook}>Save</Button>
                                <Button color="danger" onClick={this.toggleEditUserModal.bind(this)}>Cancel</Button>
                                </FormGroup>
    </div>

        return(
            <div>
                <UI onClick={this.logout} change={this.changePassword}>
                <div className="w3-container w3-margin-top w3-responsive">
                <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                                <span aria-hidden="true">&times;</span>
                            </div>
                        <div className="top-details">
                                <h3>Deactive Members Details</h3>
                                <Button onClick={this.routeToAddNewUser} color="primary">Show Options</Button>
                            </div>
                        <Modal isOpen={this.state.editUserModal} toggle={this.toggleEditUserModal.bind(this)}>
                            <ModalHeader toggle={this.toggleEditUserModal.bind(this)}>Edit a flat</ModalHeader>
                            <ModalBody>
                                {!this.state.modalLoading  ? modalData : <Spinner />}
                            </ModalBody>

                        </Modal>
                        <SearchFilter type="text" value={this.state.search}
                                onChange={this.searchOnChange} />
                                  {deleteSelectedButton}
                                   <Label htmlFor="allSelect" style={{alignContent:'baseline',marginLeft:'10px',fontWeight:'700'}}>Select All<input
                                          type="checkbox" id="allSelect" className="ml-2" onChange={(e) => {
                                           if(e.target.checked) {
                                         this.selectAll(this.state.type);
                                                              }
                    else if(!e.target.checked){
                        this.unSelectAll();
                    }
                }

                }  /></Label>
                            {(this.state.loading) ? <Spinner /> : tableData}
                       
                    </div>
                </UI>

            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        activeDeactive:state.activeDeactive
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        showActiveList,
        deactivateMember,
        showDeactiveList,
        activateMember,
        deleteSelectedDeactivatedMember,
        releaseResource
        // updateCountry,
        // deleteCountry,
        // deleteSelectedCountryDetail
    },dispatch)

}

export default connect(mapStateToProps,mapDispatchToProps)(ShowDeactiveListDetails);