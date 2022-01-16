let reflection = 0
const reflectionQuestions = [
    'Kāds ir iemesls tieši šī simboliskā “Es” izmēra izvēlei?',
    'Kā kompozīcijā jūtas simboliskais “Es”?',
    'Ko simboliskais “Es” redz un ko neredz?',
    'Kādu izjūtu kompozīcija sniedz kopumā?',
    'Varbūt ir kāda cita vieta uz plaknes, kur Tu vēlētos pārvietot savu simbolisko “Es” figūru?',
]

let reflectionTwo = 0
const reflectionTwoQuestions = [
    'Vai kompozīcijā ir kas lieks vai dīvains? Pastāsti, lūdzu, par to.',
    'Ko Tev nozīmē tālu novietotās emocijas?',
    'Kā tu jūties tagad par pieteikto gadījumu, kas ir mainījies?',
]
let addingEmotion = 0

//NAVBAR tab switcher
$('.ibm-tabs li a').each(function () {
    $(this).on('click', function (e) {
        e.preventDefault()

        $('section:not(#ibm-tab,#desk-intro,#desk-method,#desk-emotions,#desk-contacts').each(
            function () { $(this).hasClass('d-none') ? true : $(this).addClass('d-none') }
        )

        let activeTabId = $('.ibm-tabs li.active a').attr('href')
        $(activeTabId).addClass('d-none')
        $('.ibm-tabs li.active').removeClass('active')

        newActiveTabId = $(this).attr('href')
        $(newActiveTabId).removeClass('d-none')
        $(this).parent('li').addClass('active')
    })
})

$('#desk-intro a, #desk-method a, #desk-emotions a, #desk-contacts a').each(
    function () { 
        $(this).parent('section').addClass('d-none')
        $('#desk-intro-prepare').removeClass('d-none')
    }
)
//NAVBAR tab switcher end

// $('#desk-intro-prepare a').each(function () {
//     $(this).on('click', function (e) {
//         e.preventDefault()
//         if ($(this).hasClass('back')) {
//             $('#desk-intro-self').removeClass('d-none')
//             $('#desk-intro').removeClass('d-none')
//         } else if ($(this).hasClass('continue')) {
//             $('#desk-intro-self').removeClass('d-none')
//         }
//     })
// })

// ---------Back-forth buttons---------
$('#desk-intro a').on('click', function (e) {
    e.preventDefault()
    $('#desk-intro-prepare').removeClass('d-none')
    $('#desk-intro').addClass('d-none')
})

$('#desk-intro-prepare a').each(function () {
    $(this).on('click', function (e) {
        e.preventDefault()
        $('#desk-intro-prepare').addClass('d-none')
        if ($(this).hasClass('back')) {
            $('#desk-intro').removeClass('d-none')
        } else if ($(this).hasClass('continue')) {
            $('#desk-progress.me').removeClass('d-none')
        }
    })
})

$('#desk-progress.ibm-tabs-content.me a').each(function () {
    $(this).on('click', function (e) {
        e.preventDefault()

        if ($(this).hasClass('back')) {
            $('#desk-progress.me').addClass('d-none')
            $('#desk-intro-prepare').removeClass('d-none')
        } else if ($(this).hasClass('continue')) {
            let section = $('#desk-progress')

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
                $('input[name=emotion]')
                    .val('')
                    .removeAttr('disabled')
                    .attr('placeholder', 'IEVADI EMOCIJU')
                $('.emotion-intensity').addClass('not-active')
            } else if (section.hasClass('additional')) {
                $('input[name=emotion]').val('').attr('placeholder', 'IEVADI EMOCIJU')
                $('.emotion-intensity').addClass('not-active')

                if (!addingEmotion) {
                    section.removeClass('additional').addClass('direction')
                    $('#emotionForm').addClass('d-none')
                    $('#sightDirection').removeClass('d-none')
                }
            } else if (section.hasClass('direction')) {
                section.removeClass('direction').addClass('reflection')
                $('#sightDirection').addClass('d-none')
                $('#reflectionsOne .reflection-question').text(reflectionQuestions[reflection])
                $('#reflectionsOne').removeClass('d-none')
            } else if (section.hasClass('reflection')) {
                reflection++
                if (reflection !== reflectionQuestions.length) {
                    $('#reflectionsOne .reflection-question').text(reflectionQuestions[reflection])
                } else {
                    section.removeClass('reflection').addClass('explanations')
                    $('#reflectionsOne').addClass('d-none')
                    $('#emotionExplanations').removeClass('d-none')
                }
            } else if (section.hasClass('explanations')) {
                section.removeClass('explanations').addClass('reflection-two')
                $('#emotionExplanations').addClass('d-none')
                $('#reflectionsTwo .reflection-question').text(
                    reflectionTwoQuestions[reflectionTwo]
                )
                $('#reflectionsTwo').removeClass('d-none')
            } else if (section.hasClass('reflection-two')) {
                reflectionTwo++
                if (reflectionTwo !== reflectionTwoQuestions.length) {
                    $('#reflectionsTwo .reflection-question').text(
                        reflectionTwoQuestions[reflectionTwo]
                    )
                } else {
                    $('#desk-progress.reflection-two').addClass('d-none')
                    $('#finish').removeClass('d-none')
                    console.log('fireup')
                    $('.fireworks-container').removeClass('invisible')
                    fireworks.start()
                    setTimeout(function () {
                        fireworks.stop()
                        $('.fireworks-container').addClass('invisible')
                    }, 5000)
                }
            }

            $('#emotionForm .emotion-size input[name=intensity]:checked').prop('checked', false)

            if (
                !section.hasClass('additional') &&
                !section.hasClass('direction') &&
                !section.hasClass('reflection') &&
                !section.hasClass('explanations') &&
                !section.hasClass('reflection-two')
            ) {
                $(this).addClass('not-active')
            }
        }
    })
})

$('#emotionForm input[name=emotion]').on('keyup', function (e) {
    e.preventDefault()

    let continueBtn = $('#desk-progress.ibm-tabs-content.additional a.continue')
    addingEmotion = $(this).val().length > 0

    if (addingEmotion) {
        if (!continueBtn.hasClass('not-active')) {
            continueBtn.addClass('not-active')
        }
        $('.emotion-intensity').removeClass('not-active')
        $('#desk-progress.ibm-tabs-content a.continue').addClass('not-active')
    } else {
        if (continueBtn.hasClass('not-active')) {
            continueBtn.removeClass('not-active')
        }
        $('.emotion-intensity').addClass('not-active')
        $('#desk-progress.ibm-tabs-content a.continue').removeClass('not-active')
    }
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

// -------- Initiate Slider for Sight Direction arrow rotation --------
$(document).ready(function () {
    $('#slider').slider({
        min: 0,
        max: 360,
    })
})

// -------- Initiate Fireworks for Thank you page --------
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
$('.fireworks-container').css({ width: window.innerWidth, height: window.innerHeight })
$('.fireworks-container canvas').attr({ width: window.innerWidth, height: window.innerHeight })
