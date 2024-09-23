import type { Todo as ITodo } from "@/types";
import { v4 as uuidv4 } from "uuid";

export class Todo implements ITodo {
  id: string;
  title: string;
  isCompleted: boolean;

  constructor(title: string, isCompleted = false, id?: string) {
    this.id = id || uuidv4();
    this.title = title;
    this.isCompleted = isCompleted;
  }
}
