//import mongoose and models
var mongoose = require('mongoose');
var Employee = mongoose.model('employees');
var User = mongoose.model('users');

//Lodash for data manipulation
const _ = require('lodash');

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("../helpers/logger");

module.exports = {
    createEmployee: async (data) => {
        console.log("hireUserAndCreateEmployee HelperFunction is called");

        console.log("createCategory HelperFunction is called");
        const user = new User()
        user.role = data.role;
        if (await user.save()) {
            const employee = new Employee(data);
            await employee.save()
            return employee;
        }

    },
    findEmployeeById: async (employeeid) => {
        console.log("findEmployeeById HelperFunction is called");

        return await Employee.findById(employeeid).populate('users')
        .populate('user')
        .populate('department')
        //.populate('currentDesignation')
        //.populate('allDesignations')
        .populate('job')
        .populate('reportedTo')



    },
    updateEmployee: async (data) => {
        console.log("updateEmployee HelperFunction is called");
        return await Employee.findOneAndUpdate({_id: data._id}, data, {new: true});

    },
    getAllEmployees: async (sortProperty, sortOrder = 1, offset = 0, limit = 10) => {

        const employees = await Employee.find()
        .populate('user')
        .populate('department')
        //.populate('currentDesignation')
        //.populate('allDesignations')
        .populate('job')
        .populate('reportedTo')


        const employeesSize = employees.length

        return {
            employees: employees,
            count: employeesSize,
            offset: offset,
            limit: limit
        };
    }
}