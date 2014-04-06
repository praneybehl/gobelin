angular.module('unsafeCompiler', [], ['$compileProvider', function($compileProvider) {
  $compileProvider.directive('compileUnsafe', ['$compile', function($compile) {
    return function(scope, element, attrs) {
      scope.$watch(
        function(scope) {
          return scope.$eval(attrs.compileUnsafe);
        },
        function(value) {
          element.html(value);
          $compile(element.contents())(scope);
        }
      );
    };
  }]);
}]);
