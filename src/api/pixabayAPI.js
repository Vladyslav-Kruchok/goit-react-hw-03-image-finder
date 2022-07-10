import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/';

const apiParams = (searchVal, perPage, numbPage) => {
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

export const pixabayAPI = (currVal, perPage, numbPage) => { 
    return axios
        //params(search value, per page, bumber of page)
        .get('api/', apiParams(currVal, perPage, numbPage))
        .then(responce => {
            const maxPic = responce.data.totalHits;
            const respArr = responce.data.hits.map(({ id, webformatURL, largeImageURL }) => ({ id, webformatURL, largeImageURL }));
            return {respArr, maxPic};
        })
        .catch(err => console.log(err));
};