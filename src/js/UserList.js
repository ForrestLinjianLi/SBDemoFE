import * as React from 'react';
import axios from "axios";
import {
    Input,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead, TableRow
} from "@material-ui/core";
import Button from "@material-ui/core/Button";


export default class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            originData: [],
            userList: [],
            name: "",
            email:"",
            id:1
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        axios.get("http://localhost:8080/users").then((res) => {
            this.setState({userList: res.data,
            originData: res.data})
        console.log(res.data)}).catch((e) => console.log(e))
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        const url = "http://localhost:8080/"

        const deleteRequest = async (e) => {
            await axios.delete(url + "remove?id=" + this.state.id).then((res) => {
                this.setState({userList: res.data})}).catch((e) => console.log(e))
        }

        const addRequest = async (e) => {
            await axios.post(url + "add", {"name": this.state.name,
            "email":this.state.email}).then((res) => {
                this.setState({userList: res.data})}).catch((e) => console.log(e))
        }

        const searchRequest = async (e) => {
            var params = new URLSearchParams();
            params.append("id", this.state.id);
            params.append("name", this.state.name);
            params.append("email", this.state.email);
            await axios.get(url + "search", {params: params}).then((res) => {
                this.setState({userList: res.data})}).catch((e) => console.log(e))
        }


        return (
            <div style={{padding: 10}}>
                <form>
                    <Input placeholder="id" name ="id" value = {this.state.id}
                           onChange={this.handleInputChange}/>
                    <Input placeholder="name" name = "name" value = {this.state.name}
                           onChange={this.handleInputChange}/>
                    <Input placeholder="email" name = "email" value = {this.state.email}
                           onChange={this.handleInputChange}/>
                    <Button onClick={addRequest}>Submit</Button>
                    <Button danger onClick={deleteRequest}>Delete</Button>
                    <Button danger onClick={searchRequest}>Search</Button>
                </form>
                <br/>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Timestamp</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.userList.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="right">{row.name}</TableCell>
                                    <TableCell align="right">{row.email}</TableCell>
                                    <TableCell align="right">{row.timestamp}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}
