import React, { Component } from "react";
import axios from "axios";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      message: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const inputValue = event.target.value;
    const stateField = event.target.name;
    this.setState({
      [stateField]: inputValue,
    });
    console.log(this.state);
  }
  async handleSubmit(event) {
    event.preventDefault();
    const { name, message } = this.state;
    await axios.post(
      "https://hwdcmezpwc.execute-api.us-west-1.amazonaws.com/default/serverlessAppFunction",
      { key1: `${name}, ${message}` },
      { headers: {
        'content-type': 'text/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      }}
    );
  }

  render() {
    return (
      <div>
        <h1>Leave your message here:</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
            />

            <label>Message:</label>
            <input
              type="text"
              name="message"
              onChange={this.handleChange}
              value={this.state.message}
            />

            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    );
  }
}
