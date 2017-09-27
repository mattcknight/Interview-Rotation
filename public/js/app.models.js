(function () {
    angular.module('recrutingApp')

    // Models
    .factory('ReleaseTrain', function () {
        function ReleaseTrain(id, name) {
            this.id = id;
            this.name = name;
        }

        ReleaseTrain.build = function (data) {
            return new ReleaseTrain(
                data.id,
                data.name
            );
        };

        ReleaseTrain.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(ReleaseTrain.build);
            }
            return ReleaseTrain.build(responseData);
        };

        return ReleaseTrain;
    })

    .factory('Team', function () {
        function Team(id, name, rt_id, releasetrain) {
            this.id = id;
            this.name = name;
            this.rt_id = rt_id;
            this.releasetrain = releasetrain;
        }

        Team.build = function (data) {
            return new Team(
                data.id,
                data.name,
                data.rt_id,
                data.releasetrain
            );
        };

        Team.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(Team.build);
            }
            return Team.build(responseData);
        };

        return Team;
    })

    .factory('Location', function () {
        function Location(id, name) {
            this.id = id;
            this.name = name;
        }
        Location.build = function (data) {
            return new Location(
                data.id,
                data.name
            );
        };

        Location.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(Location.build);
            }
            return Location.build(responseData);
        };

        return Location;
    })

    .factory('Role', function () {
        function Role(id, name) {
            this.id = id;
            this.name = name;
        }
        Role.build = function (data) {
            return new Role(
                data.id,
                data.name
            );
        };

        Role.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(Role.build);
            }
            return Role.build(responseData);
        };

        return Role;
    })

    .factory('Employee', function (teamFactory, Team) {
        function Employee(id, first_name, last_name, email, teams, location_id, location, role_id, role, isTrainingRequired) {
            this.id = id;
            this.first_name = first_name;
            this.last_name = last_name;
            this.email = email;
            this.teams = teams;
            this.location_id = location_id;
            this.location = location;
            this.role_id = role_id;
            this.role = role;
            this.isTrainingRequired = isTrainingRequired;
        }

        Employee.build = function (data) {
            var newEmployee = new Employee(
                data.id,
                data.first_name,
                data.last_name,
                data.email, [],
                data.location_id,
                data.location,
                data.role_id,
                data.role,
                data.isTrainingRequired
            );

            teamFactory.getByEmployee(data.id).then(function (teams) {
                angular.forEach(teams, function (team) {
                    newEmployee.teams.push(Team.apiResponseTransformer(team));
                });
            });

            return newEmployee;
        };

        Employee.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(Employee.build);
            }
            return Employee.build(responseData);
        };

        return Employee;
    })

    .factory('InterviewModel', function ($q, stepFactory, Step) {
        function InterviewModel(id, name, steps) {
            this.id = id;
            this.name = name;
            this.steps = steps;
        }

        InterviewModel.build = function (data) {
            var newModel = new InterviewModel(data.id, data.name, []);

            stepFactory.getByModel(data.id)
                .then(function (steps) {
                    return steps;
                }).then(function (steps) {
                    angular.forEach(steps, function (step) {
                        newModel.steps.push(Step.apiResponseTransformer(step));
                    });
                });

            return newModel;
        };

        InterviewModel.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(InterviewModel.build);
            }
            return InterviewModel.build(responseData);
        };

        return InterviewModel;
    })

    .factory('Step', function (attendeeFactory, Attendee) {
        function Step(id, name, model_id, model, duration, sequence, attendees) {
            this.id = id;
            this.name = name;
            this.model_id = model_id;
            this.model = model;
            this.duration = duration;
            this.sequence = sequence;
            this.attendees = attendees;
        }

        Step.build = function (data) {

            var newStep = new Step(data.id, data.name, data.model_id, data.model, data.duration, data.sequence, []);
            var newAttendee = [];

            attendeeFactory.getByStep(data.id)
                .then(function (attendees) {
                    return attendees;
                }).then(function (attendees) {
                    angular.forEach(attendees, function (attendee) {
                        newStep.attendees.push(Attendee.apiResponseTransformer(attendee));
                    });
                });
            return newStep;
        };

        Step.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(Step.build);
            }
            return Step.build(responseData);
        };

        return Step;
    })

    .factory('Attendee', function () {
        function Attendee(step_id, role_id, role, quantity, required) {
            this.step_id = step_id;
            this.role_id = role_id;
            this.role = role;
            this.quantity = quantity;
            this.required = Boolean(required);
        }

        Attendee.build = function (data) {
            return new Attendee(
                data.step_id,
                data.role_id,
                data.role,
                data.quantity,
                data.required
            );
        };

        Attendee.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(Attendee.build);
            }
            return Attendee.build(responseData);
        };

        return Attendee;
    })
    
    .factory('StepAttendee' , function(model_id, step_id, location_id) {
        // get attendees by role for given step in model
    })

    .factory('StepAttendeeHistory' , function(model_id, step_id, location_id) {
        // get attendee history by role for given step/model
    });
})();