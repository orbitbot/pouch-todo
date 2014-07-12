(function() {
  'use strict';

  var app = angular.module('app', []);

  app.factory('pouch', ['$rootScope', function($rootScope) {

    var db = new PouchDB('ng-pouch');
    // db.sync('http://x.x.x.x/ng-db', {
    //   live: true
    // });

    db.changes({ live: true }).on('change', function(change) {
      if (!change.deleted) {
        db.get(change.id, function(err, doc) {
          $rootScope.$apply(function() {
            if (err) console.log(err);
            $rootScope.$broadcast('newTodo', doc);
          });
        });
      } else {
        $rootScope.$apply(function() {
          $rootScope.$broadcast('delTodo', change.id);
        });
      }
    });

    return db;
  }]);

  app.factory('util', ['$q', '$rootScope',
    function($q, $rootScope) {
      return {
        resolve: function(value) {
          var deferred = $q.defer();
          $rootScope.$apply(function() {
            deferred.resolve(value);
          });
          return deferred;
        },
        reject: function(error) {
          var deferred = $q.defer();
          $rootScope.$apply(function() {
            deferred.reject(error);
          });
          return deferred;
        }
      };
  }]);

  app.factory('pouchInterface', ['pouch', 'util',
    function(pouch, util) {

      return {
        add: function(text) {

          return pouch.post({
            type: 'todo',
            text: text
          })
          .then(util.resolve)
          .catch(util.reject);
        },
        remove: function(todo) {

          return pouch.get(todo._id)
            .then(function(doc) {
              return pouch.remove(doc)
                .then(util.resolve, util.reject);
          }, util.reject);
        }
      };
  }]);
  
  app.controller('TodoCtrl', ['$scope', 'pouchInterface',
    function($scope, pouchInterface) {

      $scope.todos = [];

      $scope.submit = function() {
        if ($scope.text !== '')
          pouchInterface.add($scope.text).then(function(res) {
            $scope.text = '';
          }, function(reason) {
            console.log(reason);
          });
      };

      $scope.remove = function(id) {
        pouchInterface.remove(id).then(function(res) {
        }, function(reason) {
          console.log(reason);
        });
      };

      $scope.$on('newTodo', function(event, todo) {
        $scope.todos.push(todo);
      });

      $scope.$on('delTodo', function(event, id) {
        for (var i = 0; i < $scope.todos.length; ++i) {
          if ($scope.todos[i]._id === id)
            $scope.todos.splice(i, 1);
        }
      });
  }]);

})();