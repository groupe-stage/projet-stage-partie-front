import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Table, Card, CardTitle, CardBody, Button, ButtonGroup } from 'reactstrap';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import './UserList.css'; // Ensure to include your CSS file
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/users/displayall/')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("Il y a eu une erreur!", error);
      });
  }, []);

  const handleDelete = (id) => {
    // Implement the delete functionality
    console.log(`Delete user with ID: ${id}`);
  };

  const handleEdit = (id) => {
    // Implement the edit functionality
    console.log(`Edit user with ID: ${id}`);
  };

  const handleAdd = () => {
    // Implement the add user functionality
    console.log('Add new user');
  };

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
                  <th>Prénom</th>
                  <th>Email</th>
                  <th>Mot de passe</th>
                  <th>CIN</th>
                  <th>Role</th>
                  <th>Role Enseignant</th>   
                  <th>Identifiant</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id_user}>
                  
                    <td>
                    <img 
                        src={`http://localhost:8000${user.image_user}`} 
                        className="user-image"
                      />
                    </td>
                    <td>{user.nom_user}</td>
                    <td>{user.prenom_user}</td>
                    <td>{user.email}</td>
                    <td>{user.mdp}</td>
                    <td>{user.cin}</td>
                    <td>{user.role}</td>
                    <td>{user.roleRes}</td>
                    <td>{user.identifiant}</td>
                    <td>
                      <ButtonGroup>
                      <Link to={`/user-up/${user.id_user}`}>
                        <Button color="secondary" onClick={() => handleEdit(user.id_user)}>
                          <FaEdit />
                        </Button>
                        </Link>
                        <Link to={`/user-del/${user.id_user}`}>
                        <Button color="dark" onClick={() => handleDelete(user.id_user)}>
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
