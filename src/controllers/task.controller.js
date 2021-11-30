import Task from "../models/Task";

export const renderTask = async (req, res) => {
    const tasks = await Task.find().lean()
    console.log(tasks);
    res.render('index', {
        tasks: tasks
    })
}

export const createTask = async (req, res) => {
    try {
        const task = Task(req.body)
        console.log(task);
        await task.save()
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }

    // const taskSaved = await task.save()
    // console.log(taskSaved);
    // res.send('saved')
}

export const renderTaskEdit = async (req, res) => {
    // console.log(req.params.id);
    try {
        const task = await Task.findById(req.params.id).lean();
        res.render("edit", {
            task
        });
    } catch (error) {
        console.log(error.messege);
    }
}

export const editTask = async (req, res) => {
    console.log(req.body);
    console.log(req.params.id);
    const {
        id
    } = req.params
    await Task.findByIdAndUpdate(id, req.body)
    res.redirect('/')
    // res.send('received');
}
export const deleteTask = async (req, res) => {
    const {
        id
    } = req.params;
    await Task.findByIdAndDelete(id)
    res.redirect('/')
}

export const taskToggleDone = async (req, res) => {
    const {
        id
    } = req.params;
    // await Task.findByIdAndUpdate(id, {done: !req.body.done})

    const task = await Task.findById(id)
    console.log(task);
    task.done = !task.done;
    await task.save();
    res.redirect('/')
}