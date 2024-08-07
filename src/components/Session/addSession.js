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

const AddSession = () => {
    const [formData, setFormData] = useState({
        nom_session: '',
        type_session: '',
       
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

       
        axios.post('http://127.0.0.1:8000/session/addSession/', dataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            alert('Session added successfully!');
            navigate('/session-list'); 
            setFormData({
                nom_session: '',
                type_session: '',
               
            });
        })
        .catch(error => {
            console.error('There was an error adding the session!', error);
            alert('Error adding session.');
        });
    };

    return (
        <Row>
            <Col>
                <Card>
                    <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                        <i className="bi bi-bell me-2"> </i>
                        Ajouter une session
                    </CardTitle>
                    <CardBody>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="nom_session">Nom de la session</Label>
                                <Input
                                    id="nom_session"
                                    name="nom_session"
                                    value={formData.nom_session}
                                    onChange={handleChange}
                                    required
                                />
                            
                            </FormGroup>
                            <FormGroup>
                                <Label for="type_session">Type d'une session</Label>
                                <Input
                                    id="type_session"
                                    name="type_session"
                                    value={formData.type_session}
                                    onChange={handleChange}
                                    type="select"
                                    required
                                >
                                    <option value="">Sélectionnez type de session</option>
                                    <option value="principale">Principale</option>
                                    <option value="ratrapage">Rattrapage</option>
                                    <option value="decembre">Décembre</option>
                                    <option value="septembre">Septembre</option>


                                </Input>
                            </FormGroup>
                           
                           
                            
                            <Button type="submit">Ajouter la session</Button>
                        </Form>
                    </CardBody>
                </Card>
                <Link to="/session-list">
              <Button color="secondary" >
                 Annuler
              </Button>
              </Link>
            </Col>
        </Row>
    );
};

export default AddSession;
