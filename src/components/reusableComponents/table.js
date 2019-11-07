import React from 'react';
import { Table, Row, Col } from 'reactstrap';

const TableComponent = props => {
    return (
            <Table className={props.className}>
                {props.children}
            </Table>
    );
}

export default TableComponent;