let posts = [];

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

    $('.like-button').click(function () {
        $(this).css('background-color', 'pink');
    });

    loadPosts()
        .then(function (response) {
        for (let post of response) {
            posts.push(new Post(post.id, post.author, post.createTime, post.text, post.media, post.likes))
        }

        displayPosts()

    }).catch(function () {
        alert('error loading posts')
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

function loadPosts() {
    return $.get({
        url: 'https://private-anon-2d159cc08d-wad20postit.apiary-mock.com/posts',
        success: function(response) {
            return response;
        },
        error: function () {
            alert('error loading posts!')
        }
    });
}


function displayPosts() {
    for (let post of posts) {
        let postDiv = jQuery('<div/>', {
            "class": 'post '
        })

        let postAuthor = jQuery('<div/>', {
            "class": 'post-author '
        })
        postAuthor.append('<span/>'.class('post-author-info ').append('<small/>'.text(post.author[0])))
        postAuthor.append('<small/>'.text(post.createTime))

        let postImage = jQuery('<div/>', {
            "class": "post-image "
        })
        postImage.append('<img src=post.media/>')

        let postTitle = jQuery('<div/>', {
            "class": "post-title "
        })
        postTitle.append('<h3/>'.text(post.text))

        let postActions = jQuery('<div/>', {
            "class": "post-actions "
        })
        postActions.append('<button/>'.name("like").type("button").class("like-button").value(post.likes))

        postDiv.append(postAuthor)
        postDiv.append(postImage)
        postDiv.append(postTitle)
        postDiv.append(postActions)

        $('body.section').append(postDiv)

    }
}