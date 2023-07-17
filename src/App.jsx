import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddCreator from './pages/add-creator/AddCreator.jsx';
import EditCreator from './pages/edit-creator/EditCreator.jsx';
import ShowCreators from './pages/show-creators/ShowCreators.jsx';
import ViewCreator from './pages/view-creator/ViewCreator.jsx';
import Header from './components/header/Header.jsx';
import Home from './pages/home/Home.jsx';
import Footer from './components/footer/Footer.jsx';
import { useState, useEffect } from 'react';
import { supabase } from './client.js'

const products = [
  {
    id: 1,
    name: 'Earthen Bottle',
    href: '#',
    price: '$48',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 2,
    name: 'Nomad Tumbler',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
  {
    id: 3,
    name: 'Focus Paper Refill',
    href: '#',
    price: '$89',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 4,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  // More products...
]

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
          <Route exact path='/' element={<Home />} />
          {creators && <Route path='/show-creators' element={<ShowCreators creators={creators}/>} />}
          <Route path='/add-creator' element={<AddCreator />} />
          <Route path='/edit-creator' element={<EditCreator />} />
          <Route path='/view-creator' element={<ViewCreator />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}