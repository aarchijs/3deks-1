$(function () {
    $("#desk-intro").show();
    // $('canvas').hide();
});

$('.ibm-tabs li a').on('click', function (e) {
    e.preventDefault();
    $('.ibm-tabs-content').hide();
    $('canvas').hide();
    $('.active').removeClass('active');
    $(this).parent('li').addClass('active');
    let IDSelector = $(this).attr('href');
    $(IDSelector).show();
})

$('#desk-intro a, #desk-method a, #desk-contacts a, #desk-emotions a').each(function () {
    $(this).on('click', function (e) {
        e.preventDefault();
        $('.ibm-tabs-content').hide();
        $('#desk-intro-prepare').show();
    });
})

$('#desk-intro-prepare a').each(function () {
    $(this).on('click', function (e) {
        e.preventDefault();
        $('.ibm-tabs-content').hide();
        if ($(this).hasClass('back')) {
            $('#desk-intro').show();
        } else if ($(this).hasClass('continue')) {
            $('#desk-intro-self').show();
        }
    });
})

$('#desk-intro-self a').each(function () {
    $(this).on('click', function (e) {
        e.preventDefault();
        $('.ibm-tabs-content').hide();
        if ($(this).hasClass('back')) {
            $('#desk-intro-prepare').show();
        } else if ($(this).hasClass('continue')) {
            $('#desk-progress').show();
            $('canvas').show();
        }
    });
})

$('button[type="submit"].download').click(function (e) {
    // download(/docs/annotations.jpg);
});

$('.dropdown-block button').each(function () {
    $(this).click(function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active').parent().find('.dropdown-info').addClass('d-none');
        } else {
            $('.dropdown-block button.active').removeClass('active').parent().find('.dropdown-info').addClass('d-none');
            $(this).addClass('active').parent().find('.dropdown-info').removeClass('d-none');
        }
    });
});
