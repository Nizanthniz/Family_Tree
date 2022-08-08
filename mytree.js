import React, { Component } from 'react';
// import 'bootstrap';
import $ from 'jquery';
import "./css/custom.css"



import { Modal, Button } from "react-bootstrap";
import { Form } from 'react-bootstrap';
import axios from "axios"

import profile from "./images/profile_img.png"
import EditIcon from "./images/edit.png"

import ReactRoundedImage from "react-rounded-image"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import FamilyTree from '@balkangraph/familytree.js';
import family_details_service from './services/family_details_service';

 //const API_URL = 'http://192.168.1.40:12000/api/v1/users/'
const API_URL = process.env.REACT_APP_API_URL;

var webcallMeIcon = '<svg width="24" height="24" viewBox="0 0 300 400"><g transform="matrix(1,0,0,1,40,40)"><path fill="#5DB1FF" d="M260.423,0H77.431c-5.522,0-10,4.477-10,10v317.854c0,5.522,4.478,10,10,10h182.992c5.522,0,10-4.478,10-10V10 C270.423,4.477,265.945,0,260.423,0z M178.927,302.594c0,5.522-4.478,10-10,10c-5.523,0-10-4.478-10-10v-3.364h20V302.594z M250.423,279.229H87.431V58.624h162.992V279.229z" /><path fill="#5DB1FF" d="M118.5,229.156c4.042,4.044,9.415,6.271,15.132,6.271c5.715,0,11.089-2.227,15.133-6.269l29.664-29.662 c4.09-4.093,6.162-9.442,6.24-14.816c5.601-0.078,10.857-2.283,14.829-6.253l29.66-29.662c4.042-4.043,6.269-9.417,6.269-15.133 c0-5.716-2.227-11.09-6.269-15.13l-9.806-9.806c-4.041-4.043-9.415-6.27-15.132-6.27c-5.716,0-11.09,2.227-15.132,6.269 l-29.663,29.662c-4.092,4.092-6.164,9.443-6.242,14.817c-5.601,0.078-10.857,2.283-14.828,6.252l-29.661,29.662 c-4.042,4.043-6.269,9.418-6.268,15.136c0,5.716,2.227,11.089,6.269,15.129L118.5,229.156z M168.618,147.548l29.662-29.661 c1.587-1.587,3.696-2.461,5.94-2.461c2.243,0,4.353,0.874,5.938,2.461l9.808,9.808c1.586,1.586,2.46,3.694,2.46,5.937 c0,2.244-0.874,4.354-2.462,5.941l-29.658,29.661c-1.588,1.587-3.697,2.46-5.941,2.46c-2.243,0-4.353-0.874-5.938-2.46 l-0.309-0.309l19.598-19.598c2.539-2.539,2.539-6.654,0-9.192c-2.537-2.538-6.654-2.538-9.191,0l-19.599,19.598l-0.308-0.308 C165.344,156.152,165.345,150.823,168.618,147.548z M117.888,198.28l29.66-29.661c1.587-1.586,3.695-2.46,5.939-2.46 c2.242,0,4.349,0.872,5.934,2.455c0.002,0.001,0.004,0.003,0.005,0.005l0.309,0.309l-19.598,19.598 c-2.539,2.538-2.539,6.653,0,9.191c1.269,1.27,2.933,1.904,4.596,1.904s3.327-0.635,4.596-1.904l19.599-19.598l0.309,0.309 c3.273,3.273,3.273,8.603,0,11.877l-29.662,29.66c-1.588,1.588-3.698,2.462-5.941,2.462c-2.243,0-4.352-0.874-5.938-2.462 l-9.807-9.806c-1.586-1.586-2.46-3.694-2.46-5.938C115.426,201.978,116.3,199.868,117.888,198.28z" /></g></svg>';
export default class extends Component {
    state={
        nodes:this.props.nodes,
        user_name:"",
        gender:"",
        nodeId:'',
        user_profile:[],
        values:new Date(),
        open:false,
       }
    constructor(props) {
        super(props);
       
        this.divRef = React.createRef();
        this.hi=this.hi.bind(this);
        this.add_form=this.add_form.bind(this);
        this.invite_form=this.invite_form.bind(this);
        this.onChange=this.onChange.bind(this);
        this.calendaropen=this.calendaropen.bind(this);
        this.onSelectFileUserProfile=this.onSelectFileUserProfile.bind(this);
        this.onChangenew_details=this.onChangenew_details.bind(this);
        this.onsubmit=this.onsubmit.bind(this);
        this.onfirssubmit=this.onfirssubmit.bind(this);
        this.getdata=this.getdata.bind(this);
        this.first_node=this.first_node.bind(this);
       

    }


