import React,{Component} from 'react';
import api from '../../../api/employee'
import { Table,Popconfirm, message, Button,Input,Divider} from 'antd';
import style from './index.module.less'
const { Search } = Input;
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
                  sorter: (a, b) => a.name.length - b.name.length,
                },
                {
                  title: '年龄',
                  dataIndex: 'age',
                  key: 'age',
                  sorter: (a, b) => a.age-b.age,
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
                  sorter: (a, b) => a.store.length-b.store.length,
                },
                {
                  title: '职位',
                  key: 'jobClassification',
                  dataIndex: 'jobClassification',
                  sorter: (a, b) => a.jobClassification.length-b.jobClassification.length,
                },
                {
                    title: '学历',
                    dataIndex: 'educationBackground',
                    key: 'educationBackground',
                    sorter: (a, b) => a.educationBackground-b.educationBackground,
                },
                {
                    title: '薪资',
                    dataIndex: 'salary',
                    key: 'salary',
                    sorter: (a, b) => a.salary-b.salary,
                },
                {
                  title: '操作',
                  key: 'action',
                  render: (text, record) => (
                    <div>
                      <Popconfirm
                        title="确定要删除这个员工的信息吗？"
                        onConfirm={()=>{this.del(record._id)}}
                        onCancel={()=>{message.error('取消删除');}}
                        okText="是"
                        cancelText="否"
                      >
                        <Button>删除</Button>
                      </Popconfirm>
                      <Popconfirm
                        title="确定要修改这个员工的信息吗？"
                        onConfirm={()=>{this.props.history.replace('/admin/employeeInfoUpdate/'+record._id)}}
                        onCancel={()=>{message.error('取消修改');}}
                        okText="是"
                        cancelText="否"
                      >
                        <Button>修改</Button>
                      </Popconfirm>
                    </div>
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
        let datalist=result.msg
        let newdatalist =this.newdatalist(datalist)
        this.setState({data:newdatalist})
      }

    async componentDidMount(){
        // 请求员工列表
      this.refreshList()
    }
    newdatalist(datalist){
      let newdatalist=datalist.map((item,index)=>{
        let birthdate=item.birthdate
        let d=new Date(birthdate)
        const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
        let age =this.date(resDate)
        item.age=age
        item.employmentDate=item.employmentDate.substr(0,10)
        item.key=item._id
        return item
      })
      return newdatalist
    }
    p(s) {
      return s < 10 ? '0' + s : s
    }
    date(strBirthday){
      var strBirthdayArr=strBirthday.split("-");
      var d = new Date();
      var yearDiff = d.getFullYear()-strBirthdayArr[0];
      var monthDiff = d.getMonth() + 1-strBirthdayArr[1];
      var dayDiff = d.getDate()-strBirthdayArr[2]; 
      var age=monthDiff<0||(monthDiff===0&&dayDiff<0)?yearDiff-1:yearDiff; //判断有没有到生日,没到就减1
      return age=age<0?0:age;
    }
    
    Search=async(value)=>{
      await this.refreshList()
      let result=this.state.data.filter((item,index)=>{
        return item.name.indexOf(value)!==-1||(item.age+'').indexOf(value)!==-1||item.employmentDate.indexOf(value)!==-1||item.jobClassification.indexOf(value)!==-1||item.educationBackground.indexOf(value)!==-1||(item.salary+'').indexOf(value)!==-1
      })
      if(result.length==0){message.error('没有匹配的数据')}
      this.setState({data:result})
    }

    render(){
        const {data,columns}=this.state
        return (
          <div className={style.box} >
            <div>
              <h2>员工列表</h2>
            <Search
              placeholder="请输入关键字"
              onSearch={value => this.Search(value)}
              style={{ width: 200 }}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="primary" icon="plus" onClick={()=>{
              this.props.history.replace('/admin/addemployee')
            }}>添加员工</Button>
            </div>
            <Divider/>
            <div>
            <Table columns={columns} dataSource={data} className={style.card}/>
          </div></div>)
    }
}

export default Employee;