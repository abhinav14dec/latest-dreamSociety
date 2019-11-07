import React, { Component } from 'react';

import TenantComplaintPieChart from './tenantComplaintChart';
import TenantPaymentChart from './tenantPaymentChart';
import TenantServicesChart from './tenantServicesChart';
import './../chart/chart.css';


class TenantChart extends Component {


  render() {
    return (
      <div>
        <div className="largeShow smallHide">
          <div className="row">
            <div className="col-4 mt-5">
              <TenantComplaintPieChart />
            </div>
            <div className="col-4 mt-5">
              <TenantPaymentChart />
            </div>
            <div className="col-4 mt-5">
              <TenantServicesChart />
            </div>
          </div>
        </div>

        <div className="smallShow largeHide">
          
            <div className="col mt-5">
            <TenantComplaintPieChart />
            </div>
            <div className="col mt-5">
            <TenantPaymentChart />
            </div>
            <div className="col mt-5">
            <TenantServicesChart />
            </div>
        </div> 
      </div>
    )
  }
}
export default TenantChart;