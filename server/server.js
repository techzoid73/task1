require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 5001;
const db = require('./db');
const cors = require('cors');

app.use(cors());
app.use(express.json()); // To read post requests
app.use(express.urlencoded({ extended: true }));


/**  Create Operation */
app.post('/create',async (req,res)=>{
    try{
        const results = await db.query("INSERT INTO signp_tbl (name,email,phone,password) values($1,$2,$3,$4) returning *", [req.body.name, req.body.email, req.body.phone, req.body.password]);
        res.status(200).json({
            status : "Success",
        });
        }
        catch(err){
            console.log(err);
            res.status(400).json({
                error : err
            });
        };
});

/**  Read Operation */
app.get('/',async (req,res)=>{

    try{
        const results = await db.query("select * from signp_tbl");

        console.log(results);
        res.status(200).json({
            status : "Success",
            results : results.rowCount,
            data : {
                list : results.rows,
            }
        });
        }
        catch(err){
            res.status(400).json({
                error : err
            });
        };

});


app.listen(5000,()=>{
    console.log(`Server Started on port 5000`);
});