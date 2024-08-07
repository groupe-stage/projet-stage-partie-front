import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

const DeleteClass = () => {
  const { id_classe } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/Classe/deleteClasse/${id_classe}/`);
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
