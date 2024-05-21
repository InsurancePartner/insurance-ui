import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Insurance from '../interfaces/Insurance.interface';
import Helpers from '../helpers/Helpers';

type InsuranceCardProps = {
  insuranceNumber: string;
  imageUrl: string;
  imageFileName: string;
  multipleCards: boolean;
};

const InsuranceCard: React.FC<InsuranceCardProps> = ({ insuranceNumber, imageUrl, imageFileName, multipleCards }) => {
  return (
    <Col xs={12} md={6} style={{ padding: '10px' }}> 
      <Card>
        <Card.Body>
          <Card.Title>{insuranceNumber !== "-1" && `${Helpers.extractFileName(imageFileName)} insurance`}</Card.Title>
          <Card.Text>{insuranceNumber === "-1" ? "No insurance found" : `Insurance Number: ${insuranceNumber}`}</Card.Text>
        </Card.Body>
        <Card.Img 
          variant="top" 
          src={imageUrl} 
          alt={`Insurance ${insuranceNumber}`} 
          style={multipleCards ? { height: '200px', objectFit: 'cover' } : {}}
        />
      </Card>
    </Col>
  );
};

type InsuranceListProps = {
    insurances: Array<Insurance>;
};
  
const InsuranceList: React.FC<InsuranceListProps> = ({ insurances }) => {

  const rowStyles = {
    justifyContent: insurances.length === 1 ? 'center' : 'start',
  };

  return (
      <Row style={rowStyles}>
          {insurances.map(insurance => (
              <InsuranceCard 
                key={insurance.insuranceNumber} 
                insuranceNumber={insurance.insuranceNumber} 
                imageUrl={insurance.imageUrl}
                imageFileName={insurance.imageFileName} 
                multipleCards={insurances.length > 1}
              />
          ))}
      </Row>
  );
};

export default InsuranceList;
