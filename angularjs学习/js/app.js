/**
 * Created by greedy on 2016/9/29.
 */
angular.module('todo', ['ionic']).controller('TodoCtrl', function($scope) {
    $scope.tasks = [
        { title: '菜鸟教程' },
        { title: 'www.runoob.com' },
        { title: '菜鸟教程' },
        { title: 'www.runoob.com' }
    ];
});