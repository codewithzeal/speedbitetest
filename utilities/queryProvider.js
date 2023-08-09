const createContacts = 'CREATE TABLE contacts (id INT PRIMARY KEY, phoneNumber VARCHAR, email VARCHAR, linkedId INT, linkPrecedence VARCHAR(10), createdAt TIMESTAMP, updatedAt TIMESTAMP, deletedAt TIMESTAMP);'

const selectAllQuery = (email,phonenumber)=>{
    const query = {
        text: 'select * from contacts  where email = $1 OR phonenumber = $2 order by updatedat;',
        values: [email, phonenumber],
    };
    return query
}
const insertQuery = (dataEntity)=>{
    const keys = " ("+Object.keys(dataEntity).join(",")+") VALUES "
    const values = Object.values(dataEntity)
    const formatters = "("+values.map((keys, index) => `$${index+1}`).join(",")+");";
    const queryString = "insert into contacts "+keys+formatters
    const query = {
        text: queryString,
        values
    };
    return query
}

const selectOnIdQuery = (id)=>{
    const query = {
        text: 'select * from contacts where id=$1;',
        values: [id]
    };
    return query
}

const selectOnLinkedIdQuery = (id)=>{
    const query = {
        text: 'select * from contacts where linkedid=$1;',
        values: [id]
    };
    return query
}

module.exports={
    selectAllQuery,
    insertQuery,
    selectOnIdQuery,
    selectOnLinkedIdQuery
}