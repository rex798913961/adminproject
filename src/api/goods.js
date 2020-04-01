import axios from '../utils/axios'
class Goods{
    // 商品分页
    list(page=1,pageSize =3){
        let url = '/mall/goods/getInfos'
        return axios.post(url,{page,pageSize})
    }
    // 删除商品
    del(_id){
        let url = '/mall/goods/goodsDel'
        return axios.post(url,{_id})
    }
    // 调整商品状态
    putaway(_id,state){
        let url = '/mall/goods/changeGoodsState'
        return axios.post(url, {_id,state})
    }
    // 图片上传
    uploadImg(pic){
        let url = '/mall/upload/pic'
        return axios.post(url,pic)
    }
     // 添加商品
    add(payload){
        let url = '/mall/goods/goodsAdd'
        return axios.post(url,payload)
    }
    // 根据_id获取信息
    findById(_id){
        let url= '/mall/goods/getInfosById'
        return axios.get(url,{params:{_id}})
    }
    // 修改商品信息
    update(_id,payload){
        console.log(payload);
        
        let url= '/mall/goods/goodsUpdate'
        return axios.post(url,{_id,payload})
    }
   



    
}
export default new Goods()