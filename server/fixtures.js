// Fixture data
if (Collections.find().count() === 0) {
  var now = new Date().getTime();

  Collections.insert({
    title: 'My DataSet 1',
    file_name: 'some-name.csv',
    date_added: new Date(now - 10 * 3600 * 1000),
    file_data: {
        property_0: {
            name: 'height',
            property_data: [100, 50, 60, 75, 120, 101]
        },
        property_1: {
            name: 'weight',
            property_data: [120, 150, 160, 175, 220, 201]
        }
    }
  });
}

console.log(Collections.find().fetch());
