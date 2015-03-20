var request = require('request');
var ClassRoomData = [];

var loadEvents = function(start, end, classroom, callback){
  start = Math.round(start.getTime() / 1000);
  end = Math.round(end.getTime() / 1000);

  var CalendarDataUrl = "http://cims.nyu.edu/webapps/classrooms/WWH/"+classroom+"/calendar?start="+start+"&end="+end+"&format=json";
  request(CalendarDataUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(classroom, JSON.parse(body));
    }
  });
};

var getClassrooms = function(start, end, limitation){
  var ClassRoomMap = [];
  ClassRoomMap["101"] = 58;
  ClassRoomMap["102"] = 58;
  ClassRoomMap["109"] = 190;
  ClassRoomMap["1302"] = 60;
  ClassRoomMap["1314"] = 20;
  ClassRoomMap["1300"] = 100;
  ClassRoomMap["201"] = 40;
  ClassRoomMap["202"] = 40;
  ClassRoomMap["230"] = 15;
  ClassRoomMap["312"] = 40;
  ClassRoomMap["317"] = 40;
  ClassRoomMap["412"] = 20;
  ClassRoomMap["505"] = 12;
  ClassRoomMap["512"] = 40;
  ClassRoomMap["517"] = 40;
  ClassRoomMap["524"] =  14;
  ClassRoomMap["605"] = 12;
  ClassRoomMap["705"] = 12;
  ClassRoomMap["805"] = 12;
  ClassRoomMap["905"] = 12;

  for (var i = 0; i < Object.keys(ClassRoomMap).length; i++) {
    if(ClassRoomMap[Object.keys(ClassRoomMap)[i]] <= limitation){
      loadEvents(start, end, Object.keys(ClassRoomMap)[i], function(classroom, data){
        ClassRoomData[classroom] = data;
      });
    }
  };
};

var start = new Date("Wed, 01 March 2015 00:00:00 GMT");
var end = new Date("Wed, 31 March 2015 00:00:00 GMT");
getClassrooms(start, end, 13);