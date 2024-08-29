import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  Card,
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

const AddNiveau = () => {
  const [formData, setFormData] = useState({
    libelleNiv: '',
    specialite: '',
    nbclasseNiv: 0 // Default to 0
  });
  const [requiresSpecialite, setRequiresSpecialite] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSpecialiteToggle = (e) => {
    setRequiresSpecialite(e.target.checked);
    if (!e.target.checked) {
      setFormData({ ...formData, specialite: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const csrftoken = getCookie('csrftoken'); // Extract CSRF token

    const dataToSend = {
      ...formData,
      specialite: requiresSpecialite ? formData.specialite : ''
    };

    axios.post('http://127.0.0.1:8000/Niveau/addNiveau/', dataToSend, {
      headers: {
        'X-CSRFToken': csrftoken
      }
    })
      .then(response => {
        if (response.status === 201) {
          alert('Niveau added successfully!');
          setFormData({ libelleNiv: '', specialite: '', nbclasseNiv: 0 }); // Reset form
          navigate('/NiveauList');
        } else {
          alert('Unexpected response status');
        }
      })
      .catch(error => {
        console.error('There was an error adding the niveau!', error);
        if (error.response) {
          alert(`Error adding niveau. Status: ${error.response.status}, Data: ${JSON.stringify(error.response.data)}`);
        } else if (error.request) {
          alert('Error adding niveau. No response received.');
        } else {
          alert(`Error adding niveau. Message: ${error.message}`);
        }
      });
  };

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Ajouter un Niveau
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="libelleNiv">Libellé du Niveau</Label>
                <Input
                  id="libelleNiv"
                  name="libelleNiv"
                  type="text"
                  value={formData.libelleNiv}
                  onChange={handleChange}
                  required
                />
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
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    checked={requiresSpecialite}
                    onChange={handleSpecialiteToggle}
                  />
                  Ce niveau nécessite une spécialité
                </Label>
              </FormGroup>
              {requiresSpecialite && (
                <FormGroup>
                  <Label for="specialite">Spécialité</Label>
                  <Input
                    id="specialite"
                    name="specialite"
                    type="text"
                    value={formData.specialite}
                    onChange={handleChange}
                  />
                </FormGroup>
              )}
              <Button type="submit">Ajouter le Niveau</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default AddNiveau;
