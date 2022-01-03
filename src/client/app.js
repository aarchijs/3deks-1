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
            $('#selfForm').on('submit',function(e) {e.preventDefault();});
            $('#desk-progress.me').show();
            $('canvas').show();
        }
    });
})

$('#desk-progress.ibm-tabs-content.me a').each(function () {
    $(this).on('click', function (e) {
        e.preventDefault();
        if ($(this).hasClass('back')) {
        } else if ($(this).hasClass('continue')) {
            let section = $('#desk-progress.ibm-tabs-content');
            let emotionBtn = $('.add-emotion');

             if(section.hasClass('me')){
                $(this).prev().removeClass('invisible');
                section.removeClass('me').addClass('sadness');
                emotionBtn.trigger('click');

             } else if (section.hasClass('sadness')) {
                section.removeClass('sadness').addClass('fear');
                $('.emotion-name').text('Bailes');
                emotionBtn.trigger('click');

             } else if (section.hasClass('fear')) {
                section.removeClass('fear').addClass('anger');
                $('.emotion-name').text('Dusmas');
                emotionBtn.trigger('click');

             } else if (section.hasClass('anger')) {
                section.removeClass('anger').addClass('happiness');
                $('.emotion-name').text('Prieks');
                emotionBtn.trigger('click');

             } else if (section.hasClass('happiness')) {
                section.removeClass('happiness').addClass('shame');
                $('.emotion-name').text('Kauns');
                emotionBtn.trigger('click');

             } else if (section.hasClass('shame')) {
                section.removeClass('shame').addClass('guilt');
                $('.emotion-name').text('Vaina');
                emotionBtn.trigger('click');

             } else if (section.hasClass('guilt')) {
                section.removeClass('guilt').addClass('disgust');
                $('.emotion-name').text('Riebums');
                emotionBtn.trigger('click');

             } else if (section.hasClass('disgust')) {
                section.removeClass('disgust').addClass('interest');
                $('.emotion-name').text('Interese');
                emotionBtn.trigger('click');

             } 
            //  else if (section.hasClass('interest')) {
            //     section.removeClass('interest').addClass('fear');
            //     $('.emotion-name').text('Bailes');
            //     emotionBtn.trigger('click');

            //  }
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
