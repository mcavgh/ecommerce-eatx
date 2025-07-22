import React, { useState } from "react";
//import { render } from "react-dom";
import { storage } from "../../firebase";
import css from './upload.module.css';
import { setImgUrl } from '../../store/product/product.actions';
import { Button, TextField, Typography, Box, Divider } from '@material-ui/core';
import { useDispatch } from 'react-redux'


const UploadImage = ({ img }) => {
    const [image, setImage] = useState(null);//local image
    const [url, setUrl] = useState(null);
    const [progress, setProgress] = useState(0);
    const [imageUrl, setImageUrl] = useState(""); // Estado para la URL de imagen ingresada manualmente
    const dispatch = useDispatch()

    const handleChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        try {
            const uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on(
                "state_changed",
                snapshot => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress);
                },
                error => {
                    console.log(error);
                },
                () => {
                    storage
                        .ref("images")
                        .child(image.name)
                        .getDownloadURL()
                        .then(url => {
                            setUrl(url);
                            dispatch(setImgUrl(url))
                        });
                }

            );
            setImage(null)
        } catch (error) {
            window.alert("debe elegir una imagen")
        }
    };

    // Función para manejar el cambio en el input de URL
    const handleUrlChange = (e) => {
        setImageUrl(e.target.value);
    };

    // Función para usar la URL ingresada
    const handleUseUrl = () => {
        if (imageUrl.trim() !== "") {
            setUrl(imageUrl);
            dispatch(setImgUrl(imageUrl));
            setImageUrl(""); // Limpiar el campo después de usarlo
        } else {
            window.alert("Por favor, ingrese una URL válida");
        }
    };

    return (
        <>
            <Typography variant="subtitle1" style={{ marginBottom: '8px' }}>
                <strong>Imagen del Producto</strong>
            </Typography>
            
            <Box mb={3}>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                    Opción 1: Subir imagen desde tu dispositivo
                </Typography>
                
                {progress > 0 ? (
                    <progress className={css.chargeBar} value={progress} max="100" />
                ) : ("")}
                
                <input className={css.buttonStyle} type="file" onChange={handleChange} />
                
                {image ? (
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={handleUpload}
                        >
                            Subir Imagen
                        </Button>
                    </div>
                ) : ("")}
            </Box>
            
            <Divider style={{ margin: '16px 0' }} />
            
            <Box mb={3}>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                    Opción 2: Introducir URL de imagen
                </Typography>
                
                <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    placeholder="https://ejemplo.com/imagen.jpg"
                    value={imageUrl}
                    onChange={handleUrlChange}
                    style={{ marginBottom: '8px' }}
                />
                
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUseUrl}
                    disabled={imageUrl.trim() === ""}
                >
                    Usar URL
                </Button>
            </Box>
            
            {url && (
                <Box mt={2} textAlign="center">
                    <Typography variant="subtitle2" gutterBottom>Vista previa:</Typography>
                    <img 
                        src={url} 
                        alt="Vista previa del producto" 
                        style={{ 
                            maxWidth: '100%', 
                            maxHeight: '200px', 
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            padding: '4px'
                        }} 
                    />
                </Box>
            )}
        </>
    );
};

export default UploadImage;