import React, { Component } from 'react';
import axios from 'axios';

import StudentList from './StudentList.js';
import SingleStudent from './SingleStudent.js';
import NewStudentForm from './NewStudentForm.js';

//because we're adding a new form and hiding it by default, we're adding a showStudent property to the state AND setting it to false initially.

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      selectedStudent: {},
      showStudent: false,
    };
    this.selectStudent = this.selectStudent.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addStudent = this.addStudent.bind(this);
  }

  componentDidMount() {
    this.getStudents();
  }

  async getStudents() {
    console.log('fetching');
    try {
      const { data } = await axios.get('/student');
      this.setState({ students: data });
      console.log('**Here we are fetching data. The state is:', this.state)
    } catch (err) {
      console.error(err);
    }
  }

  //Write a method "addStudent" that takes a newStudent object and posts (axios.post) to the database. The method should change the state (think about with what). Pass this method as a prop to the form component
  async addStudent(student) {
    //await the response from axios
    const {data} = await axios.post('/student', student);
    //set the state by adding the new student to the array of students and forcing show student back to false
    this.setState({
      students: [...this.state.students, data],
      showStudent: false
    })
  }

  selectStudent(student) {
    return this.setState({
      selectedStudent: student,
    });
  }

  handleClick(event) {
    //if the.state.showStudent is false, it will be set to true, and vice-versa
    return this.setState({
      showStudent: !this.state.showStudent
    })
  }


  //Create a button "Add New Student" in Main.js (the button will toggle the form, which should be hidden by default).
  //Rather than just rending the <NewStudentForm> we only want to render it when the button has been clicked. To do this, we make a click event which will trigger the state. When the state is true, we render the component, otherwise we do not. Hender the turnary rendering. Because this is javascript, we need to handle this in curcly braces.

  render() {
    console.log('Here we are rendering in Main. The state is:', this.state)
    return (
      <div>
        <h1>Students</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Tests</th>
            </tr>
          </thead>
          <StudentList
            students={this.state.students}
            selectStudent={this.selectStudent}
          />
        </table>
        <button onClick={this.handleClick}>Add New Student</button>
        {this.state.showStudent
            ? <NewStudentForm addStudent={this.addStudent} />
            : null}
        {this.state.selectedStudent.id ? (
          <SingleStudent student={this.state.selectedStudent} />
        ) : null}
      </div>
    );
  }
}
