import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
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
function getCookie(name) {
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
  }
  
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  axios.defaults.withCredentials = true;
const EditNiveau = () => {
    const [formData, setFormData] = useState({
        libelleNiv: '',
        nbclasseNiv: '',
        specialite: '',
    });
    const { id_niveau } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/Niveau/Niveau/${id_niveau}/`)
            .then(response => {
                setFormData(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the niveau!', error);
            });
    }, [id_niveau]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Ensure specialite is either a valid option or empty
        const validSpecialites = ["Data Science", "GAMIX", "BI", "TWIN"];
        const dataToSend = {
            ...formData,
            specialite: validSpecialites.includes(formData.specialite) ? formData.specialite : ''
        };
        const csrftoken = getCookie('csrftoken');

        axios.put(`http://127.0.0.1:8000/Niveau/updateNiveau/${id_niveau}/`, dataToSend, {
            headers: {
              'X-CSRFToken': csrftoken  // Include CSRF token in the headers
            }
          })
            .then(response => {
                alert('Niveau updated successfully!');
                navigate('/NiveauList');
            })
            .catch(error => {
                console.error('There was an error updating the niveau!', error);
                alert('Error updating niveau.');
            });
    };

    return (
        <Row>
            <Col>
                <Card>
                    <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                        <i className="bi bi-bell me-2"> </i>
                        Modifier le Niveau
                    </CardTitle>
                    <CardBody>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="libelleNiv">Libellé du Niveau</Label>
                                <Input
                                    id="libelleNiv"
                                    name="libelleNiv"
                                    type="select"
                                    value={formData.libelleNiv}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Class</option>
                                    <option value="1A">1A</option>
                                    <option value="2A">2A</option>
                                    <option value="3A">3A</option>
                                    <option value="3B">3B</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="nbclasseNiv">Nombre de Classes</Label>
                                <Input
                                    id="nbclasseNiv"
                                    name="nbclasseNiv"
                                    type="number"
                                    value={formData.nbclasseNiv}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                            {(formData.libelleNiv === '4' || formData.libelleNiv === '5') && (
                                <FormGroup>
                                    <Label for="specialite">Spécialité</Label>
                                    <Input
                                        id="specialite"
                                        name="specialite"
                                        type="select"
                                        value={formData.specialite}
                                        onChange={handleChange}
                                    >
                                        <option value="">Sélectionnez une spécialité</option>
                                        <option value="Data Science">Data Science</option>
                                        <option value="GAMIX">GAMIX</option>
                                        <option value="BI">BI</option>
                                        <option value="TWIN">TWIN</option>
                                    </Input>
                                </FormGroup>
                            )}
                            <Button type="submit">Modifier le Niveau</Button>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default EditNiveau;
