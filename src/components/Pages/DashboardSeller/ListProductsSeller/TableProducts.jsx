import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useContext, useEffect,useState } from 'react';
import { productContext } from '../../../../context/productsContext/productContext';
import { ButtonContained } from '../../../Common/Buttons/Buttons';
import { useNavigate} from 'react-router-dom';
import { Delete } from '@mui/icons-material';
import { DeleteIcon, UpdateIcon } from '../../../Common/Icons/Icons';
// import ReusableModal from '../../../AddProductModal/AddProductModal';
// import FormAddProducts from '../FormAddProducts/FormAddProducts';

export default function TableProducts() {
    // const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate()
    const { getAllProducts, deleteProduct, listProducts, isLoading } = useContext(productContext);



    useEffect(() => {
        async function loadProducts() {
            await getAllProducts();
        }
        loadProducts();
    }, []);

    return (
        <TableContainer  component={Paper}  >
            <Table sx={{ height: 'auto', width: '90%' }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Imagen</TableCell>
                        {/* <TableCell>Descripción</TableCell> */}
                        <TableCell>Nombre</TableCell>
                        <TableCell align="center">Precio</TableCell>
                        <TableCell align="center">Stock</TableCell>
                        <TableCell align="center">Acciones</TableCell>
                        <TableCell align="center">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!isLoading && listProducts.length > 0 && (
                        listProducts.map((product) => (
                            <TableRow
                                key={product._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <img src={product.file} alt='imagen del producto' style={{height:'50px', width:'100px'}} />
                                </TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell align="center">{product.price}</TableCell>
                                <TableCell align="center">{product.stock}</TableCell>
                                <TableCell align="center">
                                   <div style={{display:'flex', justifyContent:'center', cursor:'pointer'}} >
                                   <DeleteIcon
                                    color='grey'
                                    height='20px'
                                    width='100px'
                                    onClick={async()=>{
                                        await deleteProduct(product._id)
                                        getAllProducts()
                                    }}
                                    />
                                   </div>
                                    
                                </TableCell>
                                <TableCell align="center">
                                <div style={{display:'flex', justifyContent:'center', cursor:'pointer'}} >
                                   <UpdateIcon
                                    color='grey'
                                    height='20px'
                                    width='100px'
                                    onClick={()=>{
                                        navigate(`/addProducts/${product._id}`)
                                        // handleOpenModal()
                                    }}
                                    />
                                   </div>
                                </TableCell>
                                
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
            
        </TableContainer>
    );
}
