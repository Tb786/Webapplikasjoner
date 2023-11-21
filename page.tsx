"use client"
import Answer from "@/components/Answer";
import Header from "@/components/Header";
import Progress from "@/components/Progress";
import Tasks from "@/components/Tasks";
import NumberOfTask from "@/components/NumberOfTask";
import { type Task, type TaskAttempts } from "@/types"
import React, { useState, useEffect } from 'react'
import { fetchTasks} from '../controller/taskController'



const Home = () => {
  const type = ['add', 'multiply', 'subtract', "divide", 'add', 'multiply', 'subtract', "divide", 'add', 'add'];
  const randomIndex = Math.floor(Math.random() * type.length);

  const randomType = type[randomIndex];

  const [tasks, setTasks] = useState<Task[]>([])
  const [ontaskCount, setTaskCount] = useState<string>('')
  const [onCurrentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [onAttempts, setAttempts] = useState<TaskAttempts>({})

  useEffect(() => {
    console.log("kjører")
    
    const getTasks = async () => {
      try {
        console.log("kjører2")
        console.log(fetch);
        const fetchedTasks = await fetchTasks(randomType, ontaskCount);
        setTasks(fetchedTasks);
        console.log(tasks)
  
        const initialAttempts = Object.fromEntries(
          fetchedTasks.map((task: Task) => [task.id, 3])
        );
  
        setAttempts(initialAttempts);
        console.log(initialAttempts);
      } catch (errorFetchingTasks) {

      }
    };
  
    void getTasks();
  }, [randomType, ontaskCount]);
  


const onCorrectAnswer = () => {
  setCurrentTaskIndex(prevIndex => {
    return prevIndex + 1;
  });
};

  const reduceNumAttempts = (taskId: string) => {
    setAttempts((prevAttempts: { [x: string]: number; }) => ({
      ...prevAttempts,
      [taskId]: prevAttempts[taskId] > 0 ? prevAttempts[taskId] - 1 : 0
    }));
  };
  


  return (
    <main>
      <Header />
      <NumberOfTask countValue={ontaskCount} onCountChange={setTaskCount} />
      <Tasks tasks={tasks} currentTaskIndex={onCurrentTaskIndex}>
        {tasks.length > 0 && onCurrentTaskIndex < tasks.length && (
          <>
            <Answer task={tasks[onCurrentTaskIndex]} onSubmitCorrectAnswer={onCorrectAnswer} onSubmitWrongAnswer={() => { reduceNumAttempts(tasks[onCurrentTaskIndex].id); }}
              numAttemptsLeft={onAttempts[tasks[onCurrentTaskIndex].id]} numAttempts={3}
            />
            <Progress tasks={tasks} isCorrectAnswer={onCurrentTaskIndex > 0} currentTaskIndex={onCurrentTaskIndex}setCurrentTaskIndex={setCurrentTaskIndex} />
          </>
        )}
      </Tasks>

    </main>
  );
};


export default Home;