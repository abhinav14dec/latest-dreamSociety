import React, { Component } from 'react';
import CanvasJSReact from '../../../components/canvasjs.react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class VendorPaymentChart extends Component {
	state={
	paid:20,
	arrears:15,
	outStanding:22
	}
		
	render() {
		const options = {
			animationEnabled: false,
			title: {
				text: "Payment Details"
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
					{ y: this.state.paid, label: " Paid" },
					{ y: this.state.arrears, label: "Arrears" },
					{ y: this.state.outStanding, label: "OutStanding " } 				
				
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