import React from 'react'; // Untuk mengaktifkan library react
import Form from '../Components/Form';
import Banner from '../Components/Banner';

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
            counter: 0,
            input: "",
            dbStudent: [
                {
                    id: 1,
                    name: "Nindya",
                    class: "JC-Full Stack",
                    time: "After-hour",
                    job: "Product Manager",
                    age: 26
                }
            ]
        }
    }

    printData = () => {
        return this.state.dbStudent.map((value, index) => {
            return <tr>
                <td>{index + 1}</td>
                <td>{value.name}</td>
                <td>{value.class}</td>
                <td>{value.time}</td>
                <td>{value.job}</td>
            </tr>
        })
    }

    // membuatn fungsi dalam class component
    btnIncrement = () => {
        let temp = this.state.counter;
        temp++
        this.setState({
            counter: temp
        })
        // counter++;
        // console.log(counter);
    }

    btnDecrement = () => {
        let temp = this.state.counter;
        temp--
        this.setState({
            counter: temp
        })
        // counter--;
        // console.log(counter);
    }

    btnSubmit = () => {
        console.log(this.refs.inValue.value)
        this.setState({ input: this.refs.inValue.value })
    }

    handleInput = (event) => {
        console.log(event.target)
        this.setState({ input: event.target.value })
    }

    // men-generate component html
    render() {
        // destructuring state
        let { counter, input } = this.state;
        // return hmtl component
        return (
            <div>
                <Banner />
                <span>Value from state input :</span>
                <h4>{input}</h4>
                <button type='button' onClick={this.btnDecrement}>Decrement</button>
                <span style={{ fontSize: "24px", margin: "0px 8px" }}>{counter}</span>
                <button type='button' onClick={this.btnIncrement}>Increment</button>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Class</th>
                            <th>Time</th>
                            <th>Job</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.printData()}
                    </tbody>
                </table>
                <Form
                    title="Data Form Input"
                    usia={80}
                    handleInput={this.handleInput}
                    btnSubmit={this.btnSubmit}
                />
            </div>
        )
    }
}

export default LandingPage