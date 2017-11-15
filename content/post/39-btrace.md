+++
toc = true
title = "BTrace使用笔记"
description = "BTrace使用笔记"
tags = [
	"btrace"

]
date = "2017-11-15 11:00:36"
categories = [
    "btrace",
    "技术"
]
menu = "main"
+++

## BTrace是什么？

Btrace是由sundararajan在2009年6月开发的一个开源项目，是一种动态跟踪分析一个运行中的Java应用程序的工具。
BTrace是一个为Java平台开发的安全、动态的追踪工具。BTrace动态地向目标应用程序的字节码注入追踪代码（字节码追踪），这些追踪字节码追踪代码使用Java语言表达，也就是BTrace的脚本。

## BTrace能做什么？

BTrace可以用来帮我们做运行时的JAVA程序分析，监控等等操作，BTrace也有一些使用上的限制，如：不能在脚本中新建类等。
Btrace是通过Attach API中提供的VirtualMachine.attach(PID)方法来获得要监控的JVM，然后使用VirtualMachine.loadAgent("*.jar")方法来加载jar文件。

## BTrace安装

[btrace](https://github.com/btraceio/btrace "btrace-gitbub") git下载地址
下载下来直接解压就可以使用

## 基本语法

```
btrace pid btrace脚本
```

在samples目录下有很多示例，并且有的跟踪很有用可直接使用，下来让我们编写一个脚本来看一下具体是怎么使用的

## 脚本编写

```

package btrace;

import com.sun.btrace.BTraceUtils;
import com.sun.btrace.annotations.*;

@BTrace
public class UniqueIdMgrBtrace {
    @OnMethod(clazz = "com.atomikos.util.UniqueIdMgr", method = "get", location = @Location(Kind.RETURN))
    public static void onGet(@Return String result) {
        long millis = BTraceUtils.timeMillis();
        String threadName = BTraceUtils.Threads.name(BTraceUtils.currentThread());
        String str = BTraceUtils.strcat(BTraceUtils.str(millis), " - [");
        str = BTraceUtils.strcat(str, BTraceUtils.str(threadName));
        str = BTraceUtils.strcat(str, "] - com.atomikos.util.UniqueIdMgr.get()-->");
        str = BTraceUtils.strcat(str, BTraceUtils.str(result));
        BTraceUtils.println(BTraceUtils.str(str));
    }

    @OnMethod(clazz = "com.atomikos.icatch.imp.TransactionServiceImp", method = "setTidToTx")
    public static void onSetTidToTx(String tid) {
        long millis = BTraceUtils.timeMillis();
        String threadName = BTraceUtils.Threads.name(BTraceUtils.currentThread());
        String str = BTraceUtils.strcat(BTraceUtils.str(millis), " - [");
        str = BTraceUtils.strcat(str, BTraceUtils.str(threadName));
        str = BTraceUtils.strcat(str, "] - com.atomikos.icatch.imp.TransactionServiceImp.setTidToTx(");
        str = BTraceUtils.strcat(str, BTraceUtils.str(tid));
        str = BTraceUtils.strcat(str, ")");
        BTraceUtils.println(BTraceUtils.str(str));
    }
}
```

上面代码意思是在`com.atomikos.util.UniqueIdMgr.get()`方法上面进行跟踪返回值，要跟踪赶回值必须要加`@Location(Kind.RETURN))`,才能使用参数的`@Return`

如果要使用方法参数，可以在脚本方法上直接写跟踪的原始方法参数并且类型保持一样，例如：

```
package com.btrace;
//需要跟踪的类
public class RemoteClass {

    public String f1(String a, int b) {
        System.out.println(a + " " + b);
        return a;
    }
}


//btrace脚本
@BTrace public class HelloBtrace {

  @OnMethod(
    clazz="com.btrace.RemoteClass",
    method="f1"
  ) 
  public static void onF1() {
    println("Hello BTrace");
  }

  @OnMethod(
    clazz="com.btrace.RemoteClass",
    method="f1"
  ) 
  public static void onF2(String a,int b) {
    println(str(a));
    println(str(b));
    println("");
  }
}
```

## 注意事项

1. 脚本中方法参数需要跟原方法参数类型保持一致
2. 脚本中不允许使用除btrace之外的类，拼接字符串使用`BTraceUtils.strcat()`,打印使用`BTraceUtils.println()`,获取线程使用`BTraceUtils.Threads`