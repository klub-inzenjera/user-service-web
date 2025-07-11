import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  useCreateTodo,
  useDeleteTodo,
  useTodos,
  useUpdateTodo,
} from "../hooks/api/Todo";

const schema = z.object({
  todo: z.string().min(2, "Todo must be at least 2 characters"),
});

type FormData = z.infer<typeof schema>;

export default function Todos() {
  const { data: todos } = useTodos();
  const { mutate: createTodo } = useCreateTodo();
  const { mutate: deleteTodo } = useDeleteTodo();
  const { mutate: updateTodo } = useUpdateTodo();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    createTodo({ title: data.todo, completed: false });
    reset();
  };

  const toggleTodo = (id: number) => {
    const todo = todos?.find((t) => t.id === id);
    if (todo) {
      updateTodo({
        id: todo.id,
        title: todo.title,
        completed: !todo.completed,
      });
    }
  };

  return (
    <div style={{ width: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            {...register("todo")}
            placeholder="Add a new todo..."
            style={{
              width: "70%",
              padding: "10px",
              marginRight: "10px",
              fontSize: "16px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Add
          </button>
        </div>
        {errors.todo && <p style={{ color: "red" }}>{errors.todo.message}</p>}
      </form>
      <div>
        {todos && todos.length === 0 ? (
          <p style={{ color: "#666", textAlign: "center" }}>
            No todos yet. Add one above!
          </p>
        ) : (
          todos &&
          todos.map((todo) => (
            <div
              key={todo.id}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
                margin: "5px 0",
                border: "1px solid #ddd",
                borderRadius: "4px",
                backgroundColor: todo.completed ? "#f8f9fa" : "white",
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                style={{ marginRight: "10px" }}
              />
              <span
                style={{
                  flex: 1,
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed ? "#666" : "black",
                }}
              >
                {todo.title}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                style={{
                  background: "#dc3545",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {todos && todos.length > 0 && (
        <div style={{ marginTop: "20px", textAlign: "center", color: "#666" }}>
          <p>
            Total: {todos.length} | Completed:{" "}
            {todos.filter((t) => t.completed).length}
          </p>
        </div>
      )}
    </div>
  );
}
