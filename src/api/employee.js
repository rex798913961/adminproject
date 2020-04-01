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
    // 删除员工
    del(_id){
        let url = '/panda/employee/delemployee'
        return axios.delete(url,{data:{_id}})
    }
    // 更新员工信息
    update(obj){
        let url = '/panda/employee/updateemployee'
        return axios.put(url,obj)
    }
    // 根据字段搜索
    findone(_id){
        let url = '/panda/employee/employeeone'
        return axios.get(url,{params:{_id}})
    }
}

export default new employee()