import axiosInstance from "../api/config";
import {
  REGISTER_ENDPOINT,
  EMPLOYEES_ENDPOINT,
} from "@/lib/constants/constant";

// Add new employee
export const addEmployee = (employeeData) => {
  return axiosInstance
    .post(REGISTER_ENDPOINT, employeeData)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response.data.error);
    });
};

export const getEmployees = () => {
  return axiosInstance
    .get(EMPLOYEES_ENDPOINT)
    .then((response) => response)
    .catch(() => {
      throw new Error("Error fetching employees");
    });
};

// Delete an employee
export const deleteEmployee = (id) => {
  return axiosInstance
    .delete(`${EMPLOYEES_ENDPOINT}/${id}`)
    .then((response) => response.data)
    .catch(() => {
      throw new Error("Error deleting employee");
    });
};
