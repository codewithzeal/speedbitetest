const createPrimaryTableQuery = 'CREATE TABLE primarycontacts (id INT PRIMARY KEY, phoneNumber VARCHAR, email VARCHAR, linkedId INT, linkPrecedence VARCHAR(10), createdAt TIMESTAMP, updatedAt TIMESTAMP, deletedAt TIMESTAMP);'

const createSecondaryTableQuery = 'CREATE TABLE secondarycontacts (id INT PRIMARY KEY, phoneNumber VARCHAR, email VARCHAR, linkedId INT REFERENCES primarycontacts(id), linkPrecedence VARCHAR(10), createdAt TIMESTAMP, updatedAt TIMESTAMP, deletedAt TIMESTAMP);'

const getAllFromPrimary = (email,phone)=>{
    const query = {
        text: 'select * from primarycontacts where email = $1 OR phoneNumber = $2 order by updatedAt;',
        values: [email, phone],
    };
    return query
}

const insertQuery = (requestBody,tableName)=>{
    const keys = " ("+Object.keys(requestBody).join(",")+") VALUES "
    const values = Object.values(requestBody)
    const formatters = "("+values.map((keys, index) => `$${index+1}`).join(",")+");";
    const queryString = "insert into "+tableName+keys+formatters
    const query = {
        text: queryString,
        values
    };
    return query
}

module.exports={
    createPrimaryTableQuery,
    createSecondaryTableQuery,
    getAllFromPrimary,
    insertQuery
}