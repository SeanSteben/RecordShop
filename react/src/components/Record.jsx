import React from 'react';

const Record = (props) => {
    return (
        <div className="card" style={{ flex: '1', minWidth: '300px', maxWidth: '45%' }}>
            <div className="card-body">
                <h5 className="card-title">Record Information</h5>
                {/* <div className="card-text">Id: {props?.data?.id} </div> */}
                <div className="card-text">Artist:{props?.recordData?.band_name} </div>
                <div className="card-text">Album Name:{props?.recordData?.album_name} </div>
                <div className="card-text">Genre:{props?.recordData?.genre} </div>
                <div className="card-text">Release Date: {props?.recordData?.release_date}</div>
                <div className="card-text">Price:${props?.recordData?.price} </div>
                <div className="card-text">Duration:{props?.recordData?.duration} </div>
            </div>
          
        </div>
    );
};

export default Record;