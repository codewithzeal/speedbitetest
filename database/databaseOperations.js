const createDataEntity = require("../utilities/createDataEntity")
const {insertQuery, selectAllQuery, selectOnIdQuery, selectOnLinkedIdQuery, updatePrimaryToSecondaryQuery } = require("../utilities/queryProvider")
const executeQuery = require("./queryExecutor")


const insertContact = (dataEntity)=>{
    return new Promise((s,r)=>{
        const query = insertQuery(dataEntity)
        executeQuery(query).then((rows)=>{
            s(dataEntity)
        }).catch((err)=>{
            r()
        })
    })
}

const selectAll=(email,phonenumber)=>{
    const query = selectAllQuery(email,phonenumber)
    return new Promise((s,r)=>{
        executeQuery(query).then((rows)=>{
            s(rows)
        }).catch((err)=>{
            r()
        })
    })
}

const selectOnId=(id)=>{
    const query = selectOnIdQuery(id);
    return new Promise((s,r)=>{
        executeQuery(query).then((rows)=>{
            s(rows)
        }).catch((err)=>{
            r()
        })
        
    })
}

const selectAllOnLinkedId = (id)=>{
    const query = selectOnLinkedIdQuery(id);
    return new Promise((s,r)=>{
        executeQuery(query).then((rows)=>{
            s(rows)
        }).catch((err)=>{
            r()
        })
        
    })
}

const updatePrimaryToSecondary=(secondaryId,linkid)=>{
    const query = updatePrimaryToSecondaryQuery(secondaryId,linkid)
    return new Promise((s,r)=>{
        executeQuery(query).then((rows)=>{
            s(rows)
        }).catch((err)=>{
            r()
        })
        
    })
}

module.exports = {
    insertContact,
    selectAll,
    selectAllOnLinkedId,
    selectOnId,
    updatePrimaryToSecondary
}