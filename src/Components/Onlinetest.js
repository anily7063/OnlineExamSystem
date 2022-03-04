import React from 'react';
import Header from './Header';
import Score from './Score';
import { useState,useEffect } from 'react';
import Timer from './Timer';
import { useNavigate } from 'react-router-dom';
import { questions } from './questions';
import { useDispatch } from "react-redux";
import userSlice, { answerOptions, selectUser,selectUserCheck,ansCheckbox } from '../features/userSlice';
import { useSelector } from 'react-redux';

export default function Onlinetest(){
  let [count, setCount] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [anss, setAnss] = useState([]);
  const [anss1, setAnss1] = useState([]);
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
  const [multiple, setMultiple] = useState({});
  const [arr, setArr] = useState([]);
  // const [checks, setChecks] = useState(false);
   
    const [currentQuestion, setCurrentQuestion] = useState(0)  
    const [currentAnswers, setCurrentAnswers] = useState(0)
    const userAns= useSelector(selectUser);
    const useRedux = useSelector(selectUserCheck);
    const corrAns = useRedux.checkBox;


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
        
        setTimeout(() => {
          for (let i = 0; i < unCheck.length; i++) {
            console.log(corrAns[count - 1][i], unCheck[i].value);
            if (corrAns !== []) {
              if (corrAns[count - 1].includes(unCheck[i].value)) {
                unCheck[i].checked = true;
                console.log("checked");
              } else {
                unCheck[i].checked = false;
              }
            }
          }
        },5);
      
       
     
    };
      const nextQuestion = (e) => {
        e.preventDefault();

        let unCheck = document.querySelectorAll("input");
        let sss = [];
        for (let i = 0; i < unCheck.length; i++) {
          if (unCheck[i].checked === true) {
            // console.log(unCheck[i].value);
            // setArr([...arr, unCheck[i].value]);
            sss.push(unCheck[i].value);
          }
        }
        setAnss1({ ...anss1, [count]: sss });
        // console.log(anss1[count][0]);
        setArr(sss);
        console.log(anss1);




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
       
       
        for( let i=0;i<unCheck.length;i ++){
          unCheck[i].checked = false;
        }
        setTimeout(() => {
          for (let i = 0; i < unCheck.length; i++) {
            if (corrAns[count + 1]) {
              if (corrAns[count + 1].includes(unCheck[i].value)) {
                unCheck[i].checked = true;
                console.log(corrAns[count + 1][i]);
              } else {
                unCheck[i].checked = false;
              }
            }
          }
        });

      };


      useEffect(() => {
        // setAnss1({ ...anss1, [count]: arr });
        // console.log(anss1[count][0]);
        // console.log(corrAns[count][0]);
        // setAnss({ ...anss, [count]: multiple });
        dispatch(
          ansCheckbox({
            checkBox: anss1,
          })
        );
    
        console.log(corrAns);
      }, [multiple, anss1, corrAns, dispatch]);
    
     
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
                answer: anss1,
              })
            );
            dispatch(
              ansCheckbox({
                checkBox: null,
              })
            );
            navigate("/Onlinetest/Score");
          };

        const   ansSet = (e, i) => {
           // setAnss([...anss, e.target.value]);
           //  console.log("ss", i);
            // console.log(...anss)
             //console.log([...anss, e.target.value])
             let unCheck = document.querySelectorAll("input");
             const { value } = e.target;
             setMultiple({ ...multiple, [i]: value });
             setAnss({ ...anss, [count]: value });
             //setTheArray(newArr)
            // console.log(prevArray => [ {qn1:([...anss])} ])
            let ind = i;
    setindexVal(ind);
    for (let i = 0; i < unCheck.length; i++) {
      if (unCheck[i].checked !== true) {
        unCheck[i].checked = false;
      } else {
        unCheck[i].checked = true;
      }
    }
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
        <span>Question {count + 1} of &nbsp;</span>{questions.length}
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
      {check && <Score correctAns={anss1} />}
</div>
  )
}
