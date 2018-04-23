+++
toc = true
title = "Dubbo使用jsr303框架hibernate-validator遇到的问题"
description = "Dubbo使用jsr303框架hibernate-validator遇到的问题"
tags = [
	"dubbo",
	"jsr303",
	"hibernate-validator"
]
date = "2018-04-23 13:25:00"
categories = [
    "dubbo"
]
menu = "main"
+++

`Dubbo`可以集成jsr303标准规范的验证框架，作为验证框架不二人选的`hibernate-validator`是大家都会经常在项目中使用的，但是在`Dubbo`使用是会发生下面这个问题。

# 问题描述

背景：使用`springmvc`做`restful`，使用`dubbo`做rpc，`restful`中调用大量的rpc，数据验证会在这两个地方，一个是`restful`层面，一个是rpc层面，`restful`层面使用`springmvc`默认的集成`hibernate-validator`来实现，参数开启验证只需要加入`@Validated param`。

rpc层面也使用`hibernate-validator`实现，dubbo中开启validation也有两个方式，一个是在`consumer`端，一个是在`provider`端。

## 当我们在consumer端开启验证时:

```
<dubbo:reference id="serviceName" interface="com.domain.package.TestService" registry="registry" validation="true"/>
```

没有任何问题，可以拿到所有的数据校验失败数据。

## 当我们在provider端开启验证时：

```
<dubbo:service interface="com.domain.package.TestService" ref="serviceName" validation="true" />
```

会发生如下异常：

