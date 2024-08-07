import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Table, Card, CardTitle, CardBody, Button, ButtonGroup } from 'reactstrap';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import './SessionList.css'; // Ensure to include your CSS file
import { Link } from 'react-router-dom';

const SessionList = () => {
  const [session, setSession] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/session/displayall/')
      .then(response => {
        setSession(response.data);
      })
      .catch(error => {
        console.error("Il y a eu une erreur!", error);
      });
  }, []);

  const handleDelete = (id) => {
    // Implement the delete functionality
    console.log(`Delete session with ID: ${id}`);
  };

  const handleEdit = (id) => {
    // Implement the edit functionality
    console.log(`Edit session with ID: ${id}`);
  };

  const handleAdd = () => {
    // Implement the add session functionality
    console.log('Add new session');
  };

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Liste des sessions
          </CardTitle>
          <CardBody>
            <Table className="modern-table" responsive>
              <thead>
                <tr>
                 
                  <th>Nom d'une session</th>
                  <th>Type d'une session</th>
                </tr>
              </thead>
              <tbody>
                {session.map(session => (
                  <tr key={session.id_session}>
            
                    <td>{session.nom_session}</td>
                    <td>{session.type_session}</td>
                  
                    <td>
                      <ButtonGroup>
                      <Link to={`/session-up/${session.id_session}`}>
                        <Button color="secondary" onClick={() => handleEdit(session.id_session)}>
                          <FaEdit />
                        </Button>
                        </Link>
                        <Link to={`/session-del/${session.id_session}`}>
                        <Button color="dark" onClick={() => handleDelete(session.id_session)}>
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
               
                <Link to="/addSession">
              <Button color="secondary" onClick={handleAdd}>
                <FaPlus /> Ajouter une session 
              </Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default SessionList;
