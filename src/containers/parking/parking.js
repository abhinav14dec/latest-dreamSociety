import React, { Component } from 'react';
import { Form } from 'reactstrap';
import { fetchBasement, createParking } from '../../actions/parkingAction';
import { connect } from 'react-redux';
import './parking.css';
import ParkingForm from './parkingForm';
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';

class Parking extends Component {
    componentDidMount() {
        this.renderParking()
    }

    renderParking(){
        this.props.fetchBasement().then(() => this.setState({loading: false})).catch(() => this.setState({loading:false}));
    }

    state = {
        parkingId: '',
        numberOfSlots: '',
        menuVisible: false,
        loading: true,
        errors: {}
    }

    getParking({ parking }) {
        if (parking) {
            return parking.map((item) => {
                return (
                    <option name="parkingId" value={item.parkingId} key={item.parkingId}>
                        {item.parkingName}
                    </option>
                )
            })
        }
    }

    routeToParkingDetails = () => {
        this.props.history.push('/superDashboard/parking_master');
    }

    onChange = (e) => {
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value.trim(), errors })
        }
        else {
            this.setState({ [e.target.name]: e.target.value.trim() })
        }
    }

    numberOfSlots = (event) => {
        const pattern = /^[0-9]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    submit = (e) => {
        e.preventDefault();
        let errors = {};
        let {parkingId, numberOfSlots} = this.state;
        if (!this.state.parkingId) {
            errors.parkingId = `Parking details can't be empty. Please select any.`;
        }
        if (this.state.numberOfSlots === '') {
            errors.numberOfSlots = `Please select number of slots.`;
        }
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0;

        if (isValid) {
            this.setState({loading: true})
            this.props.createParking({ parkingId, numberOfSlots })
            .then(() => {
                this.setState({loading: false})
                this.props.history.push('/superDashboard/parking_master')
                })
                .catch((err) => {
                    err
                    this.setState({loading:false})
                })
            
                this.setState(
                    {
                        parkingId: '',
                        numberOfSlots: '',
                        menuVisible: false,
                        errors: {}
                    }
                );
              
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
        formData = <ParkingForm 
                        parkingName="parkingId"
                        parkingChange={this.onChange}
                        fetchParkingName={this.getParking(this.props.parkingDetail)}
                        parkingError={this.state.errors.parkingId}
                        parkingSlotValueName="numberOfSlots"
                        parkingSlotValue = {this.state.numberOfSlots}
                        parkingSlotValueChange={this.onChange}
                        parkingSlotKeyPress={this.numberOfSlots}
                        parkingSlotError={this.state.errors.numberOfSlots}
                        routeToParkingDetails={this.routeToParkingDetails}
                            />
        return (
            <div>
                <UI onClick={this.logout} change={this.changePassword}>
                    <div>
                        <Form onSubmit={this.submit} method="POST">
                        <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                                <span aria-hidden="true">&times;</span>
                        </div>
                            <div><h3 style={{textAlign:'center', marginBottom: '10px'}}>Add Parking</h3></div>
                            <div>{!this.state.loading ? formData : <Spinner />}</div>
                        </Form>
                    </div>
                </UI>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        parkingDetail: state.parkingDetail.all
    }
}

export default connect(mapStateToProps, { fetchBasement, createParking })(Parking);