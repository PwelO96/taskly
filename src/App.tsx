import TodoPage from "./pages/TodoPage";
import { TodoProvider } from "./store/TodoContext";

function App() {
  return (
    <TodoProvider>
      <TodoPage />
    </TodoProvider>
  );
}

export default App;
