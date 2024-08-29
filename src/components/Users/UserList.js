import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Table, Card, CardTitle, CardBody, Button, ButtonGroup } from 'reactstrap';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import './UserList.css'; // Ensure to include your CSS file
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/displayall')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Il y a eu une erreur!", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    // Implémentez la fonctionnalité de suppression
    console.log(`Supprimer l'utilisateur avec l'ID : ${id}`);
  };

  

 

  const handleAdd = () => {
    console.log('Add new user');
    // Implement add functionality, e.g., navigating to an add user form
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Liste des utilisateurs
          </CardTitle>
          <CardBody>
            <Table className="modern-table" responsive>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>CIN</th>
                  <th>Role</th>
                  <th>Role Enseignant</th>
                  <th>Identifiant</th>
                  <th>Quota</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.user_id}>
                    <td>
                    <img 
                        src={`http://127.0.0.1:8000${user.image_user}`} 
                        className="user-image"
                        alt=''
                      />

                    </td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.cin}</td>
                    <td>{user.role}</td>
                    <td>{user.roleRes}</td>
                    <td>{user.identifiant}</td>
                    <td>{user.quota}</td>
                    <td>
                      <ButtonGroup>
                      <Link to={`/user-up/${user.user_id}`}>
                       <Button color="secondary">
                        <FaEdit />
                         </Button>
                        </Link>

                        <Link to={`/user-del/${user.user_id}`}>
                          <Button color="dark" onClick={() => handleDelete(user.user_id)}>
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
              <Link to="/addUser">
                <Button color="secondary" onClick={handleAdd}>
                  <FaPlus /> Ajouter un utilisateur
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default UserList;
