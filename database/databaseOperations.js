const createDataEntity = require("../utilities/createDataEntity")
const { getAllFromPrimary, insertQuery } = require("../utilities/queryProvider")
const executeQuery = require("./queryExecutor")


const createNewPrimaryContact = (requestBody)=>{
    const dataEntity = createDataEntity(requestBody)
    const query = insertQuery(dataEntity,"primarycontacts")
    return new Promise((s,r)=>{
        const rows = executeQuery(query)
        if(rows==null)
        r()
        else
        s(dataEntity)
    })
}

const createNewSecondaryContact = (requestBody,linkID)=>{

}


const shiftToSecondory = (dataEntity)=>{

}

const identifyOperation = (requestBody) =>{
    const query = getAllFromPrimary(requestBody.email,requestBody.phoneNumber)
    
    return new Promise((s,r)=>{
        executeQuery(query).then((rows)=>{
            console.log("total values in db: ",rows.length)
            if(rows==null)
            r()
            else
            {
                if(rows.length==0)
                {
                    createNewPrimaryContact(requestBody).then((data)=>{
                        s([data])
                    }).catch((data)=>{
                        r()
                    })
                }
                if(rows.length==1)
                {
                    console.log(rows)
                    s(rows);
                }
                else
                {
                    //code to shift to secondary
                }
            }
        }).catch((data)=>{
            r()
        })
        

    })

}

module.exports = identifyOperation