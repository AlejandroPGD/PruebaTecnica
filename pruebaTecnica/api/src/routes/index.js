const { Router } = require("express");
const { Op } = require('sequelize');
const { Task } = require('../db');
const { sjf } = require("../sjf");

const router = Router();

router.post('/task', async (req, res) => {
    const task = req.body;

    if (!task.name || !task.description || !task.duration || !task.beginDate || !task.endDate || !task.priority || !task.status) {
        res.status(404).send('Missing data to create the task')
    } else {
        try {


            let newTask = await Task.create({
                name: task.name,
                description: task.description,
                duration: Number(task.duration),
                beginDate: task.beginDate,
                endDate: task.endDate,
                priority: task.priority,
                status: task.status,
                task_id: task.task_id || null,
            });
            console.log("newtask", newTask)
            // if (task.id) await newTask.taskch(task.id);
            res.status(201).send('Task created')


        } catch (e) {
            res.send('error:' + e.message)
        }
    }


})


router.get('/task', async (req, res) => {
    let { name, priority, status, task_id } = req.query;
    let { date } = req.body
    try {
        //console.log("name", name)
        if (name) {
            const task = await Task.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`,
                    },

                },

            });
            if (!task.length) return res.status(404).send('There are no task in the database');
            return res.status(200).send(task);
        } else if (date) {
            //console.log("date", typeof (date))
            const task = await Task.findAll({
                where: {
                    beginDate: {
                        [Op.eq]: date
                    },

                },

            });

            if (!task.length) return res.status(404).send('There are no task in the database');
            return res.status(200).send(task);
        } else if (priority || status) {
            //console.log("priority", priority, "statu", status)
            const task = await Task.findAll({
                where: {
                    priority: priority || "Urgente",
                    status: status || "En Proceso"

                },
                order: [['id', 'ASC']],
            });
            if (!task.length) return res.status(404).send('There are no task in the database');
            return res.status(200).send(task);
        } else if (task_id) {
            const task = await Task.findAll({
                where: {
                    task_id: task_id,
                },
                order: [['id', 'ASC']],
            });
            if (!task.length) return res.status(404).send('There are no task in the database');
            return res.status(200).send(task);
        } else {

            let taskUrgent = await Task.findAll({
                where: {
                    priority: "Urgente",
                },
                order: [['duration', 'ASC']],

            });
            let taskNormal = await Task.findAll({
                where: {
                    priority: "Normal",
                },
                order: [['duration', 'ASC']],
            });
            let taskShort = await Task.findAll({
                where: {
                    priority: "Bajo",
                },
                order: [['duration', 'ASC']],
            });

            //if (!task.length) return res.status(404).send('There are no task in the database');

            //sjf(task)

            // console.log("urgente", taskUrgent)
            // console.log("Normal", taskNormal)
            // console.log("Bajo", taskShort)
            return res.status(200).send((taskUrgent.concat(taskNormal)).concat(taskShort));
        }



    } catch (error) {
        res.status(200).json(`Error at find all task  ${error}`)
    }
})

router.get('/task/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const foundTask = await Task.findByPk(id);
        return res.status(200).send(foundTask);

    } catch (error) {
        res.status(200).json(`Error at find task  ${error}`)
    }
})


router.put('/task/:id', async (req, res) => {

    const { id } = req.params;
    try {
        const editTask = req.body;
        const editedTask = await Task.update(editTask, {
            where: { id: id }
        });
        res.status(201).send(`Edited Task`)
    } catch (e) {
        res.send('error:' + e.message)
    }
})


router.delete('/task/:id', async (req, res) => {
    try {
        let { id } = req.params;
        await Task.destroy({
            where: { id: id }
        });
        res.status(201).send('Deleted Task')
    } catch (e) {
        res.send('error:' + e.message)
    }
})

module.exports = router;
