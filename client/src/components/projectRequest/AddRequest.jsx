/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import AddContributors from "@/components/contributors/AddContributor";
import axios from "axios";
//import useRequestStore from "@/store/useRequestStore";
import { useToast } from "../ui/use-toast";
import {
  ERROR_ADD_REQUEST,     
  SUCCESS_ADD_REQUEST,
} from "@/lib/constants/constant";
import { addRequest } from "../../lib/constants/string.json";

const AddRequest = ({ currentUser, editData, onSave }) => {
  const user = currentUser;
  const [formData, setFormData] = useState({
     title: "",
     description: "",
     projectType: "library",
     contributors: [],
     motivation: "",
     goal: "",
     targetUsers: "",
     valueToUsers: "",
     potentialRisks: "",
     status: "pending",
     createdBy: "",
  });
  const [errors, setErrors] = useState({}); // State to hold form errors
  const { toast } = useToast();
 
  useEffect(() => {
     if (editData && editData._id) {
       setFormData({
         title: editData.title || "",
         description: editData.description || "",
         projectType: editData.projectType || "library",
         contributors: editData.contributors || [],
         motivation: editData.motivation || "",
         goal: editData.goal || "",
         targetUsers: editData.targetUsers || "",
         valueToUsers: editData.valueToUsers || "",
         potentialRisks: editData.potentialRisks || "",
         createdBy: user.git_username || "",
       });
     }
  }, [editData, user]);
 
  const validateForm = () => {
     let errors = {};
     if (!formData.title) errors.title = "Title is required.";
     if (!formData.description) errors.description = "Description is required.";
     if (!formData.projectType) errors.projectType = "Project type is required.";
     if (!formData.motivation) errors.motivation = "Motivation is required.";
     if (!formData.goal) errors.goal = "Goal is required.";
     if (!formData.targetUsers) errors.targetUsers = "Target User is required.";
     if (!formData.valueToUsers) errors.valueToUsers = "Value to User is required.";
     if (!formData.potentialRisks) errors.potentialRisks = "Potential risk is required.";
     if (!formData.contributors) errors.contributors = "Contributor is required.";

     setErrors(errors);
     return Object.keys(errors).length === 0;
  };
 
  const handleSubmit = (e) => {
     e.preventDefault();
     if (!validateForm()) return; // Validate form before submission
 
     const token = localStorage.getItem("token");
     const config = {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     };
     formData.createdBy = user.git_username || "";
     const onSuccess = () => {
       onSave(formData);
       toast({ title: SUCCESS_ADD_REQUEST });
     };
     const onError = (error) => {
       console.error("Error submitting form:", error);
       toast({
         variant: "destructive",
         title: ERROR_ADD_REQUEST,
       });
     };
 
     if (editData) {
       axios
         .patch(
           `http://localhost:5000/api/v1/requests/${editData._id}`,
           formData,
           config
         )
         .then(onSuccess)
         .catch(onError);
     } else {
       axios
         .post("http://localhost:5000/api/v1/requests", formData, config)
         .then(onSuccess)
         .catch(onError);
     }
  };
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear the error message for the field when the user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear the error message for the field
    }));
  };
 
  const handleContributorsChange = (contributors) => {
     setFormData((prevData) => ({
       ...prevData,
       contributors: contributors.map((contributor) => ({
         login: contributor.login,
         id: contributor.id,
         node_id: contributor.node_id,
         avatar_url: contributor.avatar_url,
       })),
     }));
  };

  return (
    <div className="flex justify-center items-center overflow-x-auto h-90">
      <div style={{ height: "60vh" }} className=" w-full p-8 bg-white">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex">
              <label htmlFor="title" className="block mb-1 font-bold">
                {addRequest.title}
              </label><span className="text-red-500">*</span>
              {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
              </div>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
               
              />
            </div>
            <div>
            <div className="flex">
              <label htmlFor="description" className="block mb-1 font-bold">
                {addRequest.description}
              </label><span className="text-red-500">*</span>
              {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
              </div>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md resize-none focus:outline-none focus:border-blue-500"
                
              />
            </div>
            <div>
            <div className="flex">
              <label htmlFor="projectType" className="block mb-1 font-bold">
                {addRequest.projectType}
              </label><span className="text-red-500">*</span>
              {errors.projectType && <p className="text-red-500 text-xs">{errors.projectType}</p>}
              </div>
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                
              >
                <option value="library">{addRequest.library}</option>
                <option value="tool">{addRequest.tool}</option>
                <option value="framework">{addRequest.framework}</option>
                <option value="plugin">{addRequest.plugin}</option>
                <option value="POC">{addRequest.poc}</option>
              </select>
            </div>
            <div>
            <div className="flex">
              <label htmlFor="motivation" className="block mb-1 font-bold">
                {addRequest.motivation}
              </label><span className="text-red-500">*</span>
              {errors.motivation && <p className="text-red-500 text-xs">{errors.motivation}</p>}
              </div>
              <textarea
                id="motivation"
                name="motivation"
                value={formData.motivation}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md resize-none focus:outline-none focus:border-blue-500"
                
              />
            </div>
            <div>
            <div className="flex">
              <label htmlFor="goal" className="block mb-1 font-bold">
                {addRequest.goal}
              </label><span className="text-red-500">*</span>
              {errors.goal && <p className="text-red-500 text-xs">{errors.goal}</p>}
              </div>
              <textarea
                id="goal"
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md resize-none focus:outline-none focus:border-blue-500"
                
              />
            </div>
            <div>
            <div className="flex">
              <label htmlFor="targetUsers" className="block mb-1 font-bold">
                {addRequest.targetUser}
              </label><span className="text-red-500">*</span>
              {errors.targetUsers && <p className="text-red-500 text-xs">{errors.targetUsers}</p>}
              </div>
              <textarea
                id="targetUsers"
                name="targetUsers"
                value={formData.targetUsers}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md resize-none focus:outline-none focus:border-blue-500"
                
              />
            </div>
            <div>
            <div className="flex">
              <label htmlFor="valueToUsers" className="block mb-1 font-bold">
                {addRequest.value}
              </label><span className="text-red-500">*</span>
              {errors.valueToUsers && <p className="text-red-500 text-xs">{errors.valueToUsers}</p>}
              </div>
              <textarea
                id="valueToUsers"
                name="valueToUsers"
                value={formData.valueToUsers}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md resize-none focus:outline-none focus:border-blue-500"
               
              />
            </div>
            <div>
            <div className="flex">
              <label htmlFor="potentialRisks" className="block mb-1 font-bold">
                {addRequest.risk}
              </label><span className="text-red-500">*</span>
              {errors.potentialRisks && <p className="text-red-500 text-xs">{errors.potentialRisks}</p>}
              </div>
              <textarea
                id="potentialRisks"
                name="potentialRisks"
                value={formData.potentialRisks}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md resize-none focus:outline-none focus:border-blue-500"
              
              />
            </div>
            <div className="flex flex-col">
            <div className="flex">
              <label htmlFor="contributors" className="block mb-1 font-bold">
                {addRequest.contributors}
              </label><span className="text-red-500">*</span>
              {errors.contributors && <p className="text-red-500 text-xs">{errors.contributors}</p>}
              </div>
              <AddContributors
                contributors={formData.contributors}
                onContributorsChange={handleContributorsChange}
                handleChange={handleChange}
                formData={formData}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="bg-primaryText text-white border-none focus:outline-none px-4 py-2"
            >
              {editData ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRequest;
