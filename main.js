


import React, { Component,useEffect,useState } from 'react';
import FamilyTree from './mytree';
import { useParams } from "react-router-dom";
import family_details_service from './services/family_details_service';

export default function Main() {
  let { id,user_id } = useParams();
  const [nodes,setNodes]=useState([])
  const[firstnode,setFirstnode]=useState(false)
  const [inviteshow,setInviteshow]=useState(false)



    function getdata(){
    family_details_service.getdata(id,user_id).then(
      async response => {
        setNodes(response.data)
        if(response.data[0].family_owner==user_id){
          setInviteshow(true)
          setFirstnode(response.data[0].first_node)
        }
      }
    )
      

  }
  useEffect(() => {
    getdata();
  console.log(id)
  
  }, []);

 

  return(
    <div>
         
    <div style={{height: '100%'}}>
      

        {/* <FamilyTree nodes={[
           
            { id: 1, mid: null, fid: null, pids:[87],name: "Peter Stevens", gender: "male", profile: "https://cdn.balkan.app/shared/m10/2.jpg" },
            { id: 87, mid: null, fid: null,pids:[1], name: "Savin Stevens", gender: "female", profile: "https://cdn.balkan.app/shared/m10/1.jpg"  },
           
        ]} /> */}
        {nodes.length>0  ?
        <FamilyTree nodes={nodes} inviteshow={inviteshow} family_id={id} user_id={user_id} firstnode={firstnode}/>
        : <div> </div>}
  
    </div>



</div>
  )
  
}