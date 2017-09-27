DROP SCHEMA recruiting_rotation;
CREATE SCHEMA IF NOT EXISTS recruiting_rotation DEFAULT CHARACTER SET utf8;
USE recruiting_rotation;

-- Release Train
DROP TABLE IF EXISTS releasetrain;
CREATE TABLE IF NOT EXISTS releasetrain (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX rt_name (name ASC)
);

INSERT INTO releasetrain(name) VALUES('Advertising');
INSERT INTO releasetrain(name) VALUES('CMS');
INSERT INTO releasetrain(name) VALUES('Canada F&I');
INSERT INTO releasetrain(name) VALUES('ClickMotive');
INSERT INTO releasetrain(name) VALUES('DDC Inventory');
INSERT INTO releasetrain(name) VALUES('DDC PSE');
INSERT INTO releasetrain(name) VALUES('DDC Platform');
INSERT INTO releasetrain(name) VALUES('DMS');
INSERT INTO releasetrain(name) VALUES('Digital Retailing');
INSERT INTO releasetrain(name) VALUES('EPD - DR 3.0 MakeMyDeal');
INSERT INTO releasetrain(name) VALUES('EPD - Platform');
INSERT INTO releasetrain(name) VALUES('EPD Analytics');
INSERT INTO releasetrain(name) VALUES('EPD Mobile Product');
INSERT INTO releasetrain(name) VALUES('F&I Contract');
INSERT INTO releasetrain(name) VALUES('F&I Credit');
INSERT INTO releasetrain(name) VALUES('F&I Payment');
INSERT INTO releasetrain(name) VALUES('F&I Platform');
INSERT INTO releasetrain(name) VALUES('PS - DR Suite');
INSERT INTO releasetrain(name) VALUES('PSE Canada');
INSERT INTO releasetrain(name) VALUES('Professional Services');
INSERT INTO releasetrain(name) VALUES('RTS');
INSERT INTO releasetrain(name) VALUES('SE');
INSERT INTO releasetrain(name) VALUES('Vin CMS');
INSERT INTO releasetrain(name) VALUES('Vin Integration');
INSERT INTO releasetrain(name) VALUES('Vin Shared');
INSERT INTO releasetrain(name) VALUES('Web Platform');
INSERT INTO releasetrain(name) VALUES('Xtime');

-- Team
DROP TABLE IF EXISTS team;
CREATE TABLE IF NOT EXISTS team (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  rt_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (rt_id) REFERENCES releasetrain(id),
  UNIQUE INDEX team_name (name ASC),
  INDEX team_rt (id, rt_id)
);

-- Role
DROP TABLE IF EXISTS role;
CREATE TABLE IF NOT EXISTS role (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX role_name (name ASC)
);

INSERT INTO role(name) VALUES('Director');
INSERT INTO role(name) VALUES('Manager');
INSERT INTO role(name) VALUES('Architect');
INSERT INTO role(name) VALUES('Java Developer Tech Lead');
INSERT INTO role(name) VALUES('Java Developer');
INSERT INTO role(name) VALUES('Java Programmer');
INSERT INTO role(name) VALUES('UI Developer');
INSERT INTO role(name) VALUES('QA Engineer');
INSERT INTO role(name) VALUES('Scrum Master');
INSERT INTO role(name) VALUES('Product Owner');
INSERT INTO role(name) VALUES('Recruiter');

-- Location
DROP TABLE IF EXISTS location;
CREATE TABLE IF NOT EXISTS location (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX location_name (name ASC)
);

INSERT INTO location(name) VALUES('Dallas');
INSERT INTO location(name) VALUES('Burlington');
INSERT INTO location(name) VALUES('Lake Success');
INSERT INTO location(name) VALUES('Manhattan Beach');

-- Employee
DROP TABLE IF EXISTS employee;
CREATE TABLE IF NOT EXISTS employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  role_id INT NOT NULL,
  location_id INT NOT NULL,
  isTrainingRequired boolean NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (location_id) REFERENCES location(id),
  UNIQUE INDEX email (email ASC),
  INDEX employee_role_id (id, role_id),
  INDEX employee_location_id (id, location_id)
);

-- Employee Team Membership
DROP TABLE IF EXISTS employee_team;
CREATE TABLE IF NOT EXISTS employee_team (
  employee_id INT NOT NULL,
  team_id INT NOT NULL,
  PRIMARY KEY (employee_id, team_id),
  FOREIGN KEY (employee_id) REFERENCES employee(id),
  FOREIGN KEY (team_id) REFERENCES team(id),
  INDEX employee (employee_id),
  INDEX team (team_id)
);


-- Interview Model
DROP TABLE IF EXISTS interviewModel;
CREATE TABLE IF NOT EXISTS interviewModel (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  isDefault boolean NOT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX model_name (name ASC)
);

INSERT INTO interviewModel(name,isDefault) VALUES('Java Developer 1.0', true);

-- Interview Step
DROP TABLE IF EXISTS interviewStep;
CREATE TABLE IF NOT EXISTS interviewStep (
  id INT NOT NULL AUTO_INCREMENT,
  model_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  duration INT NOT NULL,
  sequence INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (model_id) REFERENCES interviewModel(id),
  UNIQUE INDEX step_name (name ASC),
  UNIQUE INDEX step_model_sequence (model_id, sequence),
  INDEX step_model (id, model_id)
);

-- Interview Step Attendee
DROP TABLE IF EXISTS interviewStepAttendee;
CREATE TABLE IF NOT EXISTS interviewStepAttendee (
  step_id INT NOT NULL AUTO_INCREMENT,
  role_id INT NOT NULL,
  quantity INT NOT NULL,
  required BOOL NOT NULL,
  PRIMARY KEY (step_id, role_id, quantity, required),
  FOREIGN KEY (step_id) REFERENCES interviewStep(id),
  FOREIGN KEY (role_id) REFERENCES role(id),
  UNIQUE INDEX step_role_qty_required (step_id, role_id, quantity, required)
);
