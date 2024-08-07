import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

const DeleteExamen = () => {
  const { id_examen } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/examen/deleteExamen/${id_examen}/`);
      alert('Examen supprimé avec succès!');
      navigate('/examen-list');  // Redirige vers la liste des utilisateurs ou une autre page
    } catch (error) {
      console.error('Erreur lors de la suppression du examen:', error);
      alert('Échec de la suppression du examen.');
    }
  };

  return (
    <div>
      <h2>Êtes-vous sûr de vouloir supprimer ce examen ?</h2>
      <Button color="danger" onClick={handleDelete}>
        Supprimer
      </Button>
    </div>
  );
};

export default DeleteExamen;
