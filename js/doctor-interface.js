var Search = require("./../js/api-object.js").DoctorSearch;

$(document).ready(function() {
    $('select').material_select();
    $("#issue").submit(function(event) {
        event.preventDefault();
        var symptom = $("#symptom").val();
        var radius = $("#radius").val();
        var gender = $("#gender").val();
        var newSearch = new Search($("#symptom").val().toString(), $("#radius").val().toString(), $("#gender").val().toString());
        console.log(newSearch.issue, newSearch.radius, newSearch.gender);
        newSearch.getLocation()
            .then(newSearch.getDoctors);
    })
})
