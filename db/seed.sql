use employees;

INSERT INTO department
    (name)
VALUES
    ('Customer Service'),
    ('Accounting'),
    ('Human Resources');

INSERT INTO role
    (titel, salary, department_id)
VALUES
    ('Customer Service Associate', 30000, 1),
    ('Customer Service Lead', 45000, 1),
    ('Accountant', 56000, 2),
    ('Finance Specialist', 65000, 2),
    ('Human Resources Manager', 72000, 3);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Carlos', 'Rodgriguez', 1, NULL),
    ('Rudy', 'Just Rudy', 2, Null),
    ('Armin', 'Souvaneeeechez', 4, NULL),
    ('Helen', 'Keller', 5, 4);
