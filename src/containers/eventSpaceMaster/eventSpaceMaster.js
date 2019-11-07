import React, { Component } from 'react';
// import './flatMaster.css';
import { connect } from 'react-redux';
import { getSizeTypeDetails} from '../../actions/flatMasterAction';
import {AddEventDetails} from '../../actions/eventSpaceMasterAction';
import { bindActionCreators } from 'redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormGroup, Form, Input, Button, Label } from 'reactstrap';
import Spinner from '../../components/spinner/spinner';
import UI from '../../components/newUI/superAdminDashboard';


class EventSpaceMaster extends Component {
    constructor(props) {
        super(props);
        this.state = {
         
            spaceName: '',
            capacity: '',
            sizeId: '',
            price:'',
            from:'',
            to:'',
            // open:'',
            // close:'',
            area:'',
            description:'',            
            errors: {},
            isSubmit: false,
            loading:false,
            menuVisible: false
        };
        this.onChange = this.onChange.bind(this);

    }

    componentDidMount() {
       
        this.props.getSizeTypeDetails().then(()=> this.setState({loading:false}))
    }

    submit = (e) => {
        e.preventDefault();
        console.log(this.state)
        let errors = {};
       
        if (this.state.spaceName === '') errors.spaceName = "Cant be empty";
       
        if (this.state.capacity === '') errors.capacity = "Cant be empty";

        if (!this.state.sizeId) {
            errors.sizeId = "Size Type cannot be empty";
        }
      
        if (this.state.area === '') errors.area = "Cant be empty";

         
        if (this.state.price === '') errors.price = "Cant be empty";
        if (this.state.from === '') errors.from = "Please enter date";
        if (this.state.to === '') errors.to = "Please enter date";
        else if (this.state.from >this.state.to) errors.to=
        "From date cannot be ahead then To date";

        if (this.state.description  === '') errors.description = "Cant be empty";
        
        this.setState({ errors });

        const isValid = Object.keys(errors).length === 0;
            console.log(this.state);
        if (isValid) {
            this.setState({ loading: true })
            this.props.AddEventDetails({ ...this.state })
            .then(() => this.props.history.push('/superDashboard/eventSpaceMaster/eventSpaceMasterDetails'))
            .catch((err)=>{console.log(err.response.data.message)
                this.setState({loading:false, message:err.response.data.message})});
            this.setState({
                spaceName: '',
                capacity: '',
                sizeId: '',
               
                // open:'',
                // close:'',
                area:'',
                description:'',
                isSubmit: true,
                // menuVisible: false
            });
        }
    }
    onChange(e){
        this.setState({message: ''})
        if (!this.state.errors[e.target.value]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            console.log('no errors');
            this.setState({ [e.target.name]: e.target.value.trim(''), errors });
        } else {
            this.setState({ [e.target.name]: e.target.value.trim('') });
        }

        console.log(this.state)
    }
    // societyName({ list0 }) {
    //     console.log(list0)
    //     if (list0) {

    //         return (
    //             list0.map((item) => {
    //                 return (
    //                     <option key={item.societyId} value={item.societyId}>
    //                         {item.societyName}
    //                     </option>
    //                 )
    //             })
    //         )

    //     }
    // }
    sizeType({ list4 }) {
        if (list4) {

            return (
                list4.map((item) => {
                    return (
                        <option key={item.sizeId} value={item.sizeId}>
                            {item.sizeType}
                        </option>
                    )
                })
            )

        }
    }

