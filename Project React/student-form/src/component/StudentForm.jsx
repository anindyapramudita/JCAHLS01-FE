import React from "react";

class StudentForm extends React.Component {
    constructor(props) {
        super(props);
    }


    handleSubmit = () => {
        if (this.refs.studentName.value == "" || this.refs.studentClass.value == "null" || this.refs.studentTime.value == "null" || this.refs.studentJob.value == "" || this.refs.studentNote.value == "") {
            alert(`Data is incomplete`)
        } else {
            let temp = [...this.props.dbStudent];
            temp.push({
                name: this.refs.studentName.value,
                class: this.refs.studentClass.value,
                time: this.refs.studentTime.value,
                job: this.refs.studentJob.value,
                note: this.refs.studentNote.value,
                edit: false,
                show: true
            })
            this.props.handleUpdate(temp);
            this.refs.studentName.value = null
            this.refs.studentClass.value = null
            this.refs.studentTime.value = null
            this.refs.studentJob.value = null
            this.refs.studentNote.value = null
        }
    }

    render() {
        return (
            <div>
                <fieldset>
                    <legend><strong>Data Form Input</strong></legend>

                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" ref="studentName" className="form-control" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Class</label>
                        <select ref="studentClass" className="form-select form-control">
                            <option value="null">Choose Class</option>
                            <option value="JC-Full Stack">JC-Full Stack</option>
                            <option value="Digital Marketing">Digital Marketing</option>
                            <option value="UI / UX Design">UI / UX Design</option>
                            <option value="Data Science">Data Science</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Time</label>
                        <select ref="studentTime" className="form-select form-control">
                            <option value="null">Choose Time</option>
                            <option value="Full Time">Full Time</option>
                            <option value="After-Hour">After-hour</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Job</label>
                        <input type="text" ref="studentJob" className="form-control" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Note</label>
                        <input type="text" ref="studentNote" className="form-control" />
                    </div>

                    <div className="d-grid">
                        <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
                    </div>
                </fieldset> <br />
            </div >
        )
    }
}


export default StudentForm;