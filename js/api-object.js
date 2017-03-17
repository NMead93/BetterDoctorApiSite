var key = require("./../.env").apiKey;

function DoctorSearch(issue, radius, gender) {
    this.issue = issue;
    this.lat;
    this.long;
    this.radius = radius;
    this.gender = gender;
    this.doctors = [];
}

// DoctorSearch.prototype.getUserLocation = function() {
//     var current = this;
//     navigator.geolocation.getCurrentPosition(current.success);
// }

// DoctorSearch.prototype.success = function(position) {
//     var current = this;
//     current.lat = position.coords.latitude;
//     current.long = position.coords.longitude;
//     console.log(current.lat, current.long);
// }

DoctorSearch.prototype.getLocation = function() {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position.coords.latitude, position.coords.longitude);
            resolve([position.coords.latitude, position.coords.longitude]);
        });
    });
}

DoctorSearch.prototype.getDoctors = function(coords) {
    var current = this;
    $.get("https://api.betterdoctor.com/2016-03-01/doctors?query=" + current.issue + "&location=" + coords[0] + "2C%" + coords[1] + "%2C" + current.radius + "&user_location=" + coords[0] + "%2C" + coords[1] + "&gender=" + current.gender + "&sort=distance-asc&skip=0&limit=20&user_key=c0c37ba24cca638d819d6ee47807bc99")
        .then(function(result) {
            console.log(result);
        })
        .fail(function(error) {
            console.log("you dun fucked up");
        })
}

exports.DoctorSearch = DoctorSearch;
