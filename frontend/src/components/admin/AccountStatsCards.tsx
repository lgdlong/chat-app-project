import { Card, Row, Col } from "react-bootstrap";

interface AccountStatsCardsProps {
  total: number;
  active: number;
  banned: number;
  online: number;
}

export default function AccountStatsCards({
  total,
  active,
  banned,
  online,
}: AccountStatsCardsProps) {
  return (
    <Row className="g-4">
      <Col md={6} lg={3}>
        <Card bg="light" className="shadow-sm text-center p-3">
          <h5>Total Users</h5>
          <h2>{total}</h2>
        </Card>
      </Col>

      <Col md={6} lg={3}>
        <Card bg="success" text="white" className="shadow-sm text-center p-3">
          <h5>Active Users</h5>
          <h2>{active}</h2>
        </Card>
      </Col>

      <Col md={6} lg={3}>
        <Card bg="danger" text="white" className="shadow-sm text-center p-3">
          <h5>Banned Users</h5>
          <h2>{banned}</h2>
        </Card>
      </Col>

      <Col md={6} lg={3}>
        <Card bg="info" text="white" className="shadow-sm text-center p-3">
          <h5>Online Now</h5>
          <h2>{online}</h2>
        </Card>
      </Col>
    </Row>
  );
}
