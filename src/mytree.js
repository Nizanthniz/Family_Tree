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
{/* <svg  width="24" height="24" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 1591.158 1699.858" enable-background="new 0 0 1591.158 1699.858" xml:space="preserve"><g><path d="M1544.421,1649.929c-55.512-26.27-257.99-152.745-292.701-346.809c144.773-131.753,235.646-321.703,235.646-532.876c0-397.819-322.496-720.315-720.315-720.315S46.736,372.425,46.736,770.244s322.496,720.315,720.315,720.315c101.726,0,198.525-21.092,286.269-59.133h0C1190.734,1565.7,1299.361,1590.704,1544.421,1649.929z"/><path fill="#FFFFFF" enable-background="new    " d="M1193.39,544.472c-24.343-94.788-100.899-154.815-206.219-166.198c-9.155-0.989-18.058-1.469-26.739-1.469c-91.551,0-156.69,53.463-193.932,126.534c-38.906-76.261-105.318-125.724-202.15-125.722c-6.408,0-12.957,0.217-19.632,0.657c-96.308,6.348-179.041,63.939-205.107,176.203c-46.888,201.946,175.045,408.381,426.89,609.207C1034.332,964.221,1243.289,738.771,1193.39,544.472z"/></g></svg> */}
var webcallMeIcon = '<svg version="1.0"  width="24" height="24"  xmlns="http://www.w3.org/2000/svg" width="980.000000pt" height="908.000000pt" viewBox="0 0 980.000000 908.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,908.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"><path d="M4495 9059 c-1284 -95 -2444 -592 -3289 -1409 -659 -638 -1063 -1416 -1178 -2270 -29 -217 -31 -652 -5 -855 113 -853 481 -1600 1103 -2237 l114 -117 -145 -1077 c-80 -592 -144 -1078 -143 -1080 2 -1 419 263 927 587 l923 590 136 -49 c646 -234 1264 -342 1957 -342 261 0 438 10 665 36 816 94 1593 360 2247 770 889 558 1517 1328 1813 2224 372 1123 161 2327 -580 3315 -827 1103 -2197 1804 -3745 1915 -162 11 -639 11 -800 -1z m800 -450 c1653 -123 3087 -997 3725 -2269 412 -821 447 -1744 100 -2589 -481 -1171 -1658 -2075 -3104 -2385 -170 -37 -427 -76 -636 -98 -167 -17 -784 -17 -950 0 -487 50 -899 141 -1302 287 l-152 56 -202 -20 -201 -20 -521 -330 c-425 -268 -522 -326 -522 -309 0 11 36 282 80 602 l80 582 -65 188 -65 188 -112 117 c-252 264 -417 482 -581 772 -389 685 -510 1479 -341 2231 235 1044 1008 1956 2119 2498 456 222 894 361 1400 444 138 22 388 51 510 59 127 8 614 6 740 -4z"/> <path d="M2645 5690 c-118 -24 -245 -97 -320 -184 -202 -237 -189 -576 29 -791 176 -173 437 -214 666 -103 94 45 206 160 253 258 107 228 66 479 -108 656 -136 139 -334 201 -520 164z"/> <path d="M4892 5680 c-198 -52 -346 -198 -410 -404 -25 -82 -22 -235 8 -325 114 -354 530 -510 848 -319 118 72 217 202 258 343 25 85 23 230 -5 315 -95 298 -400 468 -699 390z"/> <path d="M7170 5680 c-185 -50 -343 -204 -401 -390 -27 -85 -29 -232 -4 -315 53 -185 191 -332 371 -396 82 -30 227 -36 318 -15 141 33 262 118 344 239 71 106 97 196 96 327 -1 89 -5 117 -29 180 -49 133 -123 227 -237 301 -127 81-309 109 -458 69z"/></g></svg>';
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
        this.chat=this.chat.bind(this);
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
                  myMenuItem:{text:"Invite",  icon: FamilyTree.icon.share(24, 24, '#aeaeae'), onClick:this.invite_form },
                  // chat:{text:"Chat",  icon: webcallMeIcon, onClick:this.chat }
                  
              },
            tags: {
              overrideMenu: {
                  nodeMenu: {
                    edit: { text: "Add", icon: FamilyTree.icon.add(24, 24, '#aeaeae'), onClick:this.add_form },                   
                    details: {text:"View Details",onClick:this.hi},
                    myMenuItem:{text:"Invite",  icon: FamilyTree.icon.share(24, 24, '#aeaeae'), onClick:this.invite_form },
                    chat:{text:"Chat",  icon: webcallMeIcon, onClick:this.chat }
                  
                  }
              }
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
                  myMenuItem:{text:"Invite",  icon: FamilyTree.icon.share(24, 24, '#aeaeae'), onClick:this.invite_form },
                  // chat:{text:"Chat",  icon: webcallMeIcon, onClick:this.chat }
                  
              },
              tags: {
                overrideMenu: {
                    nodeMenu: {
                      details: {text:"View Details",onClick:this.hi},
                      myMenuItem:{text:"Invite",  icon: FamilyTree.icon.share(24, 24, '#aeaeae'), onClick:this.invite_form },
                      chat:{text:"Chat",  icon: webcallMeIcon, onClick:this.chat }
                    
                    }
                }
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
         async chat(nodeId){
          await family_details_service.getuseridbynodeid(nodeId,this.props.user_id).then(
            async response => {
           
             if(response.status=200){
                        
            
              window.open('https://familytree1.page.link/tree')
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





