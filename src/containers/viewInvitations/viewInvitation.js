import React, { Component } from "react";
import UI from "../../components/newUI/ownerDashboard";
import { Table, Button } from "reactstrap";
import { connect } from "react-redux";
import { getInvitationList } from "../../actions/societyEventCelebrationAction";
import Spinner from "../../components/spinner/spinner";
import { userLogout } from "../../actions/loginAction";

class ViewInvitation extends Component {

  componentDidMount() {
    this.props.getInvitationList();
  }

  // Logout
  logout = () => {
    this.props.userLogout();
  };

  // change password
  changePassword=()=>{
    if(this.props.match.path==='/ownerDashboard/viewInvitations'){
        this.props.history.push('/ownerDashboard/changePasswordOwner')
    }
    else if(this.props.match.path==='/tenantDashboard/viewInvitations'){
        this.props.history.push('/tenantDashboard/changePasswordTenant')
    }
}
  // Accept Invitation

  acceptInvitation = id => {
    let pathname = this.props.location.pathname;
    switch (pathname) {
      case "/ownerDashboard/viewInvitations":
        this.props.history.push(
          `/ownerDashboard/societyEventCelebration/${id}`
        );
        break;

      case "/tenantDashboard/viewInvitations":
        this.props.history.push(
          `/tenantDashboard/societyEventCelebration/${id}`
        );
        break;
      default:
    }
  };
  render() {
    return (
      <div>
        <UI onClick={this.logout} change={this.changePassword}>
          <h2>Event Invitation List</h2>
          {this.props.invitationList &&
          this.props.invitationList.length !== 0 ? (
            <Table className="table table-bordered">
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Event orgnaiser</th>
                  <th>Event Start Date</th>
                  <th>Event End Date</th>
                  <th>Event Timings</th>
                  <th>Adult/Child charges</th>
                  <th>Guest Allowed</th>
                  <th>Action</th>
                </tr>
              </thead>
              {this.props.invitationList.map(item => {
                return (
                  <tbody key={item.eventId}>
                    <tr>
                      <td>{item.event_master.eventName}</td>
                      <td>{`${item.user_master.firstName} ${item.user_master.lastName}`}</td>
                      <td>{item.startDate}</td>
                      <td>{item.endDate}</td>
                      <td>{`${item.startTime} - ${item.endTime}`}</td>
                      <td>{`${item.perPersonCharge}/${item.charges}`}</td>
                      <td>{item.guestAllowed === false ? "No" : "Yes"}</td>
                      <td>
                        <Button
                          color="success"
                          className="mr-2"
                          onClick={() => this.acceptInvitation(item.eventId)}
                        >
                          Accept
                        </Button>
                        <Button color="danger">Decline</Button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </Table>
          ) : (
            <Spinner />
          )}
        </UI>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    invitationList: state.societyEventCelebrationReducer.invitationList
  };
};

export default connect(mapStateToProps, { getInvitationList, userLogout })(
  ViewInvitation
);
