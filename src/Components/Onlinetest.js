import React from 'react';
import Header from './Header';
import Score from './Score';
import { useState } from 'react';
import Timer from './Timer';
import { useNavigate } from 'react-router-dom';
import { questions } from './questions';
import { useDispatch } from "react-redux";
import userSlice, { answerOptions, selectUser } from '../features/userSlice';
import { useSelector } from 'react-redux';

export default function Onlinetest(){
  let [count, setCount] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [anss, setAnss] = useState([]);
  const [theArray, setTheArray] = useState();
  const [check, setCheck] = useState(false);
  
  const [nxtFin, setNxtFin] = useState(false);
  // const radiosWrapper = useRef();
  // const [result, setResult] = useState("");
  const [time, setTime] = useState("60 sec");
  const [min, setMin] = useState(2);
  const [warn, setWarn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [indexVal, setindexVal] = useState(false);
  // const [checks, setChecks] = useState(false);
   
    const [currentQuestion, setCurrentQuestion] = useState(0)  
    const [currentAnswers, setCurrentAnswers] = useState(0)
    const userAns= useSelector(selectUser);
    
    const prevQuestion = (e) => {
      e.preventDefault();
      setCount(count - 1);
      setNxtFin(false);
      // console.log(count);
      if (count <= 1) {
        setDisabled(true);
        setNextDisabled(false);
      }
      if (count < questions.length) {
        setNextDisabled(false);
      }


      
        let unCheck = document.querySelectorAll("input");
        for( let i=0;i<unCheck.length;i ++){
          unCheck[i].checked = false;
        }
        setTimeout(() => {
          for (let i = 0; i < unCheck.length; i++) {
            if (userAns.answer[count - 1] === unCheck[i].value) {
              unCheck[i].checked = true;
            } else {
              unCheck[i].checked = false;
            }
          }
        },5);
      
       
     
    };
      const nextQuestion = (e) => {
        e.preventDefault();
        setCount(count + 1);
        setDisabled(false);
        // if (unCheck.checked) {
        //   alert("hey");
        // }
        // console.log(count);
        if (count >= questions.length - 2) {
          setNxtFin(true);
          // setNextDisabled(true);
        }
       // let newArr1 = [...anss];
       // setTheArray(newArr1)
       //  console.log(newArr1)
        let unCheck = document.querySelectorAll("input");
       
        for( let i=0;i<unCheck.length;i ++){
          unCheck[i].checked = false;
        }
        setTimeout(() => {
          for (let i = 0; i < unCheck.length; i++) {
            if (userAns.answer[count + 1] === unCheck[i].value) {
              unCheck[i].checked = true;
            } else {
              unCheck[i].checked = false;
            }
          }
        });

        dispatch(
          answerOptions({
            answer: anss,
          })
        );
      
      };
    
     
        const [score, setScore] = useState(0)
        const [showScore, setShowScore] = useState(false)
          const [selected, setSelected] = useState();
          let onTimesup = () => {
           navigate("/");
          }

          

          const corr = questions.map(({ corrAns }) => corrAns);
          const corrAnss = () => {
             console.log(anss);
            // console.log("ss");
            // console.log("ssss", corr[0]);
            if (corr === anss) {
              return console.log("correct");
            }
            dispatch(
              answerOptions({
                answer: anss,
              })
            );
            navigate("/Onlinetest/Score");
          };

        const   ansSet = (e, i) => {
           // setAnss([...anss, e.target.value]);
           //  console.log("ss", i);
            // console.log(...anss)
             //console.log([...anss, e.target.value])
             const{name , value} = e.target;
    setAnss({...anss, [name]:value});
             //setTheArray(newArr)
            // console.log(prevArray => [ {qn1:([...anss])} ])
            let ind = i;
            // console.log(ind);
            setindexVal(ind);
          };

  return(
   
    <div>
<Header/>

<>
<div>
<h1>Multiple Choice Questions</h1>
<div className='timer'>
<Timer
            onTimesup={onTimesup}
           duration={1300}
         />
    <div className='que'>
        <span>Question {currentQuestion + 1} of &nbsp;</span>{questions.length}
    </div>
   
</div>
</div>
</>
{check || (
        
          <div className="answers">
             <h4>{questions[count].question}</h4>
             <div className='answ'>
            {questions[count].answerOptions.map((answers, i) => {
              return (
                <div className="ans" key={i}>
                  <input
                    type="checkbox"
                    value={answers}
                    name={`${count}`}
                    className=" success"
                    onClick={(e) => ansSet(e, i)}
                  />
                  {answers}
                </div>
              );
            })}
</div>
<div className="mcq-btn">
            <button
              onClick={prevQuestion}
              disabled={disabled}
              className="btn btn-success"
            >
              Prev
            </button>
            {nxtFin && (
              <button
                onClick={() => {
                  setCheck(true);
                  corrAnss();
                }}
                className="btn btn-primary"
                disabled={nextDisabled}
              >
                Finish
              </button>
            )}
            {!nxtFin && (
              <button
                onClick={nextQuestion}
                className="btn btn-primary"
                disabled={nextDisabled}
              >
                Next
              </button>
            )}
          </div>
          </div>
      )}  
      {check && <Score correctAns={anss} />}
</div>
  )
}
