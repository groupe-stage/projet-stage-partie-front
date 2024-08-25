import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Table, Card, CardTitle, CardBody, Button, ButtonGroup } from 'reactstrap';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import './ExamenList.css'; // Ensure to include your CSS file
import { Link } from 'react-router-dom';

const ExamenList = () => {
  const [examen, setExamen] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchExamen = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/examen/displayall/');
        setExamen(response.data);
      } catch (error) {
        console.error("Il y a eu une erreur!", error);
      }
    };

    const fetchSessions = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/session/displayall');
        setSessions(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des sessions:", error);
      }
    };

    const fetchModules = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/module/displayall');
        setModules(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des modules:", error);
      }
    };

    fetchExamen();
    fetchSessions();
    fetchModules();
  }, []);

  const handleDelete = (id) => {
    // Implement the delete functionality
    console.log(`Delete examen with ID: ${id}`);
  };

  const handleEdit = (id) => {
    // Implement the edit functionality
    console.log(`Edit examen with ID: ${id}`);
  };

  const handleAdd = () => {
    // Implement the add session functionality
    console.log('Add new examen');
  };

  // Function to get session name by ID
  const getSessionNameById = (id) => {
    const session = sessions.find(session => session.id_session === id);
    return session ? session.nom_session : 'Unknown';
  };

  // Function to get module name by ID
  const getModuleNameById = (id) => {
    const module = modules.find(module => module.id_module === id);
    return module ? module.nom_module : 'Unknown';
  };

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Liste des examens
          </CardTitle>
          <CardBody>
            <Table className="modern-table" responsive>
              <thead>
                <tr>
                  <th>Nom d'examen</th>
                  <th>Date</th>
                  <th>Durée</th>
                  <th>Type</th>
                  <th>Session</th>
                  <th>Module</th>
                </tr>
              </thead>
              <tbody>
                {examen.map(examen => (
                  <tr key={examen.id_examen}>
                    <td>{examen.nom_examen}</td>
                    <td>{examen.date_examen}</td>
                    <td>{examen.duree_examen}</td>
                    <td>{examen.type_examen}</td>
                    <td>{getSessionNameById(examen.id_session)}</td>
                    <td>{getModuleNameById(examen.id_module)}</td>
                    <td>
                      <ButtonGroup>
                        <Link to={`/examen-up/${examen.id_examen}`}>
                          <Button color="secondary" onClick={() => handleEdit(examen.id_examen)}>
                            <FaEdit />
                          </Button>
                        </Link>
                        <Link to={`/examen-del/${examen.id_examen}`}>
                          <Button color="dark" onClick={() => handleDelete(examen.id_examen)}>
                            <FaTrashAlt />
                          </Button>
                        </Link>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="text-center mt-3">
              <Link to="/addExamen">
                <Button color="secondary" onClick={handleAdd}>
                  <FaPlus /> Ajouter un examen
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default ExamenList;
