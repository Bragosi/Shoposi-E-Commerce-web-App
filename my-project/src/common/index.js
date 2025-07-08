const backendDomain = "http://localhost:8080"
const summaryApi ={
    signUp:{
        url: `${backendDomain}/api/signUp`,
        method : "post"
    },
    signIn:{
        url:`${backendDomain}/api/login`,
        method: "post"
    },
    currentUser :{
        url:`${backendDomain}/api/userDetails`,
        method: "get"
    }
}

export default summaryApi