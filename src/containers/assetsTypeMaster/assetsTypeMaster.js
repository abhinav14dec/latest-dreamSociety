import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addAssets } from '../../actions/assetsAction';
import './assetsTypeMaster.css';
import { Link } from 'react-router-dom'
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';
import { Form,Input, Button, Label } from 'reactstrap';
class AssetsTypeMaster extends Component {
    constructor(props) {
        super(props);

        this.state = {
            assets: '',
            description: '',
            menuVisible: false,
            search: '',
            loading:false,
            errors: {},
        }
    }

    onChangeHandler = (event) => {
        if (!!this.state.errors[event.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.name];
            this.setState({ [event.target.name]: event.target.value.trim(''), errors });
        }
        else {
            this.setState({ [event.target.name]: event.target.value.trim('') });
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { assets, description } = this.state
        let errors = {};
        if(this.state.assets===''){
            errors.assets="Assets can't be empty"
        }
        else if(this.state.description===''){
            errors.description="Description can't be empty"
        }
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            this.setState({loading: true})
            this.props.addAssets(assets, description)
            .then(()=>this.props.history.push('/superDashBoard/assetsMaster'))
        }
    }
    onKeyPressHandler = (event) => {
        const pattern = /^[a-zA-Z ]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
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
    changePassword=()=>{
          
        return this.props.history.replace('/superDashboard/changePassword')
      }
    render() {
        let formData;
        formData= 
        <div>
            <div className="assetsName">
                <Label>Assets Name</Label>
                <Input type="text" style={{ 'textTransform': 'capitalize' }} onKeyPress={this.onKeyPressHandler} maxLength={30} placeholder="Enter Assets Name" name="assets" onChange={this.onChangeHandler} />
                <span className="error">{this.state.errors.assets}</span>
            </div>
            <div>
                <Label>Description</Label>
                <textarea type="text" style={{ 'textTransform': 'capitalize' }} maxLength={1000} id="Description" placeholder="Enter Description..." className="form-control" onChange={this.onChangeHandler} name='description'/>
                <span className="error">{this.state.errors.description}</span>
            </div>
            <div>  
             <Button className="btn btn-success" id="addAssets">Add Assets</Button>
             <Link to='/superDashBoard/assetsMaster'>
                <Button color="danger" id="addAssets" >Cancel</Button>
                </Link>
            </div>
        </div>


        return (
            <div>
                <UI onClick={this.logout} change={this.changePassword}>
                    <div>
                    <Form onSubmit={this.onSubmit}>
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                                <span aria-hidden="true">&times;</span>
                            </div>
                    <div><h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Assets Master</h3></div>
                    {!this.state.loading ? formData: <Spinner />} 
                   </Form>
                    </div>
                </UI>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log('assetstype', state.AssetsReducer)
    return {
        getAssets: state.AssetsReducer
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addAssets }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(AssetsTypeMaster);