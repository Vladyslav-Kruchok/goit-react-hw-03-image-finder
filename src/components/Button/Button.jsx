import PropTypes from "prop-types";
import styles from "./Button.module.css";

export const Button = ({text, onClick}) => { 
    return (
        <>
            <button className={styles.Button} type="button" onClick={onClick}>{text}</button>
        </>
    );
};

Button.propType = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};