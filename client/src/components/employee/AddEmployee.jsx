import { useEffect, useState } from "react";
import {
  useEmployeeStore,
  useEmployeeFormStore,
} from "../../store/employeeStore";
import { useToast } from "../ui/use-toast";
import {
  ERROR_ADD_USER,
  ERROR_EDIT_USER,
  SUCCESS_ADD_USER,
  SUCCESS_EDIT_USER,
} from "@/lib/constants/constant";
import { login, common, githubString } from "../../lib/constants/string.json";
import axios from "axios";

const RoleOptions = ["admin", "employee"];

// eslint-disable-next-line react/prop-types
const AddEmployee = ({ editData, onSave }) => {
  const {
    email,
    setEmail,
    gitUsername,
    setGitUsername,
    password,
    setPassword,
    role,
    setRole,
    clearForm,
    addEmployee: addEmployeeAction,
    updateEmployee: updateEmployeeAction,
  } = useEmployeeFormStore(); // Use the Zustand store
  const { toast } = useToast();

  const [submitted, setSubmitted] = useState(false);

  // State variables to hold error messages for each field
  const [errors, setErrors] = useState({
    email: "",
    gitUsername: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    if (editData) {
      setEmail(editData.email || "");
      setGitUsername(editData.git_username || "");
      setRole(editData.role || "");
    }
  }, [editData]);

  const validateEmail = () => {
    if (!email.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required",
      }));
    } else if (
      !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email.trim())
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email format",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "",
      }));
    }
  };

  const validateGitUsername = async () => {
    if (!gitUsername.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        gitUsername: "GitHub Username is required",
      }));
    } else {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${gitUsername.trim()}`
        );
        if (response.status !== 200) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            gitUsername: "GitHub username not found",
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            gitUsername: "",
          }));
        }
      } catch (error) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          gitUsername: "GitHub username not found",
        }));
      }
    }
  };

  const validatePassword = () => {
    if (!password.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "",
      }));
    }
  };

  const validateRole = () => {
    if (!role.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        role: "Role is required",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        role: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    validateEmail();
    await validateGitUsername();
    validatePassword();
    validateRole();

    if (!Object.values(errors).some((error) => error)) {
      const employeeData = { email, git_username: gitUsername, password, role };

      if (editData) {
        updateEmployeeAction(editData, employeeData)
          .then((updatedEmployee) => {
            onSave(updatedEmployee);
            toast({
              title: SUCCESS_EDIT_USER,
            });
          })
          .catch((error) => {
            console.error("Error updating employee:", error);
            toast({
              variant: "destructive",
              title: ERROR_EDIT_USER,
            });
          });
      } else {
        addEmployeeAction(employeeData)
          .then(() => {
            onSave(employeeData);
            clearForm();
            toast({
              title: SUCCESS_ADD_USER,
            });
          })
          .catch((error) => {
            console.error("Error adding employee:", error);
            toast({
              variant: "destructive",
              title: ERROR_ADD_USER,
            });
          });
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-auto">
      <form onSubmit={handleSubmit} className=" sm:w-full">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
          <div>
            <label htmlFor="email" className="block mb-1 font-bold">
              {login.email}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateEmail}
              className="w-full px-3 py-2 border rounded-md"
              
            />
            {submitted && <div className="text-red-500">{errors.email}</div>}
          </div>
          <div>
            <label htmlFor="gitUsername" className="block mb-1 font-bold">
              {githubString.githubUsername}
            </label>
            <input
              type="text"
              id="gitUsername"
              value={gitUsername}
              onChange={(e) => setGitUsername(e.target.value)}
              onBlur={validateGitUsername}
              className="w-full px-3 py-2 border rounded-md"
              
            />
            {submitted && (
              <div className="text-red-500">{errors.gitUsername}</div>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 font-bold">
              {login.password}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={validatePassword}
              className="w-full px-3 py-2 border rounded-md"
              
            />
            {submitted && (
              <div className="text-red-500">{errors.password}</div>
            )}
          </div>
          <div>
            <label htmlFor="role" className="block mb-1 font-bold">
              {common.role}
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              onBlur={validateRole}
              className="w-full px-3 py-2 border rounded-md"
             
            >
              <option value="">{common.selectRole}</option>
              {RoleOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {submitted && <div className="text-red-500">{errors.role}</div>}
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <button
            type="submit"
            className="bg-primaryText text-white border-none focus:outline-none"
          >
            {editData ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
