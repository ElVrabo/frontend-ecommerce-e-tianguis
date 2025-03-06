import { useContext, useState } from "react";
import { ButtonContained } from "../../../Common/Buttons/Buttons";
import "./formAddProducts.css";
import { productContext } from "../../../../context/productsContext/productContext";

export default function FormAddProducts() {
    const [productData,setProductData] = useState({
        name:'',
        description:'',
        category:'',
        price:'',
        stock:'',
        image:''

    })
    const {addNewProduct} = useContext(productContext)

   async function handleOnSubmit(event){
    event.preventDefault()
      await addNewProduct(productData)
      setProductData({
        name:'',
        description:'',
        category:'',
        price:'',
        stock:'',
        image:''
      })
      alert('el producto se agrego correctamente')
    }

    function handleOnChange(event){
        setProductData((prevValue)=>({
            ...prevValue,
            [event.target.name]:event.target.value
        }))
    }
  return (
    <div className="form-products-container">
      <h2 className="form-products-title">Añadir Producto</h2>
      <form className="product-form" onSubmit={handleOnSubmit} >
        <div className="input-group-products">
          <div className="input-field-products">
            <label htmlFor="name">Nombre:</label>
            <input type="text" id="name" name="name" value={productData.name} placeholder="Nombre del producto" required onChange={handleOnChange} />
          </div>
          <div className="input-field-products">
            <label htmlFor="description">Descripción:</label>
            <input id="description" name="description" value={productData.description}  placeholder="Descripción del producto" required onChange={handleOnChange}></input>
          </div>
        </div>

        <div className="input-group-products">
          <div className="input-field-products">
            <label htmlFor="category">Categoría:</label>
            <input type="text" id="category" name="category" value={productData.category}  placeholder="Categoría del producto" required onChange={handleOnChange} />
          </div>
          <div className="input-field-products">
            <label htmlFor="price">Precio:</label>
            <input type="string" id="price" name="price" value={productData.price}  placeholder="Precio del producto" required onChange={handleOnChange} />
          </div>
        </div>

        <div className="input-group-products">
          <div className="input-field-products">
            <label htmlFor="stock">Stock:</label>
            <input type="string" id="stock" name="stock" value={productData.stock}  placeholder="Stock disponible" required onChange={handleOnChange}/>
          </div>
          <div className="input-field-products">
            <label htmlFor="image">Imagen:</label>
            <input type="string" id="image" name="image" value={productData.image} placeholder="ingresa una imagen" required onChange={handleOnChange} />
          </div>
        </div>

        <ButtonContained
         text="Enviar"
         backgroundColor="#2713C2"
         colorText="#fff"
         width="250px"
         height="45px"
         type="submit"
        />
      </form>
    </div>
  );
}