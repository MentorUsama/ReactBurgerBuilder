import axios from 'axios';

const instance =axios.create({
    baseURL:'https://burger-b4810-default-rtdb.firebaseio.com/'
})
export default instance;