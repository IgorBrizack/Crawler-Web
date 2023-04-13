import { useState, useEffect } from 'react'
import { postData } from '../services/request'

export default function HomePage (){
  const [data, setData] = useState([])
  const [website, setWebSite] = useState("todas")
  const [category, setCategory] = useState("televisão")
  const [inputSearch, setInputSearch] = useState()
  

  const fetchAPI = async() => {
    if(inputSearch && website !== 'todas') {
      const result = await postData('/product/get_products', {
        "website": website,
        "product_type": inputSearch
      })
      Array.from(document.querySelectorAll("input")).forEach(
        input => (input.value = "")
      );
      setInputSearch("")
      return setData(result.data[0])
    }

    if(inputSearch && website === 'todas') {
  
      const resultMeli = await postData('/product/get_products', {
        "website": 'mercadolivre',
        "product_type": inputSearch
      })
      console.log(resultMeli)

      const resultBuscape = await postData('/product/get_products', {
        "website": 'buscape',
        "product_type": inputSearch
      })
      Array.from(document.querySelectorAll("input")).forEach(
        input => (input.value = "")
      );
      setInputSearch("")
      return setData([...resultMeli.data[0], ...resultBuscape.data[0]])
    } else if (!inputSearch && website !== 'todas') {
      const result = await postData('/product/get_products', {
        "website": website,
        "product_type": category
      })
      return setData(result.data[0])
    } else if (!inputSearch && website === 'todas') {
      const resultMeli = await postData('/product/get_products', {
        "website": 'mercadolivre',
        "product_type": category
      })
      
      const resultBuscape = await postData('/product/get_products', {
        "website": 'buscape',
        "product_type": category
      })
      setInputSearch("")
      return setData([...resultMeli.data[0], ...resultBuscape.data[0]])
    }
  }

  useEffect(() =>{
  
  }, [data]) 

  return (
    <div>
      <label htmlFor="website">
            Website:
            <select  onClick={(e) => setWebSite(e.target.value)} name="website">
              <option value="todas">Todas</option>
              <option value="mercadolivre">Mercado Livre</option>
              <option value="buscape">Busca Pé</option>
            </select>
      </label>

      <label htmlFor="category">
            Categorias:
            <select  onClick={(e) => setCategory(e.target.value)} name="category">
              <option value="televisao">Televisão</option>
              <option value="geladeira">Geladeira</option>
              <option value="celular">Celular</option>
            </select>
      </label>

      <input placeholder='Pesquisar por ...' onChange={(e) => setInputSearch(e.target.value)}></input>
      <button type='button' onClick={() => fetchAPI()}>Buscar</button>
      <div style={{
        display:"flex",
        flexWrap:"wrap",
        alignContent:"space-evenly",
        justifyContent: "center",
        backgroundColor: "gray"
      }}>
        {data.length > 0 && (data.map((e) => {
          return (
            <div key={e.id} style={{
              padding: "5px",
              width:"300px",
              borderRadius: '5px',
              height:"450px",
              margin:"5px",
              display:"flex",
              flexDirection:"column",
              alignContent:"space-evenly",
              alignItems:"center",
              justifyContent: "center",
              backgroundColor: "white"
            }}>
            <h2 style={{fontSize:"20px", textAlign:"center"}}>{e.description}</h2>
            <p>{e.price}</p>
            <img style={{
              width:"120px",
              height:"180px",              
            }}
            src={e.image_link}
            alt={e.title}/>
            <button type='button'>
              <a 
                rel="noreferrer" 
                target='_blank' 
                href={e.external_link} 
                style={{textDecoration:"none", color: "black", fontSize: "15px"}}
              >Ir na web</a>
            </button>            
          </div>
          )
        }))}
      </div>
    </div>
  )
}