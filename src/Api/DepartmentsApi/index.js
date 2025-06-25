// src/api/departmentApi.js
import { api } from "../MainApi";

export const departmentApi = api.injectEndpoints({
  endpoints: (build) => ({

    // 1. Get All Departments
    getDepartments: build.query({
      query: () => ({
        url: "departments", // GET /departments
        method: "GET",
      }),
      providesTags: ["Department"],
    }),

    // 2. Get Department by ID
    getDepartmentById: build.query({
      query: (id) => ({
        url: `departments/${id}`, // GET /departments/{id}
        method: "GET",
      }),
      providesTags: ["Department"],
    }),

    // 3. Create New Department
    createDepartment: build.mutation({
      query: (departmentData) => ({
        url: "departments", // POST /departments
        method: "POST",
        body: departmentData,
      }),
      invalidatesTags: ["Department"],
    }),

    // 4. Update Department
    updateDepartment: build.mutation({
      query: ({ id, ...departmentData }) => ({
        url: `departments/${id}`, // PUT /departments/{id}
        method: "PUT",
        body: departmentData,
      }),
      invalidatesTags: ["Department"],
    }),

    // 5. Delete Department
    deleteDepartment: build.mutation({
      query: (id) => ({
        url: `departments/${id}`, // DELETE /departments/{id}
        method: "DELETE",
      }),
      invalidatesTags: ["Department"],
    }),

  }),
  overrideExisting: false,
});

// Export hooks
export const {
  useGetDepartmentsQuery,
  useGetDepartmentByIdQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentApi;
