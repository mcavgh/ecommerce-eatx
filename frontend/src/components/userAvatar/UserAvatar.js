import React, { useState } from "react";
import { storage } from "../../firebase";
import css from './UserAvatar.module.css';
import { editAvatar } from '../../store/user/user.action';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux'


const UserAvatar = ({id}) => {
    const [image, setImage] = useState(null);//local image
    const [url, setUrl] = useState(null);
    const [progress, setProgress] = useState(0);
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
                            dispatch(editAvatar(id, String(url)))
                        });
                }

            );
            setImage(null)
        } catch (error) {
            window.alert("debe elegir una imagen")
        }
    };

    return (
        <>
            {progress > 0 ? (
                <progress className={css.chargeBar} value={progress} max="100" />

            ) : ("")}
            <input className={css.buttonStyle} type="file" onChange={handleChange} />
            {image ?
                (
                    <div>

                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={handleUpload}
                        >
                            Upload
                  </Button>
                    </div>
                )
                :
                (

                    ""

                )

            }
            <p>
                <img src={url} alt="" width="100" ></img>

            </p>

        </>
    );
};

export default UserAvatar;