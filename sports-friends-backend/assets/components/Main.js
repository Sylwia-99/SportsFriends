import React, {Component} from 'react';
import axios from "axios";
import '../styles/Main.css';
import {Link} from 'react-router-dom';
import {withRouter} from "react-router";

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
        axios.get(`http://localhost:8000/showUsers`).then(users => {
            this.setState({ users: users.data})
        })
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
                    <Link to={`/profile/${user.id}`} className="avatar">
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
