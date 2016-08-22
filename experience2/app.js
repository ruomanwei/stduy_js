/**
 * Created by wtt on 2016/8/9.
 */
var man = [];//男生数组
var felman = [];//女生数组
var man1 = [];//男生名字数组
var felman1 = [];//女生名字数组
var gh = 0;//女生总身高的初始值
var bh = 0;//男生总身高的初始值
var zb = "";//保存随机出的男值日生
var zg = "";//保存随机出的女值日生
var t1;//保存每隔15秒执行的函数
var grade = [
    {classname: "阳光小学六年级"},
    {teachername: "孙杨"},
    {name: "艾二", sex: "女", both: "2000-01-07", tall: 131},
    {name: "丁三", sex: "男", both: "2000-01-08", tall: 132},
    {name: "张四", sex: "女", both: "2000-01-09", tall: 133},
    {name: "旧五", sex: "男", both: "2000-01-10", tall: 134},
    {name: "轻六", sex: "女", both: "2000-01-11", tall: 135},
    {name: "赵七", sex: "男", both: "2000-01-12", tall: 136},
    {name: "钱八", sex: "女", both: "2000-01-13", tall: 137},
    {name: "孙九", sex: "男", both: "2000-01-14", tall: 138},
    {name: "李十", sex: "女", both: "2000-01-15", tall: 139},
    {name: "周十一", sex: "男", both: "2000-01-16", tall: 140},
    {name: "吴十二", sex: "女", both: "2000-01-17", tall: 141},
    {name: "郑十三", sex: "男", both: "2000-01-18", tall: 142},
    {name: "王十四", sex: "女", both: "2000-01-19", tall: 143},
    {name: "陈十五", sex: "男", both: "2000-01-20", tall: 144},
    {name: "项十六", sex: "女", both: "2000-01-21", tall: 145},
    {name: "孔十七", sex: "男", both: "2000-01-22", tall: 146},
    {name: "刘十八", sex: "女", both: "2000-01-23", tall: 147},
    {name: "梅十九", sex: "男", both: "2000-01-24", tall: 167},
    {name: "桃二十", sex: "女", both: "2000-01-25", tall: 149},
    {name: "卢二十一", sex: "男", both: "2000-01-26", tall: 178},
    {name: "陆二十二", sex: "女", both: "2000-01-27", tall: 140}
    ];
//取出学生数组
var stduent = grade.slice(2);
//因为要重置，sort后的数组会改变,所以取出默认的数组排序
var stduent2 = grade.slice(2);
//取出男女生各自数组
stduent.forEach(function (item) {
        if (item.sex == "女")
            felman.push(item);
        if (item.sex == "男")
            man.push(item);
    }
);
//取出男女生各自名字数组
stduent.forEach(function (item) {
        if (item.sex == "女")
            felman1.push(item.name);
        if (item.sex == "男")
            man1.push(item.name);
    }
);
//计算男女生的各自总身高
stduent.forEach(function (item) {

        if (item.sex == "女")
            gh = gh + item.tall;
        else if (item.sex == "男") {
            bh = bh + item.tall;
        }
    }
);
//排序函数
function compare(propertyName) {
    if (propertyName == "both") {
        return function (object1, object2) {
            var value1 = object1[propertyName];
            var value2 = object2[propertyName];
            var value11 = value1.split("-");
            var value22 = value2.split("-");
            return parseInt(value22[0] + value22[1] + value22[2] - parseInt(value11[0] + value11[1] + value11[2]));
        };
    } else if (propertyName == "name") {
        return function (object1, object2) {
            var value1 = object1[propertyName];
            var value2 = object2[propertyName];
            return value1.localeCompare(value2);
        };
    }
    else if (propertyName == "tall") {
        return function (object1, object2) {
            var value1 = object1[propertyName];
            var value2 = object2[propertyName];
            return value1 - value2;
        };
    }
}
//随机函数
function getzhiri(item) {
    return item[Math.round(Math.random() * (item.length - 1))];
}
//给出班级头信息
document.getElementById("he").innerHTML = "<span>班级名称:" + grade[0].classname + "</span>" + "<span>班主任名称:" + grade[1].teachername + "</span>" + "<span>学生总数:" + (grade.length -
    2) + "</span>" + "<span>男生人数:" + man.length + "</span>" + "<span>女生人数:" + felman.length + "</span>" + "<span>男生平均身高:" +
    (bh / man.length) + "</span>" + "<span>女生平均身高:" + (gh / felman.length) + "</span>";
