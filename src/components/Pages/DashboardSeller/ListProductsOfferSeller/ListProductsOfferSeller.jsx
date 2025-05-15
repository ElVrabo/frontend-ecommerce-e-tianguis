import React, { useContext, useEffect, useState } from 'react'
import { productContext } from '../../../../context/productsContext/productContext'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DeleteIcon, UpdateIcon } from '../../../Common/Icons/Icons';
import { useNavigate } from 'react-router-dom';
import Aside from '../../../Aside/Aside';
import { Box, TextField } from '@mui/material';
import { ErrorAlert } from '../../../Common/Alerts/Alerts';

export default function ListProductsOfferSeller() {
    // const [listProductsOffer,setListProductsOffer] = useState([])
    const [category,setcategory] = useState('')
     const {getProductsOffer,listProductsOffer,getProductsOfferCategory,deleteProductOffer,isLoading,alerts,setAlerts} = useContext(productContext)
     const navigate = useNavigate()
     useEffect(()=>{
        async function loadProductsOffer(){
            await getProductsOffer()
        
        }
        loadProductsOffer()
     },[])
     useEffect(()=>{
      async function loadProductOfferByCategory(){
        if(!category){
          return
        }
         await getProductsOfferCategory(category)
      }
      loadProductOfferByCategory()
     },[category])

     function handleOnChangeCategory(e){
      const {value} = e.target
      setcategory(value)
     }
if(listProductsOffer.length === 0 && !isLoading){
  return (
    <section className='listProducts-seller-container' >
      <Aside/>
      <Box sx={{ width: '100%', padding: 2 }} >
        <h1>¡No tienes productos en oferta!</h1>
      </Box>
    </section>
  )
}
   
  return (
   
     <section className="listProducts-seller-container" >
               <Aside/>
             <Box sx={{ width: '100%', padding: 2 }} >
               <div className="alertError-category-dashboard">
                            {alerts.error && (
                              <ErrorAlert
                                type="error"
                                text={alerts.error}
                                onClose={() => setAlerts({ ...alerts, error: "" })}
                              />
                            )}
                          </div>
              <div className='filter-by-category-container' >
       <select 
            className="select-category" 
            onChange={handleOnChangeCategory} 
            // required 
            name="category" 
            value={category}
          >
            <option value='' disabled>Categorías</option>
            <option value='artesanias'>Artesanías</option>
            <option value='pinturas'>Pinturas</option>
            <option value='cocina'>Cocina</option>
            <option value='accesorios'>Accesorios</option>
          </select>
        <h3 onClick={()=>{
          setListProductsOffer([...listProductsOffer].sort((a,b)=>a.name.localeCompare(b.name,'es',{sensitivity:'base'})))
        }} >Ordenar alfabeticamente (A-Z)</h3>
        <h3 onClick={()=>{
          setListProductsOffer([...listProductsOffer].sort((a,b)=>parseFloat(a.price.split(" ")[1]) - parseFloat(b.price.split(" ")[1])))
        }} >Ordenar por precio (menor-mayor)</h3>
        <h3 onClick={()=>{
          setListProductsOffer([...listProductsOffer].sort((a,b)=>a.stock - b.stock))
        }}  >Ordenar por dispónibilidad (menor-mayor)</h3>
      </div>
              <TableContainer component={Paper}>
        <Table sx={{ height: 'auto', width: '100%' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Imagen</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell align="center">Precio</TableCell>
              <TableCell align="center">Stock</TableCell>
              <TableCell align="center">Eliminar</TableCell>
              <TableCell align="center">Editar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading &&
              listProductsOffer.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>
                    <img
                      src={product.file}
                      alt="imagen del producto"
                      style={{ height: '50px', width: '100px' }}
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell align="center">{product.price}</TableCell>
                  <TableCell align="center">{product.stock}</TableCell>
                  <TableCell align="center">
                    <div
                      style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}
                    >
                      <DeleteIcon
                        color="grey"
                        height="20px"
                        width="100px"
                        onClick={async () => {
                          await deleteProductOffer(product._id);
                          getProductsOffer()
                        
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <div
                      style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}
                    >
                      <UpdateIcon
                        color="grey"
                        height="20px"
                        width="100px"
                        onClick={() => {
                          navigate(`/addProducts/${product._id}`);
                        }}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
             </Box>
             {/* </div> */}
               </section>
  
          
  )
}
