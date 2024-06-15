// Importing express, cors and dotenv
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// creating an instance of express
const app = express();
// Implementing the middlewware cors using the .use() method
// cors is used for cross origin Resource Sharing
app.use(cors());

// Creating a PORT variable and using the process.env getting the value from the .env file
const PORT = process.env.PORT || 8000

// Importing the fs and path modules provided by node.js which are used for working with file and paths
const fs = require("fs")
const path = require("path")

// Creating a function readJsonFile that read the data from the .json file using the fs module - taking a paramter filePath
function readJsonFile(filePath) {
    // Creating a new Promise, as the reading file here is async task and returns a promise so need to resolve the same
    return new Promise((resolve, reject) => {
        // using the fs.readFile() method, data is read from the .json files provided
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if(err) reject(err)
            // If data is read, parsing the same data to convert to JSON format
            resolve(JSON.parse(data))
        })
    })
}

// Defining the variables for path of the json files, using .join method to join the _dirname and _filename and create a path for data reading.
const accountIndustryPath = path.join('data','AccountIndustry.json')
const acvRangePath = path.join('data', 'ACVRange.json')
const customerTypePath = path.join('data', 'CustomerType.json')
const teamPath = path.join('data', 'Team.json')

// Creating get http method used to request data from the api and get the response
// Here we are creating get requests for each data file and creating a api path for them

// app.get() method to create a api over AccountIndustry.json file
// as the function created readJsonData returns a promise, we need to resolved the same so using async await for the same
app.get('/api/v1/accountIndustryData', async (req, res) => {
    try{
        // declaring data variable to store the data received from the function after reading the file
        const data = await readJsonFile(accountIndustryPath)
        // sending the response by converting the received data into json format
        res.json(data)
    } catch (err) {
        // catch block used to get the error and send to the user if api fails
        res.status(404).send(err.toString())
    }
})

// app.get() method to create a api over ACVRange.json file
app.get('/api/v1/acvRangeData', async (req, res) => {
    try{
        let data = await readJsonFile(acvRangePath)
        res.json(data)
    } catch {
        res.status(404).send(err.toString())
    }
})

// app.get() method to create a api over CustomerType.json file
app.get('/api/v1/customerTypeData', async (req, res) => {
    try{
        let data = await readJsonFile(customerTypePath)
        res.json(data)
    } catch {
        res.status(404).send(err.toString())
    }
})

// app.get() method to create a api over Team.json file
app.get('/api/v1/teamData', async (req, res) => {
    try{
        let data = await readJsonFile(teamPath)
        res.json(data)
    } catch {
        res.status(404).send(err.toString())
    }
})

// Listening the server over the PORT defined as a variable - PORT 3000
app.listen(PORT, () => {
    console.log(`Port Started at Port Number: ${PORT}`)
})