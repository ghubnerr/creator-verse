import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddCreator from './pages/add-creator/AddCreator.jsx';
import EditCreator from './pages/edit-creator/EditCreator.jsx';
import ShowCreators from './pages/show-creators/ShowCreators.jsx';
import ViewCreator from './pages/view-creator/ViewCreator.jsx';
import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx';
import { useState, useEffect } from 'react';
import { supabase } from './client.js'

export default function App() {
  
  
  const [creators, setCreators] = useState(null);
  const [fetchError, setFetchError] = useState(null); 

  useEffect(()=>{
    const fetchData = async() => {

      let { data , error } = await supabase
      .from('creators')
      .select('*')

      if (error) {
        setFetchError('Could not fetch the creators')
        setCreators(null)
        console.log(error)
      };

      if (data) {
        setCreators(data);
        setFetchError(null)
      }
    }

    fetchData();

  }, []);

  return (
    <div>
      <Router>
        <Header/>
        <Routes>
          <Route exact path='/'/>
          {creators && <Route path='/show-creators' element={<ShowCreators creators={creators} setCreators={setCreators}/>} />}
          <Route path='/add-creator' element={<AddCreator setCreators={setCreators} />} />
          {creators && <Route path='/edit-creator/:id' element={<EditCreator creators={creators} setCreators={setCreators}/>} />}
          {creators && <Route path='/view-creator/:id' element={<ViewCreator creators={creators} />} />}
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}