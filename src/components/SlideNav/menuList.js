export default [
    {
        key :'1',
        title:'首页',
        icon:'home',
        path:'/admin/home',
    },
    {
        key :'2',
        title:'用户管理',
        icon:'user',
        path:'/admin/user',
        children:[
            {
                key:'2-1',
                title:"查询用户",
                path:'/admin/userlist'
            },
            {
                key:'2-2',
                title:"用户添加",
                path:'/admin/useradd'
            },
        ]
    },
    {
        key:'3',
        title:"商品管理",
        icon: 'gift', 
        path:'/admin/goods',
        children:[
          {
            key:'3-1',
            title:'商品信息',
            path:'/admin/goodsInfo'
          },
          {
            key:'3-2',
            title:'商品类别',
            path:'/admin/goodsKind'
          }
        ]
      }
]