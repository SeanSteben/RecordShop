import React from "react";

const ANewRecord = (props) => {
    return (
        <div className="card" style={{ marginRight: '15px', backgroundColor: 'rgba(41, 24, 54, .30)', color: 'white' }}>
            <div className="card-text text-white" style={{ fontStyle: 'italic' }}>New Arrival!</div>
            <hr className='shadow'/>
            <div className="card-text">Album: {props.data.album_name} </div>
            <div className="card-text">Artist: {props.data.band_name} </div>
        </div>
    );
};



export default ANewRecord;