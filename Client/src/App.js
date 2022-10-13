import './App.css';
import Images from './component/Images';
import Pagination from './component/Pagination';
import Searchbar from './component/Searchbar';
import { createContext,useState } from 'react';

export const ImageContext = createContext();

function App() {

  const [search, setSearch] = useState("");
  const[setpage,setSetpage] = useState(1);
  const value = {
    setSearch,setSetpage,search,setpage
  }

  return (
    <>
    <ImageContext.Provider value ={value}>
    <Searchbar/>
    <Images/>
    <Pagination/>
    </ImageContext.Provider>
    </>
  );
}

export default App;
