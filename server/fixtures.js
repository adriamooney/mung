// Fixture data
if (Collections.find().count() === 0) {

    var now = new Date().getTime();

    var orgId = Organizations.insert({
        name: 'Ikea'
    });

    var org = Organizations.findOne(orgId);

    // http://stackoverflow.com/questions/23507384/adding-more-fields-to-meteor-user-accounts

    var tomId = Meteor.users.insert({
        emails: [
        // each email address can only belong to one user.
            { address: "tomsuper@tom.com", verified: true },
        ],
        profile: { 
            name: 'Tom Jones',
            orgName: org.name,
            orgId: org._id,
            accountType: 'user',
            accountStatus: 'active'
        },
        roles: ['superadmin']
    });

    Meteor.users.insert({
        emails: [
        // each email address can only belong to one user.
            { address: "bobadmin@bob.com", verified: true },
        ],
        profile: { 
            name: 'Bob Smith',
            orgName: org.name,
            orgId: org._id,
            accountType: 'admin',
            accountStatus: 'active'
        },
        roles: ['admin']
    });

    var tom = Meteor.users.findOne(tomId);

    Collections.insert({
        title: 'My DataSet 1',
        file_name: 'some-name.csv',
        uploadedBy: tom._id,
        orgName: org.name,
        orgId: org._id,
        date_added: new Date(now - 10 * 3600 * 1000),
        file_data: [
            {
                name: 'height',
                property_data: [100, 50, 60, 75, 120, 101]
            },
            {
                name: 'weight',
                property_data: [120, 150, 160, 175, 220, 201]
            }
        ]
    });

    Collections.insert({
        title: 'Data set with a really long name about stuff',
        file_name: 'some-name.csv',
        uploadedBy: tom._id,
        orgName: org.name,
        orgId: org._id,
        date_added: new Date(now - 10 * 3600 * 1000),
        file_data: [
            {
                name: 'height',
                property_data: [100, 50, 60, 75, 120, 101]
            },
            {
                name: 'weight',
                property_data: [120, 150, 160, 175, 220, 201]
            }
        ]
    });
}