const createResponse = (rows) =>{
    let response = {
        "contact":{
			"primaryContatctId": "",
			"emails": [], // first element being email of primary contact 
			"phoneNumbers": [], // first element being phoneNumber of primary contact
			"secondaryContactIds": [] // Array of all Contact IDs that are "secondary" to the primary contact
		}
    }

    for(let row of rows)
    {
        
            if(row.linkedId==null)
            response.contact.primaryContatctId=row.id
            response.contact.emails.push(row.email)
            response.contact.phoneNumbers.push(row.phonenumber)
            if(row.linkedId!=null)
            response.contact.secondaryContactIds(row.id)
        
    }

    return response
}

module.exports = createResponse