//默认的表格
function re() {
    clearTimeout(t1);
    document.getElementById("sj").style.display = "none";
    document.getElementById("ri").style.display = "block";
    var str = "<table class='ah'>" + "<tr><td>" + "姓名" + "</td><td>" + "性别" + "</td><td>" + "出生年月" + "</td><td>" + "身高" + "</td></tr>";
    for (var i = 0; i < stduent2.length; i++) {
        str += "<tr><td>" + stduent2[i]["name"] + "</td><td>" + stduent2[i].sex + "</td><td>" + stduent2[i].both + "</td><td>" + stduent2[i].tall + "</td></tr>";
    }
    str += "</table>";
    document.getElementById("ri").innerHTML = str;
}
re();
//按年龄排序
function old() {
    clearTimeout(t1);
    document.getElementById("sj").style.display = "none";
    document.getElementById("ri").style.display = "block";
    var compare1=compare("both");
    stduent.sort(compare1);
    compare1=null;//解除函数的引用
    var str = "<table class='ah'>" + "<tr><td>" + "姓名" + "</td><td>" + "性别" + "</td><td>" + "出生年月" + "</td><td>" + "身高" + "</td></tr>";
    for (var i = 0; i < stduent.length; i++) {
        str += "<tr><td>" + stduent[i]["name"] + "</td><td>" + stduent[i].sex + "</td><td>" + stduent[i].both + "</td><td>" + stduent[i].tall + "</td></tr>";
    }
    str += "</table>";
    document.getElementById("ri").innerHTML = str;
}
//男女分身高
function gao() {
    clearTimeout(t1);
    document.getElementById("sj").style.display = "none";
    document.getElementById("ri").style.display = "block";
    var compare3=compare("tall");
    felman.sort(compare3);
    compare3=null;
    var compare4=compare("tall");
    man.sort(compare4);
    compare4=null;
    var str = "<table class='ah'>" + "<tr><td>" + "姓名" + "</td><td>" + "性别" + "</td><td>" + "出生年月" + "</td><td>" + "身高" + "</td></tr>";
    for (var i = 0; i < felman.length; i++) {
        str += "<tr><td>" + felman[i]["name"] + "</td><td>" + felman[i].sex + "</td><td>" + felman[i].both + "</td><td>" + felman[i].tall + "</td></tr>";
    }
    for (var i = 0; i < man.length; i++) {
        str += "<tr><td>" + man[i]["name"] + "</td><td>" + man[i].sex + "</td><td>" + man[i].both + "</td><td>" + man[i].tall + "</td></tr>";
    }
    str += "</table>";
    document.getElementById("ri").innerHTML = str;
}
//按名字排序
function ming() {
    clearTimeout(t1);
    document.getElementById("sj").style.display = "none";
    document.getElementById("ri").style.display = "block";
    var compare2=compare("name");
    stduent.sort(compare2);
    compare2=null;
    var str = "<table class='ah'>" + "<tr><td>" + "姓名" + "</td><td>" + "性别" + "</td><td>" + "出生年月" + "</td><td>" + "身高" + "</td></tr>";
    for (var i = 0; i < stduent.length; i++) {
        str += "<tr><td>" + stduent[i]["name"] + "</td><td>" + stduent[i].sex + "</td><td>" + stduent[i].both + "</td><td>" + stduent[i].tall + "</td></tr>";
    }
    str += "</table>";
    // document.getElementById("ri").style.display="none";
    document.getElementById("ri").innerHTML = str;
}
//停止值日生提醒
function stop() {
    clearTimeout(t1);
}
//随机值日生 面板内容添加
function disnv() {
    clearTimeout(t1);
    document.getElementById("ri").style.display = "none";
    document.getElementById('end').innerHTML = null;
    document.getElementById('end1').innerHTML = null;
    document.getElementById("sj").style.display = "block";
    var str = "<ul id='s'>";
    for (var i = 0; i < man1.length; i++) {
        str += "<li>" + man1[i] + "</li>";
    }
    str += "</ul>";
    document.getElementById("na").innerHTML = str;
    var st = "<ul id='s1'>";
    for (var i = 0; i < felman1.length; i++) {
        st += "<li >" + felman1[i] + "</li>";
    }
    st += "</ul>";
    document.getElementById("nv").innerHTML = st;
}
//提醒值日函数
function nizhir() {
    alert(zg + "、" + zb + "该你们值日了");
    t1 = setTimeout(nizhir, 15000);
}
//高亮\移除\alert方法
function zhixing() {
    disnv();
    zb = getzhiri(man1);//随机出男值日生
    zg = getzhiri(felman1);//随机出女值日生
    for (k = 0; k < man1.length; k++) {
        if (zb == man1[k]) {
            break;
        }
    }
    var s = document.getElementById("s");
    var t = s.childNodes.length;
    for (i = 0; i < t; i++) {
        if (i == k) {
            s.childNodes[i].style.background = "red";
            break;
        }
    }
    for (k = 0; k < felman1.length; k++) {
        if (zg == felman1[k]) {
            break;
        }
    }
    var s = document.getElementById("s1");
    var t = s.childNodes.length;
    for (j = 0; j < t; j++) {
        if (j == k) {
            s.childNodes[j].style.background = "red";
            break;
        }
    }
    setTimeout("document.getElementById('s').removeChild(document.getElementById('s').childNodes[i]);document.getElementById('end').innerHTML=zb", 5000);
    setTimeout("document.getElementById('s1').removeChild(document.getElementById('s1').childNodes[j]);document.getElementById('end1').innerHTML=zg", 5000);
    setTimeout(nizhir, 20000);
}