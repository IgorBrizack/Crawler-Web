import { useState, useEffect } from 'react'
import { fetchProducts } from '../helpers/fetchProducts'

export default function HomePage (){
  const [data, setData] = useState([])
  const [website, setWebSite] = useState()
  const [category, setCategory] = useState()
  const [inputSearch, setInputSearch] = useState()


  const fetchAPI = async() => {
    if(inputSearch) {
      const result = await fetchProducts(inputSearch)
      if (result !== 'You must provide an url') {
        console.log(website)
        setInputSearch("")
        return setData(result.results)
      }
    }
    const result = await fetchProducts(category)
      if (result !== 'You must provide an url') {
        console.log(website)
        return setData(result.results)
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
        alignContent:"space-evenly"
      }}>
        {data.length > 0 && (data.map((e) => {
          return (
          <div key={e.id} style={{
              width:"300px",
              height:"400px",
              margin:"auto",
              display:"flex",
              flexDirection:"column",
              alignItems:"center"
            }}>
            <h2 style={{fontSize:"20px", textAlign:"center"}}>{e.title}</h2>
            <p>{`R$ ${e.price.toFixed(2)}`}</p>
            <img style={{
              width:"150px",
              height:"250px"
            }}
            src={e.thumbnail}
            alt={e.title}/>
            <a 
              rel="noreferrer" 
              target='_blank' 
              href={e.permalink} 
              style={{textDecoration:"none", color: "black"}}
            >Ir na web</a>
          </div>
          )
        }))}
      </div>
    </div>
  )
}