var key = require("./../.env").apiKey;

function DoctorSearch() {
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

DoctorSearch.prototype.getLocation = function(issue, radius, gender) {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(function(position) {
            resolve([position.coords.latitude, position.coords.longitude, issue, radius, gender]);
        });
    });
}

DoctorSearch.prototype.getDoctors = function(coords) {
    var current = this;
    for (i = 0; i < coords.length; i++) {
        console.log(coords[i]);
    }
    var requestUrl = "https://api.betterdoctor.com/2016-03-01/doctors?query=" + coords[2] + "&location=" + coords[0] + "%2C" + coords[1] + "%2C" + coords[3] + "&user_location=" + coords[0] + "%2C" + coords[1] + "&gender=" + coords[4] + "&sort=distance-asc&skip=0&limit=20&user_key=c0c37ba24cca638d819d6ee47807bc99";
    console.log(requestUrl)
    $.get(requestUrl)
        .then(function(result) {
            for (int i = 0; i < result.data.length; i++) {
                current.doctors.push(result.data[i]);
            }
        })
        .fail(function(error) {
            console.log("you dun fucked up");
        })
}

exports.DoctorSearch = DoctorSearch;
