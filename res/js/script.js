$(function() {
    loadProfile();
    $('.avatar').click(function() {
        if (!$('#user-info').is(":hidden")) {
            $('#user-info').hide();
        } else {
            loadProfile();
            $('#user-info').show();
        }
    });


});



function loadProfileInfo() {
    return $.get({
        url: 'https://private-anon-88cfa17c4c-wad20postit.apiary-mock.com/users/1',
        success: function(response) {
            return response;
        },
        error: function() {
            alert('error1')
        }
    });
}

function loadProfile() {
    return loadProfileInfo()
        .then(function(response) {
            profile = new Profile(
                firstname = response.firstname,
                lastname = response.lastname,
                email = response.email,
                avatar = response.avatar
            );
            $('#user-name').text(profile.firstname + " " + profile.lastname);
            $('#user-email').text(profile.email);
            $('img.avatar').attr("src", response.avatar);
        })
}