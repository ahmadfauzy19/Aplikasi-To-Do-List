// services/checklistService.js
import api from "../utils/axiosintance";

// GET all checklist
export const getChecklist = async () => {
    try {
        const response = await api.get(`/checklist`);
        return response.data;
    } catch (error) {
        console.error("Error fetching checklist:", error);
        throw error;
    }
};

// CREATE checklist
export const createChecklist = async (name) => {
    try {
        const response = await api.post(`/checklist`, { name });
        return response.data;
    } catch (error) {
        console.error("Error creating checklist:", error);
        throw error;
    }
};

// DELETE checklist by ID
export const deleteChecklist = async (checklistId) => {
    try {
        const response = await api.delete(`/checklist/${checklistId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting checklist:", error);
        throw error;
    }
};

// CREATE item
export const createChecklistItem = async (checklistId, itemName) => {
  try {
    const response = await api.post(`/checklist/${checklistId}/item`, {
      itemName: itemName,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating checklist item:", error);
    throw error;
  }
};

// DELETE item from checklist
export const deleteChecklistItem = async (checklistId, itemId) => {
  try {
    const response = await api.delete(`/checklist/${checklistId}/item/${itemId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting checklist item:", error);
    throw error;
  }
};

// UPDATE item status
export const updateChecklistItemStatus = async (checklistId, itemId, status) => {
  try {
    const response = await api.put(`/checklist/${checklistId}/item/${itemId}`, {
      itemCompletionStatus: status,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating checklist item status:", error);
    throw error;
  }
};

//update item name
export const updateChecklistItemName = async (checklistId, itemId, newName) => {
  try {
    const response = await api.put(`/checklist/${checklistId}/item/rename/${itemId}`, {
      itemName: newName,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating checklist item name:", error);
    throw error;
  }
};
