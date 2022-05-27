import './App.css';
import MultipleComments from './components/MultipleComments';

function App() {
  return (
    <div className="App">
      <h1>Hello Users</h1>
      <MultipleComments currentUserId="1" />
    </div>
  );
}

export default App;
