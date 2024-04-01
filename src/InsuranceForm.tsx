import React from 'react';

interface InsuranceFormProps {}

interface InsuranceFormState {
  responseMessage: string;
}

class InsuranceForm extends React.Component <InsuranceFormProps, InsuranceFormState> {
  constructor(props: InsuranceFormProps) {
    super(props);
    this.state = {
      responseMessage: ''
    };
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const dateOfAccident = form.dateOfAccident.value;
    const ssn = form.ssn.value;

    //fetch('http://localhost:3002/api/find-insurance', { 
    fetch('http://localhost:3002/find-insurance', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dateOfAccident, ssn })
    })
    .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })  
    .then(data => {
        this.setState({ responseMessage: data.message }); 
    })
    .catch(error => {
        console.error('Error:', error);
    });
  }

  render() {
    return (
      <div>
        <h2>Find Your Insurance</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="dateOfAccident">Date of Accident:</label>
            <input type="date" id="dateOfAccident" name="dateOfAccident" required />
          </div>
          <div>
            <label htmlFor="ssn">SSN:</label>
            <input type="text" id="ssn" name="ssn" required />
          </div>
          <button type="submit">Submit</button>
          {this.state.responseMessage && <div>{this.state.responseMessage}</div>}
        </form>
      </div>
    );
  }
}

export default InsuranceForm;
