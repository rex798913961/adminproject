import React,{Component} from 'react';
import api from '../../../api/employee'
import { Table, Divider, Tag } from 'antd';



class Employee extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data:[],
          columns : [
                {
                  title: '姓名',
                  dataIndex: 'name',
                  key: 'name',
                },
                {
                  title: '出生日期',
                  dataIndex: 'birthdate',
                  key: 'birthdate',
                },
                {
                  title: '雇佣日期',
                  dataIndex: 'employmentDate',
                  key: 'employmentDate',
                },
                {
                  title: '店铺',
                  dataIndex: 'store',
                  key: 'store',
                },
                {
                  title: '职位',
                  key: 'jobClassification',
                  dataIndex: 'jobClassification',
                },
                {
                    title: '学历',
                    dataIndex: 'educationBackground',
                    key: 'educationBackground',
                },
                {
                    title: '薪资',
                    dataIndex: 'salary',
                    key: 'salary',
                },
                {
                  title: 'Action',
                  key: 'action',
                  render: (text, record) => (
                    <span>
                      <a>Invite {record.name}</a>
                      <Divider type="vertical" />
                      <a>Delete</a>
                    </span>
                  ),
                },
              ]
        };
      }
    
    async componentDidMount(){
        // 请求员工列表
        let result= await api.findList()
        this.setState({data:result.msg})

        console.log(this);
        // let birthdate=this.state.data.msg[8].birthdate
        // let d=new Date(birthdate)
        // console.log( this.date(d));
        
        
    }
    date(d){
        let year = d.getFullYear()
        let month= d.getMonth()+1<10?'0'+(d.getMonth()+1):d.getMonth()+1
        return year+'-'+month
    }
    
    render(){
        const {data,columns}=this.state
        return (
            <Table columns={columns} dataSource={data} />
        )
    }
}

export default Employee;