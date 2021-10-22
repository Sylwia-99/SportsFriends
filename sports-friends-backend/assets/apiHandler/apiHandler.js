import axios from "axios";

const apiUrl = "http://localhost:8000"
const config = {
    headers: {
        Authorization: localStorage.getItem('token'),
        mercureAuthorization: localStorage.getItem('mercureAuthorization')
    }
}
const id = {id: localStorage.getItem('id')};

export class Api{
    static invalidStateSession(){
        console.log("403 Unauthorized");
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        this.logout();
    }

    static get(url){
        return axios.get(apiUrl + url, config)
            .then( response  => {
                //this.checkStatus(response);
                return response;
            });
    }

    static post(url, body) {
        return axios.post(apiUrl + url, {withCredentials: true, body: body})
            .then( response  => {
                //this.checkStatus(response);
                return response;
            });
    }

    static delete(url){
        return axios.delete(apiUrl + url, config)
            .then( response  => {
                //this.checkStatus(response);
                return response;
            });
    }

    static getWithHeaders(url){
        return axios.get(apiUrl + url, config)
            .then(response =>{
                return {
                    response: response,
                    headers: response.headers
                }
            });
    }

    static register(email, name, surname, password, confirmPassword, postalCode, city, street){
        return this.post("/createUser",{
            email: email,
            name: name,
            surname: surname,
            password: password,
            confirmPassword: confirmPassword,
            postalCode: postalCode,
            city: city,
            street: street,
            config
        });
    }

    static login(email, password){
        return this.post("/loginUser",{
            email: email,
            password: password,
            config
        });
    }

    static logout(){
        return this.post("/api/logoutUser",{
            config
        });
    }

    static user(id) {
        return this.get(`/api/user/${id}`);
    }

    static userFromEmail(email) {
        return this.get(`/userFromEmail/${email}`);
    }

    static users() {
        return this.get(`/users`);
    }

    static currentUser() {
        return this.get(`/api/user/${id.id}`);
    }

    static currentUserActivities(){
        return this.get(`/api/userActivities/${id.id}`)
    }

    static userActivities(id){
        return this.get(`/userActivities/${id}`)
    }

    static activities(){
        return this.get(`/api/activities`)
    }

    static addUserActivity(activity){
        return this.post(`/api/addUserActivity/${id.id}`,{
            addActivity: activity,
            config
        });
    }

    static removeUserActivity(activity){
        return this.post(`/api/removeUserActivity/${id.id}`,{
            removeActivity: activity,
            config
        });
    }

    static changeAvatar(fd){
        return axios.post(`${apiUrl}/changeUserAvatar/${id.id}`, fd
        ).then( response  => {
            //this.checkStatus(response);
            return response;
        });
    }

    static changePassword(currentPassword, password, confirmedPassword){
        return this.post(`/api/changeUserPassword/${id.id}`,{
            currentPassword: currentPassword,
            password: password,
            confirmedPassword: confirmedPassword,
            config
        });
    }

    static changeNameSurname(name, surname){
        return this.post(`/api/changeUserNameSurname/${id.id}`,{
            name: name,
            surname: surname,
            config
        });
    }

    static followers(){
        return this.get(`/api/showFollowerUsers/${id.id}`)
    }

    static watchers(){
        return this.get(`/api/showWatchedUsers/${id.id}`)
    }

    static newWatchedUser(newWatchedUser){
        return this.post(`/api/addNewUserToWatched/${newWatchedUser}`,{
            newWatchedUser: newWatchedUser,
            config
        });
    }

    static removeWatchedUser(removeWatched){
        return this.post(`/api/removeWatchedUser/${removeWatched}`,{
            removeWatched: removeWatched,
            config
        });
    }

    static removeUser(id){
        return this.delete(`/api/users/${id}`,{
            config
        });
    }

    static showUser(id){
        return this.get(`/showSearchedUsers/${id}`,{
            config
        });
    }

    static newMessage(idUserRecipient, contents){
        return this.post(`/api/createMessage`,{
            idUserSender: id.id,
            idUserRecipient: idUserRecipient,
            contents: contents,
            config
        });
    }

    static receivedMessages(){
        return this.get(`/api/getUserReceivedMessages/${id.id}`,{
            config
        });
    }

    static sentMessages(){
        return this.get(`/api/getUserSentMessages/${id.id}`,{
            config
        });
    }

    static createConversation(otherUser){
        return this.post(`/api/newConversation/${id.id}`,{
            otherUser: otherUser,
            config
        });
    }

    static chat(){
        return this.get(`/chat/${id.id}`,{
            config
        });
    }

    static getConversations = () => {
        return this.getWithHeaders(`/api/getConversations/${id.id}`,{
            config
        }).then(res=>{
            return res;
        });
    }

    static getMessages(conversationId){
        const id = localStorage.getItem('id');
        return this.get(`/messages/${conversationId}/${id}`,{
            config
        });
    }

    static sendMessage(content, id){
        return this.post(`/api/newMessage/${id}`,{
            content: content,
            myId: localStorage.getItem('id'),
            config
        });
    }
}