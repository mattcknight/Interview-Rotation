(function () {
    angular.module('recrutingApp', ['ngRoute', 'checklist-model'])
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: "/pages/default.html",
                    controller: "IndexCtrl"
                })
                .when("/releasetrains", {
                    templateUrl: "/pages/releasetrain/index.html",
                    controller: "ReleaseTrainCtrl",
                    resolve: {
                        releasetrains: function (rtFactory) {
                            return rtFactory.getAll();
                        }
                    }
                })
                .when("/releasetrain/create", {
                    templateUrl: "/pages/releasetrain/form.html",
                    controller: "NewReleaseTrainCtrl"
                })
                .when("/releasetrain/:id", {
                    templateUrl: "/pages/releasetrain/releasetrain.html",
                    controller: "EditReleaseTrainCtrl"
                })
                .when("/team/create/:id", {
                    templateUrl: "/pages/releasetrain/team_form.html",
                    controller: "NewTeamCtrl"
                })
                .when("/team/:id", {
                    templateUrl: "/pages/releasetrain/team.html",
                    controller: "EditTeamCtrl"
                })
                .when("/roles", {
                    templateUrl: "/pages/role/index.html",
                    controller: "RoleCtrl",
                    resolve: {
                        roles: function (roleFactory) {
                            return roleFactory.getAll();
                        }
                    }
                })
                .when("/role/create", {
                    templateUrl: "/pages/role/form.html",
                    controller: "NewRoleCtrl"
                })
                .when("/role/:id", {
                    templateUrl: "/pages/role/role.html",
                    controller: "EditRoleCtrl"
                })
                .when("/locations", {
                    templateUrl: "/pages/location/index.html",
                    controller: "LocationCtrl",
                    resolve: {
                        locations: function (locationFactory) {
                            return locationFactory.getAll();
                        }
                    }
                })
                .when("/location/create", {
                    templateUrl: "/pages/location/form.html",
                    controller: "NewLocationCtrl"
                })
                .when("/location/:id", {
                    templateUrl: "/pages/location/location.html",
                    controller: "EditLocationCtrl"
                })
                .when("/employee/create/:id", {
                    templateUrl: "/pages/releasetrain/employee_form.html",
                    controller: "NewEmployeeCtrl"
                })
                .when("/employee/:id", {
                    templateUrl: "/pages/releasetrain/employee.html",
                    controller: "EditEmployeeCtrl"
                })
                .when("/interviewmodels", {
                    templateUrl: "/pages/interviewmodel/index.html",
                    controller: "InterviewModelCtrl",
                    resolve: {
                        interviewmodels: function (interviewModelFactory) {
                            return interviewModelFactory.getAll();
                        }
                    }
                })
                .when("/interviewmodel/create", {
                    templateUrl: "/pages/interviewmodel/form.html",
                    controller: "NewInterviewModelCtrl"
                })
                .when("/interviewmodel/:id", {
                    templateUrl: "/pages/interviewmodel/interviewmodel.html",
                    controller: "EditInterviewModelCtrl"
                })
                .when('/interviewstep/create/:id', {
                    templateUrl: "/pages/interviewmodel/step_form.html",
                    controller: "NewInterviewStepCtrl"
                })
                .when("/interviewstep/:id", {
                    templateUrl: "/pages/interviewmodel/step.html",
                    controller: "EditInterviewStepCtrl"
                })
                .otherwise({
                    redirectTo: '/'
                });
        }]);
})();