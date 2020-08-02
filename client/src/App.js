import React from 'react';
// import { SketchPicker } from 'react-color';
import {  Delete } from '@material-ui/icons';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Container, Col, Table, Form, FormGroup, Label, Row, Input } from 'reactstrap';
import axios from 'axios';

class App extends React.Component {
  state = {
    title: '',
    body: '',
    startDate: "2020-02-02",
    endDate: "2020-02-02",
    status: 'Done',
    priority: 5,
    todoList: [],
    isDataVisible: false,
  }
  handelChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value
    });
  }

  handelSubmit = (event) => {
    event.preventDefault();

    // const dataTodo = {
    //   title: this.state.title,
    //   body: this.state.body,
    //   startDate: this.state.startDate,
    //   endDate: this.state.endDate,
    //   status: this.state.title,
    //   priority: this.state.priority,
    // };


    var self = this;

    // axios.post('http://localhost:8000/api/newTodo/', {
    axios.post('api/newTodo/', {

      title: this.state.title,
      body: this.state.body,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      status: this.state.status,
      priority: this.state.priority,
    })
      .then(function (response) {
        // console.log(response);
        self.getData();

      })
      .catch(function (error) {
        console.log(error);
      });
    this.resetUserInput();


  }

  resetUserInput = () => {
    this.setState({
      title: '',
      body: ''
    });
  }

  setData = (data) => {
    this.setState({
      todoList: data,
      isDataVisible: true
    });
  }

  handleDelete = (Tid) => {
    // console.log("Tid");
    // console.log(Tid);
    var self = this;
    axios.delete('api/deleteTodo/',{id:Tid})
    .then((response) => {
      // console.log(response.data);
      self.getData();
    })
    .catch(function (error) {
      console.log(error);
    });


  }


  getData = () => {


    var self = this;
    axios.get('api/getAllData/')
      .then((response) => {
        // console.log(response.data);
        self.setData(response.data);

      })
      .catch(function (error) {
        console.log(error);
      });


  }

  handleGetData = (event) => {
    event.preventDefault();
    this.getData();
  }

  render() {
    // console.log(this.state);

    return (
      <>
        <Container>
          <Row>
            <Col>
              <div className="p-5">
                <Form onSubmit={this.handelSubmit} >

                  <FormGroup>
                    <Label for="title">Title</Label>
                    <Input type="title" name="title" value={this.state.title} id="title" placeholder="Title" required onChange={this.handelChange} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="body">Body</Label>
                    <Input type="body" name="body" value={this.state.body} id="body" placeholder="Body" required onChange={this.handelChange} />
                  </FormGroup>


                  <FormGroup>
                    <Label for="startDate">Start Date</Label>
                    <Input
                      type="date"
                      name="startDate"
                      id="startDate"
                      value={this.state.startDate}
                      required onChange={this.handelChange}
                      placeholder="Start Date"
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="endDate">End Date</Label>
                    <Input
                      type="date"
                      name="endDate"
                      id="endDate"
                      value={this.state.endDate}
                      required onChange={this.handelChange}
                      placeholder="End Date"
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="exampleSelect">Select</Label>
                    <Input type="select" name="status" id="exampleSelect" value={this.state.status}
                      required onChange={this.handelChange}>
                      <option value="Done">Done</option>
                      <option value="Working on it">Working on it</option>
                      <option value="ToDo">ToDo</option>

                    </Input>
                  </FormGroup>


                  <FormGroup tag="fieldset" >
                    <legend>Priority</legend>
                    <FormGroup check>
                      <Label check>
                        <Input type="radio" name="priority" checked={this.state.priority === 1} onChange={() => { this.setState({ priority: 1 }) }} />{' '}1</Label>
                    </FormGroup>

                    <FormGroup check>
                      <Label check>
                        <Input type="radio" name="priority" checked={this.state.priority === 2} onChange={() => { this.setState({ priority: 2 }) }} />{' '}2</Label>
                    </FormGroup>

                    <FormGroup check>
                      <Label check>
                        <Input type="radio" name="priority" checked={this.state.priority === 3} onChange={() => { this.setState({ priority: 3 }) }} />{' '}3</Label>
                    </FormGroup>

                    <FormGroup check>
                      <Label check>
                        <Input type="radio" name="priority" checked={this.state.priority === 4} onChange={() => { this.setState({ priority: 4 }) }} />{' '}4</Label>
                    </FormGroup>

                    <FormGroup check>
                      <Label check>
                        <Input type="radio" name="priority" checked={this.state.priority === 5} onChange={() => { this.setState({ priority: 5 }) }} />{' '}5</Label>
                    </FormGroup>

                  </FormGroup>


                  <Button>Submit</Button>
                </Form>
              </div>
            </Col>

            <Col> <img style={{ width: '80%', height: '70%' }} src={'./todoImage.jpeg'} alt="TODO" /></Col>
          </Row>
          {/* <div className="m-5 pb-5 bg-info">I have a margin on all sides (3rem = 48px) and a bottom padding (3rem = 48px)</div> */}


          <Row>
            <div className="mt-2 mb-2" size="lg">
              <Button color="info" onClick={this.getData}>
                Todo List ?
               </Button>
            </div>
            {this.state.isDataVisible === true ?
              <Table striped bordered hover dark className="mt-2">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Body</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status </th>
                    <th>Priority</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.todoList.map((value, index) => {
                    return <tr key={value._id}>
                      <td>{value.title}</td>
                      <td>{value.body}</td>
                      <td>{value.startDate.split('T')[0]}</td>
                      <td>{value.endDate.split('T')[0]}</td>
                      <td>{value.status}</td>
                      <td>{value.priority}</td>
                      {/* <td>{value._id}</td> */}
                      <td>
                        {/* <Edit style={{ color: '#4CEE9D' }} onClick={(event)=>{console.log("here")}}/> */}
                        <Delete color="secondary" onClick={(event) => { event.preventDefault(); this.handleDelete(value._id) }} />

                      </td>


                    </tr>
                  })
                  }
                </tbody>
              </Table>
              :
              <></>}
          </Row>

        </Container>
      </>
    );
  }
}
export default App;