    componentDidMount() {
      
       this.getdata(this.props.nodes,this.props.firstnode);
       
    }
       getdata(nodes,firstnode){
          console.log(nodes)
          
          
          if(this.props.inviteshow && firstnode ){
            this.family = new FamilyTree (this.divRef.current , {
              nodes:nodes,
           
              nodeBinding: {
                  field_0: "name",
                  field_1:"gender",
                  img_0: "profile",
                  names_0:"name"
              },
              template: "hugo",        
              nodeMenu: {            
                  edit: { text: "Add", icon: FamilyTree.icon.add(24, 24, '#aeaeae'), onClick:this.first_node },                   
                  details: {text:"View Details",onClick:this.hi},                
                
              },
              editForm:{
                readOnly:true,
                photoBinding: "profile",
                generateElementsFromFields: false,
                elements: [
                  { type: 'textbox', label: 'Full Name', binding: 'name' },
                  { type: 'textbox', label: 'Gender', binding: 'gender' },
                  { type: 'textbox', label: 'Profile Image', binding: 'profile' },
                  { type: 'textbox', label: 'Date Of Birth', binding: 'dob' },
                  { type: 'textbox', label: 'Mobile Number', binding: 'phone' },
                  { type: 'textbox', label: 'Family Id', binding: 'family_id' },
    
                ]
              }
          
        
              
          });

          }else if(this.props.inviteshow && firstnode===false){
            this.family = new FamilyTree (this.divRef.current , {
              nodes:nodes,
             
              nodeBinding: {
                  field_0: "name",
                  field_1:"gender",
                  img_0: "profile",
                  names_0:"name"
              },
              template: "hugo",        
              nodeMenu: {
            
                  edit: { text: "Add", icon: FamilyTree.icon.add(24, 24, '#aeaeae'), onClick:this.add_form },                   
                  details: {text:"View Details",onClick:this.hi},
                  myMenuItem:{text:"Invite",  icon: FamilyTree.icon.share(24, 24, '#aeaeae'), onClick:this.invite_form }
                  
                  
              },
              editForm:{
                readOnly:true,
                photoBinding: "profile",
                generateElementsFromFields: false,
                elements: [
                  { type: 'textbox', label: 'Full Name', binding: 'name' },
                  { type: 'textbox', label: 'Gender', binding: 'gender' },
                  { type: 'textbox', label: 'Profile Image', binding: 'profile' },
                  { type: 'textbox', label: 'Date Of Birth', binding: 'dob' },
                  { type: 'textbox', label: 'Mobile Number', binding: 'phone' },
                  { type: 'textbox', label: 'Family Id', binding: 'family_id' },
    
                ]
              }
          
        
              
          });
          }
          else{
            this.family = new FamilyTree (this.divRef.current , {
              nodes:nodes,
             
              nodeBinding: {
                  field_0: "name",
                  field_1:"gender",
                  img_0: "profile",
                  names_0:"name"
              },
              template: "hugo",        
              nodeMenu:{           
                                    
                  details: {text:"View Details",onClick:this.hi},
                  myMenuItem:{text:"Invite",  icon: FamilyTree.icon.share(24, 24, '#aeaeae'), onClick:this.invite_form }
                  
                  
              },
              editForm:{
                readOnly:true,
                photoBinding: "profile",
                generateElementsFromFields: false,
                elements: [
                  { type: 'textbox', label: 'Full Name', binding: 'name' },
                  { type: 'textbox', label: 'Gender', binding: 'gender' },
                  { type: 'textbox', label: 'Profile Image', binding: 'profile' },
                  { type: 'textbox', label: 'Date Of Birth', binding: 'dob' },
                  { type: 'textbox', label: 'Mobile Number', binding: 'phone' },
                  { type: 'textbox', label: 'Family Id', binding: 'family_id' },
    
                ]
              }
          
        
              
          });
          }
      
     
    }
  

