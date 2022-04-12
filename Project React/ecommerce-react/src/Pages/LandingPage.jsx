import React from 'react'; // Untuk mengaktifkan library react
import Form from '../Components/Form';
import Banner from '../Components/Banner';
import Category from '../Components/Category';
import Axios from 'axios';

const API_URL = "http://localhost:5000"
/**
 * React Data Management :
 * 1️⃣ state : 
 * - untuk memanage data pada suatu component
 * - menyimpan data pada state ketika data tersebut mempengaruhi tampilan
 * 
 * 
 * 2️⃣ props : untuk mengelola data agar dapat digunakan oleh component lain
 *             spesifiknya mentrasfer data dari parent component ke child component
 * 
 * 
 */





// CLASS COMPONENT
// Initialize component

// let counter = 0;
class LandingPage extends React.Component {
    // Urutan render component:
    // 1️⃣ Constructor
    // 2️⃣ Fungsi Render
    // 3️⃣ Update tampilan
    // 4️⃣ ComponentDidMount (fungsi di bawah constructor)



    // untuk memanage data yang akan digunakan pada component react
    constructor(props) {
        super(props);
        // local data management
        this.state = {
            // dbBanner: []
        }
    }

    componentDidMount() {
        this.getBanner();
    }


    // ALTERNATIVE TO GET DATA FROM "BACK-END"
    getBanner = () => {
        Axios.get(`${API_URL}/banner`)
            .then((response) => {
                // jika berhasil mendapatkan response
                console.log("From Class Component:", response.data)
                this.setState({ dbBanner: response.data })
            }).catch((error) => {
                // jika tidak berhasil mendapatkan response
                console.log(error)
            })
    }

    render() {
        // destructuring state

        // return hmtl component
        return (
            <div>
                <Banner
                // bannerList={this.state.dbBanner}
                />
                <Category />
            </div>
        )
    }
}

export default LandingPage