(function() {
    angular.module('recrutingApp')

    // Factories
    .factory('rtFactory', ['API', 'ReleaseTrain', function(API, ReleaseTrain) {
        return {
            getAll: function() {
                return API.get('releasetrains').then(ReleaseTrain.apiResponseTransformer);
            },
            get: function(id) {
                return API.get('releasetrain/' + id).then(ReleaseTrain.apiResponseTransformer);
            },
            save: function(doc) {
                return API.post('releasetrain/', doc);
            },
            edit: function(doc) {
                return API.put('releasetrain/' + doc.id, doc);
            },
            delete: function(id) {
                return API.delete('releasetrain/' + id).then(ReleaseTrain.apiResponseTransformer);
            }
        };
    }])

    .factory("teamFactory", ['API', 'Team', function(API, Team) {
        return {
            getAll: function() {
                return API.get('teams').then(Team.apiResponseTransformer);
            },
            get: function(id) {
                return API.get('team/' + id).then(Team.apiResponseTransformer);
            },
            getByParent: function(id) {
                return API.get('teams/releasetrain/' + id).then(Team.apiResponseTransformer);
            },
            getByEmployee: function(id) {
                return API.get('teams/employee/' + id).then(Team.apiResponseTransformer);
            },
            save: function(doc) {
                return API.post('team/', doc);
            },
            edit: function(doc) {
                return API.put('team/' + doc.id, doc);
            },
            delete: function(id) {
                return API.delete('team/' + id).then(Team.apiResponseTransformer);
            }
        };
    }])

    .factory("locationFactory", ['API', 'Location', function(API, Location) {
        return {
            getAll: function() {
                return API.get('locations').then(Location.apiResponseTransformer);
            },
            get: function(id) {
                return API.get('location/' + id).then(Location.apiResponseTransformer);
            },
            save: function(doc) {
                return API.post('location/', doc);
            },
            edit: function(doc) {
                return API.put('location/' + doc.id, doc);
            },
            delete: function(id) {
                return API.delete('location/' + id).then(Location.apiResponseTransformer);
            }
        };
    }])

    .factory("roleFactory", ['API', 'Role', function(API, Role) {
        return {
            getAll: function() {
                return API.get('roles').then(Role.apiResponseTransformer);
            },
            get: function(id) {
                return API.get('role/' + id).then(Role.apiResponseTransformer);
            },
            save: function(doc) {
                return API.post('role/', doc);
            },
            edit: function(doc) {
                return API.put('role/' + doc.id, doc);
            },
            delete: function(id) {
                return API.delete('role/' + id).then(Role.apiResponseTransformer);
            }
        };
    }])

    .factory("employeeFactory", ['API', 'Employee', function(API, Employee) {
        return {
            getAll: function() {
                return API.get('employees').then(Employee.apiResponseTransformer);
            },
            getByTeam: function(id) {
                return API.get('employees/team/' + id).then(Employee.apiResponseTransformer);
            },
            getByRole: function(id) {
                return API.get('employees/role/' + id).then(Employee.apiResponseTransformer);
            },
            getByLocation: function(id) {
                return API.get('employees/location/' + id).then(Employee.apiResponseTransformer);
            },
            get: function(id) {
                return API.get('employee/' + id).then(Employee.apiResponseTransformer);
            },
            save: function(doc) {
                return API.post('employee/', doc);
            },
            saveTeam: function(employee_id, team_id) {
                return API.post('employee/' + employee_id + '/team/' + team_id);
            },
            edit: function(doc) {
                return API.put('employee/' + doc.id, doc);
            },
            delete: function(id) {
                return API.delete('employee/' + id).then(Employee.apiResponseTransformer);
            },
            deleteTeams: function(id) {
                return API.delete('employee/' + id + '/teams').then(Employee.apiResponseTransformer);
            }
        };
    }])

    .factory("interviewModelFactory", ['API', 'InterviewModel', function(API, InterviewModel) {
        return {
            getAll: function() {
                return API.get('interviewmodels').then(InterviewModel.apiResponseTransformer);
            },
            get: function(id) {
                return API.get('interviewmodel/' + id).then(InterviewModel.apiResponseTransformer);
            },
            save: function(doc) {
                return API.post('interviewmodel/', doc);
            },
            edit: function(doc) {
                return API.put('interviewmodel/' + doc.id, doc);
            },
            delete: function(id) {
                return API.delete('interviewmodel/' + id).then(InterviewModel.apiResponseTransformer);
            }
        };
    }])

    .factory("stepFactory", ['API', 'Step', function(API, Step) {
        return {
            getAll: function() {
                return API.get('interviewsteps').then(Step.apiResponseTransformer);
            },
            get: function(id) {
                return API.get('interviewstep/' + id).then(Step.apiResponseTransformer);
            },
            getByModel: function(id) {
                return API.get('interviewsteps/interviewmodel/' + id).then(Step.apiResponseTransformer);
            },
            save: function(doc) {
                return API.post('interviewstep/', doc);
            },
            edit: function(doc) {
                return API.put('interviewstep/' + doc.id, doc);
            },
            delete: function(id) {
                return API.delete('interviewstep/' + id).then(Step.apiResponseTransformer);
            }
        };
    }])

    .factory("attendeeFactory", ['API', 'Attendee', function(API, Attendee) {
        return {
            getAll: function() {
                return API.get('attendees').then(Attendee.apiResponseTransformer);
            },
            get: function(id) {
                return API.get('attendee/' + id).then(Attendee.apiResponseTransformer);
            },
            getByStep: function(id) {
                return API.get('attendees/step/' + id).then(Attendee.apiResponseTransformer);
            },
            save: function(doc) {
                return API.post('attendee/', doc);
            },
            edit: function(doc) {
                return API.put('attendee/' + doc.id, doc);
            },
            delete: function(id) {
                return API.delete('attendee/' + id).then(Attendee.apiResponseTransformer);
            }
        };
    }])

    .factory('API', ['$http', '$q', function($http, $q) {

        var basePath = 'http://localhost:8080/api/' //config.api.basePath;

        function makeRequest(verb, uri, data) {
            var defer = $q.defer();
            verb = verb.toLowerCase();

            //start with the uri
            var httpArgs = [basePath + uri];
            if (verb.match(/post|put/)) {
                httpArgs.push(data);
            }

            $http[verb].apply(null, httpArgs)
                .success(function(data, status) {
                    defer.resolve(data);
                })
                .error(function(data, status) {
                    defer.reject(errorObject(status, data));
                });

            return defer.promise;
        }

        return {
            get: function(uri) {
                return makeRequest('get', uri);
            },
            post: function(uri, data) {
                return makeRequest('post', uri, data);
            },
            put: function(uri, data) {
                return makeRequest('put', uri, data);
            },
            delete: function(uri) {
                return makeRequest('delete', uri);
            }
        };
    }]);

    var errorObject = function(status, error) {
        var obj = {
            message: error.data,
            status: status,
            response: error.statusText,
            error: true
        };
        return obj;
    };
})();
