import React, { Component } from 'react';

import OwnerComplaintPieChart from './ownerComplaintPieChart';
import PaymentDetailsChart from './paymentDetailsChart';
import ServiceDetailsChart from './serviceDetailsChart';
import './../chart/chart.css';


class OwnerChart extends Component {


  render() {
    return (
      <div>
        <div className="largeShow smallHide">
          <div className="row">
            <div className="col-4 mt-5">
              <OwnerComplaintPieChart />
            </div>
            <div className="col-4 mt-5">
              <PaymentDetailsChart />
            </div>
            <div className="col-4 mt-5">
              <ServiceDetailsChart />
            </div>
          </div>
          {/* <div className="row">
            <div className="col-4 mt-5">
              <OwnerComplaintPieChart />
            </div>
            <div className="col-4 mt-5">
              <PaymentDetailsChart />
            </div>
            <div className="col-4 mt-5">
              <ServiceDetailsChart />
            </div>
            
          </div> */}
        </div>
        <div className="smallShow largeHide">
          
            <div className="col mt-5">
              <OwnerComplaintPieChart />
            </div>
            <div className="col mt-5">
              <PaymentDetailsChart />
            </div>
            <div className="col mt-5">
              <ServiceDetailsChart />
            </div>
            {/* <div className="col mt-5">
              <OwnerComplaintPieChart />
            </div>
            <div className="col mt-5">
              <PaymentDetailsChart />
            </div>
            <div className="col mt-5">
              <ServiceDetailsChart />
            </div> */}
        </div>
      </div>
    )
  }
}
export default OwnerChart;