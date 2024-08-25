import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, CardTitle, CardBody, Button, Form, FormGroup, Label, Input } from 'reactstrap';
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
    nbclasseNiv: '',
    specialite: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const generateClasses = () => {
    const classes = [];
    for (let i = 1; i <= formData.nbclasseNiv; i++) {
      const classData = {
        libelleClasse: `${i}`,
        NbEtudiantClasse: 31,  // default number of students
        id_niveau: formData.id_niveau // assuming you have this id in formData
      };
      classes.push(classData);
    }
    return classes;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const csrftoken = getCookie('csrftoken');  // Dynamically extract CSRF token

    const dataToSend = {
      ...formData,
      specialite: ["Data Science", "GAMIX", "BI", "TWIN"].includes(formData.specialite) ? formData.specialite : ''
    };

    axios.post('http://127.0.0.1:8000/Niveau/addNiveau/', dataToSend,{
      headers: {
          'X-CSRFToken': csrftoken  // Include CSRF token in the headers
      }
  })
      .then(response => {
        alert('Niveau added successfully!');
        const classes = generateClasses();
        classes.forEach(cls => {
          axios.post('http://127.0.0.1:8000/Classe/addClasse/', cls)
            .then(() => {
              console.log('Class added successfully');
            })
            .catch(error => {
              console.error('There was an error adding the class!', error);
            });
        });
        navigate('/NiveauList');
      })
      .catch(error => {
        console.error('There was an error adding the niveau!', error);
        alert('Error adding niveau.');
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
                <Label for="libelleNiv">Libellé Niveau (Classe)</Label>
                <Input
                  id="libelleNiv"
                  name="libelleNiv"
                  type="select"
                  value={formData.libelleNiv}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Class</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
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
                    <option value="">Selectionnez une specialité</option>
                    <option value="Data Science">Data Science</option>
                    <option value="GAMIX">GAMIX</option>
                    <option value="BI">BI</option>
                    <option value="TWIN">TWIN</option>
                  </Input>
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
