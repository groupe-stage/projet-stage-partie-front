import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
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
const DeleteClass = () => {
  const { id_classe } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const csrftoken = getCookie('csrftoken');

      await axios.delete(`http://127.0.0.1:8000/Classe/deleteClasse/${id_classe}/`, {
        headers: {
          'X-CSRFToken': csrftoken  // Include CSRF token in the headers
        }
      });
      alert('Classe supprimée avec succès!');
      navigate('/ClasseList');  // Redirect to the class list or another page
    } catch (error) {
      console.error('Erreur lors de la suppression de la classe:', error);
      alert('Échec de la suppression de la classe.');
    }
  };

  return (
    <div>
      <h2>Êtes-vous sûr de vouloir supprimer cette classe ?</h2>
      <Button color="danger" onClick={handleDelete}>
        Supprimer
      </Button>
    </div>
  );
};

export default DeleteClass;