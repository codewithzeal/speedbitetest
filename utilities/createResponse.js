const createResponse = (primaryRow,secondaryRows) =>{
    let response = {
        "contact":{
			"primaryContatctId": "",
			"emails": [], // first element being email of primary contact 
			"phoneNumbers": [], // first element being phoneNumber of primary contact
			"secondaryContactIds": [] // Array of all Contact IDs that are "secondary" to the primary contact
		}
    }

    let visitedEmail = []
    let visitedPhoneNumber = []
    response.contact.primaryContatctId = primaryRow.id
    response.contact.emails.push(primaryRow.email)
    response.contact.phoneNumbers.push(primaryRow.phonenumber)
    visitedEmail[primaryRow.email]=true
    visitedPhoneNumber[primaryRow.phonenumber]=true

    secondaryRows.forEach((row)=>{
        if(visitedEmail[row.email]===undefined)
        {
            visitedEmail[row.email]=true
            response.contact.emails.push(row.email)
        }
        if(visitedPhoneNumber[row.phonenumber.toString()]===undefined)
        {
            visitedPhoneNumber[row.phonenumber]=true
            response.contact.phoneNumbers.push(row.phonenumber)
        }
        response.contact.secondaryContactIds.push(row.id)
    })    

    return response
}

module.exports = createResponse