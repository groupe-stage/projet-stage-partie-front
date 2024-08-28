import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Row, Col, Card, CardTitle, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';

// Configuration par défaut d'axios pour les requêtes CSRF
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

// Fonction utilitaire pour récupérer le token CSRF depuis les cookies
const getCookie = (name) => {
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
};

const UpdateUser = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    cin: '',
    role: '',
    id_surveillance: '',
    identifiant: '',
    roleRes: '',
    id_unite: '',
    image_user: '',
  });

  const [message, setMessage] = useState('');
  
  
  const navigate = useNavigate(); 

  console.log(window.location.pathname); // Check the full URL path
const { user_id } = useParams();
console.log('user_id from URL:', user_id);

useEffect(() => {
  const fetchUser = async () => {
    if (user_id) { // Ensure user_id is available
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/updateusers/${user_id}/`);
        setUserData(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
      }
    }
  };

  fetchUser();
}, [user_id]);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    for (const key in userData) {
      if (userData[key] instanceof File) {
        formData.append(key, userData[key]);
      } else {
        formData.append(key, userData[key]);
      }
    }
    const csrftoken = getCookie('csrftoken');  // Récupération dynamique du token CSRF

    try {
      await axios.put(`http://127.0.0.1:8000/api/updateusers/${user_id}/`, formData, {
        headers: {
          'X-CSRFToken': csrftoken
        }
      });
      setMessage('Utilisateur mis à jour avec succès!');
      navigate('/user-list'); 
    } catch (error) {
      console.error('Erreur lors de la mise à jour des données utilisateur:', error);
      setMessage("Échec de la mise à jour de l'utilisateur.");
    }
  };
  
  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Mettre à jour l'utilisateur
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="cin">CIN</Label>
                <Input
                  id="cin"
                  name="cin"
                  value={userData.cin}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
             
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={userData.email}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label for="username">Nom</Label>
                <Input
                  id="username"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label for="identifiant">Identifiant</Label>
                <Input
                  id="identifiant"
                  name="identifiant"
                  value={userData.identifiant}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="image_user">Image de l'utilisateur</Label>
                <Input
                  id="image_user"
                  name="image_user"
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </FormGroup>
              <FormGroup>
                <Label for="role">Rôle</Label>
                <Input
                  id="role"
                  name="role"
                  type="select"
                  value={userData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionnez un rôle</option>
                  <option value="employe">Employé</option>
                  <option value="enseignant">Enseignant</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="roleRes">Rôle Enseignant</Label>
                <Input
                  id="roleRes"
                  name="roleRes"
                  type="select"
                  value={userData.roleRes}
                  onChange={handleChange}
                  disabled={userData.role === 'employe'}
                >
                  <option value="">Sélectionnez un rôle</option>
                  <option value="cup">CUP</option>
                  <option value="directeur">Directeur des étudiants</option>
                  <option value="ro">Responsable d'option</option>
                  <option value="chef">Chef département</option>
                  <option value="simple">Enseignant</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="id_surveillance">Surveillance</Label>
                <Input
                  id="id_surveillance"
                  name="id_surveillance"
                  value={userData.id_surveillance}
                  onChange={handleChange}
                  placeholder="Entrez l'ID de surveillance"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="id_unite">Unité</Label>
                <Input
                  id="id_unite"
                  name="id_unite"
                  value={userData.id_unite}
                  onChange={handleChange}
                  placeholder="Entrez l'ID de l'unité"
                  required
                />
              </FormGroup>
              <Button type="submit">Mettre à jour l'utilisateur</Button>
            </Form>
          </CardBody>
        </Card>
        {message && <p>{message}</p>}
        <Link to="/user-list">
          <Button color="secondary">Annuler</Button>
        </Link>
      </Col>
    </Row>
  );
};

export default UpdateUser;
