import { useEffect, useState } from 'react';
import axios from 'axios';
import ItemCard from '../components/ItemCard';

export default function Library(){
  const [items, setItems] = useState([]);
  useEffect(()=>{
    axios.get('http://localhost:5000/api/v1/items').then(r=>setItems(r.data)).catch(()=>{});
  }, []);
  return (
    <div style={{padding:20}}>
      <h2>Your Synapse Library</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:16, marginTop:16}}>
        {items.map(it=> <ItemCard key={it._id} item={it} />)}
      </div>
    </div>
  );
}
