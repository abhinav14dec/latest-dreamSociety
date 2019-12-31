import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Form, Row, Col, Button, FormGroup, Label, Input } from "reactstrap";
import UI from "../../components/newUI/ownerDashboard";
import TenantUI from "../../components/newUI/tenantDashboard";
import DefaultSelect from "../../constants/defaultSelect";
import {
  userflatDetails,
  serviceDetails
} from "../../actions/registerComplainAction";
import {
  getVendorData,
  addVendorBooking,
  timeSlotData
} from "../../actions/individualVendorAction";
import Spinner from "../../components/spinner/spinner";
import _ from "underscore";

class IndividualVendorBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flatDetailId: "",
      serviceId: "",
      individualVendorId: "",
      rateType: "",
      rate: "",
      startTime: "",
      startTime1: "",
      startTime2: "",
      endTime: "",
      endTime1: "",
      endTime2: "",
      startTimeSlotSelected: "",
      endTimeSlotSelected: "",
      enableFingerPrint: false,
      enableSmsNotification: false,
      payOnline: false,
      loading: false,
      errors: {},
      message: "",
      slots: []
    };
  }

  componentDidMount() {
    this.props
      .serviceDetails()
      .then(() => this.setState({ loading: false }))
      .catch(() => this.setState({ loading: false }));
    this.props
      .userflatDetails()
      .then(() => this.setState({ loading: false }))
      .catch(() => this.setState({ loading: false }));
    // this.props.getEventDetails().then(() => this.setState({loading: false})).catch(() => this.setState({loading:false}));
  }

  logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user-type");
    return this.props.history.replace("/");
  };

  serviceChange = event => {
    this.setState({ loading: false });
    this.handleChange(event);
    let selected = event.target.value;
    this.props.getVendorData(selected);

    this.setState({
      individualVendorId: "",
      rate: "",
      rateType: "",
      startTime: "",
      startTime1: "",
      startTime2: "",
      endTime: "",
      endTime1: "",
      endTime2: "",
      startTimeSlotSelected: "",
      endTimeSlotSelected: ""
    });
  };

  vendorChange = event => {
    this.setState({ loading: false });
    this.handleChange(event);
    let selected = event.target.value;
    this.props.timeSlotData(selected).then(res => {
      this.setState({ slots: res.payload.slots });
    });

    var result = _.find(
      this.props.IndividualVendorReducer.getVendorBooking.vendors,
      function(obj) {
        // eslint-disable-next-line
        return obj.individualVendorId == selected;
      }
    );

    this.setState({
      individualVendorId: result.individualVendorId,
      rate: result.rate,
      rateType: result.rate_master.rateType
    });
  };

  timeChange = (startTime, endTime, event) => {
    this.setState({ message: "" });

    if (!!this.state.errors[event.target.name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[event.target.name];
      this.setState({
        [event.target.name]: event.target.value.trim(""),
        errors
      });
    } else {
      this.setState({ [event.target.name]: event.target.value.trim("") });
    }
    this.setState({
      startTimeSlotSelected: startTime,
      endTimeSlotSelected: endTime
    });
  };

  handleChange = event => {
    this.setState({ message: "" });
    if (!!this.state.errors[event.target.name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[event.target.name];
      this.setState({
        [event.target.name]: event.target.value.trim(""),
        errors
      });
    } else {
      this.setState({ [event.target.name]: event.target.value.trim("") });
    }
  };

  h = event => {
    this.setState({ [event.target.name]: event.target.checked }, function() {});
  };

  userflatDetails({ userFlat }) {
    if (userFlat && userFlat.flats) {
      return userFlat.flats.map(item => {
        return (
          <option key={item.flatDetailId} value={item.flatDetailId}>
            {"Flatno-" +
              item.flatNo +
              ", " +
              item.tower_master.towerName +
              ", " +
              item.floor_master.floorName +
              " floor"}
          </option>
        );
      });
    }
  }

  getService({ item }) {
    if (item && item) {
      return item.map(data => {
        return (
          <option key={data.serviceId} value={data.serviceId}>
            {data.serviceName}
          </option>
        );
      });
    } else return "";
  }

  getVendorDetails = ({ getVendorBooking }) => {
    if (getVendorBooking && getVendorBooking.vendors) {
      return getVendorBooking.vendors.map(item => {
        return (
          <option key={item.individualVendorId} value={item.individualVendorId}>
            {`${item.firstName} ${item.lastName}`}
          </option>
        );
      });
    }
  };

  toggleChange = () => {
    this.setState({
      isChecked: !this.state.isChecked
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const {
      flatDetailId,
      startTimeSlotSelected,
      endTimeSlotSelected,
      individualVendorId,
      enableSmsNotification,
      payOnline,
      enableFingerPrint
    } = this.state;
    let errors = {};

    if (!this.state.flatDetailId) {
      errors.flatDetailId = "cant be empty";
    } else if (this.state.serviceId === "") {
      errors.serviceId = "Service Name can't be empty";
    } else if (this.state.individualVendorId === "") {
      errors.individualVendorId = "Individual Vendor Name can't be empty";
    }

    const vendorData = {
      flatDetailId,
      startTimeSlotSelected,
      endTimeSlotSelected,
      individualVendorId,
      enableSmsNotification,
      payOnline,
      enableFingerPrint
    };

    this.setState({ errors });
    const isValid = Object.keys(errors).length === 0;
    if (isValid) {
      this.setState({ loading: true });
      this.props
        .addVendorBooking(vendorData)
        .then(() => this.push())
        // .catch(err => {
        //   this.setState({ message: err.response.data.message, loading: false });
        // });

      this.setState({
        flatDetailId:"",
        startTimeSlotSelected: "",
        endTimeSlotSelected: "",
        individualVendorId: "",
        enableSmsNotification: false,
        payOnline: false,
        enableFingerPrint: false
      });
    }
  };
  push = () => {
    let path = this.props.location.pathname;
    switch (path) {
      case "/ownerDashboard/individualVendorBooking":
        this.props.history.push(
          "/ownerDashboard/individualVendorBookingDetails"
        );
        break;

      case "/tenantDashboard/individualVendorBooking":
        this.props.history.push(
          "/tenantDashboard/individualVendorBookingDetails"
        );
      // eslint-disable-next-line
      default:
    }
  };

  logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user-type");
    return this.props.history.replace("/");
  };

  changePassword = () => {
    let path = this.props.location.pathname;
    switch (path) {
      case "/ownerDashboard/individualVendorBooking":
        this.props.history.push("/ownerDashboard/changePasswordOwner");
        break;

      case "/tenantDashboard/individualVendorBooking":
        this.props.history.push("/tenantDashboard/changePasswordTenant");
      // eslint-disable-next-line
      default:
    }
  };

  close = () => {
    let path = this.props.location.pathname;
    switch (path) {
      case "/ownerDashboard/individualVendorBooking":
        this.props.history.push("/ownerDashboard");
        break;

      case "/tenantDashboard/individualVendorBooking":
        this.props.history.push("/tenantDashboard");
      // eslint-disable-next-line
      default:
    }
  };

  render() {
    let formData = (
      <div>
        <FormGroup>
          <Row md={12}>
            <Col>
              <Label>Flat no</Label>
              <Input
                type="select"
                defaultValue="no-value"
                name="flatDetailId"
                onChange={this.handleChange}
              >
                <DefaultSelect />
                {this.userflatDetails(this.props.registerComplaintReducer)}
              </Input>
              <span className="error">{this.state.errors.flatDetailId}</span>
            </Col>
          </Row>
        </FormGroup>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label>Service Type</Label>
              <Input
                type="select"
                name="serviceId"
                defaultValue="no-value"
                onChange={this.serviceChange}
              >
                <DefaultSelect />
                {this.getService(this.props.registerComplaintReducer)}
              </Input>
              <span className="error">{this.state.errors.serviceId}</span>
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label>List of vendor</Label>
              <Input
                type="select"
                name="individualVendorId"
                defaultValue="no-value"
                onChange={this.vendorChange}
              >
                <DefaultSelect />
                {this.getVendorDetails(this.props.IndividualVendorReducer)}
              </Input>
              <span className="error">
                {this.state.errors.individualVendorId}
              </span>
            </FormGroup>
          </Col>
        </Row>

        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label>Rate Type</Label>
              <Input
                type="text"
                name="rateType"
                value={this.state.rateType}
                readOnly
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>Rates</Label>
              <Input type="text" name="rate" value={this.state.rate} readOnly />
            </FormGroup>
          </Col>
        </Row>

        <FormGroup>
          <Row md={12}>
            <Col md={2}>
              <Label>
                <b>Slot Time : </b>
              </Label>
            </Col>
            {this.state.slots && this.state.slots.startTime ? (
              <Col md={2}>
                <Input
                  type="radio"
                  name="timeSlotSelected"
                  onChange={this.timeChange.bind(
                    this,
                    this.state.slots.startTime,
                    this.state.slots.endTime
                  )}
                />
                {this.state.slots.startTime} to {this.state.slots.endTime}
              </Col>
            ) : (
              ""
            )}
            {this.state.slots && this.state.slots.startTime1 ? (
              <Col md={2}>
                <Input
                  type="radio"
                  name="timeSlotSelected"
                  onChange={this.timeChange.bind(
                    this,
                    this.state.slots.startTime1,
                    this.state.slots.endTime1
                  )}
                />{" "}
                {this.state.slots.startTime1} to {this.state.slots.endTime1}
              </Col>
            ) : (
              ""
            )}
            {this.state.slots && this.state.slots.startTime2 ? (
              <Col md={2}>
                <Input
                  type="radio"
                  name="timeSlotSelected"
                  onChange={this.timeChange.bind(
                    this,
                    this.state.slots[0].startTime,
                    this.state.slots.endTime2
                  )}
                />{" "}
                {this.state.slots.startTime2} to {this.state.slots.endTime2}
              </Col>
            ) : (
              ""
            )}
          </Row>
        </FormGroup>

        <FormGroup check>
          <Label check>
            <Input type="checkbox" name="enableFingerPrint" onChange={this.h} />{" "}
            Do you want enable fingerprint
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              name="enableSmsNotification"
              onChange={this.h}
            />{" "}
            Do you want get SMS notification when she/he arrives or leaves
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" name="payOnline" onChange={this.h} /> Do you
            want to pay online
          </Label>
        </FormGroup>

        <Button color="success" className="mr-2">
          Submit
        </Button>
        <Button color="danger" onClick={this.push}>
          Cancel
        </Button>
      </div>
    );

    let displayData = (
      <Form onSubmit={this.onSubmit}>
        <div
          style={{ cursor: "pointer" }}
          className="close"
          aria-label="Close"
          onClick={this.close}
        >
          <span aria-hidden="true">&times;</span>
        </div>
        <div>
          <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
            Individual Vendor Booking{" "}
          </h3>
        </div>
        <br />
        {!this.state.loading ? formData : <Spinner />}
      </Form>
    );
    return (
      <div>
        {this.props.location.pathname ===
        "/ownerDashboard/individualVendorBooking" ? (
          <UI onClick={this.logout} change={this.changePassword}>
            {displayData}
          </UI>
        ) : (
          <TenantUI onClick={this.logout} change={this.changePassword}>
            {displayData}
          </TenantUI>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    registerComplaintReducer: state.registerComplaintReducer,
    IndividualVendorReducer: state.IndividualVendorReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      timeSlotData,
      serviceDetails,
      getVendorData,
      addVendorBooking,
      userflatDetails
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndividualVendorBooking);