```
com.alibaba.dubbo.rpc.RpcException: Failed to invoke remote method: sayHello, provider: 

dubbo://127.0.0.1:20831/com.domain.package.TestService?application=dubbo-test-

rest&default.check=false&default.cluster=failfast&default.retries=0&default.timeout=1200000&default.version=1.0

.0&dubbo=2.6.1&interface=com.domain.package.TestService&methods=sayHello&pid=29268&register.ip=192.

168.6.47&side=consumer&timestamp=1524453157718, cause: com.alibaba.com.caucho.hessian.io.HessianFieldException: 

org.hibernate.validator.internal.engine.ConstraintViolationImpl.constraintDescriptor: 

'org.hibernate.validator.internal.metadata.descriptor.ConstraintDescriptorImpl' could not be instantiated
com.alibaba.com.caucho.hessian.io.HessianFieldException: 

org.hibernate.validator.internal.engine.ConstraintViolationImpl.constraintDescriptor: 

'org.hibernate.validator.internal.metadata.descriptor.ConstraintDescriptorImpl' could not be instantiated
	at com.alibaba.com.caucho.hessian.io.JavaDeserializer.logDeserializeError(JavaDeserializer.java:167)
	at com.alibaba.com.caucho.hessian.io.JavaDeserializer$ObjectFieldDeserializer.deserialize

(JavaDeserializer.java:408)
	at com.alibaba.com.caucho.hessian.io.JavaDeserializer.readObject(JavaDeserializer.java:273)
	at com.alibaba.com.caucho.hessian.io.JavaDeserializer.readObject(JavaDeserializer.java:200)
	at com.alibaba.com.caucho.hessian.io.SerializerFactory.readObject(SerializerFactory.java:525)
	at com.alibaba.com.caucho.hessian.io.Hessian2Input.readObjectInstance(Hessian2Input.java:2791)
	at com.alibaba.com.caucho.hessian.io.Hessian2Input.readObject(Hessian2Input.java:2731)
	at com.alibaba.com.caucho.hessian.io.Hessian2Input.readObject(Hessian2Input.java:2260)
	at com.alibaba.com.caucho.hessian.io.Hessian2Input.readObject(Hessian2Input.java:2705)
	at com.alibaba.com.caucho.hessian.io.Hessian2Input.readObject(Hessian2Input.java:2260)
	at com.alibaba.com.caucho.hessian.io.CollectionDeserializer.readLengthList

(CollectionDeserializer.java:119)
	at com.alibaba.com.caucho.hessian.io.Hessian2Input.readObject(Hessian2Input.java:2186)
	at com.alibaba.com.caucho.hessian.io.Hessian2Input.readObject(Hessian2Input.java:2057)
	at com.alibaba.com.caucho.hessian.io.JavaDeserializer$ObjectFieldDeserializer.deserialize

(JavaDeserializer.java:404)
	at com.alibaba.com.caucho.hessian.io.JavaDeserializer.readObject(JavaDeserializer.java:273)
	at com.alibaba.com.caucho.hessian.io.JavaDeserializer.readObject(JavaDeserializer.java:200)
	at com.alibaba.com.caucho.hessian.io.SerializerFactory.readObject(SerializerFactory.java:525)
	at com.alibaba.com.caucho.hessian.io.Hessian2Input.readObjectInstance(Hessian2Input.java:2791)
	at com.alibaba.com.caucho.hessian.io.Hessian2Input.readObject(Hessian2Input.java:2731)
	at com.alibaba.com.caucho.hessian.io.Hessian2Input.readObject(Hessian2Input.java:2260)
	at com.alibaba.com.caucho.hessian.io.Hessian2Input.readObject(Hessian2Input.java:2705)
	at com.alibaba.com.caucho.hessian.io.Hessian2Input.readObject(Hessian2Input.java:2260)
	at com.alibaba.dubbo.common.serialize.hessian2.Hessian2ObjectInput.readObject

(Hessian2ObjectInput.java:74)
	at com.alibaba.dubbo.rpc.protocol.dubbo.DecodeableRpcResult.decode(DecodeableRpcResult.java:90)
	at com.alibaba.dubbo.rpc.protocol.dubbo.DecodeableRpcResult.decode(DecodeableRpcResult.java:110)
	at com.alibaba.dubbo.rpc.protocol.dubbo.DubboCodec.decodeBody(DubboCodec.java:88)
	at com.alibaba.dubbo.remoting.exchange.codec.ExchangeCodec.decode(ExchangeCodec.java:121)
	at com.alibaba.dubbo.remoting.exchange.codec.ExchangeCodec.decode(ExchangeCodec.java:82)
	at com.alibaba.dubbo.rpc.protocol.dubbo.DubboCountCodec.decode(DubboCountCodec.java:44)
	at com.alibaba.dubbo.remoting.transport.netty.NettyCodecAdapter$InternalDecoder.messageReceived

(NettyCodecAdapter.java:133)
	at org.jboss.netty.channel.SimpleChannelUpstreamHandler.handleUpstream

(SimpleChannelUpstreamHandler.java:70)
	at org.jboss.netty.channel.DefaultChannelPipeline.sendUpstream(DefaultChannelPipeline.java:564)
	at org.jboss.netty.channel.DefaultChannelPipeline.sendUpstream(DefaultChannelPipeline.java:559)
	at org.jboss.netty.channel.Channels.fireMessageReceived(Channels.java:268)
	at org.jboss.netty.channel.Channels.fireMessageReceived(Channels.java:255)
	at org.jboss.netty.channel.socket.nio.NioWorker.read(NioWorker.java:88)
	at org.jboss.netty.channel.socket.nio.AbstractNioWorker.process(AbstractNioWorker.java:109)
	at org.jboss.netty.channel.socket.nio.AbstractNioSelector.run(AbstractNioSelector.java:312)
	at org.jboss.netty.channel.socket.nio.AbstractNioWorker.run(AbstractNioWorker.java:90)
	at org.jboss.netty.channel.socket.nio.NioWorker.run(NioWorker.java:178)
	at org.jboss.netty.util.ThreadRenamingRunnable.run(ThreadRenamingRunnable.java:108)
	at org.jboss.netty.util.internal.DeadLockProofWorker$1.run(DeadLockProofWorker.java:42)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1145)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:615)
	at java.lang.Thread.run(Thread.java:744)
Caused by: com.alibaba.com.caucho.hessian.io.HessianProtocolException: 

'org.hibernate.validator.internal.metadata.descriptor.ConstraintDescriptorImpl' could not be instantiated
	at com.alibaba.com.caucho.hessian.io.JavaDeserializer.instantiate(JavaDeserializer.java:313)
	at com.alibaba.com.caucho.hessian.io.JavaDeserializer.readObject(JavaDeserializer.java:198)
	at com.alibaba.com.caucho.hessian.io.Hessian2Input.readObjectInstance(Hessian2Input.java:2789)
	at com.alibaba.com.caucho.hessian.io.Hessian2Input.readObject(Hessian2Input.java:2128)
	at com.alibaba.com.caucho.hessian.io.Hessian2Input.readObject(Hessian2Input.java:2057)
	at com.alibaba.com.caucho.hessian.io.Hessian2Input.readObject(Hessian2Input.java:2101)
	at com.alibaba.com.caucho.hessian.io.Hessian2Input.readObject(Hessian2Input.java:2057)
	at com.alibaba.com.caucho.hessian.io.JavaDeserializer$ObjectFieldDeserializer.deserialize

(JavaDeserializer.java:404)
	... 43 more
Caused by: java.lang.reflect.InvocationTargetException
	at sun.reflect.NativeConstructorAccessorImpl.newInstance0(Native Method)
	at sun.reflect.NativeConstructorAccessorImpl.newInstance(NativeConstructorAccessorImpl.java:57)
	at sun.reflect.DelegatingConstructorAccessorImpl.newInstance(DelegatingConstructorAccessorImpl.java:45)
	at java.lang.reflect.Constructor.newInstance(Constructor.java:526)
	at com.alibaba.com.caucho.hessian.io.JavaDeserializer.instantiate(JavaDeserializer.java:309)
	... 50 more
Caused by: java.lang.NullPointerException
	at org.hibernate.validator.internal.metadata.descriptor.ConstraintDescriptorImpl.<init>

(ConstraintDescriptorImpl.java:158)
	at org.hibernate.validator.internal.metadata.descriptor.ConstraintDescriptorImpl.<init>

(ConstraintDescriptorImpl.java:211)
	... 55 more
```

