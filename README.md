# mini_toast
mini_toast 是用 js 实现的一个仿微信通知消息的一个 toast通知效果，对于用户来说toast通知一般要比alert要好得多
目前功能还不够完善，有需求的朋友可以在此基础上进行开发,也希望对此感兴趣的朋友使它更加完善，更加好用。

## How to use 如何使用

### import js and css file in the page 在页面中导入js和css文件

``` html
	
<link rel="stylesheet" type="text/css" href="../mini_toast.css"/>
<script type="text/javascript" src="../mini_toast.js"></script>   

```

### use in the page  在页面中使用
``` javascript

toast.show('Hello toast!');

toast.show('delay test',4000)

toast.show('delay test',3000,function(){alert('hahaha');});

toast.show('hahaha  xixixi',function(){alert('Hi,Kangkang,Iam Michael');});
		
```
