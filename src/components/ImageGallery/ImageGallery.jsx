import PropTypes from "prop-types";
import styles from "./ImageGallery.module.css";

import { ImageGalleryItem } from "../ImageGalleryItem";

export const ImageGallery = ({imgArr, onClick}) => { 
    return (
        <ul className={styles.ImageGallery}>
            {imgArr.map(({ id, webformatURL }) => <ImageGalleryItem id={id} webformatURL={webformatURL} onCklick={onClick} key={id} />)}
        </ul>
    );
};

ImageGallery.protoType = {
    imgArr: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL:PropTypes.string.isRequired
    })),
    onClick: PropTypes.func.isRequired
};