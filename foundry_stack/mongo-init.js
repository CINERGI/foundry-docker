let error = false

let res = [
    db.cinergi,
    db = db.getSiblingDB('cinergi'),

    db.createUser({
        user: 'test-user',
        pwd: 'example',
        roles: [
            {
                role: 'root',
                db: 'admin',
            },
        ],
    }),
    db.getCollectionNames(),
    db.cinergi.insertOne({test:'test'}),

]

printjson(res)

if (error) {
    print('Error, exiting')
    quit(1)
}