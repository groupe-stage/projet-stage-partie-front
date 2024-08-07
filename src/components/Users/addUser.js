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

const AddUser = () => {
    const [formData, setFormData] = useState({
        nom_user: '',
        prenom_user: '',
        email: '',
        mdp: '',
        cin: '',
        role: '',
        id_surveillance: '',
        identifiant: '',
        roleRes: '',
        id_unite: '',
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

        axios.post('http://127.0.0.1:8000/users/addUser/', dataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            alert('User added successfully!');
            navigate('/user-list'); 
            setFormData({
                nom_user: '',
                prenom_user: '',
                email: '',
                mdp: '',
                cin: '',
                role: '',
                id_surveillance: '',
                identifiant: '',
                roleRes: '',
                id_unite: '',
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
                                <Label for="nom_user">Nom</Label>
                                <Input
                                    id="nom_user"
                                    name="nom_user"
                                    value={formData.nom_user}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="prenom_user">Prénom</Label>
                                <Input
                                    id="prenom_user"
                                    name="prenom_user"
                                    value={formData.prenom_user}
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
                                <Label for="mdp">Mot de passe</Label>
                                <Input
                                    id="mdp"
                                    name="mdp"
                                    value={formData.mdp}
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
                            <FormGroup>
                                <Label for="id_surveillance">Surveillance</Label>
                                <Input
                                    id="id_surveillance"
                                    name="id_surveillance"
                                    value={formData.id_surveillance}
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
                                    value={formData.id_unite}
                                    onChange={handleChange}
                                    placeholder="Entrez l'ID de l'unité"
                                    required
                                />
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
