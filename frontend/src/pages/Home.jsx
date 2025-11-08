import { Link } from 'react-router-dom';

export default function Home(){
  return (
    <div style={{padding:20}}>
      <h1>Welcome to Synapse (Prototype)</h1>
      <p><Link to='/library'>Go to Library</Link></p>
      <p>Use the extension to capture pages into the backend.</p>
    </div>
  );
}
