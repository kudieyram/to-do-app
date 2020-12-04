import React, {useState } from 'react';
import '../App.css'


function ToDoApp(){

    const [todo, setToDo] = useState('');

    const [todolist, setToDoList] = useState([]);

    const handleChange = (e) => {
        setToDo(e.target.value);
    };

    const dateBuilder = (d) =>{
        let months = 
        ['January', 
         'February', 
         'March', 
         'April', 
         'May', 
         'June', 
         'July', 
         'August', 
         'September', 
         'October', 
         'November',
         'December'];
        
        let days = 
        ['Sunday', 
         'Monday', 
         'Tuesday', 
         'Wednesday', 
         'Thursday', 
         'Friday', 
         'Saturday'];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return  `${day} ${date} ${month} ${year}`

    }

    const AddToDo = () => {
        if(todo !== '') {
            const todoDetails = {
                id: Math.floor(Math.random() * 1000),
                value: todo,
                iscompleted: false,
            };

            setToDoList([...todolist, todoDetails]);

        }
    };

    const deleteToDo = (e, id) => {
        e.preventDeefault();
        setToDoList(todolist.filter((t)=>t.id !== id));
    };


    const todoCompleted = (e, id) => {

        const element = todolist.findIndex((element)=> element.id === id);

        const newToDoList = [...todolist];

        newToDoList[element] = {
            ...newToDoList[element],
            iscompleted: true,
        };

        setToDoList(newToDoList);

    }

    return(

        <div>
            <div className='date'>
                {dateBuilder(new Date())}   
            </div>
            
            <br/>
            
            
            <div className='todo'>
            <input
            type='text'
            name='text'
            id='text'
            onChange={(e) => handleChange(e)}
            placeholder='Add your Todo'
            />

            <button className='add-btn' onClick={AddToDo}>
               Click to Add
            </button>
            <br/>

            {todolist !==[] ? (
                <ul>
                    {todolist.map((i)=>(
                        <li className={i.iscompleted ? 'crossText' : 'listitem'}>
                            {i.value}
                            <button
                            className='completed'
                            onClick = {(e) => todoCompleted(e, i.id)}>
                            Completed
                            </button>   

                            <button
                            className='delete'
                            onclick={(e) => deleteToDo(e, i.id)}>
                                Delete
                            </button> 
                        </li>
                    ))}
                </ul>
            ): null}


        </div>
    </div>
        
    )
}

export default ToDoApp;