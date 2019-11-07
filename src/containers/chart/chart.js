import React, { Component } from 'react';

import FlatPieChart from './flatpiechart';
import UserPieChart from './userPieChart';
import InventoryPieChart from './inventoryPieChart';
import FlatLineChart from './flatlinechart';
import InventoryLineChart from './inventoryLineChart';
import UserLineChart from './userLineChart';
import './chart.css';

class Chart extends Component {


  render() {
    return (
      <div>
        <div className="largeShow smallHide">
          <div className="row">
            <div className="col-4 mt-5">
              <FlatPieChart />
            </div>
            <div className="col-4 mt-5">
              <UserPieChart />

            </div>
            <div className="col-4 mt-5">
              <InventoryPieChart />

            </div>
          </div>
          <div className="row">
            <div className="col-4 mt-5">
              <FlatLineChart />
            </div>
            <div className="col-4 mt-5">
              <UserLineChart />

            </div>
            <div className="col-4 mt-5">
              <InventoryLineChart />

            </div>
          </div>
        </div>
        <div className="smallShow largeHide">
          <div className="col mt-5">
            <FlatPieChart />
          </div>
          <div className="col mt-5">
            <UserPieChart />

          </div>
          <div className="col mt-5">
            <InventoryPieChart />

          </div>
          <div className="col mt-5">
            <FlatLineChart />
          </div>
          <div className="col mt-5">
            <UserLineChart />

          </div>
          <div className="col mt-5">
            <InventoryLineChart />

          </div>
        </div>
      </div>
    )
  }
}
export default Chart;
