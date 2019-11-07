import React, { Component } from 'react';
import './assetsTypeSubMaster.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom'
import { getAssets, addAssetsSubType } from '../../actions/assetsSubAction';
import UI from '../../components/newUI/superAdminDashboard';
import { Form,FormGroup, Input, Button, Label } from 'reactstrap';
import Spinner from '../../components/spinner/spinner';
import DefaultSelect from './../../constants/defaultSelect';
class AssetsTypeSubMaster extends Component {
    constructor(props) {
        super(props)
        this.state = {
            assetId: '',
            assetsSubType: '',
            description: '',
            loading: true,
            errors: {},
        }
    }
    componentDidMount() {
        this.props.getAssets().then(() => this.setState({ loading: false }));
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
        const { assetsSubType, description, assetId } = this.state
        let errors = {};
        if(this.state.assetsSubType===''){
            errors.assetsSubType="AssetsSubType can't be empty"
        }
        else if(this.state.description===''){
            errors.description="Description can't be empty"
        }
        else if(this.state.assetId===''){
            errors.assetId="Assets type can't be empty"
        }
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            this.setState({loading: true})
            this.props.addAssetsSubType(assetsSubType, description, assetId)
            .then(() => this.props.history.push('/superDashBoard/assetsTypeSubMaster'))
        }
       console.log(this.state)
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
    logout = () => {
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
      onKeyPressHandler = (event) => {
        const pattern = /^[a-zA-Z ]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    render() {
        let formData;
        
        formData = 
            <div>
                <div>
                    <FormGroup>
                    <Label>Assets Type</Label>
                    <Input type="select" defaultValue='no-value' onChange={this.onChangeHandler} name="assetId" style={{ 'textTransform': 'capitalize' }}>
                    <DefaultSelect/>
                        {this.getAssetsName(this.props.assetsName)}
                    </Input>
                    <span className="error">{this.state.errors.assetId}</span>
                    </FormGroup>
                </div>
                <Label>Assets Sub Type</Label>
                <Input placeholder="Enter Assets Sub Type" style={{ 'textTransform': 'capitalize' }} onKeyPress={this.onKeyPressHandler} maxLength={30} name='assetsSubType' onChange={this.onChangeHandler} />
                <span className="error">{this.state.errors.assetsSubType}</span>


                <div>
                    <Label>Description</Label>
                    <textarea type="text" style={{ 'textTransform': 'capitalize' , 'height':'100px' }} maxLength={3000} id="Description" placeholder="Enter Description..." onChange={this.onChangeHandler} className="form-control" onChange={this.onChangeHandler} name='description' />
                    <span className="error">{this.state.errors.description}</span>
                </div>
                <div>
                    <Button className="btn btn-success" id="addAssets" >Add Assets</Button>
                    <Link to='/superDashBoard/assetsTypeSubMaster'>
                        <Button color="danger" id="addAssets" >Cancel</Button>
                    </Link>
                </div>
            </div>
 

        return (
            <div>
                <UI onClick={this.logout} change={this.changePassword} >
                    <div>
                    <Form onSubmit={this.onSubmit}>
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                                <span aria-hidden="true">&times;</span>
                            </div>
                    <div><h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Assets Sub Type Master</h3></div>
                        {!this.state.loading ? formData : <Spinner />}
                        </Form>
                    </div>
                    
                </UI>
            </div>
        );
    }
}
function mapStateToProps(state) {
    console.log('state',state.AssetsReducer)
    return {
        assetsName: state.AssetsReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getAssets, addAssetsSubType }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(AssetsTypeSubMaster);