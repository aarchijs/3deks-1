const { Fireworks } = require('fireworks-js')
const container = document.querySelector('.fireworks-container')
const fireworks = new Fireworks(container, {
    hue: {
        min: 0,
        max: 345,
    },
    delay: {
        min: 15,
        max: 15,
    },
    rocketsPoint: 50,
    opacity: 0.1,
    speed: 1,
    acceleration: 1.2,
    friction: 1.03,
    gravity: 1.5,
    particles: 54,
    trace: 2,
    explosion: 10,
    autoresize: true,
    brightness: {
        min: 50,
        max: 80,
        decay: {
            min: 0.015,
            max: 0.03,
        },
    },
    boundaries: {
        x: 50,
        y: 50,
        width: window.innerWidth,
        height: window.innerHeight,
        visible: false,
    },
    sound: {
        enabled: false,
        files: [
            'https://fireworks.js.org/sounds/explosion0.mp3',
            'https://fireworks.js.org/sounds/explosion1.mp3',
            'https://fireworks.js.org/sounds/explosion2.mp3',
        ],
        volume: {
            min: 2,
            max: 4,
        },
    },
    mouse: {
        click: false,
        move: false,
        max: 1,
    },
})
$('.fireworks-container').css({width: window.innerWidth,height: window.innerHeight})
$('.fireworks-container canvas').attr({ width: window.innerWidth, height: window.innerHeight })

$('#desk-intro').show()

$('.ibm-tabs li a').on('click', function (e) {
    e.preventDefault()
    $('.ibm-tabs-content').hide()
    $('.desk-canvas canvas').hide()
    $('.active').removeClass('active')
    $(this).parent('li').addClass('active')
    let IDSelector = $(this).attr('href')
    $(IDSelector).show()
})

$('#desk-intro a, #desk-method a, #desk-contacts a, #desk-emotions a').each(function () {
    $(this).on('click', function (e) {
        e.preventDefault()
        $('.ibm-tabs-content').hide()
        $('#desk-intro-prepare').show()
    })
})

$('#desk-intro-prepare a').each(function () {
    $(this).on('click', function (e) {
        e.preventDefault()
        $('.ibm-tabs-content').hide()
        if ($(this).hasClass('back')) {
            $('#desk-intro').show()
        } else if ($(this).hasClass('continue')) {
            $('#desk-intro-self').show()
        }
    })
})

$('#desk-intro-self a').each(function () {
    $(this).on('click', function (e) {
        e.preventDefault()
        $('.ibm-tabs-content').hide()
        if ($(this).hasClass('back')) {
            $('#desk-intro-prepare').show()
        } else if ($(this).hasClass('continue')) {
            $('#desk-progress.me').show()
            $('.desk-canvas canvas').show()
        }
    })
})

let addingEmotion = 0

$('#emotionForm input[name=emotion]').on('keyup', function (e) {
    e.preventDefault()

    let continueBtn = $('#desk-progress.ibm-tabs-content.additional a.continue')
    addingEmotion = $(this).val().length > 0

    if (addingEmotion) {
        if (!continueBtn.hasClass('not-active')) {
            continueBtn.addClass('not-active')
        }
        $('.add-emotion').removeAttr('disabled')
    } else {
        if (continueBtn.hasClass('not-active')) {
            continueBtn.removeClass('not-active')
        }
        $('.add-emotion').attr('disabled', 'disabled')
    }
})

$('#desk-progress.ibm-tabs-content.me a').each(function () {
    $(this).on('click', function (e) {
        e.preventDefault()

        if ($(this).hasClass('back')) {
            $('#desk-progress.me').hide()
            $('.desk-canvas canvas').hide()
            $('#desk-intro-self').show()
        } else if ($(this).hasClass('continue')) {
            let section = $('#desk-progress.ibm-tabs-content')
            let additional = 0

            if (section.hasClass('me')) {
                $('#emotionForm').removeClass('invisible')
                section.removeClass('me').addClass('sadness')
            } else if (section.hasClass('sadness')) {
                section.removeClass('sadness').addClass('fear')
                $('input[name=emotion]').val('BAILES')
            } else if (section.hasClass('fear')) {
                section.removeClass('fear').addClass('anger')
                $('input[name=emotion]').val('DUSMAS')
            } else if (section.hasClass('anger')) {
                section.removeClass('anger').addClass('happiness')
                $('input[name=emotion]').val('PRIEKS')
            } else if (section.hasClass('happiness')) {
                section.removeClass('happiness').addClass('shame')
                $('input[name=emotion]').val('KAUNS')
            } else if (section.hasClass('shame')) {
                section.removeClass('shame').addClass('guilt')
                $('input[name=emotion]').val('VAINA')
            } else if (section.hasClass('guilt')) {
                section.removeClass('guilt').addClass('disgust')
                $('input[name=emotion]').val('RIEBUMS')
            } else if (section.hasClass('disgust')) {
                section.removeClass('disgust').addClass('interest')
                $('input[name=emotion]').val('INTERESE')
            } else if (section.hasClass('disgust')) {
                section.removeClass('disgust').addClass('interest')
                $('input[name=emotion]').val('INTERESE')
            } else if (section.hasClass('interest')) {
                section.removeClass('interest').addClass('additional')
                additional++
                $('input[name=emotion]')
                    .val('')
                    .removeAttr('disabled')
                    .attr('placeholder', 'IEVADI EMOCIJU')
            } else if (section.hasClass('additional')) {
                additional++
                $('input[name=emotion]').val('').attr('placeholder', 'IEVADI EMOCIJU')
                if (!addingEmotion) {
                    section.removeClass('additional').addClass('direction');
                    $('#emotionForm').addClass('d-none');
                    $('#sightDirection').removeClass('d-none');
                }
            } else if (section.hasClass('direction')) {
                section.removeClass('direction').addClass('reflection')
                $('#sightDirection').addClass('d-none')
                $('#reflectionsOne').removeClass('d-none'); 
            } else if (section.hasClass('reflection')) {
                section.removeClass('reflection').addClass('explanations')
                $('#reflectionsOne').addClass('d-none')
                $('#emotionExplanations').removeClass('d-none'); 
            } else if (section.hasClass('explanations')) {
                section.removeClass('explanations').addClass('reflection-two')
                $('#emotionExplanations').addClass('d-none')
                $('#reflectionsTwo').removeClass('d-none'); 
            } else if (section.hasClass('reflection-two')) {
                $('#desk-progress.reflection-two').hide()
                $('.desk-canvas canvas').hide()
                $('#finish').show()
                console.log('fireup')
                $('.fireworks-container').removeClass('invisible')
                fireworks.start()
                setTimeout(function () {
                    fireworks.stop()
                    $('.fireworks-container').addClass('invisible')
                }, 7500)
            }

            if (!section.hasClass('additional') 
                && !section.hasClass('direction')
                && !section.hasClass('reflection')
                && !section.hasClass('explanations')
                && !section.hasClass('reflection-two')
                ) {
                $(this).addClass('not-active')
                $('.add-emotion').removeAttr('disabled')
            }
        }
    })
})

$('button[type="submit"].download').click(function (e) {
    // download(/docs/annotations.jpg);
})

$('.dropdown-block button').each(function () {
    $(this).click(function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active').parent().find('.dropdown-info').addClass('d-none')
        } else {
            $('.dropdown-block button.active')
                .removeClass('active')
                .parent()
                .find('.dropdown-info')
                .addClass('d-none')
            $(this).addClass('active').parent().find('.dropdown-info').removeClass('d-none')
        }
    })
})

$(document).ready(function () {
    $('#slider').slider({
        min: 0,
        max: 360,
    })
})
