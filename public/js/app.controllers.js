/* global angular */

(function() {
    angular.module('recrutingApp')

    // Controllers
    .controller('IndexCtrl', ['$scope', function($scope) {
        // do stuff here
    }])

    .controller('ReleaseTrainCtrl', ['$scope', 'releasetrains', function($scope, releasetrains) {
        $scope.releasetrains = releasetrains;
    }])

    .controller("EditReleaseTrainCtrl", ['$scope', '$location', '$routeParams', 'rtFactory', 'teamFactory', function($scope, $location, $routeParams, rtFactory, teamFactory) {
        $scope.toggleEdit = function(state) {
            $scope.editMode = state;
            $scope.formUrl = '';
            if (state) $scope.formUrl = '/pages/releasetrain/form.html';
        };

        rtFactory.get($routeParams.id).then(function(doc) {
            $scope.releasetrain = doc;
        }, function(response) {
            alert(response);
        });

        teamFactory.getByParent($routeParams.id).then(function(teams) {
            $scope.teams = teams;
        });

        $scope.save = function(doc) {
            rtFactory.edit(doc).then(function() {
                $scope.toggleEdit(false);
            });
        };

        $scope.delete = function(id) {
            rtFactory.delete(id).then(function() {
                $location.path('/releasetrains');
            });
        };
    }])

    .controller("NewReleaseTrainCtrl", ['$scope', '$location', 'rtFactory', function($scope, $location, rtFactory) {
        $scope.toggleEdit = function(state) {
            $location.path('/releasetrains');
        };

        $scope.save = function(doc) {
            rtFactory.save(doc).then(function(doc) {
                $location.path('/releasetrain/' + doc.insertId);
            }, function(response) {
                alert(response);
            });
        };
    }])

    .controller('EditTeamCtrl', ['$scope', '$location', '$routeParams', 'teamFactory', 'rtFactory', 'employeeFactory', function($scope, $location, $routeParams, teamFactory, rtFactory, employeeFactory) {
        $scope.toggleEdit = function(state) {
            $scope.editMode = state;
            $scope.formUrl = '';
            if (state) $scope.formUrl = '/pages/releasetrain/team_form.html';
        };

        teamFactory.get($routeParams.id).then(function(team) {
            $scope.team = team;
        }, function(response) {
            alert(response);
        });

        rtFactory.getAll().then(function(releaseTrains) {
            $scope.releasetrains = releaseTrains;
        });

        employeeFactory.getByTeam($routeParams.id).then(function(employees) {
            $scope.employees = employees;
        });

        $scope.save = function(team) {
            teamFactory.edit(team).then(function(result) {
                $scope.toggleEdit(false);
            });
        };

        $scope.delete = function(team) {
            teamFactory.delete(team.id).then(function() {
                $location.path('/releasetrain/' + team.rt_id);
            });
        };
    }])

    .controller("NewTeamCtrl", ['$scope', '$location', '$routeParams', 'teamFactory', 'rtFactory', function($scope, $location, $routeParams, teamFactory, rtFactory) {
        $scope.team = {
            id: null,
            name: null,
            rt_id: null,
            releasetrain: null
        };

        if ($routeParams.id !== undefined) {
            $scope.team.rt_id = parseInt($routeParams.id);
            rtFactory.get($scope.team.rt_id).then(function(doc) {
                $scope.team.releasetrain = doc.name;
            });
        }

        rtFactory.getAll().then(function(doc) {
            $scope.releasetrains = doc;
        });

        $scope.save = function(doc) {
            teamFactory.save(doc).then(function(doc) {
                $location.path('/team/' + doc.insertId);
            }, function(response) {
                alert(response);
            });
        };
    }])

    .controller('RoleCtrl', ['$scope', 'roles', function($scope, roles) {
        $scope.roles = roles;
    }])

    .controller("EditRoleCtrl", ['$scope', '$location', '$routeParams', 'roleFactory', 'employeeFactory', function($scope, $location, $routeParams, roleFactory, employeeFactory) {
        $scope.toggleEdit = function(state) {
            $scope.editMode = state;
            $scope.formUrl = '';
            if (state) $scope.formUrl = "/pages/role/form.html";
        };

        roleFactory.get($routeParams.id).then(function(role) {
            $scope.role = role;
        }, function(response) {
            alert(response);
        });

        employeeFactory.getByRole($routeParams.id).then(function(employees) {
            $scope.employees = employees;
        }, function(response) {
            alert(response);
        });

        $scope.save = function(role) {
            roleFactory.edit(role).then(function(result) {
                $scope.toggleEdit(false);
            });
        };

        $scope.delete = function(id) {
            roleFactory.delete(id).then(function() {
                $location.path('/roles');
            });
        };
    }])

    .controller("NewRoleCtrl", ['$scope', '$location', 'roleFactory', function($scope, $location, roleFactory) {
        $scope.toggleEdit = function(state) {
            $location.path('/roles');
        };

        $scope.save = function(doc) {
            roleFactory.save(doc).then(function(doc) {
                $location.path('/roles');
            }, function(response) {
                alert(response);
            });
        };
    }])

    .controller('LocationCtrl', ['$scope', 'locations', function($scope, locations) {
        $scope.locations = locations;
    }])

    .controller("NewLocationCtrl", ['$scope', '$location', 'locationFactory', function($scope, $location, locationFactory) {
        $scope.toggleEdit = function(state) {
            $location.path('/locations');
        };

        $scope.save = function(doc) {
            locationFactory.save(doc).then(function(doc) {
                $location.path('/locations');
            }, function(response) {
                alert(response);
            });
        };
    }])

    .controller("EditLocationCtrl", ['$scope', '$location', '$routeParams', 'locationFactory', 'employeeFactory', function($scope, $location, $routeParams, locationFactory, employeeFactory) {
        $scope.toggleEdit = function(state) {
            $scope.editMode = state;
            $scope.formUrl = "";
            if (state) $scope.formUrl = "/pages/location/form.html";
        };

        locationFactory.get($routeParams.id).then(function(location) {
            $scope.location = location;
        }, function(response) {
            alert(response);
        });

        employeeFactory.getByLocation($routeParams.id).then(function(employees) {
            $scope.employees = employees;
        });

        $scope.save = function(location) {
            locationFactory.edit(location).then(function() {
                $scope.toggleEdit(false);
            });
        };

        $scope.delete = function(id) {
            locationFactory.delete(id).then(function() {
                $location.path('/locations');
            });
        };
    }])

    .controller("EditEmployeeCtrl", ['$scope', '$location', '$routeParams', 'employeeFactory', 'locationFactory', 'teamFactory', 'roleFactory', function($scope, $location, $routeParams, employeeFactory, locationFactory, teamFactory, roleFactory) {
        $scope.toggleEdit = function(state) {
            $scope.editMode = state;
            $scope.formUrl = '';
            if (state) $scope.formUrl = "/pages/releasetrain/employee_form.html";
        };

        employeeFactory.get($routeParams.id).then(function(employee) {
            $scope.employee = employee;
        }, function(response) {
            alert(response);
        });

        locationFactory.getAll().then(function(locations) {
            $scope.locations = locations;
        });

        teamFactory.getAll().then(function(teams) {
            $scope.allTeams = teams;
        });

        roleFactory.getAll().then(function(roles) {
            $scope.roles = roles;
        });

        $scope.save = function(employee) {
            employeeFactory.edit(employee).then(function() {
                return employee;
            }).then(function(employee) {
                employeeFactory.deleteTeams(employee.id);
                return employee;
            }).then(function(employee) {
                angular.forEach(employee.teams, function(team) {
                    employeeFactory.saveTeam(employee.id, team.id);
                });
                return;
            }).then(function() {
                $scope.toggleEdit(false);
            }, function(response) {
                alert(response);
            });
        };

        $scope.delete = function(employee) {
            employeeFactory.delete(employee.id).then(function() {
                $location.path('/team/' + employee.team_id);
            }, function(response) {
                alert(response);
            });
        };
    }])

    .controller("NewEmployeeCtrl", ['$scope', '$location', '$routeParams', 'employeeFactory', 'locationFactory', 'teamFactory', 'roleFactory', 'rtFactory', function($scope, $location, $routeParams, employeeFactory, locationFactory, teamFactory, roleFactory, rtFactory) {
        $scope.employee = {
            id: null,
            first_name: null,
            last_name: null,
            email: null,
            teams: [{
                id: null,
                name: null,
                rt_id: null,
                releasetrain: null
            }],
            location: null,
            location_id: null,
            role: null,
            role_id: null,
            isTrainingRequired: null
        };

        if ($routeParams.id !== undefined) {
            $scope.employee.teams[0].id = parseInt($routeParams.id);
            teamFactory.get($scope.employee.teams[0].id).then(function(doc) {
                $scope.employee.teams[0].name = doc.name;
                $scope.employee.teams[0].releasetrain = doc.releasetrain;
                $scope.employee.teams[0].rt_id = doc.rt_id;
            });
        }

        teamFactory.getAll().then(function(teams) {
            $scope.allTeams = teams;
        });

        roleFactory.getAll().then(function(doc) {
            $scope.roles = doc;
        });

        locationFactory.getAll().then(function(doc) {
            $scope.locations = doc;
        });

        $scope.save = function(employee) {
            employeeFactory.save(employee).then(function(result) {
                employee.id = result.insertId;
                return employee;
            }).then(function(employee) {
                angular.forEach(employee.teams, function(team) {
                    employeeFactory.saveTeam(employee.id, team.id);
                });
                return employee;
            }).then(function(employee_id) {
                $location.path('/employee/' + employee.id);
            }, function(response) {
                alert(response);
            });
        };
    }])

    .controller('InterviewModelCtrl', ['$scope', 'interviewmodels', function($scope, interviewmodels) {
        $scope.interviewmodels = interviewmodels;
    }])

    .controller("EditInterviewModelCtrl", ['$scope', '$location', '$routeParams', 'interviewModelFactory', 'stepFactory', function($scope, $location, $routeParams, interviewModelFactory, stepFactory) {
        $scope.toggleEdit = function(state) {
            $scope.editMode = state;
            $scope.formUrl = "";
            if (state) $scope.formUrl = "/pages/interviewmodel/form.html";
        };

        interviewModelFactory.get($routeParams.id).then(function(interviewmodel) {
            $scope.interviewmodel = interviewmodel;
        }, function(response) {
            alert(response);
        });

        $scope.save = function(interviewmodel) {
            interviewModelFactory.edit(interviewmodel).then(function(doc) {
                $scope.toggleEdit(false);
            });
        };

        $scope.delete = function(id) {
            interviewModelFactory.delete(id).then(function() {
                $location.path('/interviewmodels');
            });
        };
    }])

    .controller("NewInterviewModelCtrl", ['$scope', '$location', 'interviewModelFactory', function($scope, $location, interviewModelFactory) {
        $scope.toggleEdit = function(state) {
            $location.path('/interviewmodels');
        };

        $scope.save = function(doc) {
            interviewModelFactory.save(doc).then(function(doc) {
                $location.path('/interviewmodel/' + doc.insertId);
            }, function(response) {
                alert(response);
            });
        };
    }])

    .controller("EditInterviewStepCtrl", ['$scope', '$location', '$routeParams', 'stepFactory', 'interviewModelFactory', 'roleFactory', function($scope, $location, $routeParams, stepFactory, interviewModelFactory, roleFactory) {

        $scope.durations = [15, 30, 60, 90, 120];
        $scope.boolAns = [{
            "id": Boolean(1),
            "term": 'Yes'
        }, {
            "id": Boolean(0),
            "term": 'No'
        }];

        $scope.toggleEdit = function(state) {
            $scope.editMode = state;
            $scope.formUrl = "";
            if (state) $scope.formUrl = "/pages/interviewmodel/step_form.html";
        };

        stepFactory.get($routeParams.id).then(function(result) {
                $scope.step = result;
            },
            function(response) {
                alert(response);
            }
        );

        roleFactory.getAll().then(function(roles) {
            $scope.allRoles = roles;
        });

        interviewModelFactory.getAll().then(function(interviewmodels) {
            $scope.allModels = interviewmodels;
        });

        $scope.addRole = function() {
            var newItemNo = $scope.step.attendees.length + 1;
            $scope.step.attendees.push({});
        };

        $scope.removeRole = function() {
            var lastItem = $scope.step.attendees.length - 1;
            $scope.step.attendees.splice(lastItem);
        };

        $scope.save = function(step) {
            stepFactory.edit(step).then(function() {
                $scope.toggleEdit(false);
            }, function(response) {
                alert(response);
            });
        };

        $scope.delete = function(id) {
            stepFactory.delete(id).then(function() {
                $location.path("/interviewmodel/" + $scope.step.model_id);
            });
        };
    }])

    .controller("NewInterviewStepCtrl", ['$scope', '$location', '$routeParams', 'stepFactory', 'interviewModelFactory', 'roleFactory', function($scope, $location, $routeParams, stepFactory, interviewModelFactory, roleFactory) {
        // default values to generate form
        $scope.step = {
            model_id: null,
            model: null,
            name: null,
            duration: null,
            attendees: [{
                role_id: null,
                quantity: null,
                required: null
            }]
        };

        if ($routeParams.id !== undefined) {
            $scope.step.model_id = parseInt($routeParams.id);
            interviewModelFactory.get($scope.step.model_id).then(function(doc) {
                $scope.step.model = doc.name;
            });
        }

        $scope.durations = [15, 30, 60, 90, 120];
        $scope.boolAns = [{
            id: true,
            term: 'Yes'
        }, {
            id: false,
            term: 'No'
        }];

        roleFactory.getAll().then(function(roles) {
            $scope.allRoles = roles;
        });

        interviewModelFactory.getAll().then(function(interviewmodels) {
            $scope.allModels = interviewmodels;
        });

        $scope.toggleEdit = function(state) {
            $location.path('/interviewmodel/' + $scope.step.model_id);
        };

        $scope.addRole = function() {
            var newItemNo = $scope.step.attendees.length + 1;
            $scope.step.attendees.push({});
        };

        $scope.removeRole = function() {
            var lastItem = $scope.step.attendees.length - 1;
            $scope.step.attendees.splice(lastItem);
        };

        $scope.save = function(step) {
            stepFactory.save(step).then(function() {
                $location.path("/interviewmodel/" + $scope.step.model_id);
            }, function(response) {
                alert(response);
            });
        };
    }]);
})();
