import React from "react";
import { createPortal } from "react-dom";

import { nanoid } from "nanoid";

import { Searchbar } from "../components/Searchbar";
import { Loader } from "../components/Loader";
import { ImageGallery } from "../components/ImageGallery";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";

import styles from "./app.module.css";
import axios from 'axios';

const modalRoot = document.querySelector("#modalRoot");
axios.defaults.baseURL = 'https://pixabay.com/';
const PER_PAGE = 200;

  export class App extends React.Component {
    state = {
      searchVal: "",
      imgArr: [],
      isLoading: false,
      showModalImg: false,
      largeImg: "",
      page: 1,
      perPage: PER_PAGE,
      maxPage: 1
    };
    componentDidUpdate(prevProps, prevState) {
      console.log('componentDidUpdate');
      const prevVal = prevState.searchVal;
      const currVal = this.state.searchVal;
      this.searchAPI(prevVal, currVal);
    };
    searchAPI= (prevVal, currVal, perPage = this.state.perPage, numbPage = this.state.page) => {
      if (prevVal !== currVal)
      {
        this.setState({ isLoading: true });
        axios
            //params(search value, per page, bumber of page)
            .get('api/', this.apiParams(currVal, perPage, numbPage))
          .then(responce => {
            console.log(responce.data.totalHits);
              this.setState((prevState) => {
                const respArr = responce.data.hits.map(({ id, webformatURL, largeImageURL }) => ({ id, webformatURL, largeImageURL }));
                const newArr = [...prevState.imgArr, ...respArr];
                const maxPic = responce.data.totalHits;
                return { imgArr: newArr,  maxPage: Math.floor(maxPic/this.state.perPage)};
              });
            })
            .catch(err => console.log(err))
            .finally(() => {
                this.setState({ isLoading: false });
            });
        };
    }
    apiParams = (searchVal, perPage, numbPage) => {
      return {
        params:
        {
          'key': '26957762-d57e139ef4e468b63f7952cc1',
          'q': searchVal,
          'image_type': 'photo',
          'orientation': 'horizontal',
          'safesearch': 'true',
          'per_page': perPage,
          'page': numbPage
        }
      }
    };    
    getDataExtForm = (data) => { 
      this.setState({ searchVal: data.searchStr });
    };
    imgOnClick = (e) => {
      const imgId = e.target.id;
      const findImg = this.state.imgArr.find(({ id }) => id === Number(imgId));
      this.setState({ largeImg: findImg.largeImageURL,  showModalImg: true});
    };
    btnOnClick = () => {
      const nextPage = this.state.page + 1;
      this.setState({ page: nextPage });
      this.searchAPI("", this.state.searchVal, 12, nextPage);
    };
    closeModal = () => {
      this.setState({ showModalImg: false});
    };
    render() {
      const { isLoading, searchVal, imgArr, showModalImg, largeImg } = this.state;
      const imgArrlen = imgArr.length;
    return(
      <div className={styles.App}>
        goit-react-hw-03-image-finder
        <Searchbar onSubmit={this.getDataExtForm} />
        {isLoading && <Loader searchVal={searchVal} />}
        <ImageGallery imgArr={imgArr} onClick={this.imgOnClick} />
        {(imgArrlen > 0 && this.state.page <= this.state.maxPage) && <Button text={"Load more"} onClick={this.btnOnClick} />}
        {showModalImg && createPortal(<Modal onClose = {this.closeModal}><img src={largeImg} alt="Фото" /></Modal>, modalRoot)}
      </div>
    );
  };
};