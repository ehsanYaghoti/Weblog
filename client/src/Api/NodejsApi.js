import axios from 'axios';


let instance = axios.create({
    baseURL : 'http://localhost:5000',
    timeout : 20000,
    timeoutErrorMessage : '500 Problem from server(time out error)'    ,
    withCredentials : true,
    // headers: {'Access-Control-Allow-Origin': '*'},
    // proxy: {
    //     host: 'http://localhost',
    //     port: 5000
    // }
    // headers : {'Access-Control-Allow-Headers' : 'content-type' }
})

instance.interceptors.request.use(function(config) {
    // console.log(config)
    return config;
} , function(error){
    return Promise.reject(error);
});

instance.interceptors.response.use(function(response) {
    // console.log(response)
    return response;
} , function(error){

    return Promise.reject(error);
});


export default instance;