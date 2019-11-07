import React, { Component } from 'react';
import CanvasJSReact from '../../../components/canvasjs.react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class VendorPaymentChart extends Component {
	state={
		monday:15,
		tuesday:25,
		wednesday:10,
		thursday:1,
		friday:3,
		saturday:6,
		sunday:0
		
	}

	render() {
		const options = {
			animationEnabled: false,
			title: {
				text: "Schedule"
			},
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}%",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 12,     
				indexLabel: "{label} - {y}%",
				dataPoints: [
					{ y: this.state.monday, label: " Monday" },
					{ y: this.state.tuesday, label: "Tuesday" },
					{ y: this.state.wednesday, label: "Wednesday" },
					{ y: this.state.thursday, label: "thursday" },
					{ y: this.state.friday, label: "friday" },
					{ y: this.state.saturday, label: "saturday" },
					{ y: this.state.sunday, label: "sunday" }				
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

export default VendorPaymentChart;