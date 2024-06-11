import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const[title,setTitle]=useState();
  const[bookdata,setData]=useState([]);

  const handleSearch=(e)=>{
      const value=e.target.value;
      setTitle(value);
  }
  const handleSearchSubmit =()=>{
         const params=new URLSearchParams(
          {
            'q':title,
            'limit':10,
            'page':1
          }
         )
        
        axios.get('https://openlibrary.org/search.json',{params:{
          q:title,
          limit:10,
          page:1
        }})
        .then(function(response){
          console.log(response.data.docs);
  
          setData(response.data.docs);
          // findDetail(response);
        })
        .catch(function(error){ 
          console.log(error);
        });
  }
 
  return (
    <div className="App">
      
      <div className='input-search'>
      <h1 style={{color:"black"}}>Search Books</h1>
        <input type="text" placeholder="Seach Book Name" onChange={handleSearch}></input>
        <button onClick={handleSearchSubmit}><span>Search</span></button>
        
      </div>
     <div className='card-main'>
      
     {
     
      bookdata.length>1?
      
      
      bookdata.map((item)=>{
       
        return(
          <div className='card'>
          <table>
          <tr>
            <th>Auhor Name</th>
            <th>Title</th>
          </tr>
          <tr>
          
            {/* <ul type="disc" key={item.key}>
            <h3>Title:</h3><p>{item.title}</p>
            <h4>Author:</h4><p>{item.author_name}</p> */}
             <td>{item.author_name}</td>
             <td>{item.title}</td>
             
              {/* <li><h3>Publisher:</h3>{item.publisher}</li> */}
              {/* </ul> */}
           
            </tr>
        </table>
         </div>
        )
        
      })

       
      
          
      
       :
       <div style={{textAlign:"center"}}>Wait For Result</div>
      }
      </div>
      
    </div>
  );
}

export default App;
