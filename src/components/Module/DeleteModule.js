import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

const DeleteModule = () => {
  const { id_module } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/module/deleteModule/${id_module}/`);
      alert('Module supprimé avec succès!');
      navigate('/module-list');  // Redirige vers la liste des utilisateurs ou une autre page
    } catch (error) {
      console.error('Erreur lors de la suppression du module:', error);
      alert('Échec de la suppression du module.');
    }
  };

  return (
    <div>
      <h2>Êtes-vous sûr de vouloir supprimer ce module ?</h2>
      <Button color="danger" onClick={handleDelete}>
        Supprimer
      </Button>
    </div>
  );
};

export default DeleteModule;
