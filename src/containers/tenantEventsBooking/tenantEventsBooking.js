import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addEventBooking,getMemberEvent, getEventDetails } from '../../actions/personalEventsBookingAction';


import UI from '../../components/newUI/tenantDashboard';
import _ from 'underscore';
import Spinner from '../../components/spinner/spinner';
import { Form, Button, FormGroup, Input, Label, Row, Col } from 'reactstrap';
import DefaultSelect from '../../constants/defaultSelect';






class MemberEventsBookingTenant extends Component {
    constructor(props) {
        super(props);


        this.state = {
            societyMemberEventId: '',
            startDate: '',
            endDate: '',
            numberOfGuestExpected: '',
            eventSpaceId: '',
            loading: true,
            errors: {},
            message: '',
            selected: '',
            menuVisible: false,
            data: []
        }
    }


    componentDidMount = () => {
        this.refreshData()
    }



    refreshData = () => {
        this.props.getMemberEvent().then(() => this.setState({ loading: false }));
        this.props.getEventDetails().then(() => this.setState({ loading: false }));

    }




    eventType({ eventsResult }) {
        if (eventsResult && eventsResult.event) {
            return (
                eventsResult.event.map((item) => {
                    return (
                        <option key={item.societyMemberEventId} value={item.societyMemberEventId}>
                            {item.societyMemberEventName}
                        </option>
                    )
                })
            )

        }

    }

    getFlatData = ({ floorDetails }) => {
        if (floorDetails && floorDetails.flatDetail) {
            return floorDetails.flatDetail.filter((flatRecord) => {
                return flatRecord.floorId == this.state.floorId
            }).map((items) => {
                return (
                    <option key={items.flatDetailId} value={items.flatDetailId}>
                        {items.flatNo}
                    </option>
                )
            })
        }
    }


    spaceName=({ space }) =>{

        if (space && space.societyMember) {
            return (
                space.societyMember.map((item) => {
                    return (
                        <option key={item.eventSpaceId} value={item.eventSpaceId}>
                            {item.spaceName}
                        </option>
                    )
                })
            )

        }

    }

    test=({ space }) =>{
        if (space && space.societyMember) {
            let a;
            return space.societyMember.filter((event) => {
                    console.log(this.state.eventSpaceId)
                    return event.eventSpaceId == this.state.eventSpaceId
                }).map((data) => {
                        if (data) {
                            console.log("items---->", data)
                            // this.setState({ data: item })
                            this.setState({ data }, function () {
                                console.log(this.state.data);
                           });
                        }

                    })
            
        }
    }


    onChange =async (e) => {
        e.persist();
        this.setState({ message: '' })

        console.log(this.state.eventSpaceId)
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
          await this.setState({ [e.target.name]: e.target.value.trim(''), errors });

        }
        else {
         await this.setState({ [e.target.name]: e.target.value.trim('') });

        }
        console.log(this.state.eventSpaceId)
        this.test(this.props.PersonalEventBookingReducer);
     
