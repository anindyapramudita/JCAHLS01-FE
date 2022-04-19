import React from "react";
import { useLocation } from 'react-router-dom'
import Axios from "axios";
import { API_URL } from "../helper";
import { Collapse } from "reactstrap";

const ProductDetail = (props) => {

    const { state, search } = useLocation();
    const [dbProducts, setDbProducts] = React.useState([])
    const [openCollapse, setOpenCollapse] = React.useState(false)
    const [typeDetail, setTypeDetail] = React.useState()
    const [amount, setAmount] = React.useState(1)
    const [showImage, setShowImage] = React.useState()

    React.useEffect(() => {
        getDetail();
    }, [])

    const getDetail = () => {
        Axios.get(`${API_URL}/products${search}`)
            .then((response) => {
                setDbProducts(response.data)
                setShowImage(response.data[0].images[0])
            }).catch((error) => {
                console.log(error)
            })
    }

    const handleType = (type) => {
        setTypeDetail(type)
    }


    const handleIncrement = () => {
        setAmount(amount + 1)
    }

    const handleDecrement = () => {
        if (amount > 1) {
            setAmount(amount - 1)
        }
    }

    const handleShowImage = (image) => {
        setShowImage(image)
    }

    return (
        <div>
            {dbProducts.length !== 0 ?
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-2 order-2 order-md-1 mt-5">
                            <div>
                                {dbProducts[0].images.map((value, index) => {
                                    return <img src={value} className="mb-3 me-3 rounded shadow-sm" style={{ width: "100px" }} alt="" onClick={() => handleShowImage(value)} />
                                })}
                            </div>
                        </div>
                        <div className="col-12 col-md-6 order-1 order-md-2 mt-5">
                            {dbProducts.length !== 0 ?
                                <img src={showImage} className="img-fluid rounded" alt="" />
                                :
                                null
                            }
                        </div>
                        <div className="col-12 col-md-4 order-3 order-md-3 mt-5">
                            <h3>{dbProducts[0].nama}</h3>
                            <h5 className="text-muted">{dbProducts[0].kategori}</h5>
                            <h2 style={{ color: "#BBAFA1" }}>Rp {dbProducts[0].harga.toLocaleString()}</h2>
                            <hr />
                            <div style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                                <p className="fw-bold" onClick={() => setOpenCollapse(!openCollapse)}>
                                    Type: {typeDetail}
                                </p>
                                <Collapse navbar isOpen={openCollapse}>
                                    {dbProducts[0].stock.map((value, index) => {
                                        return <p className="text-muted" onClick={() => handleType(value.type)}>{value.type}: {value.qty}</p>
                                    })}
                                </Collapse>
                            </div>
                            <hr />
                            <p>{dbProducts[0].deskripsi}</p>
                            <div className="container ps-0 pe-5" style={{ height: "50px" }}>
                                <div className="row">
                                    <div className="col-9">
                                        <p>Jumlah: </p>
                                    </div>
                                    <div className="col-3 btn-group">
                                        {/* <button type="button" className="btn btn-primary m-0" style={{ backgroundColor: "#BBAFA1", borderColor: "#BBAFA1" }}>-</button> */}
                                        <button
                                            type="button"
                                            className="btn btn-default"
                                            style={{
                                                textAlign: "center",
                                                fontSize: "12px",
                                                color: "white",
                                                borderRadius: "15px",
                                                width: "30px",
                                                height: "30px",
                                                backgroundColor: "#BBAFA1",
                                                borderColor: "#BBAFA1"
                                            }}
                                            onClick={() => handleDecrement()}
                                        >
                                            -
                                        </button>
                                        {/* <i className="bi bi-dash-circle-fill" style={{ color: "#BBAFA1" }}></i> */}
                                        <p className="fw-bold mx-3">{amount}</p>
                                        {/* <button type="button" className="btn btn-primary m-0" style={{ backgroundColor: "#BBAFA1", borderColor: "#BBAFA1" }}>+</button> */}
                                        <button
                                            type="button"
                                            className="btn btn-default"
                                            style={{
                                                textAlign: "center",
                                                fontSize: "12px",
                                                color: "white",
                                                borderRadius: "15px",
                                                width: "30px",
                                                height: "30px",
                                                backgroundColor: "#BBAFA1",
                                                borderColor: "#BBAFA1"
                                            }}
                                            onClick={() => handleIncrement()}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button className="btn btn-outline-primary w-100 mt-3" style={{ color: "#BBAFA1", borderColor: "#BBAFA1" }}>Add to cart</button>
                        </div>
                    </div>

                </div>
                :
                null}
        </div >
    )
}

export default ProductDetail;