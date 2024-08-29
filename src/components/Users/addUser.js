import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;
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
const AddUser = () => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        cin: '',
        quota: '',
        role: '',
        identifiant: '',
        roleRes: '',      
        image_user: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            image_user: e.target.files[0]
        });
    };
    const navigate = useNavigate();  // Déclaration correcte
    const handleSubmit = (e) => {
        e.preventDefault();

        const dataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            dataToSend.append(key, formData[key]);
        });

        if (formData.role === 'employe') {
            dataToSend.set('roleRes', '');
        }
        const csrftoken = getCookie('csrftoken');  // Dynamically extract CSRF token

        axios.post('http://127.0.0.1:8000/api/register', dataToSend, {
            headers: {
                'X-CSRFToken': csrftoken
            }
        })
        
        .then(response => {
            alert('User added successfully!');
            navigate('/user-list'); 
            setFormData({
                username: '',
        email: '',
        password: '',
        cin: '',
        quota: '',
        role: '',     
        identifiant: '',
        roleRes: '',
        image_user: null,
            });
        })
        .catch(error => {
            console.error('There was an error adding the user!', error);
            alert('Error adding user.');
        });
    };

    return (
        <Row>
            <Col>
                <Card>
                    <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                        <i className="bi bi-bell me-2"> </i>
                        Ajouter un Utilisateur
                    </CardTitle>
                    <CardBody>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="username">Nom</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                           
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    type="email"
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Mot de passe</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    type="password"
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="cin">CIN</Label>
                                <Input
                                    id="cin"
                                    name="cin"
                                    value={formData.cin}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="quota">Quota</Label>
                                <Input
                                    id="quota"
                                    name="quota"
                                    value={formData.quota}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="identifiant">Identifiant</Label>
                                <Input
                                    id="identifiant"
                                    name="identifiant"
                                    value={formData.identifiant}
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
                                    value={formData.role}
                                    onChange={handleChange}
                                    type="select"
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
                                    value={formData.roleRes}
                                    onChange={handleChange}
                                    type="select"
                                    disabled={formData.role === 'employe'}
                                >
                                    <option value="">Sélectionnez un rôle </option>
                                    <option value="cup">CUP</option>
                                    <option value="directeur">Directeur des étudiants</option>
                                    <option value="ro">Responsable d'option</option>
                                    <option value="chef">Chef département</option>
                                    <option value="simple">Enseignant</option>
                                </Input>
                            </FormGroup>
                            
                            
                            
                            <Button type="submit">Ajouter l'utilisateur</Button>
                        </Form>
                    </CardBody>
                </Card>
                <Link to="/user-list">
              <Button color="secondary" >
                 Annuler
              </Button>
              </Link>
            </Col>
        </Row>
    );
};

export default AddUser;
