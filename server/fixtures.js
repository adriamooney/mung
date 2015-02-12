// Fixture data
if (Collections.find().count() === 0) {

    var now = new Date().getTime();

    var orgId = Organizations.insert({
        name: 'Mung',
        accountCode: 4
    });

    var org = Organizations.findOne(orgId);

    // http://stackoverflow.com/questions/23507384/adding-more-fields-to-meteor-user-accounts

    var tomId = Meteor.users.insert({
        emails: [
        // each email address can only belong to one user.
            { address: "adriamooney+mung@gmail.com", verified: true },
        ],
        profile: { 
            name: 'Adria Mooney',
            orgName: org.name,
            orgId: org._id,
            accountCode: org.accountCode,
            accountStatus: 'active'
        },
        roles: ['superadmin']
    });

    var bobId = Meteor.users.insert({
        emails: [
        // each email address can only belong to one user.
            { address: "james.dipadua+mung@gmail.com", verified: true },
        ],
        profile: { 
            name: 'James DiPadua',
            orgName: org.name,
            orgId: org._id,
            accountCode: org.accountCode,
            accountStatus: 'active'
        },
        roles: ['superadmin']
    });

    Accounts.setPassword(tomId, 'asdfasdf');
    Accounts.setPassword(bobId, 'asdfasdf');


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

    //create plans.  
    if(!AccountPlans.findOne({code: 1})) {
        AccountPlans.insert({
            name: 'Free',
            code: 1
          });
    }
    if(!AccountPlans.findOne({code: 2})) {
        AccountPlans.insert({
            name: 'Non Profit',
            code: 2
          });
    }
    if(!AccountPlans.findOne({code: 3})) {
        AccountPlans.insert({
            name: 'Business Lite',
            code: 3
          });
    }
    if(!AccountPlans.findOne({code: 4})) {
        AccountPlans.insert({
            name: 'Enterprise',
            code: 4
          });
    }
}