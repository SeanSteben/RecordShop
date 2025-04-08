import React from 'react';
import { Link } from 'react-router-dom';
import recordImage from '../assets/record.png'

const Record = (props) => {
    return (
        // <div className="card" style={{ flex: '1', minWidth: '300px', maxWidth: '45%' }}>
        //     <div className="card-body">
        //         <Link to={'/records/'+props?.recordData?.id}>
        //             <h5 className="card-title">{props?.recordData?.album_name}</h5>
        //         </Link>
        //         {/* <div className="card-text">Id: {props?.data?.id} </div> */}
        //         <div className="card-text">Artist:{props?.recordData?.band_name} </div>
        //         {/* <div className="card-text">Album Name:{props?.recordData?.album_name} </div> */}
        //         <div className="card-text">Genre:{props?.recordData?.genre} </div>
        //         <div className="card-text">Release Date: {props?.recordData?.release_date}</div>
        //         <div className="card-text">Price:${props?.recordData?.price} </div>
        //         <div className="card-text">Duration:{props?.recordData?.duration} </div>
        //     </div>

        // </div>


        <div className="col mb-5">
            <div className="card h-100 shadow" style={{width: '250px', backgroundColor: "#f0f0f0" }}>
                {props?.recordData.is_new && (<div className="badge bg-danger text-white position-absolute" style={{ top: "0.6rem", right: "0.6rem" }}>New Release!</div>)}
                <img className="card-img-top" src={recordImage} style={{ scale: "50%" }} />
                <div className="card-body p-4">
                    <div className="text-center">
                        <h5 className="fw-bolder">{props.recordData.album_name}</h5>
                        <div className="card-text">Artist: {props?.recordData.band_name}</div>
                        <div className="card-text">Genre: {props?.recordData.genre}</div>
                        <div className="card-text">Release Date: {props?.recordData.release_date}</div>
                        <div className="card-text">Duration: {props?.recordData.duration}</div>
                        <div className="card-text">Record Label: {props?.recordData.record_label}</div>
                        ${props?.recordData.price}
                    </div>
                </div>
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <Link to={'/records/' + props?.recordData?.id}>
                        <div className="text-center btn btn-dark mt-auto">Click to see details!</div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Record;