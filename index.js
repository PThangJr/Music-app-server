const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./src/config/connectDB');
const errorsHandlingMiddleware = require('./src/app/middlewares/errorsHandlingMiddleware');
const route = require('./src/routes')
const app = express();

const PORT = process.env.PORT || 5000;
//Connect to mongoDB Atlas
connectDB();
//*

//Cors
app.use(cors())
// Body Parser
app.use(
    express.json({
        type: "application/json",
    })
)
app.use(express.urlencoded({
    extended: true,
}))
//

//Route
route(app);

//Page Not Found
app.use((req, res, next) => {
    const error = new Error('Page not found');
    error.status = 404;
    next(error);
});
//Errors Handling
app.use(errorsHandlingMiddleware);

app.listen(PORT, () => {
    console.log(`App listening in PORT: ${PORT}`)
})