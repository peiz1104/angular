angular.module('myapp',['ui.router'])
.config(function($stateProvider){
    $stateProvider
        .state('home', {
            url: '/home', 	//定义路径
            templateUrl: 'view/home.html',
            controller: 'homectrl'	// 定义控制器
        })
        .state('login',{
            url:'/login',
            templateUrl:'view/login.html',
            controller:'loginctrl'
        })
        .state('userlist',{
            url:'/userlist/:pagenum',
            templateUrl:'view/user/list.html',
            controller:'userlistctrl'
        })
        .state('usercreate',{
            url:'/usercreate',
            templateUrl:'view/user/create.html',
            controller:'usercreatectrl'
        })
        .state('userdetail',{
            url:'/userdetail/:userId',
            templateUrl:'view/user/detail.html',
            controller:'userdetailctrl'
        })
        .state('newslist',{
            url:'/newslist/:pagenum',
            templateUrl:'view/news/list.html',
            controller:'newslistctrl'
        })
        .state('newscreate',{
            url:'/newscreate',
            templateUrl:'view/news/create.html',
            controller:'newscreatectrl'
        })
        .state('newsdetail',{
            url:'/newsdetail/:newsId',
            templateUrl:'view/news/detail.html',
            controller:'newsdetailctrl'
        })
})
    //分装一个服务；用来检测页面在没有登录的情况下是进入不了其他页面
    .service('checklogin',function($rootScope,$location){
        //第一个参数为分装服务的参数
        this.check=function(){
            //判断如果没有登录返回注册页面
            if(!$rootScope.userName){
                $location.path('/login')
            }
        }

    })
      .controller('headerctrl',function($scope,$http,$location,$rootScope){
         $http.get('action/checkLogin.php')
          //判断得到的信息此时要跳回到登陆页面
             .success(function(res){
                 if(res && res.errno===0 && !res.data){
                     $location.path('/login')
                 }else if(res && res.errno===0 && res.data){
                     $rootScope.userName=res.data.username
                 }
             })
      })
    .controller('navctrl',function($scope){
       $scope.list=[
           {
               // 定义模块名称
               title: '用户模块',
               // 定义子模块
               childList: [
                   {
                       subTitle: '用户列表',		// 表示子模块title
                       link: '#/userlist/1'		// 子模块链接
                   },
                   {
                       subTitle: '创建用户',
                       link: '#/usercreate'
                   }
               ]
           },
           {
               title:'新闻模块',
               childList:[
                   {
                       subTitle:'新闻列表',
                       link:'#/newslist/1'
                   },
                   {
                       subTitle:'创建新闻',
                       link:'#/newscreate'
                   }
               ]
           }
       ]
    })
       .controller('homectrl',function($scope,$interval){
        $scope.date=new Date()
        $interval(function(){
            $scope.date=new Date()
        })
           $scope.font20='font20'
           $scope.color='color'
})
    .controller('loginctrl',function($scope,$http, $rootScope, $location,checklogin,$httpParamSerializerJQLike){
        checklogin.check();
        $scope.gotologin=function(){
           $http({
            url:'action/login.php',
            method:'POST',
            data:$httpParamSerializerJQLike($scope.user),
            headers:{
              'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
            }
           })
           .success(function(res){
            if(res.length>=1 && res[0].password==$scope.user.password && res[0].username==$scope.user.username){
              $rootScope.userName=res[0].username;
              $location.path('/home')
            }else if(res.length>=1 && res[0].password!=$scope.user.password && res[0].username==$scope.user.username){
              alert('输入的密码有误!')
            }else if(res.length>=1 && res[0].password==$scope.user.password && res[0].username!=$scope.user.username){
              alert('用户名不正确!!')
            }else{
              alert('用户名和密码有误!!');
            }
           })
        }

    })
   .controller('userlistctrl',function($scope,$stateParams,$http,checklogin){
       checklogin.check();
       //得到数据
       //先保存动态路由中的数据
       $scope.num=$stateParams.pagenum
       $http
           .post('action/userlist.php?pagenum='+$scope.num)
           .success(function(res){
               // console.log(res,13)
               //将得到的数据保存在$scope中;进行渲染页面
               // $scope.m=Math.ceil(res.length/6);
               $scope.list=res.slice(6*($scope.num-1),6*$scope.num);
               // console.log($scope.num);
           })
   })
  .controller('usercreatectrl',function($scope,$http,$location,checklogin,$httpParamSerializerJQLike){
      checklogin.check()
     $scope.gouserlist=function(){
         $http({
             url:'action/createuser.php',
             method:'POST',
             data:$httpParamSerializerJQLike($scope.user),
             headers: {
            'Content-Type':  'application/x-www-form-urlencoded;charset=utf-8'
            }
         })
         .success(function(res){
          // console.log(res);
           if(res==1){
            $location.path('/userlist/1')
           }else{
            alert('提交失败!')
           }
         })
     }
  })
  .controller('userdetailctrl',function($scope,$stateParams,$http,checklogin,$httpParamSerializerJQLike){
      checklogin.check()
      //请求数据进行渲染页面
        $http({
          url:'action/userdetail.php',
          method:'POST',
          data:$httpParamSerializerJQLike($stateParams),
          headers: {
            'Content-Type':  'application/x-www-form-urlencoded;charset=utf-8'
            }
        })
        .success(function(res){
            // console.log(res)
             $scope.list=res[0]
        })
  })
  .controller('newslistctrl',function($scope,$stateParams,$http,checklogin){
      checklogin.check()
      //请求得到数据
       $scope.num=$stateParams.pagenum;
      $http.post('action/newslist.php?pagenum='+$scope.num)
          .success(function(res){
              // console.log(res)
              $scope.list=res.slice(4*($scope.num-1),4*$scope.num)
          })
  })
  .controller('newscreatectrl',function($scope,$http,$location,checklogin,$httpParamSerializerJQLike){
      checklogin.check()
      //通过post请求提交数据
      $scope.goNews=function(){
          $scope.date=new Date();
          $http({
            url:'action/createnews.php',
            method:'POST',
            data: $httpParamSerializerJQLike($scope.newsData),
             headers: {
            'Content-Type':  'application/x-www-form-urlencoded;charset=utf-8'
            }
          })
          .success(function(res){
             // console.log(res);
            if(res==1){
              $location.path('/newslist/1')
            }else{
              alert('提交失败!!')
            }
            
          })
      }

  })
  .controller('newsdetailctrl',function($scope,$stateParams,checklogin,$http,$httpParamSerializerJQLike) {
      checklogin.check()
      //请求数据
      //发出POST请求相应的数据;返回的是一个promise允诺对象
      $http({
          url:'action/newsdetail.php',
          method:'POST',
          //传递带上的数据
          data:$httpParamSerializerJQLike($stateParams),
          headers:{
            'Content-Type':  'application/x-www-form-urlencoded;charset=utf-8'
          }
      })
      //允诺对象中有success他返回一个允诺对象所以可以继续调用success
      .success(function(res){
        // console.log(res);
        $scope.list=res[0];
      })
  })