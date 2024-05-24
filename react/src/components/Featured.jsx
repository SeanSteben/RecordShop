import ANewRecord from "./ANewRecord";

const Featured = (props) => {
    return (
        <>
            <h5>Just added to Record Store</h5>
            <div className="card-container d-flex flex-row justify-content-start"  style={{ gap: "20px", padding: "20px" }}>
                {
                    
                    props.data.map((data) => (
                        <ANewRecord key={data.id} data={data} />
                    ))
                }
            </div>
        </>
    );
};

export default Featured