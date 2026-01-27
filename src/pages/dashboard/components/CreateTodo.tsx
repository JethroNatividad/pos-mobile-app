import { useForm, SubmitHandler } from "react-hook-form";
import { createTodo, type Todo } from "../../../api/todos";

type Props = {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};
type Inputs = {
  title: string;
};

const CreateTodo = ({ setTodos }: Props) => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const newTodo = await createTodo(data.title);
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      reset();
    } catch (error) {
      console.error("Error creating todo:", error);
      setError("title", {
        type: "manual",
        message: "Failed to create todo. Please try again.",
      });
    }
  };

  return (
    <form className="flex gap-4 my-4" onSubmit={handleSubmit(onSubmit)}>
      <input {...register("title", { required: true })} />
      {errors.title && <span>{errors.title.message}</span>}

      <input
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      />
    </form>
  );
};

export default CreateTodo;
