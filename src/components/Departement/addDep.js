import React, { useState } from 'react';
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

const AddDepartement = () => {
    const [formData, setFormData] = useState({
        nom_departement: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://127.0.0.1:8000/departement/addDep/', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            alert('Department added successfully!');
            navigate('/DepartementList');
            setFormData({
                nom_departement: ''
            });
        })
        .catch(error => {
            console.error('There was an error adding the department!', error);
            alert('Error adding department.');
        });
    };

    return (
        <Row>
            <Col>
                <Card>
                    <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                        <i className="bi bi-bell me-2"> </i>
                        Ajouter un Département
                    </CardTitle>
                    <CardBody>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="nom_departement">Nom du Département</Label>
                                <Input
                                    id="nom_departement"
                                    name="nom_departement"
                                    value={formData.nom_departement}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                            <Button type="submit">Ajouter le département</Button>
                        </Form>
                    </CardBody>
                </Card>
                <Link to="/DepartementList">
                  <Button color="secondary">
                     Annuler
                  </Button>
                </Link>
            </Col>
        </Row>
    );
};

export default AddDepartement;