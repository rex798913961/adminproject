import React,{Component} from 'react'
import {Form,Input,DatePicker,Button} from 'antd';

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
            xs: { span: 24 },
            sm: { span: 16 },
          },
        };
        return (
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="姓名">
              <Input/>
            </Form.Item>
            <Form.Item label="邮箱">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input />)}
        </Form.Item>
            
            <Form.Item label='出生日期' >
                <DatePicker onChange={(e)=>{console.log(e._d)}} />
            </Form.Item>


            <Form.Item>
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