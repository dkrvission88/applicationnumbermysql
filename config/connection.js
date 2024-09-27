import mongoose, { connect } from "mongoose";

const dataconnection=()=>{
   mongoose. connect(process.env.DATABASE)
    .then(()=>{console.log("Data is connected !!!")
       
    })
    .catch(()=>{console.log("data is not connected !!!");
    })
}

export default dataconnection