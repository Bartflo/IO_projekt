import React, { useState, useEffect } from "react";
import { useParams, useNavigate} from "react-router";




  


   export default function EditTest(){
    
    const [test, setTest] = useState({
      name:""
   });
   const [data, setData] = useState({
		answerType2:new Map,
    answerType3:new Map,
    
	});
   const params = useParams();

   const handleTextChange = ({ currentTarget: input }) => {
		setData(data=>({ ...data, content:input.value }));
		console.log(data.content)
	};	


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
        }

        getTest();
        return;
    }, );

  
    
  

    return (
   
        <div>
          
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
                      
                      
        </div>

        
      );
       
} 

