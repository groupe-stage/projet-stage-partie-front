import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link} from 'react-router-dom';
import { Row, Col, Card, CardTitle, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const UpdateUser = () => {
  const [userData, setUserData] = useState({
    cin: '',
    contrainte: '',
    email: '',
    id_surveillance: '',
    id_unite: '',
    id_user: '',
    identifiant: '',
    mdp: '',
    nom_user: '',
    prenom_user: '',
    role: '',
    roleRes: '',
    image_user: '',
  });

  const [message, setMessage] = useState('');
  const { id_user } = useParams();
  const navigate = useNavigate();  // Déclaration correcte
  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log(`Fetching user with ID: ${id_user}`);
        const response = await axios.get(`http://localhost:8000/users/updateusers/${id_user}/`);
        console.log('User data fetched:', response.data);
        setUserData(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
      }
    };

    fetchUser();
  }, [id_user]);

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
  
    try {
      await axios.put(`http://localhost:8000/users/updateusers/${id_user}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
                <Label for="contrainte">Contrainte</Label>
                <Input
                  id="contrainte"
                  name="contrainte"
                  value={userData.contrainte}
                  onChange={handleChange}
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
                <Label for="mdp">Mot de passe</Label>
                <Input
                  id="mdp"
                  name="mdp"
                  type="password"
                  value={userData.mdp}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="nom_user">Nom</Label>
                <Input
                  id="nom_user"
                  name="nom_user"
                  value={userData.nom_user}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="prenom_user">Prénom</Label>
                <Input
                  id="prenom_user"
                  name="prenom_user"
                  value={userData.prenom_user}
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
