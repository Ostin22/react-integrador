import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './VerPoema.css';

const VerPoema = () => {
    const [poema, setPoema] = useState(null);
    const [error, setError] = useState('');
    const { poemaId } = useParams();

    useEffect(() => {
        const fetchPoema = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/poemas/${poemaId}`);
                console.log('Response:', response.data);
                setPoema(response.data);
            } catch (err) {
                console.error('Error fetching poema:', err);
                setError('Error al obtener el poema');
            }
        };

        fetchPoema();
    }, [poemaId]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="poema-container">
            {poema ? (
                <div className="poema-content">
                    <h1>{poema.titulo_poema}</h1>
                    <p>{poema.rima}</p>
                    <p>Autor: {poema.Usuario?.nombre} {poema.Usuario?.apellido}</p>
                </div>
            ) : (
                <p className="cargando">Cargando poema...</p>
            )}
        </div>
    );
}    

export default VerPoema;
