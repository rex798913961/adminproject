import React,{Component} from 'react';
import api from '../../../api/employee'

class Employee extends Component{
    async componentDidMount(){
        // 请求员工列表
        let result= await api.findList()
        console.log(result)
    }
    render(){
        return (
            <div>这是员工列表界面</div>
        )
    }
}

export default Employee;