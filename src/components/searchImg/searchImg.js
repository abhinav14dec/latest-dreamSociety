import React from 'react';

const Search = (props) => (
    <div className={props.MarginLeft}>
        {/* <img src={props.src} onClick={props.onClick} disabled={props.disabled} /> */}
        <input type={props.type} style={props.style} src={props.src} alt="Submit Request" onClick={props.onClick} disabled={props.disabled} />
    </div>
);

export default Search;
