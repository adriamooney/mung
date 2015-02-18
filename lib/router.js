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
    Meteor.subscribe('collections');
  }
});

/*Router.route('/', function() {
  //this.wait(Meteor.subscribe('collections'));
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
    Meteor.subscribe('users');
    Meteor.subscribe('organizations');
  }
});


Router.route('/organization/:_id', {
  name: 'organization',
  waitOn: function() {
    Meteor.subscribe('users');
    Meteor.subscribe('organizations');
    //why doesn't it work when we subscribe to // organizationsUsers ?
  },
  data: function() {
    return Organizations.findOne(this.params._id);
  }
});

Router.route('/account/:_id', {
  name: 'account',
  waitOn: function() {
    var id = this.params._id;
    Meteor.subscribe('users');
  },
  //data context, tell the template what data to put in there
  data: function() { return Meteor.users.findOne(this.params._id); }
});

Router.route('/meteor-resources', 'meteorResources'); 


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
}

//This tells Iron Router to show the “not found” page not just for invalid routes 
//but also whenever the data function returns a “falsy” (i.e. null, false, undefined, or empty) object.
Router.onBeforeAction('dataNotFound', {only: ['account', 'organization']});   

Router.onBeforeAction(requireLogin);







