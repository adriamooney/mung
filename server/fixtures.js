// Fixture data
if (Collections.find().count() === 0) {
  var now = new Date().getTime();

  Collections.insert({
    title: 'My DataSet 1',
    submitted: new Date(now - 10 * 3600 * 1000),
  });

  Collections.insert({
    title: 'My DataSet 2',
    submitted: new Date(now - 12 * 3600 * 1000),
  });
}