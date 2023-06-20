import './App.css';
import './styles/css/bootstrap/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/css/my-styles/style-card.css';
import { Menu } from './component/Menu';
import { Home } from './component/Home';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getImagenesMascotas } from './services/imagenesServices';
import { PropietarioVista } from './views/PropietarioVista';
import { VisitData } from '././views/visitas/statefull/VisitaDataComponent';
import { VeterinarioVista } from './views/VeterinarioVista';
import { MascotaVista } from './views/MascotaVista';
import { imagenesMascotasEstructura } from './data/imagenes-mascotas';
import { useEffect, useState } from 'react';


function App() {

  //console.log(getDataPropietarioService());
    
  const [dataImagenes, setDataImagenes] = useState(imagenesMascotasEstructura);

  useEffect(()=>{
    const getdataImagenes = getImagenesMascotas();
    setDataImagenes(getdataImagenes);    
  },[]);

  return (
    <>
    <div className='container my-4'>
    <Menu />
    
    <Routes>
      <Route exact path='/' element={<Home dataImagenes={ dataImagenes }/>}/>
      <Route exact path='/propietario' element={<PropietarioVista/>}/>
      <Route exact path='/visita' element={<VisitData/>}/>
      <Route exact path='/veterinario' element={<VeterinarioVista/>}/>
      <Route exact path='/mascota' element={<MascotaVista/>}/>
      <Route exact path='/' element={<Navigate to={'/'}/>}/>
    </Routes>
    </div>
    </>    
  );
}

export default App;
