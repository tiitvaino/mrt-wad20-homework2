$(function() {
    loadProfile();
    loadProfiles();

    $('.avatar').click(function() {
        if (!$('#user-info').is(":hidden")) {
            $('#user-info').hide();
        } else {
            loadProfile();
            $('#user-info').show();
        }
    });

    // Have to do this complicated version because the buttons are loaded dynamically
    $(document).on("click", ".profile-follow-button", function(){
        if ($(this).css("backgroundColor") == 'rgb(1, 87, 155)') {
          $(this).css("backgroundColor", "rgb(255, 255, 255");
          $(this).css("color", "black");
          $(this).text("Unfollow");
        }

        else {
          $(this).css("backgroundColor", "rgb(1, 87, 155");
          $(this).css("color", "white");
          $(this).text("Follow");
        }
    })
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

function loadBrowseProfiles() {
    return $.get({
        url: 'https://private-anon-7a5a5239ec-wad20postit.apiary-mock.com/profiles',
        success: function(response) {
            return response;
        },
        error: function() {
            alert('error: could not load profiles');
        }
    });
}

function profileComponent(name, avatar) {
    return `
        <div class="profile-container">
          <div class="profile-picture" style="background-image: url('${avatar}')"></div>
          <div class="profile-name">${name}</div>
          <div class="profile-follow">
            <button type="button" class="profile-follow-button">Follow</button>
          </div>
        </div>
    `;
}

function loadProfiles() {
    $('.profiles').empty();
    return loadBrowseProfiles().then(function(response) {

      response.forEach(function(thing) {
          let component = profileComponent(`${thing.firstname} ${thing.lastname}`, thing.avatar);
          $('.profiles').append(component);
      });
    });
}
