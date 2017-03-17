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
};

DoctorSearch.prototype.getDoctors = function(coords) {
    var current = this;
    for (i = 0; i < coords.length; i++) {
        console.log(coords[i]);
    }
    var requestUrl = "https://api.betterdoctor.com/2016-03-01/doctors?query=" + coords[2] + "&location=" + coords[0] + "%2C" + coords[1] + "%2C" + coords[3] + "&user_location=" + coords[0] + "%2C" + coords[1] + "&gender=" + coords[4] + "&sort=distance-asc&skip=0&limit=20&user_key=c0c37ba24cca638d819d6ee47807bc99";
    console.log(requestUrl);
    $.get(requestUrl)
        .then(function(result) {
            for (i = 0; i < result.data.length; i++) {
                $("#results").append("<div class='card blue-grey'><div class='card-image'><img src=" + result.data[i].profile.image_url + "></div><div class='card-content white-text'><span class='card-title'>" + result.data[i].profile.first_name + " " + result.data[i].profile.last_name + " " + result.data[i].profile.title + "</span><p>" + result.data[i].profile.bio + "</p></div><div class='card-action'><a href=" + result.data[i].practices[0].website + ">Website</a></div></div>")
            }
        })
        .fail(function(error) {
            console.log("you dun fucked up");
        })
}

exports.DoctorSearch = DoctorSearch;
