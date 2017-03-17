var Search = require("./../js/api-object.js").DoctorSearch;

$(document).ready(function() {
    $('select').material_select();
    $("#issue").submit(function(event) {
        event.preventDefault();
        var symptom = $("#symptom").val();
        var radius = $("#radius").val();
        var gender = $("#gender").val();
        var newSearch = new Search();
        newSearch.getLocation(symptom, radius, gender)
            .then(newSearch.getDoctors);
    })
})
