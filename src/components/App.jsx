import React from "react";

import { Searchbar } from "../components/Searchbar";
import { Loader } from "../components/Loader";
import { ImageGallery } from "../components/ImageGallery";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";

import { pixabayAPI } from "../api/pixabayAPI";

import styles from "./app.module.css";

const PER_PAGE = 12;
const START_PAGE = 1;

export class App extends React.Component {
  state = {
    searchVal: "",
    imgArr: [],
    isLoading: false,
    showModalImg: false,
    page: START_PAGE,
    largeImg: ""
  };

  perPage = PER_PAGE;
  maxPage = START_PAGE;

  componentDidUpdate(prevProps, prevState) {
    const prevVal = prevState.searchVal;
    const currVal = this.state.searchVal;
    //this.consoleLogState(this.state, prevState);
    if (prevVal !== currVal) {
      this.searchAPI(currVal, this.perPage, START_PAGE);
    }
    if ((prevVal === currVal)&&(this.state.page > prevState.page)) {
      this.searchAPI(currVal, this.state.perPage, this.state.page);
    }
  };
  consoleLogState = (f_currState, f_prevState) =>
  {
    Object.keys(f_currState).forEach(key => {
      console.log(`${key}: curr{${f_currState[key]}} - prev{${f_prevState[key]}}`);
    });
  }
  searchAPI= (currVal, perPage = this.perPage, numbPage = this.state.page) => {
    this.setState({ isLoading: true });
      const searchRes = pixabayAPI(currVal, perPage, numbPage);
      searchRes
        .then(value => {
          console.log(value.maxPic, value.respArr.length);
          if (numbPage > 1) {
            this.setState((prevState) => {
              const newArr = [...prevState.imgArr, ...value.respArr];
              this.maxPage = Math.floor(value.maxPic/perPage)
              return { imgArr: newArr};
            });
          } else {
            this.setState({ imgArr: value.respArr });
          }
        })
        .catch(err => console.log(err))
        .finally(() => {
          this.setState({isLoading: false});
        });
  }
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
    this.setState({page: nextPage});
  };
  closeModal = () => {
    this.setState({ showModalImg: false});
  };
  render() {
    const { imgArr, showModalImg, largeImg} = this.state;
    const imgArrlen = (imgArr.length !== "undefined ") ? imgArr.length : 0;
  return(
    <div className={styles.App}>
      <Searchbar onSubmit={this.getDataExtForm} />
      {(imgArr.length !== 0) && <ImageGallery imgArr={imgArr} onClick={this.imgOnClick} />}
      {this.state.isLoading && <Loader />}
      {(imgArrlen > 0 && this.state.page <= this.maxPage) && <Button text={"Load more"} onClick={this.btnOnClick} />}
      {showModalImg && <Modal onClose = {this.closeModal}><img src={largeImg} alt="Фото" /></Modal>}
    </div>);
  };
};