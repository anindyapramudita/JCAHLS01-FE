import React from 'react'; // Untuk mengaktifkan library react
import Banner from '../Components/Banner';
import Category from '../Components/Category';
import Axios from 'axios';
import { API_URL } from "../helper";

const LandingPage = (props) => {

    const [dbProducts, setDbProducts] = React.useState([])


    React.useEffect(() => {
        getProducts();
    }, [])

    const getProducts = () => {
        Axios.get(`${API_URL}/products`)
            .then((response) => {
                setDbProducts(response.data)
            }).catch((error) => {
                console.log(error)
            })
    }

    return (
        <div>
            <Banner />
            <Category />
            {dbProducts != "" ?
                <div className='container'>
                    <div className='row my-5'>
                        <hr />
                        <div className='col-12 col-md-7 align-self-center'>
                            <h1>{dbProducts[0].nama}</h1>
                            <h3 className='text-muted fs-6'>{dbProducts[0].deskripsi}</h3>
                        </div>
                        <div className='col-12 col-md-5'>
                            <img src={dbProducts[0].images[0]} style={{ width: "500px" }} />
                        </div>
                    </div>
                    <div className='row my-5'>
                        <hr />
                        <div className='col-12 col-md-5'>
                            <img src={dbProducts[1].images[0]} style={{ width: "500px" }} />
                        </div>
                        <div className='col-12 col-md-7 align-self-center'>
                            <h1>{dbProducts[1].nama}</h1>
                            <h3 className='text-muted fs-6'>{dbProducts[1].deskripsi}</h3>
                        </div>
                    </div>
                    <div className='row my-5'>
                        <hr />
                        <div className='col-12 col-md-7 align-self-center'>
                            <h1>{dbProducts[2].nama}</h1>
                            <h3 className='text-muted fs-6'>{dbProducts[2].deskripsi}</h3>
                        </div>
                        <div className='col-12 col-md-5'>
                            <img src={dbProducts[2].images[0]} style={{ width: "500px" }} />
                        </div>
                    </div>
                </div>
                :
                null}
        </div>
    )
}

export default LandingPage