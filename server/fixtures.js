// Fixture data

if (Organizations.find().count() === 0) {

    var orgId = Organizations.insert({
        name: 'Mung',
        accountCode: 4
    });

    var org = Organizations.findOne(orgId);
    

    // http://stackoverflow.com/questions/23507384/adding-more-fields-to-meteor-user-accounts

    var newUser = Meteor.users.insert({
        emails: [
        // each email address can only belong to one user.
            { address: "superadmin@test.com", verified: true },
        ],
        profile: { 
            name: 'Super Admin',
            orgName: org.name,
            orgId: org._id,
            accountCode: org.accountCode,
            accountStatus: 'active'
        },
        roles: ['superadmin']
    });


    Accounts.setPassword(newUser, 'asdfasdf');


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