let sessionInProgress = 0;
let faqTabs = 0;
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

        if(!faqTabs && sessionInProgress){
            if(!confirm('Vai tiešām vēlies pamest sesiju?')) {
                return;
            } else {
                $('section:not(.d-none)').addClass('last-attended')
                sessionInProgress = 0;
                alert('Lai vēlāk turpinātu sesiju uzspied "Turpināt" sadaļā "Sākums". :)');
            }
        }

        $('section:not(#ibm-tab,#desk-intro,#desk-method,#desk-emotions,#desk-contacts').each(
            function () {
                $(this).hasClass('d-none') ? true : $(this).addClass('d-none')
            }
        )

        let activeTabId = $('.ibm-tabs li.active a').attr('href')
        $(activeTabId).addClass('d-none')
        $('.ibm-tabs li.active').removeClass('active')

        newActiveTabId = $(this).attr('href')
        $(newActiveTabId).removeClass('d-none')
        $(this).parent('li').addClass('active')
    })
})
//NAVBAR tab switcher end

// $('#desk-method a, #desk-emotions a, #desk-contacts a').each(function () {
//     $(this).on('click', function (e) {
//         e.preventDefault()
//         $(this).parents('section').addClass('d-none')
//         $('#desk-intro-prepare').removeClass('d-none')
//     })
// })
// $('#desk-intro a').on('click', function (e) {
//     e.preventDefault()
//     sessionInProgress = 1;
//     faqTabs = 0;
    
//     $('#desk-intro').addClass('d-none')
//     if($(this).parents('#desk-intro').hasClass('in-progress')) {
//         $('.last-attended').removeClass('d-none')
//     } else {
//         $('#desk-intro-prepare').removeClass('d-none')
//         $('#desk-intro').addClass('in-progress')
//     }
//     $('#desk-intro a').text('Turpināt'); 
// })

//Sākt 3desk metodi
let beginBtns = $('button:contains("Sākt"), a:contains("Sākt")')
beginBtns.each(function () {
    $(this).on('click', function (e) {
        e.preventDefault()
        sessionInProgress = 1;
        faqTabs = 0;

        let parent = $(this).parents('section')
        parent.addClass('d-none')
        if($('#desk-intro').hasClass('in-progress')) {
            $('.last-attended').removeClass('d-none').removeClass('last-attended')
        } else {
            $('#desk-intro-prepare').removeClass('d-none')
            $('#desk-intro').addClass('in-progress')
        }

        beginBtns.each(function(){
            let updateBtnText = $(this).text().replace('Sākt', 'Turpināt');
            $(this).text(updateBtnText);
        })
    })
})

// ---------Back-forth buttons---------
$('#desk-intro-prepare a').each(function () {
    $(this).on('click', function (e) {
        e.preventDefault()
        $('#desk-intro-prepare').addClass('d-none')
        if ($(this).hasClass('back')) {
            $('#desk-intro').removeClass('d-none')
        } else if ($(this).hasClass('continue')) {
            $('#desk-intro-self').removeClass('d-none')
        }
    })
})

$('#desk-intro-self a').each(function () {
    $(this).on('click', function (e) {
        e.preventDefault()
        $('#desk-intro-self').addClass('d-none')
        if ($(this).hasClass('back')) {
            $('#desk-intro-prepare').removeClass('d-none')
        } else if ($(this).hasClass('continue')) {
            $('#desk-progress').removeClass('d-none')
        }
    })
})

