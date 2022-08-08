import React, { Component } from 'react';
import axios from "axios";



export default class extends Component {
    constructor(props){
        super(props)
        this.state={
            rec_frequency:"",
            type:"",
            country:"",
            current_api:[]
        }
     
        this.onchangevalues=this.onchangevalues.bind(this)
        this.sendapi=this.sendapi.bind(this);
    }
   
   

    onchangevalues(e){
        this.setState({current_api:[]})
        this.setState({[e.target.name]:[e.target.value]})
        console.log(e.target.value)

    }
    sendapi(){
          var obj=[];
       if(this.state.type=="current"){
        this.setState({current_api:[]})
      
      
        axios.post( `http://192.168.1.40:12000/weather/currentapi?q=${this.state.country}&aqi=${this.state.aqi}`)
        .then(response => {
            console.log(response.data.location)  
            var obj=[];
            if(response.status==200)    {
                obj=[response.data]
                console.log(obj)

                this.setState({current_api:obj})

            }
        });
        console.log(this.state.current_api)
    }  else if(this.state.type=="forecast"){
        this.setState({current_api:[]})
       

        axios.post( `http://192.168.1.40:12000/weather/weatherforecasetapi?q=${this.state.country}&days=${this.state.days}&aqi=${this.state.aqi}&alerts=${this.state.alerts}`)
        .then(response => {
            if(response.status==200)    {
            console.log(response.data.forecast.forecastday)  
            obj=[response.data]
            console.log(obj)
            var use=response.data.forecast.forecastday
            var objs=[]
        
            for(let i=0;i<use.length;i++){
                console.log(use[i])
                objs.push(use[i].astro)
            }
            console.log(obj)

            this.setState({current_api:objs})
            }
        });
    }
    }

    render(){
        return(
            <div>   
                 <select className="form-control" id="type" name="type" onChange={this.onchangevalues} title="Please Select Country" style={{cursor:'pointer'}}>
                 
                  <option value="">Select any type</option>
                  <option value="current">Current</option>
                  <option value="forecast">Forecast</option>
                               
                </select>

                
                {this.state.type=="current" ? 
                <div>
                
                <input type="text" name="country" id="country" onChange={this.onchangevalues}/>

                <select className="form-control" id="aqi" name="aqi" onChange={this.onchangevalues} title="Please Select Aqi" style={{cursor:'pointer'}}>
                 
                <option value="">Select Aqi</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                             
              </select>
              <button onClick={this.sendapi}>Show Response</button>
              <div>
                {this.state.current_api.length>0 ?  JSON.stringify(this.state.current_api) : <div></div>}
                </div>
              
              </div>
                
                : <div></div>}

                {this.state.type=="forecast" ? 
                <div>
                
                <input type="text" name="country" id="country" onChange={this.onchangevalues}/>

                <select className="form-control" id="days" name="days" onChange={this.onchangevalues} title="Please Select days" style={{cursor:'pointer'}}>
                 
                <option value="">Select Days</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                             
              </select>
              <select className="form-control" id="aqi" name="aqi" onChange={this.onchangevalues} title="Please Select Aqi" style={{cursor:'pointer'}}>
                 
                 <option value="">Select Aqi</option>
                 <option value="yes">Yes</option>
                 <option value="no">No</option>
                              
               </select>
               <select className="form-control" id="alerts" name="alerts" onChange={this.onchangevalues} title="Please Select Alerts" style={{cursor:'pointer'}}>
                 
                 <option value="">Select Alerts</option>
                 <option value="yes">Yes</option>
                 <option value="no">No</option>
                              
               </select>
              <button onClick={this.sendapi}>Show Response</button>
              <div>
                {this.state.current_api.length>0 ?  JSON.stringify(this.state.current_api) : <div></div>}
                </div>
              
              </div>
                
                : <div></div>}
               
               
                </div>
        )
    }


}