angular.module('starter.services', [])




.factory('TaskService', ["$rootScope", "$q", function($rootScope, $q) {

  return {
    getGuestTasks : function(query) {
      var deffered = $q.defer();
      Stamplay.Query("object", "task")
      .notExists("owner")
      .exec()
      .then(function(response) {
        deffered.resolve(response)
      }, function(error) {
        deffered.reject(err);
      })
      return deffered.promise;
    },

    getUsersTasks : function(query) {
      var deffered = $q.defer();

      Stamplay.Object("task")
      .findByCurrentUser(["owner"])
      .then(function(response) {
        deffered.resolve(response)
      }, function(err) {
        deffered.reject(err);
      })
      return deffered.promise;
    },

    getTask : function(id) {
        var deffered = $q.defer();
        Stamplay.Object("task").get({ _id : id })
        .then(function(response) {
          deffered.resolve(response)
        }, function(error) {
          deffered.reject(err);
        })
        return deffered.promise;
    },

    addNew : function(task) {
      var deffered = $q.defer();

      Stamplay.Object("task").save(task)
      .then(function(response) {
        deffered.resolve(response)
      }, function(err) {
        deffered.reject(err);
      })
      return deffered.promise
    },
    deleteTask : function(id) {
      var deffered = $q.defer();
      Stamplay.Object("task").remove(id)
      .then(function(response) {
        deffered.resolve(response)
      }, function(err) {
        deffered.reject(err);
      })
      return deffered.promise;
    },
    updateTask : function(task) {
      var deffered = $q.defer();
      Stamplay.Object("task").update(task._id, task)
      .then(function(response) {
        deffered.resolve(response)
      }, function(err) {
        deffered.reject(err);
      })
      return deffered.promise;
    },
    patchTask : function(task) {
      var deffered = $q.defer();
      Stamplay.Object("task").patch(task._id, { complete: task.complete})
      .then(function(response) {
        deffered.resolve(response)
      }, function(err) {
        deffered.reject(err);
      })
      return deffered.promise;
    }

  }
}]);
