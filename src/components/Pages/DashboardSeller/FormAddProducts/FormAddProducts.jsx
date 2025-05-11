import { useContext, useEffect, useState } from "react";
import { ButtonContained } from "../../../Common/Buttons/Buttons";
import "./formAddProducts.css";
import { productContext } from "../../../../context/productsContext/productContext";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorAlert, InfoAlert, SuccessAlert } from "../../../Common/Alerts/Alerts";

export default function FormAddProducts() {
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        category: "",
        price: "",
        offerPrice:"",
        stock: "",
        offer:false,
        offerExpire:"",
        file: null, // Aquí guardaremos la URL final (no un File directamente)
      });
    //   const [isLoadingProduct,setIsLoadingProduct] = useState(true)
    const [loadImage,setLoadImage] = useState(false)
    const [isChecked,setIsChecked] = useState(false)
    const { addNewProduct, getProduct, getAllProducts, updateProduct, product,alerts,setAlerts } = useContext(productContext);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function loadProduct() {
            if (id) {
                await getProduct(id);
                 
                return
            }
           
        }
        loadProduct();
    }, [id]);

    useEffect(() => {
        if (id && product) {
            setProductData({
                name: product.name || "",
                description: product.description || "",
                category: product.category || "",
                price: product.price || "",
                offerPrice:product.offerPrice || "",
                stock: product.stock || "",
                file: product.file || null,
                offer:product.offer || "",
                offerExpire:product.offerExpire || ""
              });
              return
        }
    }, [id,product]);

    useEffect(()=>{
      if(loadImage === true){
        setAlerts({...alerts,info:'Cargando imagen...'})
      }else{
        setAlerts({...alerts,info:""})
      }
    },[loadImage])


    async function handleOnSubmit(event) {
        event.preventDefault();
      
        if (!productData.file) {
          console.log("No hay imagen");
          return;
        }
      
        const formData = new FormData();
        Object.entries(productData).forEach(([key, val]) => {
          formData.append(key, val);
        });
      
        if (id) {
          await updateProduct(id, formData);
          navigate("/productsSeller");
          
        } else {
          await addNewProduct(formData);
          await getAllProducts();
          navigate("/productsSeller");
      
        }
      
        setProductData({
          name: "",
          description: "",
          category: "",
          price: "",
          stock: "",
          file: null,
        });
      }

    function handleChecked (e){
      setIsChecked(e.target.checked)
      setProductData({...productData,offer:e.target.checked})
    }
      

      function handleOnChange(event) {
        const { name, value } = event.target;
        setProductData((prev) => ({
          ...prev,
          [name]: value,
        }));
        // console.log(productData)
      }
      

    async function removeBackground(file) {
        const formData = new FormData();
        formData.append("image_file", file);
        formData.append("size", "auto");
    
        try {
            const res = await fetch("https://api.remove.bg/v1.0/removebg", {
                method: "POST",
                headers: {
                    "X-Api-Key": "mqVS62XPUsEP6EQoDn3waA7Y",
                },
                body: formData,
            });
    
            if (!res.ok) {
                // console.log("Error al quitar el fondo", res.status);
                return null;
            }
    
            const blob = await res.blob();
            return URL.createObjectURL(blob); // URL de la imagen sin fondo
        } catch (error) {
            console.error("Error en remove.bg", error);
            return null;
        }
    }
    async function handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;
      
        setLoadImage(true);
      
        const imageUrlWithoutBg = await removeBackground(file);
        if (!imageUrlWithoutBg) {
          setLoadImage(false);
          return;
        }
      
        const response = await fetch(imageUrlWithoutBg);
        const blob = await response.blob();
        const fileWithoutBg = new File([blob], "image.png", { type: "image/png" });
      
        const formData = new FormData();
        formData.append("file", fileWithoutBg);
        formData.append("upload_preset", "project-react-ecommerce");
        formData.append("cloud_name", "dc16nkez3");
      
        try {
          const res = await fetch("https://api.cloudinary.com/v1_1/dc16nkez3/image/upload", {
            method: "POST",
            body: formData,
          });
      
          if (!res.ok) {
            setLoadImage(false);
            return;
          }
      
          const imageRes = await res.json();
      
          setProductData((prev) => ({
            ...prev,
            file: imageRes.url,
          }));
      
          setLoadImage(false);
          setAlerts({ ...alerts, info: "Imagen cargada" });
        } catch (error) {
          console.error("Error al subir imagen", error);
          setLoadImage(false);
        }
      }
      
    
    

    return (
        <div className="form-products-container">
            <h2 className="form-products-title">{id ? 'Editar producto' : 'Añadir producto'}</h2>
            <form className="product-form" onSubmit={handleOnSubmit}>
                <div className="input-group-products">
                    <div className="input-field-products">
                        <label htmlFor="name">Nombre:</label>
                        <input type="text" id="name" name="name" value={productData.name} placeholder="Nombre del producto" required onChange={handleOnChange} />
                    </div>
                    <div className="input-field-products">
                        <label htmlFor="description">Descripción:</label>
                        <input id="description" name="description" value={productData.description} placeholder="Descripción del producto" required onChange={handleOnChange}></input>
                    </div>
                </div>

                <div className="input-group-products">
                    <div className="input-field-products">
                        <label htmlFor="category">Categoría:</label>
                        <select className="select-category-form" onChange={handleOnChange} required name="category" value={productData.category}  >
                            <option value='' disabled >Categorias</option>
                            <option value='artesanias' >artesanias</option>
                            <option value='pinturas' >pinturas</option>
                            <option value='cocina' >cocina</option>
                            <option value='accesorios' >accesorios</option>
                        </select>
                        {/* <input type="text" id="category" name="category" placeholder="Categoría del producto" required onChange={handleOnChange} /> */}
                    </div>
                   {productData.offer ? (
  <>
    <div className="input-field-products">
      <label htmlFor="price">Precio original:</label>
      <input
        type="text"
        id="price"
        name="price"
        value={productData.price}
        placeholder="Precio sin oferta"
        required
        onChange={handleOnChange}
      />
    </div>
    <div className="input-field-products">
      <label htmlFor="offerPrice">Precio con oferta:</label>
      <input
        type="text"
        id="offerPrice"
        name="offerPrice"
        value={productData.offerPrice}
        placeholder="Precio con descuento"
        required
        onChange={handleOnChange}
      />
    </div>
  </>
) : (
  <div className="input-field-products">
    <label htmlFor="price">Precio:</label>
    <input
      type="text"
      id="price"
      name="price"
      value={productData.price}
      placeholder="Precio del producto"
      required
      onChange={handleOnChange}
    />
  </div>
)}

                </div>

                <div className="input-group-products">
                    <div className="input-field-products">
                        <label htmlFor="stock">Stock:</label>
                        <input type="number" id="stock" name="stock" value={productData.stock} placeholder="Stock disponible" required onChange={handleOnChange} />
                    </div>
                    <div className="input-field-products">
                        <label htmlFor="image">Imagen:</label>
                        <input type="file" id="file" name="file" required onChange={handleFileUpload} />
                    </div>
                </div >
                <div className="input-group-products">
                    <div className="input-field-products checkbox-container ">
                       
                        <input type="checkbox" id="offer" name="offer" value={productData?.offer} checked={productData.offer ? true :false} onChange={handleChecked} />
                          <label style={{marginTop:"5px"}} htmlFor="offer">Oferta</label>
                    </div>
                   {productData.offer ? (
                     <div className="input-field-products ">
                        <label htmlFor="image">Fecha de vencimiento:</label>
                        <input type="date" id="offerExpire" name="offerExpire" value={productData?.offerExpire}  onChange={handleOnChange} />
                    </div>
                   ):''}
                </div >
                <div className="alerts-form-add-products" >
                    {/* {alerts.success && <SuccessAlert type="success" text={alerts.success} onClose={() => setAlerts({ ...alerts, success: "" })} />} */}
                                {alerts.error && <ErrorAlert type="error" text={alerts.error} onClose={() => setAlerts({ ...alerts, error: "" })} />}
                                {alerts.info && <InfoAlert type="info" text={alerts.info} onClose={() => setAlerts({ ...alerts, info: "" })} />}
                </div>
                  <div className="btn-form-add-products-container" >
                    
                <ButtonContained text="Enviar" backgroundColor="#2713C2" colorText="#fff" width="250px" height="45px" type="submit" />
                  </div>
            </form>
        </div>
    );
}
