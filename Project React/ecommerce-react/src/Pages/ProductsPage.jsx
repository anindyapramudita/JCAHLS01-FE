import React from "react";
import Axios from "axios";
import { Card, CardBody, CardImg, Form, FormGroup, Label, Input, } from "reactstrap";
import { useNavigate } from "react-router-dom"
import { API_URL } from "../helper";
import { useDispatch, useSelector } from 'react-redux'
import { getProductsAction } from '../redux/actions/productsAction';

const ProductsPage = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [dbProducts, setDbProducts] = React.useState([])
    const [filterName, setFilterName] = React.useState("")
    const [filterMin, setFilterMin] = React.useState(null)
    const [filterMax, setFilterMax] = React.useState(null)
    const [orderData, setOrderData] = React.useState("")

    React.useEffect(() => {
        getProducts();
    }, [])

    const { products } = useSelector((state) => {

        return {
            products: state.productsReducer.products
        }
    })



    const getProducts = () => {
        Axios.get(`${API_URL}/products`)
            .then((response) => {
                // setDbProducts(response.data)
                dispatch(getProductsAction(response.data))
            }).catch((error) => {
                console.log(error);
            })
    }

    const printProducts = () => {
        return products.map((value, index) => {
            return <div key={value.id} className="col-12 col-md-6 col-lg-4">
                <Card className="border-0 shadow-sm">
                    <CardImg
                        src={value.images[0]}
                        onClick={() => navigate(`/product/detail?id=${value.id}`)}
                    // onClick={() => navigate('/product/detail', {
                    //     state: value
                    // })}
                    />
                    <CardBody>
                        <h6 className="fw-bold">{value.nama}</h6>
                        <h5 className="fw-bold" style={{ textAlign: "right", color: "#BBAFA1" }}>IDR. {value.harga.toLocaleString()}</h5>
                    </CardBody>
                </Card>
            </div>
        })
    }

    const handleReset = () => {
        getProducts();
        setFilterName("");
        setFilterMin("");
        setFilterMax("");
        setOrderData("null")
    }

    // Cara 1
    // const handleFilter = () => {
    //     let filterQuery = `?`
    //     if (filterName) {
    //         if (filterMax > 0 && filterMin > 0) {
    //             // kondisi jika form nama dan harga terisi
    //             filterQuery += `nama=${filterName}&harga_gte=${filterMin}&harga_lte=${filterMax}`
    //         } else {
    //             // kodisi jika form nama saja yang terisi
    //             filterQuery += `nama=${filterName}`
    //         }
    //     } else if (filterMax > 0 && filterMin > 0) {
    //         filterQuery += `harga_gte=${filterMin}&harga_lte=${filterMax}`
    //     }
    //     Axios.get(`${API_URL}/products${filterQuery}`)
    //         .then((response) => {
    //             setDbProducts(response.data)
    //         }).catch((error) => {
    //             console.log(error)
    //         })
    // }

    // Cara 2
    const handleFilter = async () => {
        try {
            let filterQuery = `?`
            if (filterName) {
                if (filterMax > 0 && filterMin > 0) {
                    // kondisi jika form nama dan harga terisi
                    filterQuery += `nama=${filterName}&harga_gte=${filterMin}&harga_lte=${filterMax}`
                } else {
                    // kodisi jika form nama saja yang terisi
                    filterQuery += `nama=${filterName}`
                }
            } else if (filterMax > 0 && filterMin > 0) {
                filterQuery += `harga_gte=${filterMin}&harga_lte=${filterMax}`
            }

            let response = await Axios.get(`${API_URL}/products${filterQuery}`);

            // setDbProducts(response.data)
            dispatch(getProductsAction(response.data))

        } catch (error) {
            console.log(error)
        }
    }

    const handleSort = (event) => {
        console.log(event.target.value)
        if (orderData != null) {
            setOrderData(event.target.value)

            let property = event.target.value.split("-")[0]
            let order = event.target.value.split("-")[1]

            Axios.get(`${API_URL}/products?_sort=${property}&_order=${order}`)
                .then((response) => {
                    // setDbProducts(response.data)
                    dispatch(getProductsAction(response.data))
                }).catch((error) => {
                    console.log(error)
                })
        }

    }

    return (
        <div>
            <div className="container py-3 my-2 my-md-4">
                <div className="row">

                    <div className="col-12 col-md-3">
                        <h5>Filter</h5>
                        <Form>
                            <FormGroup>
                                <Label>Nama</Label>
                                <Input
                                    placeholder="Cari Produk"
                                    type="text"
                                    id="text"
                                    value={filterName}
                                    onChange={(event) => setFilterName(event.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Harga</Label>
                                <div className='input-group'>
                                    <Input
                                        placeholder='Minimum'
                                        type='number'
                                        id="numb1"
                                        value={filterMin}
                                        onChange={(event) => setFilterMin(event.target.value)}
                                    />
                                    <Input
                                        placeholder='Maximum'
                                        type='number'
                                        id="numb2"
                                        value={filterMax}
                                        onChange={(event) => setFilterMax(event.target.value)}
                                    />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label>Sort</Label>
                                <div className='input-group'>
                                    <Input
                                        placeholder='Minimum'
                                        type='select'
                                        value={orderData}
                                        onChange={handleSort}
                                    >
                                        <option value="null">Pilih Order</option>
                                        <option value="nama-asc">A-Z</option>
                                        <option value="nama-desc">Z-A</option>
                                        <option value="harga-asc">From Lowest Price</option>
                                        <option value="harga-desc">From Highest Price</option>
                                    </Input>
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <div className='container row mt-3 m-0'>
                                    <div className='col-9 position-relative'>
                                        <button type="button" onClick={handleReset} className='btn btn-outline-warning me-2 position-absolute end-0'>Reset</button>
                                    </div>
                                    <div className='col-3'>
                                        <button type="button" onClick={handleFilter} className='btn btn-primary me-2 '>Filter</button>
                                    </div>
                                </div>
                            </FormGroup>
                        </Form>
                    </div>

                    <div className="col-12 col-md-9">
                        <div className="row">
                            {printProducts()}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProductsPage