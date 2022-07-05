import React from "react";
import ProtoTypes from "prop-types";
import styles from "./Modal.module.css";

export class Modal extends React.Component {
    componentDidMount() {
        //console.log("MOUNT MODAL");
        window.addEventListener("keydown", this.handleKeyDown);
    };
    componentWillUnmount() {
        //console.log("UN-MOUNT MODAL");
        window.removeEventListener("keydown", this.handleKeyDown);
    };

    handleKeyDown = (e) => {
        if (e.code === "Escape") {
                this.props.onClose();
            }
    }
    handleBackDropClick = (e) => {
        if (e.target === e.currentTarget) {
            this.props.onClose();
        }
    }
    render() { 
        return(
            <div className={styles.Overlay} onClick = {this.handleBackDropClick}>
                <div className={styles.Modal}>
                    {this.props.children}
                </div>
            </div>
        );        
    };
};