        async hi(nodeId){  
 
           await family_details_service.getbyid(nodeId).then(
                async response => {
                  if(response.message==='success'){

                  
                    console.log(response.data[0].name)
                    if(response.data[0].gender=== 1){
                      this.setState({gender:'Male'})

                    }else if (response.data[0].gender=== 2){
                      this.setState({gender:'Female'})
                    }
                    
                    this.setState({
                        user_name:response.data[0].name,
                        profile:response.data[0].profile,
                        dob:response.data[0].dob,
                        phone:response.data[0].phone,
                     })   
           
                console.log(this.state.user_name)
                window.$('#ViewModal').modal('show')
              }else{
                alert(response.message)
              }
                
            })
                
         }
         async first_node(nodeId){
       
           
            
                await family_details_service.getbyid(nodeId).then(
                  async response => {
                    if(response.message==='success'){
  
                    
                      this.setState({
                          user_name:response.data[0].name,
                          gender:response.data[0].gender,
                          nodeId:nodeId
                       })   
                      
                       window.$('#AddFirstmodal').modal("show")
                
                }else{
                  alert(response.message)
                }
              
              });
              
           
            
             
              
       
         }


        async add_form(nodeId){
          await family_details_service.save_nodeid(nodeId).then(
            async response => {
           
              if(response.status=200){
                await family_details_service.getbyid(nodeId).then(
                  async response => {
                    if(response.message==='success'){
  
                    
                      console.log(response.data[0].name)
                      
                      
                      this.setState({
                          user_name:response.data[0].name,
                          gender:response.data[0].gender,
                          nodeId:nodeId
                       })   
                       window.$('#Addmodal').modal("show")
                
                }else{
                  alert(response.message)
                }
              
              });
              }
           
            
             
              
        }) 
        

         }
         

        async invite_form(nodeId){
          await family_details_service.save_nodeid(nodeId).then(
            async response => {
           
             if(response.status=200){
                        
            
              window.open('https://familytree1.page.link/invite1')
             }
              
        }) 
        

         }

        
         onSelectFileUserProfile(e){
         
          this.setState({
            user_profile:e.target.files[0]
          })

         }
        
         onChange(value,event){
          console.log(value)
          
          this.setState({
            open:false,
            
            
          })

         }
         calendaropen(){
          if(this.state.open===true){
            this.setState({
              open:false
            })
          }
          if(this.state.open===false){
            this.setState({
              open:true,
            })
          }
         }
        
         onChangenew_details = (event) => { 
            this.setState({ [event.target.name]: event.target.value });
        }
       

        async onsubmit(){
          console.log(this.state.new_user_name)
          console.log(this.state.user_profile)
          console.log(this.state.relatives)
          console.log(this.state.new_dob)
          console.log(this.state.new_mobile_number)
          console.log(this.state.new_gender)
          if(this.state.new_user_name && this.state.relatives && this.state.new_dob && this.state.new_mobile_number && this.state.new_gender){

        
          var mid="";
          var fid="";
          var name="";
          var dob="";
          var phone="";
          var gender="";
          var pids="";

          if(this.state.relatives==='child' && this.state.gender==='1'){
             mid="";
             fid=this.state.nodeId
             name = this.state.new_user_name;
             dob=this.state.new_dob;
             phone=this.state.new_mobile_number;
             gender=this.state.new_gender
    
            
          }
          else if(this.state.relatives==='child' && this.state.gender==='2'){
             mid=this.state.nodeId;
             fid="";
             name = this.state.new_user_name;
             dob=this.state.new_dob;
             phone=this.state.new_mobile_number;
             gender=this.state.new_gender         
            
          }

          if(this.state.relatives==='spouse'){
            pids=this.state.nodeId;
            name = this.state.new_user_name;
            dob=this.state.new_dob;
            phone=this.state.new_mobile_number;
            gender=this.state.new_gender

          }
          if(this.state.relatives==='parent'){
            pids="";
            name = this.state.new_user_name;
            dob=this.state.new_dob;
            phone=this.state.new_mobile_number;
            gender=this.state.new_gender

          }

          if(this.state.relatives==='siblings'){
            pids="";
            name = this.state.new_user_name;
            dob=this.state.new_dob;
            phone=this.state.new_mobile_number;
            gender=this.state.new_gender
          }
        
          await family_details_service.insert(this.state.nodeId,mid,fid,name,dob,phone,gender,this.state.relatives,pids,this.state.user_profile,this.props.family_id).then(
            async response => {
              if(response.status=200){
                await family_details_service.getdata(this.props.family_id,this.props.user_id).then(
                  async response => {
                    this.setState({
                      nodes:response.data
                    })

                  console.log(response.data)
                  window.$('#Addmodal').modal("hide")
                  this.setState({
                   new_user_name:"",
                   new_dob:"",
                   new_mobile_number:"",
                   new_gender:"",
                   relatives:"",
                  })
               
                  this.getdata(response.data,response.data[0].first_node);
              })
            } 
            
             
        })
      }else{
        alert("Please fill all fields")
      }
        }