# 问题分析

上面的问题从异常面来看已经很直观了，`'org.hibernate.validator.internal.metadata.descriptor.ConstraintDescriptorImpl' could not be instantiated`，这个类无法实例化，那是什么原因导致它无法实例化呢？

`Dubbo`的序列化协议，默认是`hessian`，如果没有进行其他协议配置的话，默认使用的就是`hessian`，`hessian`在反序列化时有个特点需要注意一下，它会在反序列化时取<span style="color:red">**参数最少的构造器来创建对象**</span>，有的时候会有很多重载的构造器，因此会有一些参数直接给`null`，因此可能就会造成一些莫名其妙的问题，就像我们这个问题一样。

那这个问题如何解决呢？接着往下看

# 解决方案

由于这个是`Hessian`反序列化问题，因此与`Dubbo`的版本关系不大，为了验证这个我还专门使用`apache dubbo` `2.6.1`版本测试了一下，问题依旧存在。

## 方法一：使用无参构造方法来创建对象

既然是`hessian`反序列化问题，而且它在反序列化时根据构造函数参数个数优先级来取参数最少的，那我们就可以增加一个<span style="color:red">**无参的构造方法**</span>来解决这个问题。

但是有的时候我们使用的是第三方的包，不太好增加无参的构造方法，那怎么办的，我们能不能使用其他方法，继续往下看。

## 方法二：替换jsr303实现框架

既然`hibernate-validator`的`org.hibernate.validator.internal.metadata.descriptor.ConstraintDescriptorImpl`这个类在使用hessian反序列化存在问题，那我们使用其他jsr303的框架来试试。

jsr303的实现框架有哪些？

* org.hibernate : hibernate-validator : 5.2.4.Final
* org.apache.bval : bval-jsr303 : 0.5
* jersery

bval是apache的一个bean validator的实现，jersery是一个restful的框架为了满足自身的数据验证功能因此增加了jsr303的实现。

由于我们使用的springmvc构建restful因此这里就不考虑jersery，我们就从bval下手来试一试。

在进行了一番配置后（都有哪些配置？）

* 增加bval包，现在版本是：0.5

