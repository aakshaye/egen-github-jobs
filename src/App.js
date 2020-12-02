import './App.css';
import Header from './components/Header';
import JobListing from './components/JobListing';
import SearchForm from './components/SearchForm';

function App() {
  return (
    <div className="App">
      <header className="App-header purple">
        <Header/>
      </header>
      <SearchForm/>
      <JobListing/>
    </div>
  );
}

export default App;
