+++
toc = true
title = "如何扩展个人微信号来实现群组管理的功能？"
description = "如何扩展个人微信号来实现群组管理的功能？"
tags = [
	"wechat"
]
date = "2018-06-08 13:38:00"
categories = [
    "wechat"
]
menu = "main"
+++

最近在思考一个问题，如何能在系统中集成微信群组管理的功能，比如说邀请好友进群、对群组进行管理、创建群组、删除群组之类的操作，说白了就是将微信的功能嵌入到自己的程序里面去。这样就可以有效的管理多个群组来扩展一些客服的功能。

于是查找关于微信API的资料，第一反应就是先去官方的开放文档中查看是否有类似API开放。

翻了一圈资料，看了微信服务号、订阅号、小程序、以及企业微信的开放文档后整理出来目前官方开放的API的功能现状如下：

官方是没有提供任何个人群管理接口API，只有一些类似外挂类的工具可以对个人群组进行管理。

但是外挂类的工具又怕有风险，说不定哪天就over了。

在资料翻阅的过程，发现了可以通过微友助手在群组里添加机器人，但是这个方式可能不是我们想要的。

官方开放的客服API可以与客服系统进行对接，它是将微信端作为客服的入口与客服系统对接，生成客诉工单或者是跟客服对话，这也不是我们想要的方式。

<span style="color:blue">**在没有官方API可用的情况下我们想使用这方面的功能该如何操作呢？**</span>

# 发现曙光

微信目前官方提供的终端，除了手机端以外还有电脑端和WEB网页端。

咦，有WEB网页端那不就有API可以操作么？只是可能我们要写类似于外挂一样的东西模拟官方的微信网页端操作。

于是开始搜索这方面的资料，很幸运找到了[`ItChat`](https://github.com/littlecodersh/ItChat)这个类库。

这个类库的实现方式就是我们刚才说到的模拟网页版本的rest请求去扩展的一些接口。

那已经有人做好了轮子那我们就可以直接使用了。


# ItChat的实现方式

第一部分，分析微信协议，开始获取并模拟扩展个人微信号所需要的协议。
第二部分，利用上面分析出来的协议
第三部分，包装成扩展功能API

网页端微信协议分析思路可以查看：[手把手教你扩展个人微信号（1）](http://python.jobbole.com/84918/)

接口的使用可以查看：[手把手教你扩展个人微信号（2）](http://python.jobbole.com/86532/)

有兴趣的可以进去看一下。

Github链接：[ItChat](https://github.com/littlecodersh/ItChat)

# 总结

这个库的实现方式还是很有趣的，使用网页版微信调用的rest接口，跟常规外挂一样模拟网页微信的操作，只要网页版本微信不关闭应该都能用，只是可能需要紧跟着网页版本的微信rest接口持续升级

github上有1w多star，很明显说明了这个扩展功能还是很多人迫切想使用的，后面我会尝试一下然后把遇到的问题和使用经验会再分享出来。Keep Real！








