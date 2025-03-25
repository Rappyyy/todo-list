import { AnyZodObject, z } from "zod";
import { Validator } from "../../middlewares/Validator";

// Define the schema
export const todoSchema: AnyZodObject = z.object({
  title: z
    .string({
      required_error: "Title is required.",
      invalid_type_error: "Title must be a string.",
    })
    .trim()
    .min(1, "Title cannot be empty")
    .max(255, "Title must not exceed 255 characters"),
}).strict();

// Export middleware
export const validatorTodo = new Validator().execute(todoSchema);
