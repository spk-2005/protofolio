import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css';
import Home from './home';
import Header from './header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Aboutme from './aboutme';
import Projects from './projects';
import Projectsview from './projectsview';
import Internships from './internships';
import Contact from './contact';

function App() {
  return (
  <>
  <section>
    <div>
      <Header/>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/aboutme' element={<Aboutme/>}/>
        <Route path='/projects' element={<Projects/>}/>
        <Route path='/projectsview/:id' element={<Projectsview/>}/>  
        <Route path='/internships' element={<Internships/>}/>  
        <Route path='/contact' element={<Contact/>}/>
      
      </Routes>
      </BrowserRouter>
   </div>
  </section>
  </>
  );
}

export default App;
