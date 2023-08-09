const { insertContact, selectOnId } = require("../database/databaseOperations")

const makeSecondary = (dataEntity,linkedId)=>{
    console.log("making secondary")
    return new Promise((s,r)=>{
        dataEntity.linkedid=linkedId
        dataEntity.updatedat=new Date().toISOString()
        dataEntity.linkprecedence = "secondary"
        insertContact(dataEntity).then((res)=>{
            s()
        }).catch((err)=>{r()})
    })
}


const resolvePrimaryContact = (rows,requestBody)=>{
    
    return new Promise(async (s,r)=>{
        let countOfPrimary = 0
        let primaryDataEntity = null
        var shouldUpdate = true
        for(let i=0;i<rows.length;i++)
        {
            let row = rows[i]
            if(shouldUpdate)
            {
                shouldUpdate = !(row.email==requestBody.email&&row.phonenumber==requestBody.phoneNumber)
                if(!shouldUpdate)
                console.log("prevented insert")

            }
            if(row.linkedid==null)
            {
                if(primaryDataEntity==null)
                primaryDataEntity=row
                else
                await makeSecondary(row,primaryDataEntity.id).catch((err)=>{r()})
            }
        }

        if(primaryDataEntity==null)
        {
            console.log("found no primary id")
            selectOnId(rows[0].linkedid).then((Trows)=>{
                s({pcontact:Trows[0],shouldUpdate:shouldUpdate})
            }).catch((err)=>{
                r()
            })
        }
        else
        {
            s({pcontact:primaryDataEntity,shouldUpdate:shouldUpdate})
        }

    })
    
}

module.exports={
    resolvePrimaryContact
}