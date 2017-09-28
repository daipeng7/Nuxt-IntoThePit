import axios from 'axios';
export default ({ route })=>{
    return axios.post( 'http://unxt-test.com', {
        url : route.fullPath
    } );
}