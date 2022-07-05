import PropTypes from "prop-types";
import styles from "./ImageGallery.module.css";

import { ImageGalleryItem } from "../ImageGalleryItem";

export const ImageGallery = (props) => { 
    return (
        <ul className={styles.ImageGallery}>
            {props.imgArr.map(({ id, webformatURL }) => <ImageGalleryItem id={id} webformatURL={webformatURL} onCklick={props.onClick} key={id} />)}
        </ul>
    );
};
