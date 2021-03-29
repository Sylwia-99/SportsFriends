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
        }
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers(){
        axios.get(`http://localhost:8000/api/users`).then(users => {
            this.setState({ users: users.data})
        })
    }
    
    render(){
        return(
        <main>
            <section>
                {this.state.users.map(user =>
                    <Link to={`/Profile/${user.id}`} className="avatar">
                        <img className="avatar-image" src={user.avatar}/>
                        <h3>{user.name} {user.surname}</h3>
                        <h4>{user.activity}</h4>
                    </Link>
                )}
            </section>
        </main>
    )
    }
}

export default withRouter(Main);
