// src/api/taskApi.js
import { api } from "../MainApi";

export const taskApi = api.injectEndpoints({
  endpoints: (build) => ({
    // 1. Get All Tasks
    getTasks: build.query({
      query: ({ page, limit, search }) => ({
        url: "tasks", // Example: GET /tasks
        method: "GET",
        params: {
          page,
          limit,
          search,
        },
      }),
      providesTags: ["Task"],
    }),

    // 2. Get Task by ID
    getTaskById: build.query({
      query: (id) => ({
        url: `tasks/${id}`, // Example: GET /tasks/{id}
        method: "GET",
      }),
      providesTags: ["Task"],
    }),

    // 3. Create New Task
    createTask: build.mutation({
      query: (taskData) => ({
        url: "tasks", // Example: POST /tasks
        method: "POST",
        body: taskData,
      }),
      invalidatesTags: ["Task"],
    }),

    // 4. Update Task
    updateTask: build.mutation({
      query: ({ id, ...taskData }) => ({
        url: `tasks/${id}`, // Example: PUT /tasks/{id}
        method: "PUT",
        body: taskData,
      }),
      invalidatesTags: ["Task"],
    }),

    // 5. Delete Task
    deleteTask: build.mutation({
      query: (id) => ({
        url: `tasks/${id}`, // Example: DELETE /tasks/{id}
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
  }),
  overrideExisting: false,
});

// Export hooks
export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
