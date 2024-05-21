import React from 'react';
import API_URL from './apiConfig';
import InsuranceList from './components/InsuranceList'; 
import Insurance from './interfaces/Insurance.interface';

interface InsuranceFormProps {}

interface InsuranceFormState {
  greeting: string;
  insurances: Insurance[];
}

class InsuranceForm extends React.Component <InsuranceFormProps, InsuranceFormState> {
  constructor(props: InsuranceFormProps) {
    super(props);
    this.state = {
      greeting: '',
      insurances: []
    };
  }

  componentDidMount() {
    fetch(`${API_URL}/api/`, { 
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text(); 
    })
    .then(data => {
      this.setState({ greeting: data });
    })
    .catch(error => {
      console.error('Error fetching the greeting:', error);
    });
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const ssn = form.ssn.value;

    fetch(`${API_URL}/api/find-insurance`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ssn })
    })
    .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })  
    .then(insurances => {
      this.setState({ insurances });
    })
    .catch(error => {
        console.error('Error:', error);
    });
  }

  render() { 
    const style = {
      maxWidth: '60%',
      margin: 'auto'
    };
   
    return (
      <div>
        <h2>Find your insurance</h2>
        <h3>CI/CD pipeline version</h3>
        {this.state.greeting && <p>{this.state.greeting}</p>}
        <form onSubmit={this.handleSubmit} style={{ marginBottom: '20px' }}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="ssn" style={{ marginRight: '10px' }}>SSN: </label>
            <input type="text" id="ssn" name="ssn" required />
          </div>
          <button type="submit" style={{ marginBottom: '10px' }}>Submit</button>
          {this.state.insurances.length > 0 && 
            <div style={style}>
              <InsuranceList insurances={this.state.insurances}/>
            </div>
          } 
        </form>
      </div>
    );
  }
}

export default InsuranceForm;
