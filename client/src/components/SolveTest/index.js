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
        answerType2: new Map,
        answerType3: new Map,

    });
    const params = useParams();

    const [currentDrag, setCurrentDrag] = useState(0);



    const [items, setItems] = useState([]
    );

    const [currentQuestion, setCurrentQuestion] = useState(0);
    

  

    const handleNextClick = () => {
        const nextQuetions = currentQuestion + 1;
        if (test.questions && nextQuetions < test.questions.length) {
          if(test.questions[nextQuetions].type==2){
            setCurrentItem(items[currentDrag].content2)
          }  
          if (test.questions[currentQuestion].type == 2) {
            if(test.questions && currentDrag +1< Object.keys(test.questions.filter(item => item.type == 2)).length){
                setCurrentDrag(currentDrag + 1);
                setCurrentItem(items[currentDrag + 1].content2)
                console.log(currentDrag)
            }
        
        
            }
            setCurrentQuestion(nextQuetions);
        } else {
            
        }
    }


    const handleTextChange = ({currentTarget: input}) => {
        setData(data => ({...data, content: input.value}));
        console.log(data.content)
    };


    const functionWithSwitch = (test) => {

        switch (test.questions[currentQuestion].type) {
            case 1:
                return <div className="d-flex flex-column">{test.questions[currentQuestion].content}
                    {test.questions[currentQuestion].answer.map((answer, index) => {
                        return (
                            <div className="correctAnswer_container action" key={index}><label>
                                <input type="checkbox" name="answer" key={index} value={index}/>
                                <span>{answer}</span>
                                {console.log(answer)}
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

        console.log(items)
        getTest();
        
        return;
    }, []);


    const [currentItem, setCurrentItem] = useState({});


    const onSortEnd = (oldIndex, newIndex) => {

        setCurrentItem((currentItem) => arrayMove(currentItem, oldIndex, newIndex))
        console.log(currentItem)
    }

   
    


    return (

        <div className="d-flex justify-content-center">
            <div className="d-flex justify-content-md-center w-50 p-3">
            <Col md={3}>
            {test.questions && functionWithSwitch(test)}
            </Col>
            </div>

            <button className="w-25" onClick={handleNextClick}>Next</button>

        </div>


    );

} 

