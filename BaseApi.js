import axios from 'axios';
// api 的域名地址
import { apiDomain } from '*****';

export default class BaseApi {
    fetchJson = (config) => {
        const requestConfig = { ...config };
        requestConfig.method = 'GET';
        return this._request(requestConfig);
    }

    post = (config) => {
        const requestConfig = { ...config };
        requestConfig.method = 'POST';
        return this._request(requestConfig);
    }

    put = (config) => {
        const requestConfig = { ...config };
        requestConfig.method = 'PUT';
        return this._request(requestConfig);
    }

    delete = (config) => {
        const requestConfig = { ...config };
        requestConfig.method = 'DELETE';
        return this._request(requestConfig);
    }

    _request = (config) => new Promise((resolve, reject) => {
        const requestConfig = this._buildRequestConfig(config);
        axios(requestConfig).then((res) => {
            if (res.data.ok) {
                resolve(res.data.result);
            } else {
                this._handleError(res.data);
            }
        }).catch((error) => {
            reject(error);
        });
    })

    _buildRequestConfig = (params) => {
        let url;
        if (params.path) {
            url = `${apiDomain()}${params.path}`;
        }
        return {
            url,
            method: params.method,
            data: params.body,
            headers: params.headers,
        };
    };

    _handleError = (response) => {
        if (response.errors) {
            if (response.errors.length <= 0) {
                return console.log('服务器返回了errors，但errors为空');
            }
            const errorObject = response.errors[0];
            return console.log(errorObject.message);
        }
        return console.log(`${response.error_type} \n ${response.message}`);
    };
}