    push = () => {
        this.props.history.push('/superDashboard/eventSpaceMaster/eventSpaceMasterDetails')
    }
    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }

    OnKeyPresshandlerPhone=(event)=>{
        const pattern = /^[0-9+]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    onKeyPressHandler=(event)=> {
        const pattern = /^[a-zA-Z ]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    OnKeyPressPrice=(event)=>{
        const pattern = /^[0-9+]$/;
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

     minDate=()=>{
         var d =new Date();
         return d.toISOString().split('T')[0];
     }


    render() {
          let form;
         
            
          
            form = <div>
                <FormGroup>
                <Label>Space Name</Label>
                <Input
                    type="text"
                    name="spaceName"
                    placeholder="enter space name"
                    maxLength='40'
                    onKeyPress={this.onKeyPressHandler}
                    // value={this.state.spaceName}
                    onChange={this.onChange} />
                    
                <span className='error'>{this.state.errors.spaceName}</span>
                <span className='error'>{this.state.message}</span>
            </FormGroup>

            <FormGroup>
                <Label>Capacity</Label>
                <Input
                    type="text"
                    name="capacity"  
                    placeholder="enter capacity"  
                    // value={this.state.capacity}
                    onKeyPress = {this.OnKeyPresshandlerPhone}
                    maxLength='4'
                    onChange={this.onChange} />
                <span className='error'>{this.state.errors.capacity}</span>
            </FormGroup>

                <FormGroup>
                    <Label>Space Type</Label><br/>
                    <div style={{display: 'flex', alignItems: 'baseline'}}>
                    <label>Open :</label>
                    <input className="ml-2"
                        type="radio"
                        name="spaceType"  
                       
                        value="open"
                        required
                    
                        
                        onChange={this.onChange} />
                
                        <div className="ml-2" style={{alignItems: 'baseline'}}>
                            <label>Close :</label>
                            <input
                            className="ml-2"
                            type="radio"
                            name="spaceType"  
                           
                            value="close"
                        
                           
                         
                            onChange={this.onChange} />
                        </div>
                    </div>
                   
                </FormGroup>

            <FormGroup>
                <Label>Size Type</Label>
                <Input
                    type="select"
                    name="sizeId"
                    onChange={this.onChange}>
                    <option>--SELECT--</option>
                    {this.sizeType(this.props.flat)}
                </Input>
                <span className='error'>{this.state.errors.sizeId}</span>
            </FormGroup>

            <FormGroup>
                <Label>Area</Label>
                <Input
                    type="text"
                    name="area"
                    placeholder="enter area"
                    maxLength='4'
                    onKeyPress = {this.OnKeyPresshandlerPhone}
                    // value={this.state.area}
                    onChange={this.onChange} />
                    
                <span className='error'>{this.state.errors.area}</span>
            </FormGroup>

             <FormGroup>
                <Label>From</Label>
                <Input
                    type="date"
                    name="from"
                    min={this.minDate()}
                    // placeholder="enter price"
                    // maxLength='8'
                    // onKeyPress = {this.OnKeyPressPrice}
                    // value={this.state.area}
                    onChange={this.onChange} />
                    
                <span className='error'>{this.state.errors.from}</span>
            </FormGroup>

            <FormGroup>
                <Label>To</Label>
                <Input
                    type="date"
                    name="to"
                    min={this.minDate()}
                    // placeholder="enter price"
                    // maxLength='8'
                    // onKeyPress = {this.OnKeyPressPrice}
                    // value={this.state.area}
                    onChange={this.onChange} />
                    
                <span className='error'>{this.state.errors.to}</span>
            </FormGroup> 

         <FormGroup>
                <Label>Price</Label>
                <Input
                    type="text"
                    name="price"
                    placeholder="enter price"
                    maxLength='8'
                    onKeyPress = {this.OnKeyPressPrice}
                    // value={this.state.area}
                    onChange={this.onChange} />
                    
                <span className='error'>{this.state.errors.price}</span>
            </FormGroup> 

            <FormGroup>
                <Label>Description</Label>
                <Input
                    type="textarea"
                    name="description"
                    placeholder="enter description"
                    maxLength='500'
                    // value={this.state.description}
                    onChange={this.onChange} />
                    
                <span className='error'>{this.state.errors.description}</span>
            </FormGroup>

            <FormGroup>
                <Button color="success" type="submit" className="mr-2">Submit</Button>
                <Button color="danger" onClick={this.push}>Cancel</Button>
              
            </FormGroup>
            </div>
            



        return (
            <div>
                
                <UI onClick={this.logout} change={this.changePassword}>
                    <Form onSubmit={this.submit}>
                        <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>

                        <h3 style={{textAlign:'center', marginBottom: '10px'}}> Event Space Master</h3>
                        {!this.state.loading ? form : <Spinner /> }
                    </Form>
                </UI>
                {/* </SideBar>
                </div> */}

            </div>

        )

    }
}
function mapStateToProps(state) {

    return {
        flat: state.flat

    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ AddEventDetails, getSizeTypeDetails}, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(EventSpaceMaster);