```
<dependency>
	<groupId>org.apache.bval</groupId>
	<artifactId>bval-jsr303</artifactId>
	<version>0.5</version>
</dependency>
```

* 将bval集成到spring框架中，作为spring的验证框架

这里有两种方式，一种xml配置，一种java config

xml方式：

```
<mvc:annotation-driven validator="validator"/>  
  
<!-- 数据验证 Validator bean -->  
<bean id="validator" class="org.springframework.validation.beanvalidation.LocalValidatorFactoryBean">  
    <property name="providerClass" value="org.apache.bval.jsr.ApacheValidationProvider" />  
</bean>  
```

java config方式:
重写mvcValidator方法

```
    @Override
    public Validator mvcValidator() {
        Validator validator = super.mvcValidator();
        if (validator instanceof LocalValidatorFactoryBean) {
            LocalValidatorFactoryBean lvfb = (LocalValidatorFactoryBean) validator;
            try {
                String className = "org.apache.bval.jsr303.ApacheValidationProvider";
                Class<?> clazz = ClassUtils.forName(className, WebMvcConfigurationSupport.class.getClassLoader());
                lvfb.setProviderClass(clazz);
            }
            catch (ClassNotFoundException e) {
                //没有找到bval验证框架，走spring默认整合的验证框架：hibernate-validator
                //这里异常没有必要跑出去，直接吃掉
            }
        }
        return validator;
    }
```

启动后验证功能

但是不好的事情发生了，无法启动报错，错误如下：

```
java.lang.AbstractMethodError: org.apache.bval.jsr303.ConfigurationImpl.getDefaultParameterNameProvider()

Ljavax/validation/ParameterNameProvider;
```

经过对`spring`的资料查找，发现`spring`从4.0版本往后不在支持集成其他jsr303的框架了，只能使用`hibernate-validator`，我擦这个有点暴力了。即使自己实现一个jsr303框架也无法再`spring`中使用，除非不使用`spring` `validator`功能，直接使用自己的验证框架来进行验证，这样就无法使用`@Validated param`方式。

那这种方法只能放弃了。

## 方法三：修改hibernate-validator的原声类，修改Dubbo ValidationFilter，这也是我最终采用的方法

