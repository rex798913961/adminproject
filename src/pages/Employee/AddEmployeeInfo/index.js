import React,{Component} from 'react'
import {Form,Input,DatePicker,Button,Select} from 'antd';
import api from '../../../api/employee'

const { Option } = Select;

class AddEmployeeInfo extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
      }
    
      handleSubmit = e => {
        e.stopPropagation()
        console.log(e);
         this.props.form.validateFields(
            (err, values) => {
                if (err) {
                    return
                }
            console.log(values);
            // 发送请求
            api.add(values).then((res)=>{
                console.log('添加成功',res);
                // 添加成功以后弹出模态框提示
                
                // 跳转到员工列表页面
                this.props.history.replace('/admin/employee')
            })
         })
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
                    rules: [
                    {
                        required: true,
                        message: '请输入出生日期',
                    }
                    ],
                })(<DatePicker/>)}
            </Form.Item>
            
            <Form.Item label="店铺">
                {getFieldDecorator('store', {
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
                添加
              </Button>
            </Form.Item>
          </Form>
        );
      }
}
const AddEmployee = Form.create({ name: 'AddEmployee' })(AddEmployeeInfo)
export default AddEmployee