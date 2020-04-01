import React,{Component} from 'react'
import {Form,Input,DatePicker,Button,Select, message} from 'antd';
import api from '../../../api/employee'

import moment from 'moment';
const { Option } = Select;

class EmployeeInfoupdate extends Component {
    constructor(props){
        super(props);
        this.state={
            _id:"",
            name: "张志锋",
            phonenum: "18027410173",
            birthdate: "2020-04-15T07:10:31.416Z",
            employmentDate: "2020-04-22T07:10:34.016Z",
            store: "北京路店",
            jobClassification: "副店长",
            educationBackground: "研究生",
            salary: 12000
        }
    }
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
      }
    handleSubmit = e => {
    e.stopPropagation()
        this.props.form.validateFields(
        (err, values) => {
            if (err) {
                return
            }
        console.log(values);
        // 发送请求
        const {_id}=this.state
        let obj ={_id,...values}
        
        api.update(obj).then((res)=>{
            message.success('修改成功')
            // 修改成功以后弹出模态框提示
            // 跳转到员工列表页面
            this.props.history.replace('/admin/employee')
        })
        })
    }
      
      async componentDidMount(){
          let {_id}=this.props.match.params
        //   通过id获取信息
        let result=await  api.findone(_id)
        console.log(result);

        let {
       
        name,
        phonenum,
        birthdate,
        employmentDate,
        store,
        jobClassification,
        educationBackground,
        salary}=result.msg[0]

        this.setState({
            _id,
            name,
            phonenum,
            birthdate,
            employmentDate,
            store,
            jobClassification,
            educationBackground,
            salary})
        console.log(this.state);
            
      }


      
      render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
          },
          wrapperCol: {
            xs: { span: 16 },
            sm: { span: 8 },
          }
        };
        const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 16,
                offset: 8,
              },
            },
          };
        return (
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="姓名">
                {getFieldDecorator('name', {
                    initialValue:this.state.name,
                    rules: [
                    {
                        required: true,
                        message: '请输入姓名',
                    }
                    ],
                })(<Input />)}
            </Form.Item>

            <Form.Item label="联系方式">
                {getFieldDecorator('phonenum', {
                     initialValue:this.state.phonenum,
                    rules: [
                    {
                        message: '无效的手机号码',
                    },
                    {
                        required: true,
                        message: '请输入手机号',
                    }
                    ]
                })(<Input />)}
            </Form.Item>
            
            <Form.Item label='出生日期' >
                {getFieldDecorator('birthdate', {
                    initialValue: moment(this.state.birthdate, 'YYYY-MM-DD'),
                    rules: [
                    {
                        required: true,
                        message: '请输入出生日期',
                    }
                    ],
                })(<DatePicker/>)}
            </Form.Item>
            
            <Form.Item label='雇佣日期' >
                {getFieldDecorator('employmentDate', {
                    initialValue: moment(this.state.employmentDate, 'YYYY-MM-DD'),
                    rules: [
                    {
                        required: true,
                        message: '请输入雇佣日期',
                    }
                    ],
                })(<DatePicker/>)}
            </Form.Item>

            <Form.Item label="店铺">
                {getFieldDecorator('store', {
                       initialValue:this.state.store,
                    rules: [
                    {
                        message: '无效的店铺地址',
                    },
                    {
                        required: true,
                        message: '请选择店铺地址',
                    }
                    ],
                })(<Select>
                    <Option value="北京路店">北京路店</Option>
                    <Option value="天河店">天河店</Option>
                    <Option value="越秀店">越秀店</Option>
                </Select>)}
            </Form.Item>

            <Form.Item label="职位">
                {getFieldDecorator('jobClassification', {
                    initialValue:this.state.jobClassification,
                    rules: [
                    {
                        message: '无效的职位',
                    },
                    {
                        required: true,
                        message: '请选择职位',
                    }
                    ],
                })(<Select>
                    <Option value="店长">店长</Option>
                    <Option value="副店长">副店长</Option>
                    <Option value="正式工">正式工</Option>
                    <Option value="试用工">试用工</Option>
                </Select>)}
            </Form.Item>
            
            <Form.Item label="学历">
                {getFieldDecorator('educationBackground', {
                     initialValue:this.state.educationBackground,
                    rules: [
                    {
                        message: '无效的学历',
                    },
                    {
                        required: true,
                        message: '请选择学历',
                    }
                    ],
                })(<Select>
                    <Option value="研究生">研究生</Option>
                    <Option value="本科">本科</Option>
                    <Option value="专科">专科</Option>
                    <Option value="高中及以下">高中及以下</Option>
                </Select>)}
            </Form.Item>

            <Form.Item label="薪资">
                {getFieldDecorator('salary', {
                    initialValue:this.state.salary,
                    rules: [
                    {
                        required: true,
                        message: '请输入薪资',
                    }
                    ],
                })(<Input />)}
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                修改
              </Button>
            </Form.Item>
          </Form>
        );
      }
}
const updateEmployeeInfo = Form.create({ name: 'EmployeeInfoupdate' })(EmployeeInfoupdate)
export default updateEmployeeInfo