$('#desk-progress.me a').each(function () {
    $(this).on('click', function (e) {
        e.preventDefault()
        let section = $('#desk-progress')

        if ($(this).hasClass('back')) {
            if (section.hasClass('direction')) {
                $('input[name=emotion]').val('').attr('placeholder', 'IEVADI EMOCIJU')
                $('.emotion-intensity').addClass('not-active')

                if (addingEmotion) {
                    addingEmotion = 0
                }
                section.removeClass('direction').addClass('additional')
                $('#sightDirection').addClass('d-none')
                $('#emotionForm').removeClass('d-none')
            } else if (section.hasClass('reflection')) {
                section.removeClass('reflection').addClass('direction')
                $('#reflectionsOne').addClass('d-none')
                $('#sightDirection').removeClass('d-none')
            } else if (section.hasClass('reflection-two')) {
                reflectionTwo--
                if (reflectionTwo >= 0) {
                    $('#reflectionsTwo .reflection-question').text(reflectionTwoQuestions[reflectionTwo])
                } else {
                    section.removeClass('reflection-two').addClass('explanations')
                    $('#reflectionsTwo').addClass('d-none')
                    $('#emotionExplanations').removeClass('d-none')
                }
            } else if (section.hasClass('explanations')) {
                reflection = reflectionQuestions.length - 1
                section.removeClass('explanations').addClass('reflection')
                $('#emotionExplanations').addClass('d-none')
                $('#reflectionsOne').removeClass('d-none')
            }  else if (section.hasClass('reflection')) {
                reflection--
                if (reflection >= 0) {
                    $('#reflectionsOne .reflection-question').text(reflectionQuestions[reflection])
                } else {
                    section.removeClass('reflection').addClass('direction')
                    $('#reflectionsOne').addClass('d-none')
                    $('#sightDirection').removeClass('d-none')
                }
            } else {
                section.addClass('d-none')
                $('#desk-intro-self').removeClass('d-none')
            }
        } else if ($(this).hasClass('continue')) {
            if (section.hasClass('me')) {
                $('#emotionForm').removeClass('invisible')
                //Dusmas, Bailes, Interese, Kauns, Vaina, Prieks, Riebums, Skumjas
                section.removeClass('me').addClass('anger')
            } else if (section.hasClass('anger')) {
                section.removeClass('anger').addClass('fear')
                $('input[name=emotion]').val('BAILES')
            } else if (section.hasClass('fear')) {
                section.removeClass('fear').addClass('interest')
                $('input[name=emotion]').val('INTERESE')
            } else if (section.hasClass('interest')) {
                section.removeClass('interest').addClass('shame')
                $('input[name=emotion]').val('KAUNS')
            } else if (section.hasClass('shame')) {
                section.removeClass('shame').addClass('guilt')
                $('input[name=emotion]').val('VAINA')
            } else if (section.hasClass('guilt')) {
                section.removeClass('guilt').addClass('happiness')
                $('input[name=emotion]').val('PRIEKS')
            } else if (section.hasClass('happiness')) {
                section.removeClass('happiness').addClass('disgust')
                $('input[name=emotion]').val('RIEBUMS')
            } else if (section.hasClass('disgust')) {
                section.removeClass('disgust').addClass('sadness')
                $('input[name=emotion]').val('SKUMJAS')
            } else if (section.hasClass('sadness')) {
                section.removeClass('sadness').addClass('additional')
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
                if (reflectionTwo < reflectionTwoQuestions.length) {
                    $('#reflectionsTwo .reflection-question').text(
                        reflectionTwoQuestions[reflectionTwo]
                    )
                } else {
                    $('#desk-progress.reflection-two').addClass('d-none')
                    $('#finish').removeClass('d-none')
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

$('#finish button').each(function () {
    $(this).on('click', function (e) {
        e.preventDefault()
        if ($(this).hasClass('back')) {
            reflectionTwo = reflectionTwoQuestions.length-1;
            $('#finish').addClass('d-none')
            $('#desk-progress').removeClass('d-none')
        } else if ($(this).hasClass('continue')) {
            if(sessionInProgress){
                if(!confirm('Vai tiešām vēlies pabeigt sesiju?')) {
                    return;
                } else {
                    sessionInProgress = faqTabs = 0;
                }
            }
            sessionStorage.reloadAfterPageLoad = true
            location.reload()
        }
    })
})

$( function () {
        if ( sessionStorage.reloadAfterPageLoad ) {
            $('#desk-intro').addClass('d-none')
            $('#finish').removeClass('d-none')
            $('#finish .close-session').addClass('d-none')
            $('#finish .thank-you').removeClass('d-none')
            sessionStorage.reloadAfterPageLoad = false
        }
    } 
);

$('#emotionForm input[name=emotion]').on('keyup', function (e) {
    e.preventDefault()

    let continueBtn = $('#desk-progress.additional a.continue')
    addingEmotion = $(this).val().length > 0

    if (addingEmotion) {
        if (!continueBtn.hasClass('not-active')) {
            continueBtn.addClass('not-active')
        }
        $('.emotion-intensity').removeClass('not-active')
        $('#desk-progress a.continue').addClass('not-active')
    } else {
        if (continueBtn.hasClass('not-active')) {
            continueBtn.removeClass('not-active')
        }
        $('.emotion-intensity').addClass('not-active')
        $('#desk-progress a.continue').removeClass('not-active')
    }
})

$('button[type="submit"].download').on('click', function (e) {
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
$(document).ready(function () { //.ready is deprecated but dont touch :D
    $('#slider').slider({
        min: 0,
        max: 360,
    })
})
