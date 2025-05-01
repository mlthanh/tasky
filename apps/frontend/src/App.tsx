import './App.css';
import Layout from './pages/Layout';
import Providers from './contexts/index';

function App() {
  return (
    <Providers>
      <Layout />
    </Providers>
  );
}

export default App;
