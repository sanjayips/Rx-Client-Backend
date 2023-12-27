/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');

const Department = mongoose.model('departments')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createDepartment: async (data) => {
        console.log("createDepartment HelperFunction is called");
        const department = new Department(data)
        await department.save()
        return department
        
    },
    getDepartmentsWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getDepartments Model Function called")

        //let requiredFields = '_id email first_name'


        const departments = await Department.find(query.critarion)
        .populate('employees', query.employeeFields)
        .populate('addedby', query.addedby)
        .populate('departmentHead', query.departmentHead)
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const departsize = departments.length

        return {
            departments: departments,
            count: departsize,
            offset: offset,
            limit: limit
        };
        
    },

    getDepartmentsList: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getDepartments Model Function called")

        const departments = await Department.find(query.critarion).select(query.fields/* '_id departmentName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const catgsize = departments.length

        return {
            departments: departments,
            count: catgsize,
            offset: offset,
            limit: limit
        };
        
    },

    updateDepartment: async (data) => {
        console.log("updateDepartment HelperFunction is called");
        
        const result = await Department.findOneAndUpdate({_id: data.departmentid}, data, {new: true})

        return result; 
                
    },

    

    removeDepartment: async (data) => {
        console.log("removeDepartment HelperFunction is called");

        const department = await Department.findById(data.id);
        if(department == null){
             var error = "Department does not exists."
             return error
        }
        department.lastModifiedBy = data.lastModifiedBy
        department.active = false
        department.save()
        return department;
        

    },

    findDepartmentById: async (query) => {
        console.log("findDepartmentById HelperFunction is called");
        
        const department = await Department.findOne(query.critarion)
        .populate('employees', query.employeeFields)
        .populate('addedby', query.addedby)
        .populate('departmentHead', query.departmentHead)
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return department;
        

    },

    addDepartmentHead: async (data) => {
        console.log("addDepartmentHead HelperFunction is called");
        
        const department = await Department.findById(data.departmentid)
        department.departmentHead = data.departmentHead
        
        await department.save()
        return department       

    },

    removeDepartmentHead: async (data) => {
        console.log("removeDepartmentHead HelperFunction is called");
        
        const department = await Department.findById(data.departmentid)
        department.departmentHead = ""
        
        await department.save()
        return department       

    },

    addSingleEmployeeToDepartment: async (data) => {
        console.log("addSingleEmployeeToDepartment HelperFunction is called");
       
        const department = await Department.findById(data.departmentid)
        
        department.employees.unshift(data.employeeid)
        await department.save()
        return department
        

    },

    addEmployeesToDepartment: async (data) => {
        console.log("addEmployeesToDepartment HelperFunction is called");
       
        const department = await Department.findById(data.departmentid)
        let existingemployees = department.employees
        let finalemployees = [...new Set([...existingemployees ,...data.newemployees])]
        department.employees = finalemployees
        await department.save()
        return department
        

    },

};
