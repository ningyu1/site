+++
toc = true
title = "Dubbo本地调试最优方式，本地Server端调用本地Client端"
description = "Dubbo本地调试最优方式，本地Server端调用本地Client端"
tags = [
    "dubbo",
	"debug",
	"rpc"
]
date = "2016-12-20 14:32:41"
categories = [
    "dubbo",
    "技术"
]
menu = "main"
+++


# 分布式应用的调试总是比常规项目开发调试起来要麻烦很多。

# 我们还在为搞不清自己请求的服务是本地服务还是服务器服务而苦恼吗？

# 我们还在为配置文件被修改导致服务器上版本服务不正常而苦恼吗？

接下来我介绍一个Dubbo在多环境调试的最优调试方式，在介绍之前先说一下我们现在的调试方式。

不好的方式（现在的方式）：
现在本地调试，需要修改DubboServer.xml和DubboClient.xml配置文件
```
将文件中的
dubbo:registry protocol="zookeeper" address="${dubbo.registry}" />
修改为
<dubbo:registry address="N/A" />
```
这种方式的弊端：
1. 开发总是不注意将修改为address="N/A"的文件提交到svn，在其他环境打包run起来，总是没有Export Service。
2. 文件经常被改来改去容易冲突，冲突解决不好容易丢失配置。
3. 无法很好的将本地调试和各环境的相互依赖分离开

最优的方式：
1. 创建一个properties文件，名字可以随便命名，我命名为：dubbo-local.properties，这个文件可以放在任何地方。该文件不提交到svn，我建议不要放在工程目录里以避免自己提交了都不知道，建议放在用户目录下${user.home}(不知道用户目录的自己去 度娘、谷哥、必硬)
2. dubbo-local.properties文件内容如下：
	```
	<!--注册中心变量 -->
	dubbo.registry=N/A
	 
	<!--以下是你们DubboServer.xml中配置的需要Export Service，这里我建议你有几个要Export Service都配置在这里，后面是请求本地的地址
	地址格式：dubbo://ip:port，这里需要注意的是，需要修改为自己dubbo服务的端口 -->
	com.domain.imprest.api.IImprestRecordService=dubbo://localhost:20812
	com.domain.imprest.api.IImprestRequestService=dubbo://localhost:20812
	com.domain.imprest.api.IImprestTrackService=dubbo://localhost:20812
	com.domain.imprest.api.IImprestWriteoffService=dubbo://localhost:20812
	com.domain.imprest.api.IImprestIOCollectService=dubbo://localhost:20812
	com.domain.imprest.api.ISystemService=dubbo://localhost:20812
	com.domain.imprest.api.IImprestDeptService=dubbo://localhost:20812
	```
3. 接下来启动你的Dubbo服务，在启动之前需要添加一下启动参数
![dubbo1](/img/dubbo/1.png)
```
参数：-Ddubbo.properties.file
值：dubbo-local.properties文件的本地地址，绝对地址
```
4. 接下来启动你的web服务，在启动之前需要添加一下启动参数
![dubbo2](/img/dubbo/2.png)
```
参数：-Ddubbo.resolve.file
值：dubbo-local.properties文件的本地地址，绝对地址
```
**ps.当你不想连接本地服务调试时，只需将启动参数去掉即可，无需修改配置文件，让配置文件一直保持清爽干净。
以后你就可以安心的本地调试你的程序了，再也不会因为服务没有Export出去、配置文件被修改而焦头烂额。**
