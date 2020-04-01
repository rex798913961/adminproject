import React,{Component} from 'react';
import api from '../../../api/employee'
import { Table,Popconfirm, message} from 'antd';


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
                  title: '操作',
                  key: 'action',
                  render: (text, record) => (
                      <Popconfirm
                        title="确定要删除这个员工的信息吗？"
                        onConfirm={()=>{
                          this.del(record._id)

                        }}
                        onCancel={()=>{
                          message.error('取消删除');
                        }}
                        okText="Yes"
                        cancelText="No"
                      >
                        <a href="#">删除</a>
                      </Popconfirm>
                  ),
                },
              ]
        };
      }
    
      del=async (_id)=>{
        // 获取id 掉接口 刷新界面
        console.log('删除',_id)
        let result =await api.del(_id)
        console.log(result);
        
        // 根据结果进行
        // if(result.code !==0){ return false }
        this.refreshList() 
      }
      //刷新列表数据
   refreshList=async ()=>{
    let result= await api.findList()
    this.setState({data:result.msg})
   }  
    async componentDidMount(){
        // 请求员工列表
        let result= await api.findList()
        this.setState({data:result.msg})

        console.log(this.state.data);
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