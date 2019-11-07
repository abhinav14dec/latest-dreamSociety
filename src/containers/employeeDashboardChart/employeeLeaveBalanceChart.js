import React, { Component } from 'react';

import CanvasJSReact from '../../components/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class EmployeeLeaveBalanceChart extends Component {
	state={
		january:1,
		february:5,
		march:1,
		april:1,
		may:3,
		june:6,
        july:0,
        august:0,
        september:0,
        october:0,
        november:0,
        december:0
		
	}

	render() {
		const options = {
			animationEnabled: false,
			title: {
				text: "Leaves"
			},
			data: [{
				type: "column",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}%",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 12,     
				indexLabel: "{label} - {y}%",
				dataPoints: [
					{ y: this.state.january, label: " January" },
					{ y: this.state.february, label: "February" },
					{ y: this.state.march, label: "March" },
					{ y: this.state.april, label: "April" },
					{ y: this.state.may, label: "May" },
					{ y: this.state.june, label: "June" },
                    { y: this.state.july, label: "July" },
                    { y: this.state.august, label: "August" },
					{ y: this.state.september, label: "September" },
                    { y: this.state.october, label: "October" },
                    { y: this.state.november, label: "November" },
					{ y: this.state.december, label: "December" }						
				]
			}],
		
	
		}
		
		return (
		<div>
			
			<CanvasJSChart options = {options}
 
				onRef={ref => this.chart = ref} />
			
		</div>
		);
	}
}

export default EmployeeLeaveBalanceChart;