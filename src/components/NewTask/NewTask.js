// import { useState } from "react";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "./../../hooks/use-http";

const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

  const transformTask = (taskText, data) => {
    const generatedId = data.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText) => {
    sendTaskRequest(
      {
        url: "https://react-fetch-custom-hook-default-rtdb.firebaseio.com/tasks.json",
        method: "POST",
        // body: JSON.stringify({ text: taskText }),
        body: { text: taskText },
        headers: {
          "Content-Type": "application/json",
        },
      },
      transformTask.bind(null, taskText)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
