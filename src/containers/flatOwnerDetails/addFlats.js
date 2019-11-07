import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Form, Label, FormGroup } from 'reactstrap';
import Spinner from '../../components/spinner/spinner';
import UI from '../../components/newUI/superAdminDashboard';
import Select from 'react-select';
import { PlaceHolder } from '../../actionCreators/index';
import { getAllFloor, addAnotherFlats } from '../../actions/flatOwnerAction';
import { viewTower } from '../../actions/towerMasterAction';
import { Link } from 'react-router-dom';
import { getFlatDetails } from '../../actions/flatDetailMasterAction';
class AddFlats extends Component {
    constructor(props) {
        super(props);

        this.state = {
            towerId: '',
            floorId: '',
            flatDetailIds: '',
            loading: false,
            errors: {},
        }
    }
    componentDidMount() {
        this.props.viewTower();
        this.props.getFlatDetails();
    }
    getTower = ({ tower }) => {
        if (tower) {
            return tower.tower.map((item) => {
                return (
                    { ...item, label: item.towerName, value: item.towerId }
                )
            }
            );
        }
        return [];
    }

    towerChangeHandler = (name, selectOption) => {

        this.setState(function (prevState, props) {
            return {
                [name]: selectOption.value,
                towerName: selectOption.label
            }
        }, function () {
        });
        this.props.getAllFloor(selectOption.towerId);
    }
    getFloor = ({ floor }) => {
        if (floor) {
            return floor.tower.Floors.map((item) => {

                return { ...item, label: item.floorName, value: item.floorId }
            })
        }
        else {
            return []
        }
    }
    floorChangeHandler = (name, selectOption) => {
        this.setState({
            [name]: selectOption.value,
            floorName: selectOption.label
        })

    }
    getFlats = ({ floor }) => {
        if (floor) {
            return floor.flatDetail.filter((flatRecord) => {
                return flatRecord.floorId === this.state.floorId
            }).map((selectFlat) => {
                return { ...selectFlat, label: selectFlat.flatNo, value: selectFlat.flatDetailId }
            });
        }
        else {
            return []
        }
    }
    flatChangeHandler = (name, selectOption) => {
        let flatName = selectOption.label
        this.setState({
            [name]: selectOption.value,
            currentAddress: this.state.flat + flatName + ',' + this.state.floorName + ',' + this.state.towerName + ',' + this.state.currentAddress + ' ' + this.state.pinCode
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        let errors = {};
        if (this.state.towerId === '') {
            errors.towerId = "Tower can't be empty"
        }
        else if (this.state.floorId === '') {
            errors.floorId = "floor can't be empty"
        }
        else if (this.state.flatDetailIds === '') {
            errors.flatDetailIds = "flat can't be empty"
        }
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0;
        let ownerId = localStorage.getItem('ownerId')
        if (isValid) {
            this.props.addAnotherFlats(ownerId, this.state.flatDetailIds)
                .then(() => this.props.history.push('/superDashboard/viewOwnerFlats'))
        }

    }
    render() {
        let formData;
        formData =
            <div>
                <FormGroup>
                    <Label>Tower</Label>
                    <Select options={this.getTower(this.props.towerList)}
                        onChange={this.towerChangeHandler.bind(this, 'towerId')}
                        placeholder={PlaceHolder} />
                    <span className="error">{this.state.errors.towerId}</span>
                </FormGroup >
                <FormGroup>
                    <Label>Floor</Label>
                    <Select options={this.getFloor(this.props.towerFloor)}
                        placeholder={PlaceHolder}
                        name="floorId"
                        onChange={this.floorChangeHandler.bind(this, 'floorId')}
                    />
                    <span className="error">{this.state.errors.floorId}</span>
                </FormGroup>
                <FormGroup>
                    <Label>Flat Number</Label>
                    <Select options={this.getFlats(this.props.towerFloor)}
                        placeholder={PlaceHolder}
                        name="flatDetailIds"
                        onChange={this.flatChangeHandler.bind(this, 'flatDetailIds')}
                    />
                    <span className="error">{this.state.errors.flatDetailIds}</span>
                </FormGroup >
                <Button className="btn btn-success" >Add Flat</Button>
                <Link to='/superDashBoard/viewOwnerFlats'>
                    <Button color="danger" id="addAssets" >Cancel</Button>
                </Link>
            </div>
        return (
            <div>
                <UI onClick={this.logout} change={this.changePassword}>
                    <div>
                        <Form onSubmit={this.onSubmit}>
                            <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                                <span aria-hidden="true">&times;</span>
                            </div>
                            <div><h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Add Owner's Flat</h3></div>
                            {!this.state.loading ? formData : <Spinner />}
                        </Form>
                    </div>
                </UI>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        towerFloor: state.FlatOwnerReducer,
        towerList: state.TowerDetails,
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getAllFloor, viewTower, addAnotherFlats, getFlatDetails }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(AddFlats);