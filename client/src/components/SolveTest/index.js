import React, { useState, useEffect } from "react";
import { useParams, useNavigate} from "react-router";
import SortableList, { SortableItem } from 'react-easy-sort'
import arrayMove from 'array-move'
import './styles.css'


  


   export default function EditTest(){
    
    const [test, setTest] = useState({
      name:""
   });
   const [data, setData] = useState({
		answerType2:new Map,
    answerType3:new Map,
    
	});
   const params = useParams();

   const [items, setItems] = useState([]

   );
   const [currentQuestion, setCurrentQuestion] = useState(0)
   
   const handleNextClick = () => {
      const nextQuetions = currentQuestion + 1;
      if (test.questions && nextQuetions < test.questions.length) {
      setCurrentQuestion(nextQuetions);
      

    }
  }
  console.log(currentQuestion);

    const onSortEnd = (oldIndex, newIndex) => {
        setItems((array) => arrayMove(array, oldIndex, newIndex))
      }


   const handleTextChange = ({ currentTarget: input }) => {
		setData(data=>({ ...data, content:input.value }));
		console.log(data.content)
	};	


  const functionWithSwitch = (test) => {
    
    switch(test.questions[currentQuestion].type){
      case 1:
 
      return test.questions[currentQuestion] &&
                  <>{test.questions[currentQuestion].content}
                  {Array.from(test.questions[currentQuestion]).map((answer, index) => {
                    return(
                    <div key={index}>
                      <input type="radio" name={index} value={answer}/>
                      {console.log(answer)}
                    </div>
                    )
                    })}
                  </>

      
      // (
            // <h1>{test.questions[currentQuestion].content} {test.questions[currentQuestion].answers.map((test,index) =>{
            //   return <div key={index} className="correctAnswer_container action"><label>
            //       <input type="checkbox" key={index} value={index} />
            //       <span>{test[currentQuestion]}</span>
            //       {console.log(test[currentQuestion])}
            //     </label>
            //     </div>
            // }
              
            //   )}</h1>) 
          
        
      case 2: 
        return  <SortableList
        onSortEnd={onSortEnd}
        className="list"
        draggedItemClassName="dragged"
      >
        {items && Array.from(items).map((item) => (
          <SortableItem key={item}>
            <div className="item">{item}</div>
          </SortableItem>
        ))}
       {console.log(items)}
      </SortableList>
      
      case 3:
        return test.questions && Array.from(test.questions).map((test,index) => {
          return (
            (test.type == 3 && <p key={index} >
              <h1>

              {test.content2.map((item,index)=>
              {
                return(
                    <div>
                      {test.correctAnswer.includes(index) ? (
                       <input type="text" placeholder="luka" className="login_register_input" onChange={handleTextChange}></input>
                      ) : (
                        <p>{test.content2[index]}</p>
                        
                      )}
                    </div>
                  
                
                
                )
              })}

              
              
                                          
              
              {}</h1> </p>) 
          )}
        )

      default:
        return "neutral"
    }
  }


    useEffect(() => {
        async function getTest() {
            const id = params.id.toString();
            const response = await fetch(`http://localhost:8080/api/testslist/${id}`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const test = await response.json();

            
            setTest(test);
              
            
            for(let x=0; x<test.questions.length; x++){  
            
              if(test.questions[x].type==2){
         
                setItems([test.questions[x].content2]);
              
              }  
            }
            console.log(items)
                       
        }

        getTest();
        return;
    }, []);

    
    
  

    return (
   
        <div>
          
          
          {test.questions&& functionWithSwitch(test)}    
             
          <button onClick={handleNextClick}>Next</button>
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          {/* <SortableList
      onSortEnd={onSortEnd}
      className="list"
      draggedItemClassName="dragged"
    >
      {items && Array.from(items).map((item) => (
        <SortableItem key={item}>
          <div className="item">{item}</div>
        </SortableItem>
      ))}
    </SortableList>
    { console.log(items)}
                      <th>Pytania w teście</th>
        
    
                      {test.questions && Array.from(test.questions).map((test,index) => {
                        return (
                          (test.type == 1 && <p key={index} ><h1>{test.content}</h1> {test.answer.map((test,index) =>{
                            return <div key={index} className="correctAnswer_container action"><label>
                                <input type="checkbox" key={index} value={index} />
                                <span>{test}</span>
                              </label>
                              </div>
                          }
                            
                            )}</p>) 
                        )}
                      )}
                      {test.questions && Array.from(test.questions).map((test,index) => {
                        return (
                          (test.type == 3 && <p key={index} >
                            <h1>

                            {test.content2.map((item,index)=>
                            {
                              return(
                                  <div>
                                    {test.correctAnswer.includes(index) ? (
                                     <input type="text" placeholder="luka" className="login_register_input" onChange={handleTextChange}></input>
                                    ) : (
                                      <p>{test.content2[index]}</p>
                                      
                                    )}
                                  </div>
                                
                              
                              
                              )
                            })}

                            
                            
                                                        
                            
                            {}</h1> </p>) 
                        )}
                      )}  
                       */}
                      
        </div>

        
      );
       
} 

