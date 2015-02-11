// Fixture data
if (Collections.find().count() === 0) {

    var now = new Date().getTime();

    Organizations.insert({
        name: 'Company A'
    });

    // http://stackoverflow.com/questions/23507384/adding-more-fields-to-meteor-user-accounts

    // http://stackoverflow.com/questions/27299994/meteor-users-find-not-returning-in-publish
    //this above link person is doing organization stuff just like we want to do

    var tomId = Meteor.users.insert({
        emails: [
        // each email address can only belong to one user.
            { address: "tom@boo.com", verified: true },
        ],
        profile: { 
            name: 'Tom Jones',
            organization: 'i6ttWn6CALg4NMRsR',
            accountType: 'user',
            accountStatus: 'active'
        }
    });

    Meteor.users.insert({
        emails: [
        // each email address can only belong to one user.
            { address: "bob@boo.com", verified: true },
        ],
        profile: { 
            name: 'Bob Smith',
            organization: 'i6ttWn6CALg4NMRsR',
            accountType: 'user',
            accountStatus: 'active'
        }
    });


    var tom = Meteor.users.findOne(tomId);

    Collections.insert({
        title: 'My DataSet 1',
        file_name: 'some-name.csv',
        uploadedBy: tom._id,
        organization: 'Company A',
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