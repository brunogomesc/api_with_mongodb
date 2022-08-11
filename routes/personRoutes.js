const routes = require('express').Router()
const Person = require('../models/Person')

routes.post('/create_person', async (req,res) => {
      const {name, salary, approved} = req.body

      if(!name) {
            res.status(422).json({message: "The name is mandatory!"})
            return
      }

      const person = {
            name,
            salary,
            approved
      }

      try {
            await Person.create(person)
            res.status(201).json({message: "Created Person is Sucessfull!"})
            return
      } catch(error) {
            res.status(500).json({error: error})
      }
})

routes.get('/read_person', async (req,res) => {
      try {
            const people = await Person.find()
            res.status(200).json(people)
            return
      } catch (error) {
            res.status(500).json({error: error})
      }
})

routes.get('/read_person_id/:id', async (req,res) => {
      const id = req.params.id

      try {
            const person = await Person.findOne({_id: id})

            if(!person) {
                  res.status(200).json({message: "User not found!"})
                  return
            }

            res.status(200).json(person)
            return
      } catch (error) {
            res.status(500).json({error: error})
      }
})

routes.patch('/update_person/:id', async (req,res) => {
      const id = req.params.id
      const {name, salary, approved} = req.body

      const newPerson = {
            name,
            salary,
            approved
      }

      try {

            const updatedPerson = await Person.updateOne({_id: id}, newPerson)
            if(updatedPerson.matchedCount === 0) {
                  res.status(200).json({message: "User not found!"})
                  return
            }

            res.status(200).json(newPerson)
            return
      } catch (error) {
            res.status(500).json({error: error})
      }
})

routes.delete('/delete_person/:id', async (req,res) => {
      const id = req.params.id
      
      const person = await Person.findOne({_id: id})

      if(!person) {
            res.status(200).json({message: "User not found!"})
            return
      } 

      try {

            await Person.deleteOne({_id: id})
            res.status(200).json({message: "User has been deleted!"})
            
      } catch (error) {
            res.status(500).json({error: error})
      }

})

module.exports = routes