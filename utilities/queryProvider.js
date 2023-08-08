const createPrimaryTableQuery = 'CREATE TABLE primarycontacts (id INT PRIMARY KEY, phoneNumber VARCHAR, email VARCHAR, linkedId INT, linkPrecedence VARCHAR(10), createdAt TIMESTAMP, updatedAt TIMESTAMP, deletedAt TIMESTAMP);'

const createSecondaryTableQuery = 'CREATE TABLE secondarycontacts (id INT PRIMARY KEY, phoneNumber VARCHAR, email VARCHAR, linkedId INT REFERENCES primarycontacts(id), linkPrecedence VARCHAR(10), createdAt TIMESTAMP, updatedAt TIMESTAMP, deletedAt TIMESTAMP);'

module.exports={
    createPrimaryTableQuery,
    createSecondaryTableQuery
}