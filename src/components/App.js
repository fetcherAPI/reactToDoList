import { Footer } from "./Footer/Footer";
import { NewTaskForm } from "./NewTaskForm/NewTaskForm";
import Task from "./Task/Task";
import { TaskList } from "./TaskList/TaskList";

function App() {
  return (
    <section className='todoapp'>
      <header className='header'>
        <h1>todos</h1>
        <NewTaskForm />
      </header>
      <section className='main'>
        <TaskList />
        <Footer />
      </section>
    </section>
  );
}

export default App;
