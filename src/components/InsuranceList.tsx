import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

type InsuranceCardProps = {
  insuranceNumber: string;
  imageUrl: string;
};

const InsuranceCard: React.FC<InsuranceCardProps> = ({ insuranceNumber, imageUrl }) => {
  return (
    <Col xs={6} md={6}> 
      <Card>
        <Card.Body>
          <Card.Title>{insuranceNumber === "-1" ? "No insurance found" : `Insurance Number: ${insuranceNumber}`}</Card.Title>
        </Card.Body>
        <Card.Img variant="top" src={imageUrl} alt={`Insurance ${insuranceNumber}`} />
      </Card>
    </Col>
  );
};

type InsuranceListProps = {
    insurances: Array<InsuranceCardProps>;
};
  
const InsuranceList: React.FC<InsuranceListProps> = ({ insurances }) => {
    return (
        <Row>
            {insurances.map(insurance => (
                <InsuranceCard key={insurance.insuranceNumber} insuranceNumber={insurance.insuranceNumber} imageUrl={insurance.imageUrl} />
            ))}
        </Row>
    );
};

export default InsuranceList;