        console.log(this.props.PersonalEventBookingReducer)

    }
   


   
    // onChangeSpace = (e) => {
    //     document.getElementById('eventSpaceId').value = 'no-value';
    //     this.setState({
    //         [e.target.name]: e.target.value
    //     })
    //     console.log(e.target.value)
    //     console.log(this.state.eventSpaceId)
    // }

    OnKeyPresshandlerPhone(event) {
        const pattern = /^[0-9]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let errors = {};

        


        if (!this.state.societyMemberEventId) {
            errors.societyMemberEventId = "cant be empty";
        }
        else if (this.state.startDate === '') {
            errors.startDate = "cant be empty";
        }


        else if (this.state.endDate === '') {
            errors.endDate = "cant be empty";
        }

        else if (this.state.startDate > this.state.endDate) {
            errors.startDate = "Start Date should be less than end date ";
        }




        else if (this.state.numberOfGuestExpected === '') {
            errors.numberOfGuestExpected = "cant be empty";
        }

        else if (this.state.eventSpaceId === '') {
            errors.eventSpaceId = "cant be empty";
        }
        this.setState({ errors });




        const isValid = Object.keys(errors).length === 0;

        if (isValid) {

            this.setState({ loading: true })

            this.props.addEventBooking(this.state)
                .then(() => this.props.history.push('/tenantDashboard/tenantEventsBookingDetails'))
                .catch(err => {
                    this.setState({ message: err.response.data.message, loading: false })
                })



            this.setState({
                state: {

                    societyMemberEventId: '',
                    startDate: '',
                    endDate: '',
                    numberOfGuestExpected: '',
                    eventSpaceId: '',


                    menuVisible: false,


                }
            });

        }




    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }

    changePassword = () => {
        return this.props.history.replace('/tenantDashboard/changePasswordTenant')
    }

    eventDetails = () => {
        this.props.history.push('/tenantDashboard/tenantEventsBookingDetails');
    }

    close = () => {
        return this.props.history.replace('/tenantDashBoard')
    }

    minDate = () => {
        var d = new Date();
        return d.toISOString().split('T')[0];
    }

    render() {

        let formData;
        // if(!this.state.loading && this.props.cityMasterReducer.countryResult && this.props.cityMasterReducer.stateResult  &&  this.state.errors){
        formData = <div>
            <FormGroup>
                <Label>Event Type</Label>

                <Input type="select" defaultValue='no-value' name="societyMemberEventId" onChange={this.onChange}>
                    <DefaultSelect />
                    {this.eventType(this.props.PersonalEventBookingReducer)}
                </Input >
                <span className='error'>{this.state.errors.societyMemberEventId}</span>
            </FormGroup>


            <Row>
                <Col md={6}>

                    <Label>Start Date</Label>
                    <Input type="date" min={this.minDate()} name="startDate" onChange={this.onChange}>
                    </Input>
                    <span className='error'>{this.state.errors.startDate}</span>
                    <span className='error'>{this.state.message}</span>

                </Col>

                <Col md={6}>
                    <Label>End Date</Label>
                    <Input type="date" min={this.minDate()} name="endDate" onChange={this.onChange} />
                    <span className='error'>{this.state.errors.endDate}</span>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Label>No Of Guest Expected</Label>
                    <Input type="text" name="numberOfGuestExpected" onKeyPress={this.OnKeyPresshandlerPhone} onChange={this.onChange} maxLength={4}>
                    </Input >
                    <span className='error'>{this.state.errors.numberOfGuestExpected}</span>
                </Col>

                <Col md={6}>
                    <Label>Space Name</Label>
                    <Input type="select" defaultValue='no-value' name="eventSpaceId" id="eventSpaceId" onChange={this.onChange}>
                        <DefaultSelect />
                        {this.spaceName(this.props.PersonalEventBookingReducer)}
                    </Input>
                    <span className='error'>{this.state.errors.eventSpaceId}</span>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Label>Description</Label>
                    <Input type="textarea" name="description" id="discription" value={this.state.data.description} onChange={this.onChange} disabled>
                    </Input>
                </Col>

                <Col md={6}>
                    <Label>Capacity</Label>
                    <Input type="text" name="capacity" id="capacity" value={this.state.data.capacity} onChange={this.onChange} disabled>
                    </Input>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Label>Price Per Day (INR)</Label>
                    <Input type="text" name="price" id="price" value={this.state.data.price} onChange={this.onChange} disabled>
                    </Input>
                </Col>

                <Col md={6}>
                    <Label>SpaceType</Label>
                    <Input type="text" name="spaceType" id="spaceType" value={this.state.data.spaceType} onChange={this.onChange} disabled>
                    </Input>
                </Col>
            </Row>



            <Button type="submit" color="success" className="mr-2">Submit</Button>
            <Button color="danger" onClick={this.eventDetails}  >Cancel</Button>

        </div>

        // }
        return (
            <div>
                <UI onClick={this.logout} change={this.changePassword}>
                    <Form onSubmit={this.handleSubmit}>
                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Events Booking Master</h3>
                        {!this.state.loading ? formData : <Spinner />}

                    </Form>
                </UI>

            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log("booking.........", state)

    return {
        memberEventsBookingReducer: state.memberEventsBookingReducer,
        societyMemberEventReducer: state.societyMemberEventReducer,
        eventSpaceMasterReducer: state.eventSpaceMasterReducer,
        PersonalEventBookingReducer: state.PersonalEventBookingReducer

    }



}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getMemberEvent, addEventBooking, getEventDetails }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(MemberEventsBookingTenant));