        async onfirssubmit(){
          console.log(this.state.new_user_name)
          console.log(this.state.user_profile)
          console.log(this.state.relatives)
          console.log(this.state.new_dob)
          console.log(this.state.new_mobile_number)
          console.log(this.state.new_gender)
          if(this.state.new_user_name && this.state.relatives && this.state.new_dob && this.state.new_mobile_number && this.state.new_gender){

        
          var mid="";
          var fid="";
          var name="";
          var dob="";
          var phone="";
          var gender="";
          var pids="";

          if(this.state.relatives==='child' && this.state.gender==='1'){
             mid="";
             fid=this.state.nodeId
             name = this.state.new_user_name;
             dob=this.state.new_dob;
             phone=this.state.new_mobile_number;
             gender=this.state.new_gender
    
            
          }
          else if(this.state.relatives==='child' && this.state.gender==='2'){
             mid=this.state.nodeId;
             fid="";
             name = this.state.new_user_name;
             dob=this.state.new_dob;
             phone=this.state.new_mobile_number;
             gender=this.state.new_gender         
            
          }

          if(this.state.relatives==='spouse'){
            pids=this.state.nodeId;
            name = this.state.new_user_name;
            dob=this.state.new_dob;
            phone=this.state.new_mobile_number;
            gender=this.state.new_gender

          }
          if(this.state.relatives==='parent'){
            pids="";
            name = this.state.new_user_name;
            dob=this.state.new_dob;
            phone=this.state.new_mobile_number;
            gender=this.state.new_gender

          }
        
          await family_details_service.insert(this.state.nodeId,mid,fid,name,dob,phone,gender,this.state.relatives,pids,this.state.user_profile,this.props.family_id).then(
            async response => {
              if(response.status=200){
                await family_details_service.getdata(this.props.family_id,this.props.user_id).then(
                  async response => {
                    this.setState({
                      nodes:response.data
                    })

                  console.log(response.data)
                  window.$('#AddFirstmodal').modal("hide")
                  this.setState({
                   new_user_name:"",
                   new_dob:"",
                   new_mobile_number:"",
                   new_gender:"",
                   relatives:"",
                  })
               
                  this.getdata(response.data,response.data[0].first_node);
              })
            }
               
                
                
       
            
        })
      }else{
        alert("Please fill all fields")
      }
        }

        
  

