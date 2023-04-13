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
      <h1>
        iniciando
      </h1>
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
      }}>
        {data.length > 0 && (data.map((e) => {
          return (
          <div key={e.id} style={{
              width:"300px",
              height:"400px",
              margin:"auto",
              display:"flex",
              flexDirection:"column",
              alignItems:"center",
            }}>
            <h2 style={{fontSize:"20px", textAlign:"center"}}>{e.description}</h2>
            <p>{e.price}</p>
            <img style={{
              width:"150px",
              height:"250px"
            }}
            src={e.image_link}
            alt={e.title}/>
            <a 
              rel="noreferrer" 
              target='_blank' 
              href={e.external_link} 
              style={{textDecoration:"none", color: "black"}}
            >Ir na web</a>
          </div>
          )
        }))}
      </div>
    </div>
  )
}