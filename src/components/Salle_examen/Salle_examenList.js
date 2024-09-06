import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Table, Card, CardTitle, CardBody, Button, ButtonGroup } from 'reactstrap';
import { FaTrashAlt, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Function to get the value of a cookie by its name
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// Default Axios configuration for CSRF
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const SallexList = () => {
  const [sallex, setSallex] = useState([]);
  const [salles, setSalles] = useState([]);
  const [examens, setExamens] = useState([]);

  useEffect(() => {
    // Fetch data for Sallex
    axios.get('http://127.0.0.1:8000/sallex/all/')
      .then(response => {
        setSallex(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching sallex data!", error);
      });

    // Fetch data for salles
    const fetchSalles = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/salle/displayAllS');
        setSalles(response.data);
      } catch (error) {
        console.error("Error fetching salles:", error);
      }
    };

    // Fetch data for examens
    const fetchExamens = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/examen/displayall/');
        setExamens(response.data);
      } catch (error) {
        console.error("Error fetching examens:", error);
      }
    };

    fetchExamens();
    fetchSalles();
  }, []);

  // Function to get Salle name by ID
  const getSalleNameById = (id) => {
    const salle = salles.find(salle => salle.id_salle === id);
    return salle ? salle.nom_salle : 'Unknown';
  };

  // Function to get Examen name by ID
  const getExamenNameById = (id) => {
    const examen = examens.find(examen => examen.id_examen === id);
    return examen ? examen.nom_examen : 'Unknown';
  };

  // Function to handle delete
  const handleDelete = async (idse) => {
    try {
      const csrftoken = getCookie('csrftoken'); // Get the CSRF token from the cookie

      await axios.delete(`http://127.0.0.1:8000/sallex/delete/${idse}/`, {
        headers: {
          'X-CSRFToken': csrftoken // Include the CSRF token in the headers
        }
      });

      console.log(`Deleted assignment with ID: ${idse}`);
      setSallex(sallex.filter(item => item.idse !== idse)); // Update state to remove deleted item
    } catch (error) {
      console.error("There was an error deleting the assignment!", error);
    }
  };

  // Function to handle add
  const handleAdd = () => {
    console.log('Add new assignment');
  };

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            List of Exam Assignments to Rooms
          </CardTitle>
          <CardBody>
            <Table className="modern-table" responsive>
              <thead>
                <tr>
                  <th>Salle</th>
                  <th>Examen</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sallex.map((item) => (
                  <tr key={item.idse}>
                    <td>{getSalleNameById(item.id_salle)}</td>
                    <td>{getExamenNameById(item.id_examen)}</td>
                    <td>
                      <ButtonGroup>
                        <Button color="dark" onClick={() => handleDelete(item.idse)}>
                          <FaTrashAlt />
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="text-center mt-3">
              <Link to="/addSalle_examen">
                <Button color="secondary" onClick={handleAdd}>
                  <FaPlus /> Add Assignment
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default SallexList;