    render() {
        return (
      <React.Fragment>
            <div id="tree" ref={this.divRef} >


          
            </div>
        
            <div className="modal fade" id="ViewModal" data-bs-keyboard="false" data-bs-backdrop="static">
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content">
              {/* <!-- Modal Header -->*/}
              <div className="modal-header border-0 pb-0" style={{height:"300px",justifyContent:"center"}}>
                <button type="button" className="close close_button" data-bs-dismiss="modal">&times;</button>
                <h3 style={{position:"absolute",top:"14px"}}>{this.state.user_name}</h3>
                <div >
                  {this.state.profile ?
                   <ReactRoundedImage image={this.state.profile} style={{ stroke: 'Grey' }} roundedSize="0" imageWidth="150" imageHeight="150" />                  
                  
                  : 
                  <ReactRoundedImage image={profile} style={{ stroke: 'Grey' }} roundedSize="0" imageWidth="150" imageHeight="150" />
                  }
               

                </div>
                
              </div>
   
              <div className="modal-body text-center pb-5 pt-0">
               
               


                <div className="container px-md-4 px-0" style={{height:"121px"}}>
                  <div >
                 <h5>Name :{this.state.user_name}</h5> 
                 <h5>Gender : {this.state.gender}</h5> 
                 <h5>D.O.B : {this.state.dob}</h5> 
                 <h5>Mobile No : {this.state.phone}</h5>
                  </div>
                </div>
                {/* <button type="submit" className="btn btn-primary mt-4"  >Submit</button> */}

              </div>
            </div>
          </div>
        </div>



        <div className="modal fade" id="Addmodal" data-keyboard="false" data-backdrop="static">
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content">
          
            <div className="modal-header border-0 pb-0" style={{height:"83px",justifyContent:"center"}}>
                <button type="button" className="close close_button" onClick={this.hello} data-bs-dismiss="modal">&times;</button>
                <h3 style={{position:"absolute",top:"10px"}}>Add Member</h3>
              </div>
          
              <div className="modal-body text-center pb-5 pt-0">
                <div style={{marginLeft:"40%"}}>
                {/* <input type="file" ref="user_reg_profile" id="user_reg_profile" name="user_reg_profile" style={{display:'none'}} accept="image/*" onChange={this.onSelectFileUserProfile} /> */}
                    <ReactRoundedImage image={profile} style={{ stroke: 'Grey' }} roundedSize="0" imageWidth="65" imageHeight="65" />
                    </div>
                    
                    {/* <a onClick={this.onChangeUserRegProfile}><img src={EditIcon} alt="" class="photo-camera1" /></a> */}
                   
               
                <div className="container px-md-4 px-0">
                  

                          <div>
                       
                            <div className="form-group forms_group">
                              <h6 style={{position:'relative',left:'-38%'}}>Full Name</h6>
                              <input type="text" className="form-control"placeholder="Enter Your Good Name" id=" " name="new_user_name" value={this.state.new_user_name} onChange={this.onChangenew_details}  />
                            </div>

                            <div style={{marginBottom:"35px"}}>
                            <h6 style={{position:'relative',left:'-34%'}}>Select Gender</h6>
                            <input type="radio" value="1" name="new_gender" onChange={this.onChangenew_details} style={{position:'relative',right:"35px"}}/> <label style={{position:'relative',right:'9%'}}>Male</label>
                            <input type="radio" value="2" name="new_gender" onChange={this.onChangenew_details} /> <label style={{position:'relative',left:'5px'}}>Female</label>
                            <input type="radio" value="3" name="new_gender" onChange={this.onChangenew_details} style={{position:'relative',left:"25px"}}/> <label style={{position:'relative',left:'29px'}}>Not to specify</label>
                            </div>



                 

                            <div className="form-group forms_group">
                              <div className="w-100">
                              <h6 style={{position:'relative',left:'-32%'}}>Select Relative</h6>
                                <select className="form-control" id="relatives" name="relatives"
                                  value={this.state.relatives}
                                  onChange={this.onChangenew_details}  required>
                                  <option value="" key="">Select Relative </option>
                                  <option value="child" key="">Add as a Child</option>
                                  <option value="parent" key="">Add as a Parent</option>
                                  <option value="spouse" key="">Add as a Spouse</option>
                                  <option value="siblings" key="">Add as a Siblings</option>
                                  
                                </select>
                              </div>
                            </div>


                            <div className="form-group forms_group">
                            <h6 style={{position:'relative',left:'-35%'}}>Date Of Birth</h6> 
                            <input type="date" class="form-control date-field float-md-right position-relative " placeholder="Select Date Of Birth"  id="new_dob" name="new_dob"   value={this.state.new_dob}
                            onChange={this.onChangenew_details} required />
                            {/* <img src={calendar} alt="" className="calendar_icon" onClick={this.calendaropen}/>
                            {this.state.open ? 
                            <Calendar onChange={this.onChange} value={this.state.value} style={{position:'relative',bottom:'-18px'}} />
                            : <div></div>} */}
                            </div>
                            <div className="form-group forms_group" >
                            <h6 style={{position:'relative',left:'-31%'}}>Mobile Number</h6>
                              <input type="number" className="form-control" pattern="[0-9]{10}" maxlength="10" placeholder="Mobile Number" id="new_mobile_number" name="new_mobile_number"
                                value={this.state.new_mobile_number} onChange={this.onChangenew_details} required />
                            </div>
                           

                          </div>

                           
                      

                    <button type="submit" className="btn btn-primary mt-4" onClick={this.onsubmit}  >Submit</button>
                    <div className="form-group">
                    
                    </div>

                   
                 
                </div>



              </div>
            </div>
          </div>
        </div>

        
        <div className="modal fade" id="AddFirstmodal" data-keyboard="false" data-backdrop="static">
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content">
          
            <div className="modal-header border-0 pb-0" style={{height:"83px",justifyContent:"center"}}>
                <button type="button" className="close close_button" onClick={this.hello} data-bs-dismiss="modal">&times;</button>
                <h3 style={{position:"absolute",top:"10px"}}>Add Parents</h3>
              </div>
          
              <div className="modal-body text-center pb-5 pt-0">
                <div style={{marginLeft:"40%"}}>
                {/* <input type="file" ref="user_reg_profile" id="user_reg_profile" name="user_reg_profile" style={{display:'none'}} accept="image/*" onChange={this.onSelectFileUserProfile} /> */}
                    <ReactRoundedImage image={profile} style={{ stroke: 'Grey' }} roundedSize="0" imageWidth="65" imageHeight="65" />
                    </div>
                    
                    {/* <a onClick={this.onChangeUserRegProfile}><img src={EditIcon} alt="" class="photo-camera1" /></a> */}
                   
               
                <div className="container px-md-4 px-0">
                  

                          <div>
                       
                            <div className="form-group forms_group">
                              <h6 style={{position:'relative',left:'-38%'}}>Full Name</h6>
                              <input type="text" className="form-control"placeholder="Enter Your Good Name" id=" " name="new_user_name" value={this.state.new_user_name} onChange={this.onChangenew_details}  />
                            </div>

                            <div style={{marginBottom:"35px"}}>
                            <h6 style={{position:'relative',left:'-34%'}}>Select Gender</h6>
                            <input type="radio" value="1" name="new_gender" onChange={this.onChangenew_details} style={{position:'relative',right:"35px"}}/> <label style={{position:'relative',right:'9%'}}>Male</label>
                            <input type="radio" value="2" name="new_gender" onChange={this.onChangenew_details} /> <label style={{position:'relative',left:'5px'}}>Female</label>
                            <input type="radio" value="3" name="new_gender" onChange={this.onChangenew_details} style={{position:'relative',left:"25px"}}/> <label style={{position:'relative',left:'29px'}}>Not to specify</label>
                            </div>

                            <div className="form-group forms_group">
                              <div className="w-100">
                              <h6 style={{position:'relative',left:'-32%'}}>Select Relative</h6>
                                <select className="form-control" id="relatives" name="relatives"
                                  value={this.state.relatives}
                                  onChange={this.onChangenew_details}  required>
                                  <option value="" key="">Select Relative </option>
                                  
                                  <option value="parent" key="">Add as a Parent</option>
                                 
                                  
                                </select>
                              </div>
                            </div>


                            <div className="form-group forms_group">
                            <h6 style={{position:'relative',left:'-35%'}}>Date Of Birth</h6> 
                            <input type="date" class="form-control date-field float-md-right position-relative " placeholder="Select Date Of Birth"  id="new_dob" name="new_dob"   value={this.state.new_dob}
                            onChange={this.onChangenew_details} required />
                            {/* <img src={calendar} alt="" className="calendar_icon" onClick={this.calendaropen}/>
                            {this.state.open ? 
                            <Calendar onChange={this.onChange} value={this.state.value} style={{position:'relative',bottom:'-18px'}} />
                            : <div></div>} */}
                            </div>
                            <div className="form-group forms_group" >
                            <h6 style={{position:'relative',left:'-31%'}}>Mobile Number</h6>
                              <input type="number" className="form-control" pattern="[0-9]{10}" maxlength="10" placeholder="Mobile Number" id="new_mobile_number" name="new_mobile_number"
                                value={this.state.new_mobile_number} onChange={this.onChangenew_details} required />
                            </div>
                           

                          </div>

                           
                      

                    <button type="submit" className="btn btn-primary mt-4" onClick={this.onfirssubmit}  >Submit</button>
                    <div className="form-group">
                    
                    </div>

                   
                 
                </div>



              </div>
            </div>
          </div>
        </div>
        
        </React.Fragment>
            
            
        );
    }
}





