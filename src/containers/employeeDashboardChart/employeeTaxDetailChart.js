import React, { Component } from 'react';
import CanvasJSReact from '../../components/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class EmployeeTaxDetailChart extends Component {
	state={
    payRollTaxes:35,
    individualIncomeTaxes:39.0,
    otherTaxes:9
	}
		
	render() {
		const options = {
			animationEnabled: false,
			title: {
				text: "Employee Taxes"
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
					{ y: this.state.payRollTaxes, label: "Payroll Taxes" },
					{ y: this.state.individualIncomeTaxes, label: "Individual Income Taxes" },
					{ y: this.state.otherTaxes, label: "Other Taxes " } 				
				
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

export default EmployeeTaxDetailChart;