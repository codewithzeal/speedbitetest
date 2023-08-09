const { insertContact, selectOnId, updatePrimaryToSecondary } = require("../database/databaseOperations")

const makeSecondary = (secondaryId,linkedId)=>{
    console.log("making secondary")
    return new Promise((s,r)=>{
        updatePrimaryToSecondary(secondaryId,linkedId).then((res)=>{
            s()
        }).catch((err)=>{
            r()
        })
    })
}


const resolvePrimaryContact = (rows,requestBody)=>{
    
    return new Promise(async (s,r)=>{
        let countOfPrimary = 0
        let primaryDataEntity = null
        let isEmailFound = false
        let isPhoneNumberFound = false
        for(let i=0;i<rows.length;i++)
        {
            let row = rows[i]
            if(row.email==requestBody.email)
            isEmailFound=true
            if(row.phonenumber==requestBody.phoneNumber)
            isPhoneNumberFound = true
            if(row.linkedid==null)
            {
                if(primaryDataEntity==null)
                primaryDataEntity=row
                else
                await makeSecondary(row.id,primaryDataEntity.id).catch((err)=>{r()})
            }
        }

        if(primaryDataEntity==null)
        {
            console.log("found no primary id")
            selectOnId(rows[0].linkedid).then((Trows)=>{
                s({pcontact:Trows[0],shouldUpdate:!(isEmailFound&&isPhoneNumberFound)})
            }).catch((err)=>{
                r()
            })
        }
        else
        {
            s({pcontact:primaryDataEntity,shouldUpdate:!(isEmailFound&&isPhoneNumberFound)})
        }

    })
    
}

module.exports={
    resolvePrimaryContact
}