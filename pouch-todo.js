(function() {
  'use strict';

  var app = angular.module('app', []);

  app.factory('pouch',  function() {

    var db = new PouchDB('ng-pouch');
    // db.sync('http://x.x.x.x/ng-db', {
    //   live: true
    // });
    return db;
  });

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

  app.factory('Todos', ['$rootScope','pouch', 'util',
    function($rootScope, pouch, util) {
      var todos = [];

      pouch.changes({ live: true })
        .on('change', function handleUpdate(change) {

          if (!change.deleted) {
            pouch.get(change.id).then(function(todo) {
              $rootScope.$apply(function() {
                todos.push(todo);
              });
            }, function(err) {
              console.log(err);
            });
          } else {
            for (var i = 0; i < todos.length; ++i) {
              if (todos[i]._id === change.id) {
                $rootScope.$apply(function() {
                  todos.splice(i, 1);
                });
                break;
              }
            }
          }
      });

      return {
        todos: todos,
        add: function(text) {
          return pouch.post({
            type: 'todo',
            text: text
          }).then(util.resolve)
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
  
  app.controller('TodoCtrl', ['$scope', 'Todos',
    function($scope, Todos) {

      $scope.todos = Todos.todos;

      $scope.submit = function() {
        if ($scope.text !== '')
          Todos.add($scope.text).then(function(res) {
            $scope.text = '';
          }, function(reason) {
            console.log(reason);
          });
      };

      $scope.remove = function(todo) {
        Todos.remove(todo).then(function(res) {
        }, function(reason) {
          console.log(reason);
        });
      };

  }]);

})();