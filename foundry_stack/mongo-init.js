let error = false

let res = [
//    db.cinergi,
    db = db.getSiblingDB('cinergi'),
    db.test.insertOne({test:'test'}),
    db.createUser({
        user: 'pipeline',
        pwd: 'example',
        roles: [

            {
                role: 'dbAdmin',
                db: 'cinergi',
            },
            {
                role: 'readWrite',
                db: 'cinergi',
            }

        ],
    }),
    db.createUser({
        user: 'root',
        pwd: 'example',
        roles: [

            {
                role: 'dbOwner',
                db: 'cinergi',
            },
        ],
    }),
    db.getCollectionNames(),


]

printjson(res)

if (error) {
    print('Error, exiting')
    quit(1)
}