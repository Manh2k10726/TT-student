import Axios from 'axios';
import { DOMAIN } from '../config';

export class baseService {
    post = (url, model) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            header: [],
            method: 'POST',
            data: model
        })
    }
    put = (url, model) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            header: [],
            method: 'PUT',
            data: model
        })
    }

    get = (url) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            header: [],
            method: 'GET',
        })
    }


    delete = (url) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            header: [],
            method: 'DELETE',
        })
    }
}