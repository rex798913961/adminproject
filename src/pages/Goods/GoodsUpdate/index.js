import React,{Component} from 'react'
import style from './index.module.less'
import {Card, message} from 'antd'
import goodsApi from '../../../api/goods'
import config from '../../../config/index'
class GoodsAdd extends Component{
    state={
            "title": "默认名称",
            "desc": "好喝",
            "price": 20,
            "seller": "一点点",
            "path": null,
            "state": "1"
        }
    async componentDidMount(){
        let _id = this.props.match.params.id
        let result= await goodsApi.findById(_id)
        let {title,desc,price,seller,path,state} = result.list[0] 
        this.setState({title,desc,price,seller,path,state})
        
        
    }
    update=async ()=>{
        let _id = this.props.match.params.id
        if(!this.state.path){message.info('请先上传图片')}  
        let result = await goodsApi.update(_id,this.state)
        let {err,msg} = result
        if(err){return message.error(msg)}
        this.props.history.replace('/admin/goodsInfo')
    }
    upload=async ()=>{
        // 1.获取图片内容
        let file = this.refs.img.files[0]
        if(!file){return message.error('请选择一张图片')}
        let {type,size} = file
        let types = ['jpg','png','gif','svg',"jpeg"]
        if(size>100000){return message.warning('长传图片尺寸不能超过100M')}
        if(types.indexOf(type.split('/')[1])===-1){return message.warning('只允许图片格式为jpg,png,gif,jpeg,svg')}
        let formdata = new FormData()
        formdata.append('pic',file)
        let {err,msg,path}= await (await goodsApi.uploadImg(formdata)).data
        if(err){return message.error(msg)}
        this.setState({path})
        
    }
    render(){
        let {title,desc,price,seller,path,state} =this.state
        return(
           <div className={style.box}>
           <Card title='商品修改'>
           名称：<input type="text" value={title} onChange={(e)=>{
               this.setState({title:e.target.value})
           }}/><br/>
           描述：<input type="text" value={desc} onChange={(e)=>{
               this.setState({desc:e.target.value})
           }}/><br/>
           价格：<input type="number" value={price} onChange={(e)=>{
               this.setState({price:e.target.value})
           }}/><br/>
           商家：<input type="text" value={seller} onChange={(e)=>{
               this.setState({seller:e.target.value})
           }}/><br/>
           状态：<select value={state} onChange={(e)=>{
               this.setState({state:e.target.value})
           }}>
           <option value="0">经典</option>
           <option value="1">新品</option>
           </select><br/>
           图片: <input type="file" ref="img"/>
           <button onClick={this.upload}>上传</button>
           <img src={config.serverIp+path} alt=""/>
           <br/>
           <button onClick={this.update}>修改</button>
           <button onClick={()=>{
            this.props.history.replace('/admin/goodsInfo')
        }}>返回</button>
           </Card>
           </div>
        )
    }
    componentWillUnmount() {
        // 卸载异步操作设置状态
        this.setState = (state, callback) => {
            return;
        }
    }
}
export default GoodsAdd