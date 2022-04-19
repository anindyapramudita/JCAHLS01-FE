import Axios from "axios";
import React from "react";
import { API_URL } from "../helper";
import ModalDetail from "../Components/ModalDetail";

const ProductsAdmin = (props) => {

    const [dbProducts, setDbProducts] = React.useState([])
    // const [openDetail, setOpenDetail] = React.useState(false)
    const [selectedIdx, setSelectedIdx] = React.useState()
    const [openModal, setOpenModal] = React.useState(false)
    const [detail, setDetail] = React.useState({
        nama: "",
        deskripsi: ""
    })

    React.useEffect(() => {
        getProducts();
    }, [])

    const getProducts = () => {
        Axios.get(`${API_URL}/products`)
            .then((response) => {
                setDbProducts(response.data);
            }).catch((error) => {
                console.log(error);
            })
    }

    const printProducts = () => {
        return dbProducts.map((value, index) => {
            let totalStock = 0;
            value.stock.forEach(value => totalStock += value.qty)
            // for (let index = 0; index < value.stock.length; index++) {
            //     totalStock += value.stock[index].qty
            // }
            return <tr className="align-middle" style={{ alignItems: "center" }}>
                <th>{index + 1}</th>
                <td><img src={value.images[0]} alt={`${value.id}-${value.nama}`} style={{ width: "150px" }} /></td>
                <td>
                    <h5 className="fw-bold mb-0">{value.nama}</h5>
                    <p className="text-muted mt-0">{value.kategori}</p>
                </td>
                <td>{totalStock}</td>
                <td>Rp. {value.harga.toLocaleString()}</td>
                <td>
                    <button className="btn btn-outline-secondary w-100 mb-2" type="button" onClick={() => handleDetail(index)}>Detail</button>
                    <button className="btn btn-outline-danger w-100 mt-2" type="button" onClick={() => handleDelete(value.id)}>Delete</button>
                </td>
            </tr>
        })
    }

    const handleDelete = (id) => {
        // 1️⃣ Menghapus data pada server berdasarkan parameter id data
        Axios.delete(`${API_URL}/products/${id}`)
            .then((response) => {
                // 2️⃣ Jika berhasil, get ulang data
                getProducts();
            }).catch((error) => {
                console.log(error)
            })
    }


    // const handleDetail = (index) => {
    //     setOpenDetail(!openDetail)
    //     setDetail({
    //         nama: dbProducts[index].nama,
    //         deskripsi: dbProducts[index].deskripsi
    //     })
    // }

    const handleDetail = (index) => {
        setSelectedIdx(index)
        setOpenModal(!openModal)
    }
    const handleToggle = () => {
        setSelectedIdx(null)
        setOpenModal(!openModal)
    }


    return (
        <div className="container py-4">
            <h3>Products Admin</h3>
            <div className="row">
                <div className="col-3">

                </div>
                <div className="col-9">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Products</th>
                                <th>Name</th>
                                <th>Stock</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {printProducts()}
                        </tbody>
                    </table>
                </div>
            </div>
            {
                selectedIdx >= 0 && selectedIdx != null ?
                    <ModalDetail
                        openDetail={openModal}
                        toggle={handleToggle}
                        data={dbProducts[selectedIdx]}
                    />
                    :
                    null
            }
        </div >
    )
}

export default ProductsAdmin;