import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

import Main from "./main";
import Mytree from "./mytree";
import React from "react";
import Sample from "./sample";



function App(){
  return(
    <>
    <Router>
      <Routes>
        <Route path="/sample1" element={<Sample/>} />
        <Route path="/mytree" element={<Mytree/>} />
        <Route path="/main/:id/:user_id" element={<Main/>} />
        
       
      </Routes>
    </Router>

    </>
    );

}
export default App;
