import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

// Configuration d'Axios pour inclure le token CSRF dans les requêtes
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

// Fonction pour obtenir le token CSRF depuis les cookies
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
    // État du formulaire
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        cin: '',
        quota: '',
        role: '',
        identifiant: '',
        roleRes: '',      
        id_unite: '',
        image_user: null,
    });

    // État pour stocker les unités récupérées de l'API
    const [units, setUnits] = useState([]);

    // useEffect pour récupérer les unités lors du montage du composant
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/unite/unites/')  // Remplacez l'URL par celle de votre API
            .then(response => {
                setUnits(response.data);  // Assurez-vous que les données sont un tableau d'unités
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des unités!', error);
            });
    }, []);

    // Gestion du changement des champs du formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Gestion du changement du fichier image
    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            image_user: e.target.files[0]
        });
    };

    const navigate = useNavigate();

    // Gestion de la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();

        const dataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            // Ajouter uniquement les champs non vides
            if (formData[key] !== '' && formData[key] !== null) {
                dataToSend.append(key, formData[key]);
            }
        });

        // Réinitialisation des champs spécifiques si le rôle est "employe"
        if (formData.role === 'employe') {
            dataToSend.delete('roleRes');
            dataToSend.delete('quota');
            dataToSend.delete('identifiant');
            dataToSend.delete('id_unite');
        }

        const csrftoken = getCookie('csrftoken');

        axios.post('http://127.0.0.1:8000/api/register', dataToSend, {
            headers: {
                'X-CSRFToken': csrftoken
            }
        })
        .then(response => {
            alert('Utilisateur ajouté avec succès!');
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
                id_unite: '',
                image_user: null,
            });
        })
        .catch(error => {
            console.error('Erreur lors de l\'ajout de l\'utilisateur!', error);
            alert('Erreur lors de l\'ajout de l\'utilisateur.');
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
                            <FormGroup>
                                <Label for="quota">Quota</Label>
                                <Input
                                    id="quota"
                                    name="quota"
                                    value={formData.quota}
                                    onChange={handleChange}
                                    disabled={formData.role === 'employe'}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="identifiant">Identifiant</Label>
                                <Input
                                    id="identifiant"
                                    name="identifiant"
                                    value={formData.identifiant}
                                    onChange={handleChange}
                                    disabled={formData.role === 'employe'}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="id_unite">Unité</Label>
                                <Input
                                    id="id_unite"
                                    name="id_unite"
                                    type="select"
                                    value={formData.id_unite}
                                    onChange={handleChange}
                                    disabled={formData.role === 'employe'}
                                >
                                    <option value="">Sélectionnez une unité</option>
                                    {units.map(unit => (
                                        <option key={unit.id_unite} value={unit.id_unite}>
                                            {unit.nom_unite}  
                                        </option>
                                    ))}
                                </Input>
                            </FormGroup>
                            <Button type="submit">Ajouter l'utilisateur</Button>
                        </Form>
                    </CardBody>
                </Card>
                <Link to="/user-list">
                    <Button color="secondary">Annuler</Button>
                </Link>
            </Col>
        </Row>
    );
};

export default AddUser;
