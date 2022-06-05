import React, {useState, useEffect, forwardRef} from "react";
import {useParams, useNavigate} from "react-router";
import SortableList, {SortableItem} from 'react-easy-sort'
import arrayMove from 'array-move'
import Col from 'react-bootstrap/Col'
import './styles.css'


export default function EditTest() {

    

    const [test, setTest] = useState({
        name: ""
    });
    const [data, setData] = useState({
        answerType1: new Map,
        answerType2: new Map,
        answerType3: new Map,

    });
    const params = useParams();

    const [points,setPoints] = useState(0);

    const [currentDrag, setCurrentDrag] = useState(0);



    const [items, setItems] = useState([]
    );


    const [currentQuestion, setCurrentQuestion] = useState(0);

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }
    
  

    const handleNextClick = () => {
        const nextQuetions = currentQuestion + 1;

        if (test.questions && nextQuetions < test.questions.length) {

            if(test.questions[nextQuetions].type==2){

              setCurrentItem(items[currentDrag].content2);
              setUnshuffledItems(items[currentDrag].content2.slice());
              setCurrentItem(shuffle(items[currentDrag].content2));

          }  
          if (test.questions[currentQuestion].type == 2) {

              
            if(JSON.stringify(currentItem) === JSON.stringify(UnshuffledItems)){


                setPoints(points+1)

            }
            
            if(test.questions && currentDrag +1< Object.keys(test.questions.filter(item => item.type == 2)).length){
                
                
                setCurrentDrag(currentDrag + 1);
                setCurrentItem(items[currentDrag + 1].content2)
                setUnshuffledItems(items[currentDrag + 1].content2.slice())
                setCurrentItem(shuffle(items[currentDrag + 1].content2))




           
            }

             
            }
            if(test.questions[currentQuestion].type==1){
                

                
                if(data.answerType1.size==test.questions[currentQuestion].correctAnswer.length){
                   const values = Array.from(data.answerType1.values())
                        

                   if(values.sort().join(',')=== test.questions[currentQuestion].correctAnswer.sort().join(',')){
                    setPoints(points+1)

                }
                
            }
            
            setData(data=>({ ...data, answerType1:new Map}));
            document.querySelectorAll('input[type=checkbox]').forEach(item => item.checked = false);

            
        } 
        
        setCurrentQuestion(nextQuetions);
     }


    }

    const handleTextChange = ({currentTarget: input}) => {
        setData(data => ({...data, content: input.value}));
  
    };
    const handleCheckChange = ({currentTarget: input}) => {
        setData(data=>({ ...data,  answerType1:data.answerType1.set(input.name,input.value)}));
        
       
    };
    

    const functionWithSwitch = (test) => {

        switch (test.questions[currentQuestion].type) {
            case 1:
                return <div className="d-flex flex-column">{test.questions[currentQuestion].content}
                    {test.questions[currentQuestion].answer.map((answer, index) => {
                        return (
                            <div className="correctAnswer_container action" key={index}><label>
                                <input type="checkbox" name={answer} key={index} value={index} onChange={handleCheckChange} id="checkbox" />
                               
                               
                                <span>{answer}</span>
                               
                            </label>
                            </div>
                        )
                    })}</div>


            case 2:
                return <SortableList
                    onSortEnd={onSortEnd}
                    className="list"
                    draggedItemClassName="dragged"
                >

                    {currentItem && Array.from(currentItem).map((item) => {
                        return (
                            <SortableItem key={item}>
                                <div className="item">{item}</div>

                            </SortableItem>
                        )
                    })}


                </SortableList>

            case 3:
                return <>
                {test.questions[currentQuestion].content2.map((content2, index) => {
                    return (
                        <div key={index} className="d-flex flex-row">
                                                {test.questions[currentQuestion].correctAnswer.includes(index) ? (
                                                    <input type="text" placeholder="luka" className="login_register_input" key={index}
                                                           onChange={handleTextChange}></input>
                                                ) : (
                                                    <p>{content2}</p>

                                                )}
                                            </div>
                    )
                })}</>
            // return test.questions && Array.from(test.questions).map((test, index) => { 
                //         return (
                //             (test.type == 3 && <p key={index}>
                //                 <h1>

                //                     {test.content2.map((item, index) => {
                //                         return (
                //                             <div>
                //                                 {test.correctAnswer.includes(index) ? (
                //                                     <input type="text" placeholder="luka" className="login_register_input"
                //                                            onChange={handleTextChange}></input>
                //                                 ) : (
                //                                     <p>{test.content2[index]}</p>

                //                                 )}
                //                             </div>


                //                         )
                //                     })}


                //                     {}</h1></p>)
                //         )
                //     }
                // )
              
              
                

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


            setItems(test.questions.filter(item => item.type == 2))


        }

       
        getTest();
        
        return;
    }, []);


    const [currentItem, setCurrentItem] = useState({});

    const [UnshuffledItems, setUnshuffledItems] = useState({});

    const onSortEnd = (oldIndex, newIndex) => {

        setCurrentItem((currentItem) => arrayMove(currentItem, oldIndex, newIndex))
       
    }

   
    


    return (

        <div className="d-flex justify-content-center">
            {console.log(points)}


            <div className="d-flex justify-content-md-center w-50 p-3">
            <Col md={3}>
            {test.questions && functionWithSwitch(test)}

            </Col>
            </div>

            <button className="w-25" onClick={handleNextClick}>Next</button>

        </div>


    );

} 

