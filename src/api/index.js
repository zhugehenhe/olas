import request from "../utils/request";
export const getPhoneCode = (phone) => request.get("/Login/GetCode?phone=" + phone);

export const loginPhone = (params) => request.post("/Login/LoginPhone", params);

export const login = (params) => request.post("/Login/Login", params);

export const registerUser = (params) => request.post("/Login/RegisterUser", params);

export const registerLawyer = (params) => request.post("/Login/RegisterLawyer", params);

export const getUserInfo = () => request.get("/SysUser/GetTokenUserInfo");

export const getUserList = (params) => request.post("/SysUser/GetUserList", params);

export const updateUserStatus = (params) => request.post("/SysUser/UpdateUserStatus", params);

export const addArticle = (params) => request.post("/Article/AddArticle", params);

export const addArticleHit = (params) => request.post("/Article/AddHit", params);

export const addArticlePraise = (params) => request.post("/Article/AddPraise", params);

export const deleteArticle = (params) => request.delete("/Article/DeleteArticle?id=" + params);

export const getArticleDetail = (params) => request.get("/Article/GetArticleDetail?id=" + params);

export const getArticleList = (params) => request.post("/Article/GetArticleList", params);

export const getArticlePraiseList = () => request.get("/Article/GetPraises");

export const getArticlePraise = (params) => request.get("/Article/GetArticlePraise?id=" + params);

export const getArticleHot = (params) => request.post("/Article/GetHotArticleList", params);

export const getLatestArticles = () => request.get("/Article/GetLatestArticles");
export const getCommentList = (params) => request.post("/Comment/GetCommentList", params);

export const getCommentPage = (params) => request.post("/Comment/GetCommentPage", params);

export const deleteComment = (params) => request.delete("/Comment/DeleteComment?id=" + params);

export const createConsulation = (params) => request.post("/Consultation/CreateConsultation", params);

export const newGuid = () => request.get("/Consultation/NewGuid");

export const getConsultationInfoList = (params) => request.post("/Consultation/GetConsultationInfoList", params);
export const getConsultationById = (params) => request.post("/Consultation/GetConsultationById", params);

export const finishConsultation = (params) => request.put("/Consultation/FinishConsultation", params);
export const reviews = (params) => request.post("/Consultation/Reviews", params);

export const getConsultationByUser = (params) => request.post("/Consultation/GetConsultationByUser", params);

export const getConsultationByLawyer = (params) => request.post("/Consultation/GetConsultationByLawyer", params);

export const readConsultation = (params) => request.put("/Consultation/ReadConsultation", params);

export const sendConsultation = (params) => request.post("/Consultation/SendConsultation", params);

export const getEmailSetting = () => request.get("/Email/GetEmailSetting");

export const sendEmailCode = (params) => request.post("/Email/SendEmailCode", params);

export const updateEmailSetting = (params) => request.put("/Email/UpdateEmailSetting", params);

export const addSection = (params) => request.post("/LawSection/AddSection", params);

export const getSectionsPage = (params) => request.post("/LawSection/GetSectionsPage", params);
export const getsubSectionsPage = (params) => request.post("/LawSection/GetsubSectionsPage", params);

export const getSectionById = (params) => request.get("/LawSection/GetSection?id=" + params);
export const getSections = () => request.get("/LawSection/GetSections");

export const updateSection = (params) => request.put("/LawSection/UpdateSection", params);

export const deleteSection = (params) => request.delete("/LawSection/DeleteSection?id=" + params);

export const addLawyerPraise = (params) => request.post("/Lawyer/AddPraise", params);

export const approve = (params) => request.put("/Lawyer/Approve", params);

export const getLawyerInfo = (params) => request.get("/Lawyer/GetLawyerInfo?id=" + params);

export const getHotLawyerBySection = (params) => request.get("/Lawyer/GetHotLawyerBySection?SectionId=" + params);

export const getLawyerInfoBySection = (params) => request.post("/Lawyer/GetLawyerInfoBySection", params);

export const getHotLawyer = () => request.get("/Lawyer/GetHotLawyer");

export const getLawyerInfoByUser = () => request.get("/Lawyer/GetLawyerInfoByUser");

export const getLawyerUser = (params) => request.post("/Lawyer/GetLawyerUser", params);

export const getCount = (params) => request.post("/Lawyer/GetCount", params);

export const getLawyerPraise = (params) => request.get("/Lawyer/GetLawyerPraise?id=" + params);

export const updateLawyerInfo = (params) => request.put("/Lawyer/UpdateLawyerInfo", params);

export const getSysEx = (index, size) => request.get("/Logger/GetSysEx?pageIndex=" + index + "&pagesize=" + size);
export const getSysLogOp = (index, size) => request.get("/Logger/GetSysLogOp?pageIndex=" + index + "&pagesize=" + size);

export const addNotice = (params) => request.post("/Notice/AddNotice", params);

export const getNotice = (params) => request.get("/Notice/GetNotice?id=" + params);

export const getNoticeList = (index, size) => request.post("/Notice/GetNoticeList?pageIndex=" + index + "&pagesize=" + size);

export const updateNotice = (params) => request.put("/Notice/UpdateNotice", params);

export const deleteNotice = (params) => request.delete("/Notice/DeleteNotice?id=" + params);

export const addPostHit = (params) => request.post("/Post/AddHit", params);

export const addPostPraise = (params) => request.post("/Post/AddPraise", params);

export const postSubmit = (params) => request.post("/Post/PostSubmit", params);

export const getLawyerReplyPostList = (params) => request.post("/Post/GetLawyerReplyPostList", params);

export const getPostDetail = (params) => request.get("/Post/GetPostDetail?id=" + params);

export const getPostList = (params) => request.post("/Post/GetPostList", params);

export const deletePost = (params) => request.delete("/Post/DeletePost?id=" + params);

export const addPostComment = (params) => request.post("/Post/AddPostComment", params);
export const getPostPraiseList = () => request.get("/Post/GetPraises");

export const getPostPraise = (params) => request.get("/Post/GetPostPraise?id=" + params);

export const getRegionProvince = () => request.get("/SysRegion/GetRegionProvinces");

export const getProvinceChild = () => request.get("/SysRegion/GetProvinceChild");

export const editUserInfo = (params) => request.put("/SysUser/EditUserInfo", params);

export const editUserPwd = (params) => request.put("/SysUser/EditUserPwd", params);

export const findUserPwd = (params) => request.put("/SysUser/FindUserPwd", params);

export const updateNickName = (params) => request.put("/SysUser/UpdateNickName", params);

export const uploadFile = (params) =>
	request.post("/File/UploadFile", params, {
		headers: {
			Accept: "application/json",
			"Content-Type": "multipart/form-data",
		},
	});
export const uploadSysFile = (params) =>
	request.post("/File/UploadSysFile", params, {
		headers: {
			Accept: "application/json",
			"Content-Type": "multipart/form-data",
		},
	});

export const downFile = (params) => request.get("/File/DownFile?id=" + params);

export const getFileList = (params) => request.post("/File/GetFileList", params);

export const updateFile = (params) => request.put("/File/UpdateFile", params);

export const deleteFile = (params) => request.delete("/File/DeleteFile?id=" + params);

export const consulation = (params) => request.post("/Consultation/Consultation", params);

export const getPostListByUserId = (params) => request.post("/Post/GetPostListByUserId", params);

export const getData = (params) => request.get("/DataAnalysis/GetData?days=" + params);

export const getAddress = () => request.get("/DataAnalysis/GetAddress");
