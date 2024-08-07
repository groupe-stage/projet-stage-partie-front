import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

const DeleteBloc = () => {
  const { id_bloc } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/bloc/deleteBloc/${id_bloc}/`);
      alert('Bloc supprimé avec succès!');
      navigate('/bloc-list');  // Redirect to the list of blocs or another page
    } catch (error) {
      console.error('Erreur lors de la suppression du bloc:', error);
      alert('Échec de la suppression du bloc.');
    }
  };

  return (
    <div>
      <h2>Êtes-vous sûr de vouloir supprimer ce bloc ?</h2>
      <Button color="danger" onClick={handleDelete}>
        Supprimer
      </Button>
    </div>
  );
};

export default DeleteBloc;
