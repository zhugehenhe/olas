import request from "../utils/request";
export const newGuid = () => request.get("/Consultation/NewGuid");
export const getPhoneCode = (phone) =>
	request.get("/Login/GetCode?phone=" + phone);

export const loginPhone = (params) => request.post("/Login/LoginPhone", params);

export const login = (params) => request.post("/Login/Login", params);

export const registerUser = (params) =>
	request.post("/Login/RegisterUser", params);

export const registerLawyer = (params) =>
	request.post("/Login/RegisterLawyer", params);
