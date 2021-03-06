import React from 'react';
import { questions } from './questions';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

export default function Score({  correctAns, count }) {
  
  const navigate = useNavigate();
 
  const corr = questions.map(({ corrAns }) => corrAns);

   console.log(corr);
    console.log(correctAns);
  //let exactAns = corr.filter((correctAnsss) =>
   // correctAns.includes(correctAnsss)
 // );
   
    let exactAns = [];
    for (let i = 0; i < corr.length - 1; i++) {
      const equals = (correctAns, corr) =>
        JSON.stringify(correctAns) === JSON.stringify(corr);
  
      if (equals(correctAns[i], corr[i])) {
        console.log(correctAns[i]);
        exactAns = [...exactAns, correctAns[i]];
      }
    }
    console.log(exactAns);
    console.log(exactAns.length)
  let perc = (exactAns.length / corr.length) * 100;
  // useEffect(() => {
  //   if (JSON.stringify(corr) === JSON.stringify(correctAns)) {
  //     setScore(perc + "%");
  //   }
  //   // else console.log(exactAns);
  // }, [correctAns, perc, corr, exactAns]);

  return (
    <div className="result">
      <h1>MCQ Exam Completed !!!</h1>
      <h2>{Math.round(perc) + "%"}</h2>
     
      <h3>
        {perc >= 50
          ?
          <div>
           "Congratulation!! You Pass The Exam"<br></br>
         The score you have scored is {exactAns.length}  out of {corr.length}</div>  
          : 
          <div>
             "Better Luck Next Time!! Fail"
             <br></br>
         The score you have scored is {exactAns.length}  out of {corr.length}
          </div>
         }
      </h3>

      <button className="btn btn-success" onClick={() => navigate("/")}>
        Exit
        </button>
    </div>
  );
}
