import React from 'react';
import { Card } from 'react-bootstrap';

type InsuranceCardProps = {
  insuranceNumber: string;
  imageUrl: string;
};

const InsuranceCard: React.FC<InsuranceCardProps> = ({ insuranceNumber, imageUrl }) => {
  return (
      <Card>
        <Card.Body>
          <Card.Title>{insuranceNumber === "-1" ? "No insurance found" : `Insurance Number: ${insuranceNumber}`}</Card.Title>
        </Card.Body>
        <Card.Img variant="top" src={imageUrl} alt={`Insurance ${insuranceNumber}`} />
      </Card>
  );
};

export default InsuranceCard;