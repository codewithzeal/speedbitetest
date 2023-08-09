let counter = 0;

const createDataEntity = (requestBody,linkID=null)=>
{
    counter++
    return {
        id: counter,
        phonenumber: requestBody.phoneNumber,
        email: requestBody.email,
        linkedId: linkID,
        linkPrecedence: linkID==null?"primary":"secondary",
        createdAt: requestBody.createdat?requestBody.createdAt:new Date().toISOString(),
        updatedAt: requestBody.updatedat?requestBody.updatedAt:new Date().toISOString(),
        deletedAt: null
    }
}

module.exports = createDataEntity