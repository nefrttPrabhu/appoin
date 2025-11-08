import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ItemView(){
  const { id } = useParams();
  const [item, setItem] = useState(null);
  useEffect(()=>{
    axios.get(`http://localhost:5000/api/v1/items/${id}`).then(r=>setItem(r.data)).catch(()=>{});
  },[id]);
  if(!item) return <div style={{padding:20}}>Loading...</div>;
  return (
    <div style={{padding:20}}>
      <h2>{item.title}</h2>
      <p>Type: {item.type}</p>
      <pre style={{whiteSpace:'pre-wrap'}}>{item.content?.text}</pre>
      <p><a href={item.url} target="_blank" rel="noreferrer">Open source</a></p>
    </div>
  );
}
