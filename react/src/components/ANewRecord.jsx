import React from "react";

const ANewRecord = (props) => {
    return (
        <div className="card">
            <div className="card bg-light" style={{color: 'blue'}}>
              
                <div className="card-text">Album: {props.data.album_name} </div>
                <div className="card-text">Artist: {props.data.band_name} </div>
                
            </div>
            <div className="card-text">New to the Store!</div>
        </div>
    );
};

   

export default ANewRecord;