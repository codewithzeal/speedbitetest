const createDataEntity = (requestBody,linkID=null)=>
{
    return {
        id: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
        phonenumber: requestBody.phoneNumber,
        email: requestBody.email,
        linkedId: linkID,
        linkPrecedence: linkID==null?"primary":"secondary",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null
    }
}

module.exports = createDataEntity