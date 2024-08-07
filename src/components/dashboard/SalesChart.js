import { Card, CardBody, CardSubtitle, CardTitle, Row, Col } from "reactstrap";
import Chart from "react-apexcharts";

const SalesChart = () => {
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      stacked: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    legend: {
      show: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "30%",
        borderRadius: 2,
      },
    },
    colors: ["#0d6efd", "#009efb", "#6771dc"],
    xaxis: {
      categories: [
        "Lun",
        "Mar", 
        "Mer", 
        "Jeu", 
        "Ven", 
        "Sam", 
        

      ],
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          plotOptions: {
            bar: {
              columnWidth: "60%",
              borderRadius: 7,
            },
          },
        },
      },
    ],
  };
  const series = [
    {
      name: "Session Principale",
      data: [800, 400, 600, 350, 700, 675],
    },
    {
      name: "Session Rattrapage",
      data: [100, 400, 600, 560,470 , 225]
    },
  ];

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Nombre des salles par jour</CardTitle>
        <CardSubtitle className="text-muted" tag="h6">
        Rapport Annuel d'Occupation des Salles 
        </CardSubtitle>
        <div className="bg-primary text-white my-3 p-3 rounded">
          <Row>
            <Col md="4">
              <h6>Salles totale occupée</h6>
              <h4 className="mb-0 fw-bold">1000</h4>
            </Col>
            <Col md="4">
              <h6>Cette Semaine</h6>
              <h4 className="mb-0 fw-bold">150</h4>
            </Col>
          </Row>
        </div>
        <Chart options={options} series={series} type="area" height="279" />
      </CardBody>
    </Card>
  );
};

export default SalesChart;
