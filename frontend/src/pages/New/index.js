import React, {useState, useMemo} from 'react';
import api from '../../services/api';
import camera from '../../assets/camera.svg';
import './styles.css';

export default function New({ history }) {

  const [studio, setStudio] = useState('');
  const [arts, setArts] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState(null);

  const preview = useMemo(
    () => {
      return thumbnail ? URL.createObjectURL(thumbnail) : null
    },
    [thumbnail]
  );

  async function handleSubmit(event){
    event.preventDefault();
    const data = new FormData();
    const user_id = localStorage.getItem('user');
    data.append('thumbnail', thumbnail);
    data.append('studio', studio);
    data.append('arts', arts);
    data.append('price', price);
    
    await api.post('/studios', data, {
      headers: {user_id}
    });

    history.push('/dashboard');

  }

  
  return (
    <form onSubmit={handleSubmit}>
      <label 
      id="thumbnail" 
      style={{backgroundImage: `url(${preview})`}}
      className={thumbnail ? 'has-thumbnail' : ''}
      >
        <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
        <img src={camera} alt="Select IMG uploads" />
      </label>

      <label htmlFor="studio">Estudio*</label>
      <input type="text" id="studio" placeholder="Seu estudio" value={studio} onChange={event => setStudio(event.target.value)}/>
      
      <label htmlFor="arts">Estilos*</label>
      <input type="text" id="arts" placeholder="Quais estilos trabalham?" value={arts} onChange={event => setArts(event.target.value)}/>

      <label htmlFor="price">Valor da diária*</label>
      <input type="text" id="price" placeholder="Valor cobrado por dia?" value={price} onChange={event => setPrice(event.target.value)}/>

      <button type="submit" className="btn">Cadastrar</button>
    </form>
  );
}
