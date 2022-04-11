import { toHaveDisplayValue } from "@testing-library/jest-dom/dist/matchers";
import React from "react";

class Table extends React.Component {
    constructor(props) {
        super(props);
    }

    handleDelete = (index) => {
        if (window.confirm(`Are you sure you want to delete this data?`) == true) {
            let temp = [...this.props.dbStudent];
            temp.splice(index, 1)
            this.props.handleUpdate(temp);
        }
    }

    handleEdit = (index) => {
        let temp = [...this.props.dbStudent];
        temp[index].edit = true;
        this.props.handleUpdate(temp);
    }

    handleSave = (index) => {
        let temp = [...this.props.dbStudent];

        temp[index] = {
            name: this.refs.newStudentName.value,
            class: this.refs.newStudentClass.value,
            time: this.refs.newStudentTime.value,
            job: this.refs.newStudentJob.value,
            note: this.refs.newStudentNote.value,
            edit: false,
            show: true
        }

        this.props.handleUpdate(temp)
    }

    handleCancel = (index) => {
        let temp = [...this.props.dbStudent];
        temp[index].edit = false
        this.props.handleUpdate(temp);
    }

    handleSearch = () => {
        let filterStudentName = this.refs.filterStudentName.value
        let filterStudentClass = this.refs.filterStudentClass.value

        let temp = [...this.props.dbStudent]

        temp.forEach(value => {
            if (value.name.toLowerCase().includes(filterStudentName.toLowerCase()) == true && (value.class == filterStudentClass || filterStudentClass == "null")) {
                value.show = true;
            } else {
                value.show = false;
            }
        })

        this.props.handleUpdate(temp)
    }

    handleReset = () => {
        let temp = [...this.props.dbStudent]
        temp.forEach(value => value.show = true)

        this.refs.filterStudentName.value = ""
        this.refs.filterStudentClass.value = "null"

        this.props.handleUpdate(temp)


    }

    printData = () => {
        return this.props.dbStudent.map((value, index) => {
            if (value.edit == false) {
                if (value.show == true) {
                    return <tr>
                        <td>{index + 1}</td>
                        <td>{value.name}</td>
                        <td>{value.class}</td>
                        <td>{value.time}</td>
                        <td>{value.job}</td>
                        <td>{value.note}</td>
                        <td>
                            <div className='btn-group'>
                                <button type='button' className='btn btn-outline-warning' onClick={() => this.handleEdit(index)}>Edit</button>
                                <button type='button' className='btn btn-danger' onClick={() => this.handleDelete(index)}>Delete</button>
                            </div>
                        </td>
                    </tr>
                }
            } else if (value.edit == true) {
                if (value.show == true) {
                    return <tr>
                        <td>{index + 1}</td>
                        <td><input type="text" ref="newStudentName" className="form-control" defaultValue={value.name} /></td>
                        <td>
                            <select ref="newStudentClass" className="form-select form-control" defaultValue={value.class}>
                                <option value="null">Choose Class</option>
                                <option value="JC-Full Stack">JC-Full Stack</option>
                                <option value="Digital Marketing">Digital Marketing</option>
                                <option value="UI / UX Design">UI / UX Design</option>
                                <option value="Data Science">Data Science</option>
                            </select>
                        </td>
                        <td>
                            <select ref="newStudentTime" className="form-select form-control" defaultValue={value.time}>
                                <option value="null">Choose Time</option>
                                <option value="Full Time">Full Time</option>
                                <option value="After-Hour">After-hour</option>
                            </select>
                        </td>
                        <td><input type="text" ref="newStudentJob" className="form-control" defaultValue={value.job} /></td>
                        <td><input type="text" ref="newStudentNote" className="form-control" defaultValue={value.note} /></td>
                        <td>
                            <div className='btn-group'>
                                <button type='button' className='btn btn-outline-success' onClick={() => this.handleSave(index)}>Save</button>
                                <button type='button' className='btn btn-outline-danger' onClick={() => this.handleCancel(index)}>Cancel</button>
                            </div>
                        </td>
                    </tr>
                }
            }
        })
    }

    render() {
        return (
            <div>
                <fieldset className="mb-3">
                    <legend>Search Bar</legend>
                    <input type="text" ref="filterStudentName" className="form-control-sm m-2" placeholder="Name" />
                    <select ref="filterStudentClass" className="form-select-sm m-2">
                        <option value="null">Choose Class</option>
                        <option value="JC-Full Stack">JC-Full Stack</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="UI / UX Design">UI / UX Design</option>
                        <option value="Data Science">Data Science</option>
                    </select>
                    <div className='btn-group ms-2'>
                        <button type="button" className="btn btn-sm btn-primary" onClick={this.handleSearch}>Search</button>
                        <button type="button" className="btn btn-sm btn-outline-primary" onClick={this.handleReset}>Reset</button>
                    </div>
                </fieldset>

                <table className="table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Class</th>
                            <th>Time</th>
                            <th>Job</th>
                            <th>Note</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.printData()}
                    </tbody>

                </table>
            </div>
        )
    }
}


export default Table;