import React,{Component} from 'react'
import style from './index.module.less'
import { Card,Table, message,Tag, Button,Pagination ,Popconfirm} from 'antd';
import goodsApi from '../../../api/goods'
import config from '../../../config/index'
import XLSX from 'xlsx'
class GoodsList extends Component{
    state=
        {
        page:1,
        pageSize:3,
        list:[],
        allCount:0,
        columns:[
             {title: 'id',dataIndex: '_id',key: '_id',width:150,},
             {title: '名称',dataIndex: 'title',key: 'title',width:120},
             {title: '描述',dataIndex: 'desc',key: 'desc',width:120},
             {title: '价格',dataIndex: 'price',key: 'price',width:50},
             {title: '缩略图',dataIndex: 'path',key: 'path',width:150,render(path)  {return (<img src={config.serverIp+path} alt="图片" width='100' height='50'/>)}},
             {title: '商家',dataIndex: 'seller',key: 'seller',width:120},
             {title: '经典/新品',dataIndex: 'state',key: 'state',width:80,render(state){
                 let obj = {
                     0: {
                         color: '#2db7f5',
                         msg: '经典'
                     },
                     1: {
                         color: '#f50',
                         msg: '新品'
                     }
                 }
                 return(
                <Tag color={obj[state].color}>{obj[state].msg}</Tag>
                 )   
             }},
             {title: '操作',key: 'action',width:160,render:(recode)=>{
                 return(
                     <div>
                     <Button type='primary' size='small' onClick={()=>{
                         this.props.history.replace('/admin/goodsUpdate/'+recode._id)
                     }}>修改</Button>

                    <Popconfirm title='你确定要调整么？'
                     onConfirm={()=>{
                         this.putawayGoods(recode._id,recode.state)
                     }}>
                     <Button type='warning' size='small'>调整</Button>
                    </Popconfirm>

                     <Popconfirm title='你确定要删除么？'
                     onConfirm={()=>{
                         this.delGoods(recode._id)
                     }}>
                     <Button type='danger' size='small'>删除</Button>
                     </Popconfirm>
                     </div>
                 )
             }},
        ]
    }
    componentDidMount(){
        this.getListData()
    }
    /* 删除数据 */
    delGoods = async (_id) => {
        let result = await goodsApi.del(_id)
        if(result.err!==0){ return message.error('删除失败请重试')}
        else{
            message.success('删除成功')
            return this.getListData()
        }  
    }
    /* 调整状态 */
    putawayGoods = async (_id,state) => {
        if(state==0){
            state=1
        }else{
            state=0
        }
        let result = await goodsApi.putaway(_id,state)
        if (result.err !== 0) {
            return message.error('调整失败请重试')
        } else {
            message.success('调整成功')
            return this.getListData()
        }
        
    }

    /* 分页数据 */
    getListData=async ()=>{
        let {page,pageSize} =this.state
        let result = await goodsApi.list(page,pageSize)
        let {err,list,msg,allCount} = result
        if(err !==0){return message.error(msg)}
        this.setState({list,allCount})
    }
    // 导出全部数据
    exportAll=async ()=>{
        // 获取表头数据
        let {page,pageSize,columns} =this.state
        let thead = columns.map((item)=>{ return item.title}) 
        let th = []
        th.push(thead)
        // 获取要导出的数据
        let result = await goodsApi.list(page=1,pageSize =10000)
        let data = result.list.map((item)=>{
          let arr = [] 
          for (const key in item) {
             arr.push(item[key])
          }
          return arr
        })
            // 将数组转化为标签页 
        // let res = data.unshift(thead)
        // console.log(res);
        let res = th.concat(data)
        var ws = XLSX.utils.aoa_to_sheet(res);
        // 创建工作薄
        var wb = XLSX.utils.book_new() 
        // 将标签页插入到工作薄里
        XLSX.utils.book_append_sheet(wb,ws)
        // 将工作薄导出为excel文件
        XLSX.writeFile(wb,'商品.xlsx');
        
        

    }
    render(){
        let {list,columns,allCount,pageSize} = this.state
        return(
            <div className={style.box}>
                <Card title="商品管理" className={style.card}>
                <Button type='primary' onClick={()=>{
                    this.props.history.push('/admin/goodsAdd')
                }}>商品添加</Button>
            
                <Button type='primary' onClick={this.exportAll}>导出全部</Button>
                <Table scroll={{x:1250}} dataSource={list} columns={columns} rowKey='_id' pagination={false}/>
                {/* 分页器 */}
                <Pagination showQuickJumper defaultCurrent={1} total={allCount} 
                defaultPageSize={pageSize}
                onChange={(page,pageSize)=>{
                    this.setState({page},()=>{
                            this.getListData()})
                }}/>
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

export default GoodsList