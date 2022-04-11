import './App.css';
import StudentForm from './component/StudentForm';
import Table from './component/table';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dbStudent: [
        {
          name: "Abdi",
          class: "JC-Full Stack",
          time: "After-Hour",
          job: "Product Manager",
          note: "Lecturer",
          edit: false,
          show: true
        },
        {
          name: "Nindya",
          class: "JC-Full Stack",
          time: "After-Hour",
          job: "Marketing",
          note: "Student",
          edit: false,
          show: true
        },
        {
          name: "Eric",
          class: "Digital Marketing",
          time: "Full Time",
          job: "Psychologist",
          note: "Student",
          edit: false,
          show: true
        },

      ]

    }

  }

  handleUpdate = (childData) => {
    this.setState({
      dbStudent: childData
    })
  }

  render() {
    return (
      < div >

        <div className='container mt-5'>
          <div className='row'>

            <div className='col-3'>
              <StudentForm
                dbStudent={this.state.dbStudent}
                handleUpdate={this.handleUpdate}
              />
            </div>

            <div className='col-9'>
              <Table
                dbStudent={this.state.dbStudent}
                handleDelete={this.handleDelete}
                handleUpdate={this.handleUpdate}
              />

            </div>

          </div>

        </div>
      </div >

    )
  }
}

export default App;