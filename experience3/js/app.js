/**
 * Created by greedy on 2016/8/17.
 */
var listPeople = [];//存储联系人名字名字
//定义联系人对象
function People(name, celph, telph, factory, pic) {
    this.name = name;
    this.celph = celph;
    this.telph = telph;
    this.factory = factory;
    this.pic = pic;
}
//点击搜索边上的 设置按钮为增加联系人
function addPeople() {
    $(".appear").hide();
    $(".edit").hide();
    $(".add").show();
    $("#pic").attr("src", "images/pp.jpg");
    $("#name").val("").attr("placeholder", "姓名");
    $("#celph").val("").attr("placeholder", "手机长号");
    $("#telph").val("").attr("placeholder", "短号");
    $("#factory").val("").attr("placeholder", "公司");
}
//点击保存按钮，保存用户所设置的值
function save() {
    var name = $("#name").val();
    var celph = $("#celph").val();
    var telph = $("#telph").val();
    var factory = $("#factory").val();
    var pic=$("#pic").src;
    var reg=/^0?1[3|4|5|8][0-9]\d{8}$/
    if (name !== "" && celph !== "" && telph !== "" && factory !== ""){
        if(reg.test(celph)) {
            if (window.FileReader) {
                var pic = document.getElementById("pic").src;
            }
            var newPeople = new People(name, celph, telph, factory, pic);
            var jsonstr = JSON.stringify(newPeople);
            if (window.localStorage.getItem(name) !== null) {
                alert("exists!");
            }
            else {
                listPeople.push(name);
                localStorage.setItem("listPeople", JSON.stringify(listPeople));
                localStorage.setItem(name, jsonstr);
            }
            $("#peoplelist").append("<li ><p class='list' >" + name + "</p>" + "<ul class='func' " +
                "style='display: none'><li>" + "<a><img id='edit' src='images/edit.jpg' onclick='edit(this)'></a><a >" +
                "<img  class='delete' src='images/delete.jpg' onclick='deletelist(this)'></a></li></ul>" + "</li>");
            $(".add").hide();
            $(".appear").hide();
            $(".edit").hide();
            createlist();
        }else{
            alert("请正确输入手机号！")
        }
    } else {
        alert("联系人未填完整！");
        addPeople();
    }
}
//在增加的面板上，点击input上传图片
var result = document.getElementById("result");
var input = document.getElementById("file_input");
if (typeof FileReader === 'undefined') {
    result.innerHTML = "抱歉，你的浏览器不支持 FileReader";
    input.setAttribute('disabled', 'disabled');
} else {
    input.addEventListener('change', readFile, false);
}
//上传图片
function readFile() {
    var file = this.files[0];
    if (!/image\/\w+/.test(file.type)) {
        alert("文件必须为图片！");
    }
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
        result.innerHTML = '<img id="pic" src="' + e.target.result + '" alt="无法识别"/>';
    }
}
//点击联系人列表上的人名，右边出现与人名相关的信息
function appear() {
    var obj_lis = document.getElementById("peoplelist").getElementsByTagName("p");
    for (i = 0; i < obj_lis.length; i++) {
        obj_lis[i].onclick = function () {
            $(".add").hide();
            $(".edit").hide();
            $(".appear").show();
            var findname = this.innerHTML;
            var jsonobj = JSON.parse(localStorage.getItem(findname));
            $("#name1").attr("placeholder", jsonobj.name);
            $("#celph1").attr("placeholder", jsonobj.celph);
            $("#telph1").attr("placeholder", jsonobj.telph);
            $("#factory1").attr("placeholder", jsonobj.factory);
            $("#img").attr("src", jsonobj.pic);
        }
    }
}
//手风琴效果
function silder() {
    var accordion_head = $('#peoplelist li p  '),
        accordion_body = $('.func');
    $('#peoplelist li p  ').removeClass("active");
    accordion_head.on('click', function (event) {
        event.preventDefault();
        if ($(this).attr('class') != 'active') {
            accordion_body.slideUp();
            $(this).next().stop(true, true).slideToggle('normal');
            accordion_head.removeClass('active');
            $(this).addClass('active');
        }
    });
}
//删除功能
function deletelist(obj) {
    if (confirm("是否删除")) {
        var name = $(obj).parent().parent().parent().parent().find(".list").html();
        window.localStorage.removeItem(name);
        var j;
        for (j in listPeople) {
            if (listPeople[j] == name) {
                break;
            }
        }
        listPeople.splice(j, 1);
        window.localStorage.setItem("listPeople", JSON.stringify(listPeople));
        createlist();
        $(".appear").hide();
        $(".add").hide();
        $(".edit").hide();
    }
}
//给搜索框绑定input事件
$("#searchBox").on("input", function () {
    searchPeople($("#searchBox").val());

});
//搜索函数
function searchPeople(search) {
    var searchList = new Array();
    for (var i in listPeople) {
        var serchPeople = JSON.parse(window.localStorage.getItem(listPeople[i]));
        if (serchPeople.name.indexOf(search) >= 0 || serchPeople.telph.indexOf(search) >= 0 || serchPeople.celph.indexOf(search) >= 0 || serchPeople.factory.indexOf(search) >= 0)

            searchList.push(listPeople[i]);
    }
    $("#peoplelist").html("");
    for (var i in searchList) {
        $("#peoplelist").append("<li ><p class='list' >" + searchList[i] + "</p>" + "<ul class='func' " +
            "style='display: none'><li>" + "<a><img src='images/edit.jpg' onclick='edit(this)'></a><a >" +
            "<img class='delete' src='images/delete.jpg' onclick='deletelist(this)'></a></li></ul>" + "</li>");
    }
    appear();
    silder();
}
//给修改板块上的input2绑定change事件
$("#file_input2").on("change", function () {
    var file = this.files[0];
    if (!/image\/\w+/.test(file.type)) {
        alert("文件必须为图片！");
    }
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
        $("#result2").html('<img id="pic" src="' + e.target.result + '" alt="无法识别"/>');
    }
})
//初始化联系人列表
function createlist() {
    $("#peoplelist").html("");
    listPeople = JSON.parse(window.localStorage.getItem("listPeople"));
    if (listPeople == null) {
        listPeople = new Array();
    }
    for (var i in listPeople) {
        $("#peoplelist").append("<li ><p class='list' >" + listPeople[i] + "</p>" + "<ul class='func' " +
            "style='display: none'><li>" + "<a><img src='images/edit.jpg' onclick='edit(this)'></a><a>" +
            "<img   class='delete' src='images/delete.jpg' onclick='deletelist(this)'></a></li></ul>" + "</li>");
    }
    appear();
    silder();
}
//点击edit图标，触发edit功能
function edit(obj) {
    $(".appear").hide();
    $(".add").hide();
    $(".edit").show();
    var name = $(obj).parent().parent().parent().parent().find(".list").html();
    var jsonobj = JSON.parse(localStorage.getItem(name));
    $("#name2").attr("placeholder", jsonobj.name);
    $("#celph2").attr("placeholder", jsonobj.celph);
    $("#telph2").attr("placeholder", jsonobj.telph);
    $("#factory2").attr("placeholder", jsonobj.factory);
    $("#result2").find("img").attr("src", jsonobj.pic);
    var result = document.getElementById("result2");
    var input = document.getElementById("file_input2");
    if (typeof FileReader === 'undefined') {
        result.innerHTML = "抱歉，你的浏览器不支持 FileReader";
        input.setAttribute('disabled', 'disabled');
    } else {
        input.addEventListener('change', readFile, false);
    }
}
//当修改时输入有误时，重新生成edit界面
function reedit() {
    $("#name2").attr("placeholder", $("#name2").attr("placeholder"));
    $("#celph2").attr("placeholder", $("#celph2").attr("placeholder"));
    $("#telph2").attr("placeholder", $("#telph2").attr("placeholder"));
    $("#factory2").attr("placeholder", $("#factory2").attr("placeholder"));
    $("#result2").find("img").attr("src", $("#edimg").attr("src"));
}
//edit完成后，保存
function saveChange() {
    var name = $("#name2").val();
    var celph = $("#celph2").val();
    var telph = $("#telph2").val();
    var factory = $("#factory2").val();
    var name1 = $("#name2").attr("placeholder");
    if (name == "") {
        name = $("#name2").attr("placeholder");
    }
    if (celph == "") {
        celph = $("#celph2").attr("placeholder");
    }
    if (telph == "") {
        telph = $("#telph2").attr("placeholder");
    }
    if (factory == "") {
        factory = $("#factory2").attr("placeholder");
    }
    if (name !== "" && celph !== "" && telph !== "" && factory !== "") {
        if (window.FileReader) {
            var pic = document.getElementById("pic").src;
        } else {
            var pic = $("#pic").attr("src");
        }
        var j;
        for (j in listPeople) {
            if (listPeople[j] == name1) {
                break;
            }
        }
        listPeople.splice(j, 1);
        window.localStorage.setItem("listPeople", JSON.stringify(listPeople));
        window.localStorage.removeItem(name1);
        var newPeople = new People(name, celph, telph, factory, pic);
        var jsonstr = JSON.stringify(newPeople);
        if (window.localStorage.getItem(name) !== null) {
            alert("exists!");
            reedit();
        }
        else {
            listPeople.push(name);
            localStorage.setItem("listPeople", JSON.stringify(listPeople));
            localStorage.setItem(name, jsonstr);
            createlist();
            alert("修改成功！");
            $(".edit").hide();
            $(".appear").hide();
            $(".add").hide();
        }
    }
}
//页面加载初始化生成联系人
$("Document").ready(function () {
    createlist();
});



