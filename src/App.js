import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);

  const transformTasks = (fetchedData) => {
      const loadedTasks = [];

      for (const taskKey in fetchedData) {
        loadedTasks.push({ id: taskKey, text: fetchedData[taskKey].text });
      }

      setTasks(loadedTasks);
  }

  const { isLoading, error, sendRequest: fetchTasks } = useHttp()

  useEffect(() => {
    fetchTasks({url: 'https://react-fetch-custom-hook-default-rtdb.firebaseio.com//tasks.json'}, transformTasks);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
