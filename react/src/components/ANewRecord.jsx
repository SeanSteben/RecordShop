import React from "react";

const ANewRecord = (props) => {
    return (
        <div className="card">
            <div className="card bg-light">
              
                <div className="card-text">Album: {props.data.album_name} </div>
                <div className="card-text">Artist: {props.data.band_name} </div>
                <div className="card-text"><a href="#">Click to buy!</a></div>
            </div>
        </div>
    );
};

   

export default ANewRecord;