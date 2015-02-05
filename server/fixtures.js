// Fixture data
if (Collections.find().count() === 0) {
  var now = new Date().getTime();

  Collections.insert({
    title: 'My DataSet 1',
    submitted: new Date(now - 10 * 3600 * 1000),
    data: {
        person: {
            height: 100,
            weight: 50
        },
        person: {
            height: 65,
            weight: 45
        },
        person: {
            height: 103,
            weight: 70
        }
    }
  });

  Collections.insert({
    title: 'My DataSet 2',
    submitted: new Date(now - 12 * 3600 * 1000),
    data: [
                {
                    "colorName":"red",
                    "hexValue":"#f00"
                },
                {
                    "colorName":"green",
                    "hexValue":"#0f0"
                },
                {
                    "colorName":"blue",
                    "hexValue":"#00f"
                },
                {
                    "colorName":"cyan",
                    "hexValue":"#0ff"
                },
                {
                    "colorName":"magenta",
                    "hexValue":"#f0f"
                },
                {
                    "colorName":"yellow",
                    "hexValue":"#ff0"
                },
                {
                    "colorName":"black",
                    "hexValue":"#000"
                }
            
        ]

  });
}