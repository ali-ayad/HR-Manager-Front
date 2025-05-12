// src/api/employeeApi.js
import { api } from "../MainApi";

export const employeeApi = api.injectEndpoints({
  endpoints: (build) => ({
    // 1. Get All Employees
    getEmployees: build.query({
      query: ({ page, limit, search }) => ({
        url: "employees", // Example: GET /Employee
        method: "GET",
         params: {
          page,
          limit,
          search,
        
        },
      }),
      providesTags: ["Employee"],
    }),

    // 2. Get Employee by ID
    getEmployeeById: build.query({
      query: (id) => ({
        url: `employees/${id}`, // Example: GET /Employee/{id}
        method: "GET",
      }),
      providesTags: ["Employee"],
    }),

    // 3. Create New Employee
    createEmployee: build.mutation({
      query: (employeeData) => ({
        url: "employees", // Example: POST /Employee
        method: "POST",
        body: employeeData,
      }),
      invalidatesTags: ["Employee"],
    }),

    // 4. Update Employee
    updateEmployee: build.mutation({
      query: ({ id, ...employeeData }) => ({
        url: `employees/${id}`, // Example: PUT /Employee/{id}
        method: "PUT",
        body: employeeData,
      }),
      invalidatesTags: ["Employee"],
    }),

    // 5. Delete Employee
    deleteEmployee: build.mutation({
      query: (id) => ({
        url: `employees/${id}`, // Example: DELETE /Employee/{id}
        method: "DELETE",
      }),
      invalidatesTags: ["Employee"],
    }),
  }),
  overrideExisting: false,
});

// Export hooks
export const {
  useGetEmployeesQuery,
  useGetEmployeeByIdQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi;
