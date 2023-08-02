import './App.css';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import Main from './components/Main'
import Main2 from './components/Main2'
import Main3 from './components/Main3'
import Footer from './components/Footer'

function App() {
  return (
    <main>
    <Navbar />
    <Carousel />
    <Main />
    <Main2 />
    <Main3 />
    <Footer className="mainfooter"/>
    </main>
  );
}

export default App;
