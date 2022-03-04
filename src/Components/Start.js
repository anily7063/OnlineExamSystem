import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import Timer from './Timer';

export default function Start() {
  return(

      <div>
          <Header/>
          
<div className="info_box">
        <div className="info-title"><span>Some Rules of this Quiz</span></div>
        <div className="info-list">
            <div className="info">1. You will have only  15 seconds per each question.</div>
            <div className="info">2. Once you select your answer, it can't be undone.</div>
            <div className="info">3. You can't select any option once time goes off.</div>
            <div className="info">4. You can't exit from the Quiz while you're playing.</div>
            <div className="info">5. You'll get points on the basis of your correct answers.</div>
        </div>
        <div className="btn">
           
            <Link to="/Onlinetest">
     <button className='btn btn-primary' >
          Start
     </button>
 </Link>
        </div>
    </div>
    </div>
  ) 
}

