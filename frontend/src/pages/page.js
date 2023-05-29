import { useState, useEffect } from 'react'
import { getData } from '../services/request'
import '../bootstrap.min.css'

export default function HomePage (){
  const [data, setData] = useState([])
  const [website, setWebSite] = useState("todas")
  const [category, setCategory] = useState("televisao")
  const [inputSearch, setInputSearch] = useState()

  const fetchAPI = async() => {
    let product_type = inputSearch

    if(inputSearch && website !== 'todas') {
      const result = await getData(`/product/get_products/${website}/${product_type}`, )
      Array.from(document.querySelectorAll("input")).forEach(
        input => (input.value = "")
      );
      setInputSearch("")
      return setData(result.data[0])
    }

    if(inputSearch && website === 'todas') {
  
      const resultMeli = await getData(`/product/get_products/mercadolivre/${inputSearch}`)

      const resultBuscape = await getData(`/product/get_products/buscape/${inputSearch}`)

      Array.from(document.querySelectorAll("input")).forEach(
        input => (input.value = "")
      );

      setInputSearch("")

      return setData([...resultMeli.data[0], ...resultBuscape.data[0]])

    } else if (!inputSearch && website !== 'todas') {

      const result = await getData(`/product/get_products/${website}/${category}`)
      return setData(result.data[0])

    } else if (!inputSearch && website === 'todas') {
      const resultMeli = await getData(`/product/get_products/mercadolivre/${category}`)
      
      const resultBuscape = await getData(`/product/get_products/buscape/${category}`)
      setInputSearch("")
      return setData([...resultMeli.data[0], ...resultBuscape.data[0]])
    }
  }

  useEffect(() =>{
  
  }, [data]) 

  return (
    <>
      <div style={{
        width:"700px",
        display: 'flex',
        height: "50px",
        marginTop: "5px",
        marginBottom: "5px",
        justifyContent: 'space-around',
        alignItems: 'center'
      }}>
        <select 
          style={{width: "160px"}}
          className='form-select'
          onClick={(e) => setWebSite(e.target.value)}
          name="website">
          <option value="todas">Todas</option>
          <option value="mercadolivre">Mercado Livre</option>
          <option value="buscape">Busca Pé</option>
        </select>
        <select 
          style={{width: "120px"}}
          className='form-select'
          onClick={(e) => setCategory(e.target.value)} 
          name="category">
          <option value="televisao">Televisão</option>
          <option value="geladeira">Geladeira</option>
          <option value="celular">Celular</option>
        </select>
        
        <div 
          className="input-group mb-3" 
          style={{width: "320px", marginTop: "15px"}}>
          <span className="input-group-text" id="basic-addon1">Pesquisar por:</span>
          <input 
          className="form-control" 
          placeholder='Produto' 
          onChange={(e) => setInputSearch(e.target.value)}></input>
        </div>
        
        <button className="btn btn-primary" type='button' onClick={() => fetchAPI()}>Buscar</button>
      </div>

      <div style={{
        display:"flex",
        flexWrap:"wrap",
        alignContent:"space-evenly",
        justifyContent: "center",
        backgroundColor: "gray"
      }}>
        {data.length > 0 && (data.map((e) => {
          return (
          <div
            key={e.id} style={{
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
            <button style={{
                marginTop: '5px',
                borderRadius: '5px',
                fontWeight: 'bold'
            }} type='button'>
              <a 
                rel="noreferrer" 
                target='_blank' 
                href={e.external_link} 
                style={{textDecoration:"none", color: "black", fontSize: "15px"}}
              >Comprar</a>
            </button>            
          </div>
          )
        }))}
      </div>
    </>
  )
}