其实替换jsr303框架不能成功，替换序列化协议应该也可以避免这个问题，只不过替换协议这个一般在维护的项目中不太会选择这样的方式来动刀子，现在开发很多都是分布式服务，序列化反序列化已经无处不在了，因此我建议编写代码时都增加一个无参数的构造方法，养成这样的一个好习惯可以避免很多序列化反序列化框架的坑。而且还有那些有匿名内部类的这种在序列化反序列化也需要注意，不是所有的序列化反序列化框架都支持有匿名类，gson是支持的这个为测试过，我前面也写过一篇博文里面就主要说这个问题，可以查看：[《Java中内部类使用注意事项，内部类对序列化与反序列化的影响》](https://ningyu1.github.io/site/post/65-java-inner-class/)

有兴趣的可以看一下我们常用的序列化反序列化类库的一些使用中的注意事项，可以参考这篇文章：[《java常用JSON库注意事项总结》](https://blog.fliaping.com/the-attention-of-json-serialization-and-deserialization-in-java/)

回归话题，上面的问题我们如何解决，最终我们采用重写hibernate-validator无法序列化的类，继承`javax.validation.ConstraintViolationException`重写一个实现类，由于是数据校验信息会有多个因此里面会通过set来存储`ConstraintViolation`，所以这里还写了一个`javax.validation.ConstraintViolation<T>`的实现类用来存放数据校验具体的信息。
大概的代码如下：

### 增加类：CustomConstraintViolation实现`javax.validation.ConstraintViolation`接口

```
package org.hibernate.validator.internal.metadata.descriptor;
import java.io.Serializable;
import javax.validation.ConstraintViolation;
import javax.validation.Path;
import javax.validation.metadata.ConstraintDescriptor;
public class CustomConstraintViolation<T> implements ConstraintViolation<T>, Serializable {
	private static final long serialVersionUID = -8901791810611051795L;
	private String message;
	private Path path;
	public CustomConstraintViolation() {
	}
	public CustomConstraintViolation(String message, Path path) {
		this.message = message;
		this.path = path;
	}
	public Path getPath() {
		return path;
	}
	public void setPath(Path path) {
		this.path = path;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	@Override
	public String getMessage() {
		return message;
	}
	@Override
	public String getMessageTemplate() {
		return null;
	}
	@Override
	public T getRootBean() {
		return null;
	}
	@Override
	public Class<T> getRootBeanClass() {
		return null;
	}
	@Override
	public Object getLeafBean() {
		return null;
	}
	@Override
	public Object[] getExecutableParameters() {
		return null;
	}
	@Override
	public Object getExecutableReturnValue() {
		return null;
	}
	@Override
	public Path getPropertyPath() {
		return this.path;
	}
	@Override
	public Object getInvalidValue() {
		return null;
	}
	@Override
	public ConstraintDescriptor<?> getConstraintDescriptor() {
		return null;
	}
	@Override
	public <U> U unwrap(Class<U> type) {
		return null;
	}
}
```

### 增加类：CustomConstraintViolationException继承`javax.validation.ConstraintViolationException`

```
package org.hibernate.validator.internal.metadata.descriptor;
import java.util.Set;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
public class CustomConstraintViolationException extends ConstraintViolationException {
	private static final long serialVersionUID = 8630014922849071455L;
	private Set<? extends ConstraintViolation<?>> constraintViolations;
	public CustomConstraintViolationException() {
		super(null);
	}
	public CustomConstraintViolationException(Set<? extends ConstraintViolation<?>> constraintViolations) {
		super(constraintViolations);
		this.constraintViolations = constraintViolations;
	}
	@SuppressWarnings("unchecked")
	public Set<ConstraintViolation<?>> getConstraintViolations() {
		return (Set<ConstraintViolation<?>>) constraintViolations;
	}
	public void setConstraintViolations(Set<? extends ConstraintViolation<?>> constraintViolations) {
		this.constraintViolations = constraintViolations;
	}
}
```

### 修改`com.alibaba.dubbo.validation.filter.ValidationFilter`异常处理的部分

原版是`throw e`，这里变更为捕捉`javax.validation.ConstraintViolationException`异常，使用我们自定义异常对象替换，copy `Set<ConstraintViolation<String>>`数据，最终包装到`RpcException`返回，`RpcException`中的cause替换为我们自定义的异常。具体代码如下：

```
public Result invoke(Invoker<?> invoker, Invocation invocation) throws RpcException {
	if (validation != null && !invocation.getMethodName().startsWith("$") && ConfigUtils.isNotEmpty(
			invoker.getUrl().getMethodParameter(invocation.getMethodName(), Constants.VALIDATION_KEY))) {
		try {
			Validator validator = validation.getValidator(invoker.getUrl());
			if (validator != null) {
				validator.validate(invocation.getMethodName(), invocation.getParameterTypes(),
						invocation.getArguments());
			}
		} catch (ConstraintViolationException e) {
			Set<ConstraintViolation<String>> set = new HashSet<>();
			for (ConstraintViolation<?> v : e.getConstraintViolations()) {
				set.add(new CustomConstraintViolation<String>(v.getMessage(), v.getPropertyPath()));
			}

			return new RpcResult(new RpcException(new CustomConstraintViolationException(set)));
		} catch (Exception e) {
			return new RpcResult(new RpcException(e));
		}
	}

	return invoker.invoke(invocation);
}
```

使用这个方法后，在`provider`端设置`validation=true`，`consumer`端可以正常拿到所有校验数据的异常信息。

# 总结

我觉得这个方法并不是完美的方法，虽然这个问题是`hibernate-validator`框架的问题，`hibernate-validator`出生的年代分布式还不是特别的完善因此没有充分的考虑序列化反序列化问题也很正常，但是作为`Dubbo`框架在集成`jsr303`的时候也需要考虑这些问题，但是上面的修改太依赖`hibernate-validator`因此也不太适合给`Dubbo`提PR。后面有空再想想其他的解决方式。