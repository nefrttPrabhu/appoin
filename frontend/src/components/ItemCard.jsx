export default function ItemCard({ item }){
  return (
    <div style={{border:'1px solid #e5e7eb', padding:12, borderRadius:8}}>
      <h3 style={{fontSize:16, margin:0}}>{item.title}</h3>
      <small style={{color:'#6b7280'}}>{item.type} • {new Date(item.createdAt).toLocaleString()}</small>
      <p style={{marginTop:8}}>{item.content?.text?.slice(0,200)}</p>
      <a href={`/item/${item._id}`}>Open</a>
    </div>
  );
}
