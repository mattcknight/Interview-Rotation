function REST_ROUTER(router, connection, md5) {
    var self = this;
    self.handleRoutes(router, connection, md5);
}

REST_ROUTER.prototype.handleRoutes = function (router, connection, md5, next) {
    var mysql = require("mysql");

    function REST_ROUTER(router, connection, md5) {
        var self = this;
        self.handleRoutes(router, connection, md5);
    }

    // default api req,res
    router.get('/', function (req, res) {
        res.json({
            "Error": false,
            "Message": "Success",
            "Data": []
        });
    });

    // GET (select all)
    router.get('/releasetrains', function (req, res, next) {
        var query = 'SELECT r.id, r.name,(SELECT COUNT(*) FROM team WHERE rt_id = r.id) as teams FROM releasetrain r';
        var args = [];
        connection.query(mysql.format(query, args), function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send(result);
            }
        });
    });

    // GET (select by id)
    router.get('/releasetrain/:id', function (req, res, next) {
        var query = "SELECT id,name FROM releasetrain WHERE id = ?";
        var args = [req.params.id];
        connection.query(mysql.format(query, args), function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send(result[0]);
            }
        });
    });

    // POST (insert)
    router.post('/releasetrain', function (req, res, next) {
        var query = 'INSERT INTO releasetrain(name) VALUES (?)';
        var args = [req.body.name];
        connection.query(mysql.format(query, args), function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send(result);
            }
        });
    });

    // PUT (update)
    router.put('/releasetrain/:id', function (req, res, next) {
        var query = 'UPDATE releasetrain SET name = ? WHERE id = ?';
        var args = [req.body.name, req.params.id];
        connection.query(mysql.format(query, args), function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send(result);
            }
        });
    });

    // DELETE (delete)
    router.delete('/releasetrain/:id', function (req, res, next) {
        var query = 'DELETE FROM releasetrain WHERE id = ?';
        var args = [req.params.id];
        connection.query(mysql.format(query, args), function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send(result);
            }
        });
    });

    // GET (find by release train)
    router.get('/teams/releasetrain/:id', function (req, res, next) {
        var query = 'SELECT t.id, t.name, rt.name AS releasetrain, t.rt_id FROM team t JOIN releasetrain rt ON t.rt_id = rt.id WHERE t.rt_id = ?';
        var args = [req.params.id];
        connection.query(mysql.format(query, args), function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send(result);
            }
        });
    });

    // GET (select all)
    router.get('/teams', function (req, res, next) {
        var query = "SELECT t.id, t.name, r.id as rt_id, r.name as releasetrain FROM team t JOIN releasetrain r ON t.rt_id = r.id";
        var args = [];
        connection.query(mysql.format(query, args), function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send(result);
            }
        });
    });

    // GET (select by id)
    router.get('/team/:id', function (req, res, next) {
        var query = 'SELECT t.id, t.name, r.id as rt_id, r.name as releasetrain FROM team t JOIN releasetrain r ON t.rt_id = r.id WHERE t.id = ?';
        var args = [req.params.id];
        connection.query(mysql.format(query, args), function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send(result[0]);
            }
        });
    });

    // GET (select teams by employee id)
    router.get('/teams/employee/:id', function (req, res, next) {
        var query = 'SELECT et.team_id as id, t.name, rt.name AS releasetrain, rt.id AS rt_id FROM employee_team et JOIN team t ON et.team_id = t.id JOIN releasetrain rt ON rt.id = t.rt_id WHERE et.employee_id = ?';
        var args = [req.params.id];
        connection.query(mysql.format(query, args), function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send(result);
            }
        });
    });

    // POST (insert)
    router.post('/team', function (req, res, next) {
        var query = 'INSERT INTO team(name,rt_id) VALUES (?,?)';
        var args = [req.body.name, req.body.rt_id];
        connection.query(mysql.format(query, args), function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send(result);
            }
        });
    });

    // PUT (update)
    router.put('/team/:id', function (req, res, next) {
        var query = 'UPDATE team SET name = ?, rt_id = ? WHERE id = ?';
        var args = [req.body.name, req.body.rt_id, req.params.id];
        connection.query(mysql.format(query, args), function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send(result);
            }
        });
    });

    // DELETE (delete)
    router.delete('/team/:id', function (req, res, next) {
        var query = 'DELETE FROM team WHERE id = ?';
        var args = [req.params.id];
        connection.query(mysql.format(query, args), function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send(result);
            }
        });
    });

    // GET (select all)
    router.get('/roles', function (req, res, next) {
        var query = 'SELECT id, name, (SELECT count(*) FROM employee e WHERE e.role_id = r.id) as employees FROM role r';
        var args = [];
        connection.query(mysql.format(query, args), function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send(result);
            }
        });
    });

    // POST (insert)
    router.post('/role', function (req, res, next) {
        var query = 'INSERT INTO role(name) VALUES (?)';
        var args = [req.body.name];
        connection.query(mysql.format(query, args), function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send(result);
            }
        });
    });

    // GET (select by id)
    router.get('/role/:id', function (req, res, next) {
        var query = 'SELECT id, name FROM role WHERE id = ?';
        var args = [req.params.id];
        connection.query(mysql.format(query, args), function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send(result[0]);
            }
        });
    });

    // PUT (update)
    router.put('/role/:id', function (req, res, next) {
        var query = 'UPDATE role SET name = ? WHERE id = ?';
        var args = [req.body.name, req.params.id];
        connection.query(mysql.format(query, args), function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send(result);
            }
        });
    });

    // DELETE (delete)
    router.delete('/role/:id', function (req, res, next) {
        var query = 'DELETE FROM role WHERE id = ?';
        var args = [req.params.id];
        connection.query(mysql.format(query, args), function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send(result);
            }
        });
    });

    // GET (select all)
    router.get('/locations', function (req, res, next) {
        var query = "SELECT id, name, (SELECT count(*) FROM employee e WHERE e.location_id = l.id) as employees FROM location l";
        var args = [];
        connection.query(mysql.format(query, args), function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send(result);
            }
        });
    });

    // GET (select by id)
    router.get('/location/:id', function (req, res, next) {
        var query = 'SELECT id, name FROM location WHERE id = ?';
        var args = [req.params.id];
        connection.query(mysql.format(query, args), function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send(result[0]);
            }
        });
    });

    // POST (insert)
    router.post('/location', function (req, res, next) {
        var query = 'INSERT INTO location(name) VALUES (?)';
        var args = [req.body.name];
        connection.query(mysql.format(query, args), function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send(result);
            }
        });
    });

    // PUT (update)
    router.put('/location/:id', function (req, res, next) {
        var query = 'UPDATE location SET name = ? WHERE id = ?';
        var args = [req.body.name, req.params.id];
        connection.query(mysql.format(query, args), function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send(result);
            }
        });
    });

    // DELETE (delete)
    router.delete('/location/:id', function (req, res, next) {
        var query = 'DELETE FROM location WHERE id = ?';
        var args = [req.params.id];
        connection.query(mysql.format(query, args), function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send(result);
            }
        });
    });

    // GET (select all)
    router.get('/employees', function (req, res, next) {
        var query = 'SELECT e.id,e.first_name,e.last_name,e.email,e.location_id,l.name as location,e.role_id,r.name as role FROM employee e JOIN role r on e.role_id = r.id JOIN location l on e.location_id = l.id';
        var args = [];
        connection.query(mysql.format(query, args), function (err, result, fields) {
            if (err) {
                next(err);
            } else {
                res.send(result);
            }
        });
    });

    // GET (select by team)
    router.get('/employees/team/:id', function (req, res, next) {
        var query = 'SELECT e.id,e.first_name,e.last_name,e.email,e.location_id,l.name as location,e.role_id,r.name as role FROM employee e JOIN employee_team et ON e.id = et.employee_id AND et.team_id = ? JOIN role r on e.role_id = r.id JOIN location l on e.location_id = l.id';
        var args = [req.params.id];
        connection.query(mysql.format(query, args), function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send(result);
            }
        });
    });

    // GET (select by role)
    router.get('/employees/role/:id', function (req, res, next) {
        var query = 'SELECT e.id,e.first_name,e.last_name,e.email,e.location_id,l.name as location,e.role_id,r.name as role FROM employee e JOIN role r on e.role_id = r.id AND r.id = ? JOIN location l on e.location_id = l.id';
        var args = [req.params.id];
        connection.query(mysql.format(query, args), function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send(result);
            }
        });
    });

    // GET (select by location)
    router.get('/employees/location/:id', function (req, res, next) {
        var query = 'SELECT e.id,e.first_name,e.last_name,e.email,e.location_id,l.name as location,e.role_id,r.name as role FROM employee e JOIN role r on e.role_id = r.id JOIN location l on e.location_id = l.id AND l.id = ?';
        var args = [req.params.id];
        connection.query(mysql.format(query, args), function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send(result);
            }
        });
    });

    // GET (select by id)
    router.get('/employee/:id', function (req, res, next) {
        var query = 'SELECT e.id,e.first_name,e.last_name,e.email,e.location_id,l.name as location,e.role_id,r.name as role FROM employee e JOIN role r on e.role_id = r.id JOIN location l on e.location_id = l.id WHERE e.id = ?';
        var args = [req.params.id];
        connection.query(mysql.format(query, args), function (err, result, fields) {
            if (err) {
                next(err);
            } else {
                res.send(result[0]);
            }
        });
    });

    // POST (insert)
    router.post('/employee', function (req, res, next) {
        var query = 'INSERT INTO employee(first_name, last_name,email,role_id,location_id,isTrainingRequired) VALUES (?,?,?,?,?,0)';
        var args = [req.body.first_name, req.body.last_name, req.body.email, req.body.role_id, req.body.location_id, req.body.isTrainingRequired];
        connection.query(mysql.format(query, args), function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send(result);
            }
        });
    });

    // POST (insert employee teams)
    router.post('/employee/:employee_id/team/:team_id', function (req, res, next) {
        var query = 'INSERT INTO employee_team(employee_id, team_id) VALUES (?,?)';
        var args = [req.params.employee_id, req.params.team_id];
        connection.query(mysql.format(query, args), function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send(result);
            }
        });
    });

    // PUT (update)
    router.put('/employee/:id', function (req, res, next) {
        var query = 'UPDATE employee SET first_name = ?,last_name = ?,email = ?,role_id = ?,location_id = ?,isTrainingRequired = 0 WHERE id = ?';
        var args = [req.body.first_name, req.body.last_name, req.body.email, req.body.role_id, req.body.location_id, req.body.isTrainingRequired, req.params.id];
        connection.query(mysql.format(query, args), function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send(result);
            }
        });
    });

    // DELETE (delete)
    router.delete('/employee/:id', function (req, res, next) {
        var query = 'DELETE FROM employee WHERE id = ?';
        var args = [req.params.id];
        connection.query(mysql.format(query, args), function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send(result);
            }
        });
    });

    // DELETE (delete employee team)
    router.delete('/employee/:employee_id/teams', function (req, res, next) {
        var query = 'DELETE FROM employee_team WHERE employee_id = ?';
        var args = [req.params.employee_id];
        connection.query(mysql.format(query, args), function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send(result);
            }
        });
    });

    // GET (select all)
    router.get('/interviewmodels', function (req, res, next) {
        var query = "SELECT id, name, (SELECT count(*) FROM interviewStep ims WHERE ims.model_id = im.id ) as steps, isDefault FROM interviewModel im";
        var args = [];
        connection.query(mysql.format(query, args), function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send(result);
            }
        });
    });

    // GET (select by id)
    router.get('/interviewmodel/:id', function (req, res, next) {
        var query = 'SELECT id, name FROM interviewModel WHERE id = ?';
        var args = [req.params.id];
        connection.query(mysql.format(query, args), function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send(result[0]);
            }
        });
    });

    // POST (insert)
    router.post('/interviewmodel', function (req, res, next) {
        var query = 'INSERT INTO interviewModel(name, isDefault) VALUES (?,0)';
        var args = [req.body.name];
        connection.query(mysql.format(query, args), function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send(result);
            }
        });
    });

    // PUT (update)
    router.put('/interviewmodel/:id', function (req, res, next) {
        var query = 'UPDATE interviewModel SET name = ? WHERE id = ?';
        var args = [req.body.name, req.params.id];
        connection.query(mysql.format(query, args), function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send(result);
            }
        });
    });

    // DELETE (delete)
    router.delete('/interviewmodel/:id', function (req, res, next) {
        var query = 'DELETE FROM interviewModel WHERE id = ?';
        var args = [req.params.id];
        connection.query(mysql.format(query, args), function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send(result);
            }
        });
    });

    // GET (select all)
    router.get('/interviewsteps', function (req, res, next) {
        var query = 'SELECT s.id, s.name, s.model_id, m.name as model, s.duration, s.sequence FROM interviewStep s JOIN interviewModel m ON s.model_id = m.id';
        var args = [];
        connection.query(mysql.format(query, args), function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send(result);
            }
        });
    });

    // GET (select all by interviewModel:id)
    router.get('/interviewsteps/interviewmodel/:id', function (req, res, next) {
        var query = 'SELECT s.id, s.name, s.model_id, m.name as model, s.duration, s.sequence FROM interviewStep s JOIN interviewModel m ON s.model_id = m.id WHERE model_id = ?';
        var args = [req.params.id];
        connection.query(mysql.format(query, args), function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send(result);
            }
        });
    });

    // GET (select by id)
    router.get('/interviewstep/:id', function (req, res, next) {
        var query = 'SELECT s.id, s.name, s.model_id, m.name as model, s.duration, s.sequence FROM interviewStep s JOIN interviewModel m ON s.model_id = m.id WHERE s.id = ?';
        var args = [req.params.id];
        connection.query(mysql.format(query, args), function (err, result) {
            if (err) {
                next(err);
            } else if (result.length < 1) {
                res.send({
                    error: 'Step Not Found',
                    message: 'The Interview Step requested was not found in the database',
                    id: req.params.id
                });
                return;

            }
            var step = {
                id: result[0].id,
                name: result[0].name,
                duration: result[0].duration,
                sequence: result[0].sequence,
                model_id: result[0].model_id,
                model: result[0].model,
                attendees: []
            };

            var query = 'SELECT a.role_id, r.name as role, a.quantity, a.required FROM interviewStepAttendee a JOIN role r ON a.role_id = r.id WHERE a.step_id = ?';
            var args = [req.params.id];
            connection.query(mysql.format(query, args), function (err, result) {
                if (err) {
                    next(err);
                } else {
                    for (var i in result) {
                        var newAttendee = {
                            role_id: result[i].role_id,
                            role: result[i].role,
                            quantity: result[i].quantity,
                            required: result[i].required
                        };
                        step.attendees.push(newAttendee);
                    }
                    res.send(step);
                }
            });
        });
    });

    // POST (save)
    router.post('/interviewstep', function (req, res, next) {
        var err;
        var interviewStepId;
        var query;
        var args;

        connection.beginTransaction(function (err) {
            if (err) return next(err);

            // insert step
            query = 'INSERT INTO interviewStep (name, duration, sequence, model_id) VALUES (?,?,?,?)';
            args = [req.body.name, req.body.duration, req.body.sequence, req.body.model_id];
            connection.query(mysql.format(query, args), function (err, result) {
                if (err) {
                    connection.rollback();
                    return next(err);
                }

                interviewStepId = result.insertId;

                for (var i in req.body.attendees) {
                    var isRequired;
                    if (req.body.attendees[i].required === true) {
                        isRequired = 1;
                    } else if (req.body.attendees[i].required === false) {
                        isRequired = 0;
                    }

                    query = 'INSERT INTO interviewStepAttendee (step_id, role_id, quantity, required) VALUES (?,?,?,?)';
                    args = [interviewStepId, req.body.attendees[i].role_id, req.body.attendees[i].quantity, isRequired];
                    connection.query(mysql.format(query, args), function (err, result) {
                        if (err) {
                            connection.rollback();
                            return next(err);
                        }

                        connection.commit(function (err) {
                            if (err) {
                                connection.rollback(function () {
                                    return next(err);
                                });
                            }
                            res.send();
                        });
                    });
                }
            });
        });
    });

    // PUT (update)
    router.put('/interviewstep/:id', function (req, res, next) {
        var err;
        var interviewStepId;
        var query;
        var args;

        connection.beginTransaction(function (err) {
            if (err) return next(err);

            // insert step
            query = 'UPDATE interviewStep SET name = ?, duration = ?, sequence = ?, model_id = ? WHERE id = ?';
            args = [req.body.name, req.body.duration, req.body.sequence, req.body.model_id, req.params.id];
            connection.query(mysql.format(query, args), function (err, result) {
                if (err) {
                    connection.rollback();
                    return next(err);
                }

                query = "DELETE FROM interviewStepAttendee WHERE step_id = ?";
                args = [req.params.id];
                connection.query(mysql.format(query, args), function (err, result) {
                    if (err) {
                        connection.rollback();
                        return next(err);
                    }
                });

                for (var i in req.body.attendees) {
                    var isRequired;
                    if (req.body.attendees[i].required === true) {
                        isRequired = 1;
                    } else if (req.body.attendees[i].required === false) {
                        isRequired = 0;
                    }

                    query = 'INSERT INTO interviewStepAttendee (step_id, role_id, quantity, required) VALUES (?,?,?,?)';
                    args = [req.params.id, req.body.attendees[i].role_id, req.body.attendees[i].quantity, isRequired];
                    connection.query(mysql.format(query, args), function (err, result) {
                        if (err) {
                            connection.rollback();
                            return next(err);
                        }

                        connection.commit(function (err) {
                            if (err) {
                                connection.rollback(function () {
                                    return next(err);
                                });
                            }
                            //connection.release();
                            res.send();
                        });
                    });
                }
            });
        });
    });

    // DELETE (delete)
    router.delete('/interviewstep/:id', function (req, res, next) {

        connection.beginTransaction(function (err) {
            var query = 'DELETE FROM interviewStepAttendee WHERE step_id = ?';
            var args = [req.params.id];
            connection.query(mysql.format(query, args), function (err, result) {
                if (err) return next(err);

                query = 'DELETE FROM interviewStep WHERE id = ?';
                args = [req.params.id];
                connection.query(mysql.format(query, args), function (err, result) {
                    if (err) return next(err);

                    connection.commit(function (err) {
                        if (err) {
                            connection.rollback(function () {
                                res.send(err);
                            });
                            return;
                        }
                        res.send(result);
                    });
                });

            });
        });
    });

    // GET (select all by interviewModel:id)
    router.get('/attendees/step/:id', function (req, res, next) {
        var query = 'SELECT a.step_id, a.role_id, r.name as role, a.quantity, a.required FROM interviewStepAttendee a JOIN role r on a.role_id = r.id WHERE a.step_id = ?';
        var args = [req.params.id];
        connection.query(mysql.format(query, args), function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send(result);
            }
        });
    });
};

module.exports = REST_ROUTER;