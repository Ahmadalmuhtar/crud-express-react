const express = require('express')
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express()
app.use(cors())
app.use(express.json())

const sequelize = new Sequelize('crud_operations', 'postgres', 'ASKsome123!', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
});

const user = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    mobile: { type: DataTypes.INTEGER },
}, { timestamps: true })

sequelize.sync()
    .then(() => {
        console.log('Database and table synced')
    })
    .catch((err) => {
        console.error('Error syncing Database', err)
    })

const PORT = process.env.PORT || 8080

app.get("/", async (req, res) => {
    const data = await user.findAll({})
    res.json({ success: true, data: data })
})

app.post('/create', async (req, res) => {
    try {
        console.log(req.body)
        const newUser = await user.create(req.body);
        res.send({ success: true, message: 'Data saved successfully', data: newUser });
    } catch (error) {
        console.error('Error creating new User: ', error)
        res.status(500).json({ success: false, message: 'Error saving new User' })
    }
})

app.put('/user/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { ...rest } = req.body;

        const [rowsUpdated, [updatedUser]] = await user.update(rest, { where: { id: id }, returning: true });

        if (rowsUpdated === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, message: 'User updated successfully', data: updatedUser });
    } catch (error) {
        console.error('Error updating User: ', error);
        res.status(500).json({ success: false, message: 'Error updating User' });
    }
});


app.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id
        console.log(id)
        const data = await user.destroy({ where: { id: id } })
        res.json({ success: true, message: 'User deleted successfully', data: data });
    } catch (error) {
        console.error('Error deleting User', error)
        res.status(500).json({ success: false, message: 'Error updating User' })
    }
})

app.listen(PORT, () => console.log("Server is running on the Port: ", PORT))