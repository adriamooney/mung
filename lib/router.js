Router.configure({
  layoutTemplate: 'blank',  //main layout (header, footer stuff that doesn't change). contains yield helper where dynamic content goes into based on route
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  yieldTemplates: {
  	'sidebar': {to: 'sidebar'}
  },
  //wait for the data to be rendered before showing the layout
  waitOn: function() { 
  	//return [Meteor.subscribe('posts'), Meteor.subscribe('comments')];
  	return [Meteor.subscribe('accountplans')];
  	//return Meteor.subscribe('notifications');
	}
  //told the router to use the layout template layout.html as the default layout for all routes
});

Router.route('/', {
  name: 'canvas',
  layout: 'layout',
  waitOn: function() {
    Meteor.subscribe('datasets');  
  }
});

/*Router.route('/', function() {
  //this.wait(Meteor.subscribe('datasets'));
  this.layout('layout');
  this.render('canvas');
  this.render('sidebar', {
    to: 'sidebar' 
  });
  
});  */

Router.route('/dashboard', 'dashboard'); 

Router.route('/admin',  {
  name: 'admin',
  waitOn: function() {
    if (Roles.userIsInRole(Meteor.userId(), ('superadmin'))) {
        Meteor.subscribe('users');
        Meteor.subscribe('organizations');
    } else {
        Router.go('/');
    }
  }
});


Router.route('/organization/:_id', {
    name: 'organization',
    /*waitOn: function() {
        var orgId = this.params._id;
        console.log(orgId);
        // Meteor.subscribe('users');  //this should be modifed to a publication that only shows users in this organization
        //Meteor.susbscribe('organizationsUsers', orgId);
        Meteor.subscribe('organizations');  //this should be modified.  make another publication that is only the organization for this user
        //why doesn't it work when we subscribe to // organizationsUsers ?
    }, */
    subscriptions: function() {
        //TODO: NEED TO MAKE THIS ROUTE INACCESSIBLE TO USERS UNLESS IT IS THEIR OWN ORGANIZATION (AND USER IS AN ADMIN), OR IF IT IS A SUPERADMIN
        Meteor.subscribe('organizations'); 
        this.subscribe('organizationsUsers', this.params._id).wait();
    },
    data: function() {
        return Organizations.findOne(this.params._id);
    }
});

Router.route('/account/:_id', {
  name: 'account',
  waitOn: function() {
    //TODO: NEED TO MAKE THIS ROUTE INACCESSIBLE TO USERS UNLESS IT IS THEIR OWN ACCOUNT, OR IF IT IS A SUPERADMIN

    var user = Meteor.users.findOne({_id:this.params._id});

    Session.set('accountPageUser', user);

    Meteor.subscribe('users'); //this should be modifed to a publication that only shows this user. but this was causing bug with router on logout
    // where the account page route would become a 404 rather than redirecting to home page.
    if (Roles.userIsInRole(Meteor.userId(), ('superadmin'))) {
        Meteor.subscribe('organizations');
    }

  }, 
  //data context, tell the template what data to put in there
  data: function() { return Meteor.users.findOne(this.params._id); }
});

Router.route('/meteor-resources', {
  name: 'meteor-resources',
  waitOn: function() {
    Meteor.subscribe('posts');
  }
});

//require login to see post submit template.
//show loading template until log in is complete, to make sure to 
//show the correct template
var requireLogin = function() {
  if(! Meteor.user()) {
    if(Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    }
    else {
      this.layout("homeLayout");
      this.render('home');
    }
  } else {
    this.next(); //this is iron router language
  }
};

//route to homepage when logging out:
var mustBeSignedIn = function() {
  if (!(Meteor.user() || Meteor.loggingIn())) {
    this.render('home')
    Router.go('/');
  } else {
    this.next();
  }
};


//This tells Iron Router to show the “not found” page not just for invalid routes 
//but also whenever the data function returns a “falsy” (i.e. null, false, undefined, or empty) object.
Router.onBeforeAction('dataNotFound', {only: ['account', 'organization']});  

Router.onBeforeAction(mustBeSignedIn, {except: ['/']}); 

Router.onBeforeAction(requireLogin);





