import React, {Component} from 'react';
import '../styles/Main.css';
import {Link} from 'react-router-dom';
import {withRouter} from "react-router";
import {Api} from "../apiHandler/apiHandler";

class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            users: [],
            activities: [],
            idUser: ''
        }
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers(){
        Api.users().then( response =>{
            if(response.status === 200){
                this.setState({
                    users: response.data
                });
            }
        });
    }

    /*getUserActivities = (key) => {
        console.log(key.key)
        console.log(this.state.idUser)
        this.state.idUser=key.key
        axios.get(`http://localhost:8000/userActivities/${this.state.idUser}`).then(activities => {
            this.setState({
                activities: activities.data
            });
            console.log(activities);
        });
    }*/

    render(){
        return(
        <main>
            <section>
                {this.state.users.map(user =>
                    <Link key={user.id} to={`/profile/${user.id}`} className="avatar">
                        <img className="avatar-image" src={user.avatar} alt={"this is avatar image"}/>
                        <h3>{user.name} {user.surname}</h3>
                            {this.state.activities.map(activity =>
                            <h4>
                                {activity.name}
                            </h4>
                            )}
                    </Link>
                )}
            </section>
        </main>
    )
    }
}

export default withRouter(Main);
