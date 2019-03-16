let error = false

let res = [
    db.cinergi,
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
        ],
    }),
    db.createUser({
        user: 'root',
        pwd: 'example',
        roles: [

            {
                role: 'admin',
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