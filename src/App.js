import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css';
import Home from './home';
import Header from './header';
import Projects from './projects';
import Projectsview from './projectsview';
import Internships from './internships';
import Contact from './contact';
import Skills from './skills';
import Experience from './experience';

import { motion } from 'framer-motion';
import WhatsAppChat from './whatsaap';
import Viewresume from './viewresume';
import About from './about';
function App() {
  return (
  <>
  <section>
    <div>
      <Header/>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/projects' element={<Projects/>}/>
        <Route path='/projectsview/:id' element={<Projectsview/>}/>  
        <Route path='/internships' element={<Internships/>}/>  
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/skills' element={<Skills/>}/>
        <Route path='/experience' element={<Experience/>}/>
      </Routes>
      </BrowserRouter>
   </div>
   <motion.div 
        initial={{ opacity: 0, x:0,y:0 }}
        animate={{ opacity: 1, x:0,y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}

      >
        <WhatsAppChat />
      </motion.div>
  </section>
  <div id='resume'>
      <Viewresume/></div>
    
  </>
  );
}

export default App;
