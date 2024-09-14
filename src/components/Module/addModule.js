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

// Fonction pour obtenir un cookie spécifique par son nom
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

const AddModule = () => {
    const [formData, setFormData] = useState({
        nom_module: '',
        duree_module: '',
    });


    
    const navigate = useNavigate();

    

    // Gérer les changements dans le formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Soumettre le formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        const csrftoken = getCookie('csrftoken');

        axios.post('http://127.0.0.1:8000/module/addModule/', formData, {
            headers: {
                'X-CSRFToken': csrftoken
            }
        })
        .then(response => {
            alert('Module ajouté avec succès!');
            navigate('/module-list'); 
            setFormData({
                nom_module: '',
                duree_module: '',
                
            });
        })
        .catch(error => {
            console.error('Erreur lors de l\'ajout du module!', error);
            alert('Erreur lors de l\'ajout du module.');
        });
    };

    return (
        <Row>
            <Col>
                <Card>
                    <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                        <i className="bi bi-bell me-2"> </i>
                        Ajouter un module
                    </CardTitle>
                    <CardBody>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="nom_module">Nom du module</Label>
                                <Input
                                    id="nom_module"
                                    name="nom_module"
                                    value={formData.nom_module}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
  <Label for="duree_module">Durée (en heures)</Label>
  <Input
    id="duree_module"
    name="duree_module"
    type="select"
    value={formData.duree_module}
    onChange={handleChange}
    required
  >
    <option value="">Sélectionnez une durée (en heure )</option>
    <option value="21">21 </option>
    <option value="42">42 </option>
  </Input>
</FormGroup>

                           
                            <Button type="submit">Ajouter le module</Button>
                        </Form>
                    </CardBody>
                </Card>
                <Link to="/module-list">
                    <Button color="secondary">
                        Annuler
                    </Button>
                </Link>
            </Col>
        </Row>
    );
};

export default AddModule;
