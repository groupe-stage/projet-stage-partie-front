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

const AddModule = () => {
    const [formData, setFormData] = useState({
        nom_module: '',
        duree_module: '',
        id_niveau: '',
       
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

   
    const navigate = useNavigate();  // Déclaration correcte
    const handleSubmit = (e) => {
        e.preventDefault();

        const dataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            dataToSend.append(key, formData[key]);
        });

       
        axios.post('http://127.0.0.1:8000/module/addModule/', dataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            alert('Module added successfully!');
            navigate('/module-list'); 
            setFormData({
                nom_module: '',
                duree_module: '',
                id_niveau: '',
               
            });
        })
        .catch(error => {
            console.error('There was an error adding the module!', error);
            alert('Error adding module.');
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
                                <Label for="duree_module">Durée (en heure)</Label>
                                <Input
                                    id="duree_module"
                                    name="duree_module"
                                    value={formData.duree_module}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="id_niveau">Niveau</Label>
                                <Input
                                    id="id_niveau"
                                    name="id_niveau"
                                    value={formData.id_niveau}
                                    onChange={handleChange}
                                    placeholder="Entrez l'ID du niveau"
                                    required
                                />
                            </FormGroup>
                           
                           
                            
                            <Button type="submit">Ajouter le module</Button>
                        </Form>
                    </CardBody>
                </Card>
                <Link to="/module-list">
              <Button color="secondary" >
                 Annuler
              </Button>
              </Link>
            </Col>
        </Row>
    );
};

export default AddModule;
