$(document).ready(function() {
    $('#lessonslist a').on('click', function() {
        console.log("clicked");
        $(this).toggleClass('active');
    });

});
