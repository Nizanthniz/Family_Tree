import axios from "axios";

const API_URL = 'http://161.97.180.132:12000/api/v1/users/'
// const API_URL = process.env.REACT_APP_API_URL;

class Familyservice {

    async getbyid(id){
        return axios
          .post(API_URL + 'get_byid',{id})
          .then((response) => {
            return response.data;
          });
      }

      async getdata(family_id,user_id){
        const insertData = new FormData();
        insertData.set('family_id',family_id)
        insertData.set('user_id',user_id)
        return axios
          .post(API_URL + 'get_data',insertData)
          .then((response) => {
            return response.data;
          });
      }

 


      async insert(nodeId,mid,fid,name,dob,death,phone,gender,relatives,pids,profile,family_id){
        const insertData = new FormData();
        insertData.set('nodeId',nodeId)
        insertData.set('mid',mid)
        insertData.set('fid',fid)
        insertData.set('name',name)
        insertData.set('dob',dob)
        insertData.set('death',death)
        insertData.set('phone',phone)
        insertData.set('gender',gender)
        insertData.set('relatives',relatives)
        insertData.set('pids',pids)
        insertData.set('family_id',family_id)
        insertData.append('profile',profile)

        return axios 
        .post(API_URL+'insert_data',insertData)
        .then((response)=>{
          return response.data

        })
      }


      async save_nodeid(nodeid){
        const insertData = new FormData();
        insertData.set('nodeid',nodeid)
        return axios
          .post(API_URL + 'save_nodeid',insertData)
          .then((response) => {
            return response.data;
          });
      }

      async getuseridbynodeid(nodeid,user_id){
        const insertData = new FormData();
        insertData.set('node_id',nodeid)
        insertData.set('user_id',user_id)
        return axios
          .post(API_URL + 'getuseridbynodeid',insertData)
          .then((response) => {
            return response.data;
          });
      }
      
      }

      


export default new Familyservice();