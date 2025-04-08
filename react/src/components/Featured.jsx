import ANewRecord from "./ANewRecord";

const Featured = (props) => {
    return (
        <>
            <div class="container px-4 px-lg-5 my-5">
                <div class="text-center text-white">
                    <h4 class="display-4 fw-bolder">Featured Products at the Record Shop</h4>
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: 'center', marginTop: '20px' }}>
                        {
                            props.data.slice(0,4).map((data) => (
                                <ANewRecord key={data.id} data={data} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Featured