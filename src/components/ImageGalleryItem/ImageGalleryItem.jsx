import PropTypes from "prop-types";
import styles from "./ImageGalleryItem.module.css";

export const ImageGalleryItem = ({id, webformatURL, onCklick}) => { 
    return (
        <li className={styles.ImageGalleryItem}>
            <img id={id} className={styles.ImageGalleryItemImage} src={webformatURL} alt="фото" onClick={onCklick} />
        </li>
    );
};

ImageGalleryItem.propType = {
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    onCklick: PropTypes.func.isRequired
};