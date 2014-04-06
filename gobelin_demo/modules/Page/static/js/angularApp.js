var pageApp = angular.module('pageApp', ['ngResource','unsafeCompiler', 'textAngular']);

pageApp.factory('Page', ['$resource', function($resource){
    base = $resource('/page/:slug', {slug:'@slug'});
    return base;
}]);

function PageController($scope, $routeParams, $location, Page){
    $scope.pages = Page.query()
    if($routeParams.slug){
        $scope.currentPage = Page.get({slug: $routeParams.slug});
    } else {
        $scope.currentPage = Page.get({slug: "home"});
    }
   $scope.getClass = function(path) {
      if ($location.path().substring(1) == path) {
         return "active"
      } else {
         return ""
      }
   }
};

pageApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/:slug', {templateUrl: '/js/angularTemplates/view.html', controller: PageController})
    $routeProvider.otherwise({templateUrl: '/js/angularTemplates/view.html', controller: PageController});
}]);
