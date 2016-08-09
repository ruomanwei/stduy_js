/**
 * Created by greedy on 2016/8/9.
 */


var grade = [
    {
        classname: "阳光小学六年级"
    },
    {
        teachername: "孙杨"
    },
    {
        name: "艾二",
        sex: "女",
        both: "2000-01-07",
        tall: 131
    },
    {
        name: "丁三",
        sex: "男",
        both: "2000-01-08",
        tall: 132
    },
    {
        name: "张四",
        sex: "女",
        both: "2000-01-09",
        tall: 133
    },
    {
        name: "旧五",
        sex: "男",
        both: "2000-01-10",
        tall: 134
    },
    {
        name: "轻六",
        sex: "女",
        both: "2000-01-11",
        tall: 135
    },
    {
        name: "赵七",
        sex: "男",
        both: "2000-01-12",
        tall: 136
    },
    {
        name: "钱八",
        sex: "女",
        both: "2000-01-13",
        tall: 137
    },
    {
        name: "孙九",
        sex: "男",
        both: "2000-01-14",
        tall: 138
    },
    {
        name: "李十",
        sex: "女",
        both: "2000-01-15",
        tall: 139
    },
    {
        name: "周十一",
        sex: "男",
        both: "2000-01-16",
        tall: 140
    },
    {
        name: "吴十二",
        sex: "女",
        both: "2000-01-17",
        tall: 141
    },
    {
        name: "郑十三",
        sex: "男",
        both: "2000-01-18",
        tall: 142
    },
    {
        name: "王十四",
        sex: "女",
        both: "2000-01-19",
        tall: 143
    },
    {
        name: "陈十五",
        sex: "男",
        both: "2000-01-20",
        tall: 144
    },
    {
        name: "项十六",
        sex: "女",
        both: "2000-01-21",
        tall: 145
    },
    {
        name: "孔十七",
        sex: "男",
        both: "2000-01-22",
        tall: 146
    },
    {
        name: "刘十八",
        sex: "女",
        both: "2000-01-23",
        tall: 147
    },
    {
        name: "梅十九",
        sex: "男",
        both: "2000-01-24",
        tall: 148
    },
    {
        name: "桃二十",
        sex: "女",
        both: "2000-01-25",
        tall: 149
    },
    {
        name: "卢二十一",
        sex: "男",
        both: "2000-01-26",
        tall: 150
    },
    {
        name: "陆二十二",
        sex: "女",
        both: "2000-01-27",
        tall: 151
    }];
console.log("班级 信 息:");
console.log("班级 名 称："+grade[0].classname);
console.log("班主任姓名："+grade[1].teachername);
console.log("学生 总 数："+(grade.length-2));
n=0;
grade.forEach(function (item) {

    if(item.sex=="男")
    n=n+1;
}
);
console.log("男生 数 量："+n);
i=0;
grade.forEach(function (item) {

        if(item.sex=="女")
            i=i+1;
    }
);
console.log("女生 数 量："+i);
nh=0;
grade.forEach(function (item) {

        if(item.sex=="男")
            nh=nh+item.tall;
    }
);
console.log("男生平均身高："+(nh/n));
vh=0;
grade.forEach(function (item) {

        if(item.sex=="女")
            vh=vh+item.tall;
    }
);
console.log("女生平均身高："+(nh/i));

grade.splice(0,2);
console.log("学生详细信息：" );
grade.forEach(
    function (item) {
        console.log("姓名："+item.name+"   "+"性别："+item.sex+"   "+"出生年月："+item.both+"   "+"身高："+item.tall);
    }
);



//排序函数
function compare(propertyName) {
    if(propertyName=="both") {
        return function (object1, object2) {
            var value1 = object1[propertyName];
            var value2 = object2[propertyName];
            var value11 = value1.split("-");
            var value22 = value2.split("-");
            return parseInt(value11[0] + value11[1] + value11[2]) - parseInt(value22[0] + value22[1] + value22[2]);
        };
    }else if (propertyName=="name") {
        return function (object1, object2) {
            var value1 = object1[propertyName];
            var value2 = object2[propertyName];
            return value1.localeCompare(value2);
        };
    }
    else if(propertyName=="tall"){
        return function (object1, object2) {
            var value1 = object1[propertyName];
            var value2 = object2[propertyName];
            return value2 - value1;
        };
    }
}

grade.sort(compare("name"));
console.log("按字母顺序:");
grade.forEach(function (item) {
    console.log("           "+item.name);
});




grade.sort(compare("both"));
console.log("按  年  龄:");
grade.forEach(function (item) {
    console.log("           "+item.name);
});

grade.sort(compare("tall"));
console.log("按 身 高:");
grade.forEach(function (item) {
    console.log("           "+item.name);
});


//随机选择
console.log("今天的值日生：")
var man=[];
var felman=[];
grade.forEach(function (item) {

        if(item.sex=="女")
            felman.push(item.name);

    if(item.sex=="男")
        man.push(item.name);
    }

);
console.log("     女生："+felman[Math.round(Math.random()*(felman.length-1))]+"      男生："+felman[Math.round(Math.random()*(felman.length-1))]);

