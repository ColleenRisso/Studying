import React from 'react'

class NewStudentForm extends React.Component {

    //because this is a form, we're wrapping this in a form rather than a div.
    //value will put text INSIDE the boxes (YOU CAN'T USE IT because when people input info into the boxes, we will grab it using event.target.value).
    //Instead we'll be using <label> as a heading for each box.
    //we will need to handle the submit action in here.
    constructor(props){
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    //Once we add state, we can add the property for value so that value can = this.state.firstName/lastName/email

    handleChange(event) {
        //FUN NOTE: object initializer syntax for computed property names. Any expression in the brakets will be computed and used as the property name.
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names
        this.setState({
            [event.target.name]: event.target.value,
        });
        console.log('**Here we are setting the state because information has been entered. The state is:', this.state)
    }

    handleSubmit(event) {
        event.preventDefault(); //so the page doesnt refresh.
        //we reset the state back to defaults so that we can keep adding new students each time.
        this.props.addStudent(this.state);
        //passed props to add student to the array of students on the Main.js component as the NewStudentForm is invoked on the Main component. Here we are invoking this function with this.state(which is the student we've just added) before we reset the state to be empty.
        this.setState({
            firstName: '', 
            lastName: '',
            email: ''
        })
        //The state should now be reset so that we can pass in more students.
        console.log('**Here we are resetting the state. The state is:', this.state)
        //Once we add state, we can add the property for value so that value can = this.state.firstName/lastName/email. This is necesarry so that when state is reset, the fields are cleared.
    }

    render(){
        console.log('Here we are rendering in NewStudentForm. The state is:', this.state)
         return (
            <form onSubmit={this.handleSubmit}>
                <br></br>
                <label>First Name:
                <input type="text" name="firstName" onChange={this.handleChange} value={this.state.firstName}></input>
                </label>
                <br></br>

                <label>Last Name:
                <input type="text" name="lastName" onChange={this.handleChange} value={this.state.lastName}></input>
                </label>
                <br></br>

                <label>Email:
                <input type="text" name="email" onChange={this.handleChange} value={this.state.email}></input>
                </label>
                <br></br>

                <button type="submit">Submit New Student</button>

            </form>
        )
    } 

}

export default NewStudentForm
