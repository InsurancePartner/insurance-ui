import React from 'react';
import API_URL from './apiConfig';

interface InsuranceFormProps {}

interface InsuranceFormState {
  greeting: string;
  responseMessage: string;
  imageUrl: string;
}

class InsuranceForm extends React.Component <InsuranceFormProps, InsuranceFormState> {
  constructor(props: InsuranceFormProps) {
    super(props);
    this.state = {
      greeting: '',
      responseMessage: '',
      imageUrl: ''
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
    .then(data => {
        this.setState({ 
          responseMessage: data.message,
          imageUrl: data.imageUrl,
        }); 
    })
    .catch(error => {
        console.error('Error:', error);
    });
  }

  render() {
    return (
      <div>
        <h2>Find your insurance</h2>
        <h3>CI/CD pipeline version</h3>
        {this.state.greeting && <p>{this.state.greeting}</p>}
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="ssn">SSN: </label>
            <input type="text" id="ssn" name="ssn" required />
          </div>
          <button type="submit">Submit</button>
          {this.state.responseMessage && <div>{this.state.responseMessage}</div>}
          {this.state.imageUrl && (
            <div>
              <img src={this.state.imageUrl} alt="Insurance" style={{ maxWidth: '25%', height: 'auto' }} />
            </div>
          )}
        </form>
      </div>
    );
  }
}

export default InsuranceForm;
