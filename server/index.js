const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());

const PORT = process.env.PORT || 8000

const fs = require("fs")
const path = require("path")

function readJsonFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if(err) reject(err)
            resolve(JSON.parse(data))
        })
    })
}

const accountIndustryPath = path.join('data','AccountIndustry.json')
const acvRangePath = path.join('data', 'ACVRange.json')
const customerTypePath = path.join('data', 'CustomerType.json')
const teamPath = path.join('data', 'Team.json')

app.get('/api/v1/accountIndustryData', async (req, res) => {
    try{
        const data = await readJsonFile(accountIndustryPath)
        res.json(data)
    } catch (err) {
        res.status(404).send(err.toString())
    }
})

app.get('/api/v1/acvRangeData', async (req, res) => {
    try{
        let data = await readJsonFile(acvRangePath)
        res.json(data)
    } catch {
        res.status(404).send(err.toString())
    }
})

app.get('/api/v1/customerTypeData', async (req, res) => {
    try{
        let data = await readJsonFile(customerTypePath)
        res.json(data)
    } catch {
        res.status(404).send(err.toString())
    }
})

app.get('/api/v1/teamData', async (req, res) => {
    try{
        let data = await readJsonFile(teamPath)
        res.json(data)
    } catch {
        res.status(404).send(err.toString())
    }
})

app.listen(PORT, () => {
    console.log(`Port Started at Port Number: ${PORT}`)
})