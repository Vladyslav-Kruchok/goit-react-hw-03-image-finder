import React from "react";
import PropTypes from "prop-types";
import styles from "./Searchbar.module.css";

export class Searchbar extends React.Component {
    static protoType = {
        onSubmit: PropTypes.func.isRequired
    };
    state = {
        searchStr: ""
    };

    exportData = (e) => { 
        e.preventDefault();
        if (this.state.searchStr.trim() ==='') {
            alert('enter some value')
            return;
        }
        this.props.onSubmit(this.state);
        this.resetCurrInput();
    };    
    updateCurrState = (e) => {
        const { name, value } = e.currentTarget;
        this.setState({ [name]: value });
    };
    resetCurrInput = () => {
        this.setState({ searchStr: "" });
    };

    render() { 
        return(
            <header className={styles.searchbar}>
                <form className={styles.form} onSubmit = {this.exportData}>
                    <button type="submit" className={styles.formButton}>
                        <span className={styles.formButtonLabel}>Search</span>
                    </button>

                    <input
                        className={styles.formInput}
                        type="text"
                        name="searchStr"
                        value={this.state.searchStr}
                        onChange={this.updateCurrState}
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
        );
    };
};