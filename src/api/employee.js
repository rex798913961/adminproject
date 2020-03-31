import axios from '../utils/axios'

class employee {
    // 员工列表
    findList(){
        let url ='/panda/employee/employeelist'
        return axios.get(url)
    }
    // 添加员工
    add(payload){
        let url ='/panda/employee/employeeadd'
        return axios.post(url,payload)
    }
}

export default new employee()