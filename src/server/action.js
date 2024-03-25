"use server";

import { ProjectInfo, ServiceList, checkConnection } from "@/utils/seqalize";
import { revalidatePath } from "next/cache";

export async function setNewStatus(data) {
  await checkConnection();
  try {
    await ProjectInfo.create(data);
    revalidatePath("/dashboard");
    return JSON.stringify({
      message: "New project Status Created Successfully",
      status: 201,
    });
  } catch (error) {
    return JSON.stringify({ error: "Faild to set New Status", status: 500 });
  }
}

export async function getStatusByID(id) {
  await checkConnection();
  try {
    const data = await ProjectInfo.findOne({ where: { project_id: id } });
    return data.toJSON();
  } catch (error) {
    return JSON.stringify({ error: error, status: 501 });
  }
}

export async function getAllStatus() {
  await checkConnection();
  try {
    const data = await ProjectInfo.findAll({ order: [['updatedAt', 'DESC']] });
    return data;
  } catch (error) {
    return JSON.stringify({ error: error, status: 500 });
  }
}

export async function getAllStatusByID(id) {
  await checkConnection();
  try {
    const data = await ProjectInfo.findAll({ where: { project_id: id } });
    return data;
  } catch (error) {
    return JSON.stringify({ error: error, status: 500 });
  }
}

export async function updateStatusByID(data, id) {
  try {
    await ProjectInfo.update(data, { where: { project_id: id } });
    revalidatePath("/dashboard");
    return JSON.stringify({
      message: "Project Status Updated Successfully",
      status: 201,
    });
  } catch (error) {
    return JSON.stringify({ error: error, status: 500 });
  }
}

// Add new service.
//
export async function setNewService(data, id) {
  await checkConnection();
  try {
    await ServiceList.create(data);
    revalidatePath(`/dashboard/edit/${id}`);
    return JSON.stringify({
      message: "Service Added",
      status: 201,
    });
  } catch (error) {
    return JSON.stringify({ error: error, status: 500 });
  }
}

export async function deleteService(id, project_id) {
  await checkConnection();
  try {
    await ServiceList.destroy({ where: { id: id } });
    return JSON.stringify({
      message: "Service Added",
      status: 201,
    });
  } catch (error) {
    return JSON.stringify({ error: error, status: 500 });
  }
}

export async function getServices(id) {
  await checkConnection();
  try {
    const data = await ServiceList.findAll({ where: { project_id: id }, order: [['updatedAt', 'DESC']] });
    return data;
  } catch (error) {
    return JSON.stringify({ error: error, status: 500 });
  }
}

export async function updateServiceById(data, id, project_id) {
  try {
    await ServiceList.update(data, { where: { id: id } });
    return JSON.stringify({
      message: "Project Status Updated Successfully",
      status: 201,
    });
  } catch (error) {
    return JSON.stringify({ error: error, status: 500 });
  }
}
