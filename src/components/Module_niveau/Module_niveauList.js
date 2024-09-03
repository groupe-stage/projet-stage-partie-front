import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Table, Card, CardTitle, CardBody, Button, ButtonGroup } from 'reactstrap';
import { FaTrashAlt, FaPlus } from 'react-icons/fa';
import './Module_niveauList.css';
import { Link } from 'react-router-dom';

// Function to get the value of a cookie by its name
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// Default Axios configuration to include CSRF cookie
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const Module_niveauList = () => {
  const [modniv, setModniv] = useState([]);
  const [niveaux, setNiveaux] = useState([]);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    // Fetch data for modniv
    axios.get('http://127.0.0.1:8000/modniv/all/')
      .then(response => {
        setModniv(response.data);
      })
      .catch(error => {
        console.error("Error fetching modniv data:", error);
      });

    // Fetch data for modules
    const fetchModules = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/module/displayall');
        setModules(response.data);
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };

    // Fetch data for niveaux
    const fetchNiveaux = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/Niveau/displayallNiveaux');
        setNiveaux(response.data);
      } catch (error) {
        console.error("Error fetching niveaux:", error);
      }
    };

    fetchModules();
    fetchNiveaux();
  }, []);

  // Function to get the module name by ID
  const getModuleNameById = (id) => {
    const module = modules.find(module => module.id_module === id);
    return module ? module.nom_module : 'Unknown';
  };

  // Function to get the niveau name by ID
  const getNiveauNameById = (id) => {
    const niveau = niveaux.find(niveau => niveau.id_niveau === id);
    return niveau ? niveau.libelleNiv : 'Unknown';
  };

  // Function to handle delete
  const handleDelete = (idmn) => {
    const csrftoken = getCookie('csrftoken'); // Get CSRF token from cookie
    axios.delete(`http://127.0.0.1:8000/modniv/delete/${idmn}/`, {
      headers: {
        'X-CSRFToken': csrftoken // Include CSRF token in headers
      }
    })
    .then(() => {
      // Refresh the data after deletion
      setModniv(modniv.filter(item => item.idmn !== idmn));
    })
    .catch(error => {
      console.error("Error deleting item:", error);
    });
  };

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            List of Module-Niveau Assignments
          </CardTitle>
          <CardBody>
            <Table className="modern-table" responsive>
              <thead>
                <tr>
                  <th>Module</th>
                  <th>Niveau</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {modniv.map((item) => (
                  <tr key={item.idmn}>
                    <td>{getModuleNameById(item.id_module)}</td>
                    <td>{getNiveauNameById(item.id_niveau)}</td>
                    <td>
                      <ButtonGroup>
                        <Button color="dark" onClick={() => handleDelete(item.idmn)}>
                          <FaTrashAlt />
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="text-center mt-3">
              <Link to="/addModule_niveau">
                <Button color="secondary">
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

export default Module_niveauList;