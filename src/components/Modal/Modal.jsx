import React from "react";
import { createPortal } from "react-dom";
import ProtoTypes from "prop-types";
import styles from "./Modal.module.css";

const modalRoot = document.querySelector("#modalRoot");

export class Modal extends React.Component {
    static protoType = {
        onClose: ProtoTypes.func.isRequired
    };
    componentDidMount() {
        window.addEventListener("keydown", this.handleKeyDown);
    };
    componentWillUnmount() {
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
            createPortal (
                <div className={styles.Overlay} onClick={this.handleBackDropClick}>
                <div className={styles.Modal}>
                    {this.props.children}
                </div>
                </div>
                ,modalRoot)
        );        
    };
};