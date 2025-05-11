import { TextField, Typography, Box } from '@mui/material'; // <-- NUEVO
import { useContext, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { productContext } from '../../../../context/productsContext/productContext';
import { useNavigate } from 'react-router-dom';
import { DeleteIcon, UpdateIcon } from '../../../Common/Icons/Icons';
import useFilterProducts from '../../../hooks/UseFilterProducts';

export default function TableProducts() {
  const navigate = useNavigate();
  const { getAllProducts, deleteProduct, listProducts, isLoading } = useContext(productContext);
  const {filterProducts} = useFilterProducts()

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(()=>{
    /*filterProducts es la funcion que retorna la funcion useFilterProducts*/
      filterProducts(searchTerm)
  },[searchTerm])

  return (
    <Box sx={{ width: '100%', padding: 2 }}>

      <TextField
        fullWidth
        label="Buscar productos por nombre"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />

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
              listProducts.map((product) => (
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
                          await deleteProduct(product._id);
                          getAllProducts();
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
  );
}
