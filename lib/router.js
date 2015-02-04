Router.configure({
  layoutTemplate: 'layout',  //main layout (header, footer stuff that doesn't change). contains yield helper where dynamic content goes into based on route
  //loadingTemplate: 'loading',
  //notFoundTemplate: 'notFound',
  yieldTemplates: {
  	'sidebar': {to: 'sidebar'}
  },
  //wait for the data to be rendered before showing the layout
  waitOn: function() { 
  	//return [Meteor.subscribe('posts'), Meteor.subscribe('comments')];
  	return Meteor.subscribe('collections');
  	//return Meteor.subscribe('notifications');
	}
  //told the router to use the layout template layout.html as the default layout for all routes
});

Router.route('/', {name: 'canvas'}); //postsList is the name of the template to render in the yield helper inside layout.html


