const { response } = require("express")
const { selectAll, insertContact, selectAllOnLinkedId } = require("../database/databaseOperations")
const { resolvePrimaryContact } = require("../services/identifyOperations")
const createDataEntity = require("../utilities/createDataEntity")
const createResponse = require("../utilities/createResponse")

const checkForInsert=(requestBody)=>{
    return requestBody.email!=null&&requestBody.phoneNumber!=null&&requestBody.email.length!=0&&requestBody.phoneNumber.length!=0
}

const identityHandler = (requestBody)=>{

    return new Promise((s,r)=>{
        selectAll(requestBody.email,requestBody.phoneNumber).then((rows)=>{

            if(rows.length==0)
            {
                console.log("creating a new id")
                const dataEntity = createDataEntity(requestBody)
                insertContact(dataEntity).then((data)=>{

                    s(createResponse(dataEntity,[]))


                }).catch((err)=>{
                    console.log(err)
                    r()
                })
            }
            else
            {
                console.log("values already exists")
                resolvePrimaryContact(rows,requestBody).then(async (res)=>{
                    let primaryEntity = res.pcontact
                    console.log("identified primary contact as: ",primaryEntity)
                    if(res.shouldUpdate&&checkForInsert(requestBody))
                    {
                        
                        let secondaryEntity = createDataEntity(requestBody,primaryEntity.id)
                        console.log("inserting new secondary")
                        secondaryResponses.push(secondaryEntity)
                        await insertContact(secondaryEntity)
                    }
                    
                    selectAllOnLinkedId(primaryEntity.id).then((allVals)=>{
                        let secondaryResponses = [...allVals.filter((sval)=>(sval.id!=primaryEntity.id))]
                        s(createResponse(primaryEntity,secondaryResponses))
                    }).catch((err)=>{
                        r()
                    })
                    
                })
            }
            
        }).catch((err)=>{
            console.log(err)
            r()
        })
    })
    


}

module.exports = identityHandler