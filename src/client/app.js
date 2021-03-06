$("input").attr("autocomplete", "off");

let sessionInProgress = 0;
let faqTabs = 1;
let reflection = 0
//There are two reflection steps during the session
const reflectionQuestions = [
    'Kāds ir iemesls tieši šī simboliskā “Es” izmēra izvēlei?',
    'Kā kompozīcijā jūtas simboliskais “Es”?',
    'Ko simboliskais “Es” redz un ko neredz?',
    'Kādas izjūtas sniedz kompozīcija kopumā?',
    'Varbūt ir kāda cita vieta uz plaknes, kur Tu vēlētos pārvietot savu simbolisko “Es” figūru?',
]

let reflectionTwo = 0
const reflectionTwoQuestions = [
    'Vai kompozīcijā ir kaut kas lieks vai dīvains? Pastāsti, lūdzu, par to.',
    'Ko Tev nozīmē tālu novietotās emocijas?',
    'Kā Tu jūties tagad par pieteikto gadījumu, kas ir mainījies?',
]
let addingEmotion = 0 //variable need for additional emotion adding
$("span.emotion-tooltip, button.btn-desk").tooltip(); //initiating tooltips
//NAVBAR tab switcher
$('.ibm-tabs li a, a#logo').each(function () {
    $(this).on('click', function (e) {
        e.preventDefault()

        if($(this).attr('href') === '#desk-intro' &&
            !$('#finish .thank-you').hasClass('d-none'))
        {
            if (sessionInProgress) {
                sessionInProgress = faqTabs = 0; // if user ends session variables set back to 0
            }
            location.reload()
        }

        //if not already opened at any of top tabs sections and already started session
        if (!faqTabs && sessionInProgress) {
            if (!confirm('Vai saglabāt izkārtojumu?\n' +
                '"Turpināt" vai "Sākt jaunu" sesiju vari sadaļā "Sākums". :)')) {
                return;
            } else {
                $('section:not(.d-none)').addClass('last-attended')
                sessionInProgress = 0;
            }
        }

        $('section:not(#ibm-tab,#desk-intro,#desk-method,#desk-emotions,#desk-contacts)').each(
            function () {
                $(this).hasClass('d-none') ? true : $(this).addClass('d-none')
            }
        )

        let activeTabId = $('.ibm-tabs li.active a').attr('href')
        $(activeTabId).addClass('d-none')
        $('.ibm-tabs li.active').removeClass('active')

        newActiveTabId = $(this).attr('href')
        $(newActiveTabId).removeClass('d-none')
        $('ul.ibm-tabs a[href*="' + newActiveTabId + '"]').parent('li').addClass('active')
    })
})
//NAVBAR tab switcher end

//Start 3deks method
let beginBtns = $('button:contains("Sākt"), a:contains("Sākt")')
beginBtns.each(function () {
    $(this).on('click', function (e) {
        e.preventDefault()

        if(!$('#finish .thank-you').hasClass('d-none'))
        {
            if (sessionInProgress) {
                sessionInProgress = faqTabs = 0; // if user ends session variables set back to 0
            }
            location.reload()
        }

        sessionInProgress = 1;
        faqTabs = 0;

        $('a.start-new').removeClass('d-none');

        let parent = $(this).parents('section')
        parent.addClass('d-none')
        let intro = $('#desk-intro')

        if (intro.hasClass('in-progress')) {
            $('.last-attended').removeClass('d-none last-attended')
        } else {
            $('#desk-intro-prepare').removeClass('d-none')
            intro.addClass('in-progress')
        }

        beginBtns.each(function(){
            let updateBtnText = $(this).text().replace('Sākt', 'Turpināt');
            $(this).text(updateBtnText);
        })
    })
})

$('a.continue').each(function(){
    $(this).on('click', function (e) {
        window.scrollTo(0, 0);
    })
})

// ---------Back-forth buttons---------

//from Prepare step to Choose Self Size step
$('#desk-intro-prepare a').each(function () {
    $(this).on('click', function (e) {
        e.preventDefault()

        let prepare = $('#desk-intro-prepare')
        prepare.addClass('d-none')

        if ($(this).hasClass('back')) {
            prepare.addClass('last-attended')
            $('#desk-intro').removeClass('d-none')
        } else if ($(this).hasClass('continue')) {
            $('#selfForm input[name=self]:checked').prop('checked', false);
            $('#desk-intro-self').removeClass('d-none')
        }
    })
})

let section = $('#desk-progress');
const emotionMapping = {
    'anger': 'Dusmas',
    'fear': 'Bailes',
    'interest': 'Interese',
    'shame': 'Kauns',
    'guilt': 'Vaina',
    'happiness': 'Prieks',
    'disgust': 'Riebums',
    'sadness': 'Skumjas'
};

//from Choose Self Size step to actual Desk step
$('#desk-intro-self a').each(function () {
    $(this).on('click', function (e) {
        e.preventDefault()
        $('#desk-intro-self').addClass('d-none')
        if ($(this).hasClass('back')) {
            $('#desk-intro-prepare').removeClass('d-none')
        } else if ($(this).hasClass('continue')) {
            let emotionClass = section.attr("class").split(/\s+/)[0];

            $('#desk-progress').removeClass('d-none')
            $('.try-directions').css('top', $('#desk-progress a.continue').offset().top)

            if(emotionMapping[emotionClass]) {
                $('input[name=emotion]').val(emotionMapping[emotionClass].toUpperCase())
            }
        }
    })
})

//since we have not implemented any of routing its all done by hiding/unhiding blocks by pressing back/continue buttons
$('#desk-progress.blank a').each(function () {
    $(this).on('click', function (e) {
        e.preventDefault()

        if ($(this).hasClass('back')) {
            if (section.hasClass('direction')) {
                $('input[name=emotion]').val('').attr('placeholder', 'IEVADI EMOCIJU')
                $('.emotion-intensity, button.person-view')
                    .addClass('muted')
                    .prop('title', '”Es skatu” varēsi pielietot, kad visas emocijas būs izliktas digitālajā plaknē.')
                    .data('blocked', 1)

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
            } else if (section.hasClass('reflection')) {
                reflection--
                if (reflection >= 0) {
                    $('#reflectionsOne .reflection-question').text(reflectionQuestions[reflection])
                    if (reflection == 5) {
                        $('.reflection-direction').addClass('d-none');
                    }
                } else {
                    section.removeClass('reflection').addClass('direction')
                    $('#reflectionsOne').addClass('d-none')
                    $('#sightDirection').removeClass('d-none')
                }
            } else {
                section.addClass('d-none')
                $('#desk-intro-self').removeClass('d-none')
            }
        } else if ($(this).hasClass('continue')) { //if Continue button is pressed then
            //Dusmas, Bailes, Interese, Kauns, Vaina, Prieks, Riebums, Skumjas
            if (section.hasClass('blank')) {
                section.removeClass('blank').addClass('anger')
                $('#entrance').addClass('d-none')
                $('#emotionForm').removeClass('d-none')
                $('input[name=emotion]').val('DUSMAS')
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
                    .removeClass('not-active')
                    .attr('placeholder', 'IEVADI EMOCIJU')
                $('.emotion-intensity').addClass('not-active')
                $('span.emotion-tooltip').removeClass('d-none');
                $('p.add-continue, #emotionForm button.btn-desk').removeClass('invisible');
            } else if (section.hasClass('additional')) {
                $('input[name=emotion]').val('').attr('placeholder', 'IEVADI EMOCIJU')
                $('.emotion-intensity').addClass('not-active')
                if (!addingEmotion) {
                    section.removeClass('additional').addClass('direction')
                    $('#emotionForm').addClass('d-none')
                    $('button.person-view')
                        .removeClass('muted')
                        .prop('title', 'Izkārtojums tiks attēlots no simboliskā \'Es\' perspektīvas')
                        .data('blocked', 0)

                    $('#sightDirection').removeClass('d-none')
                }
                addingEmotion = 0;
            } else if (section.hasClass('direction')) {
                section.removeClass('direction').addClass('reflection')
                $('#sightDirection').addClass('d-none')
                $('#reflectionsOne .reflection-question').text(reflectionQuestions[reflection])
                $('#reflectionsOne').removeClass('d-none')
            } else if (section.hasClass('reflection')) {
                reflection++
                //if all questions of 1st reflection are done proceed to emotion explanation view
                if (reflection !== reflectionQuestions.length) {
                    $('#reflectionsOne .reflection-question').text(reflectionQuestions[reflection])
                    if (reflection == 4) {
                        $('.reflection-direction').removeClass('d-none');
                    }
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
                //if all questions of 2nd reflection are done proceed to finish view
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

            //Continue button should be disabled only on certain steps
            if (
                !section.hasClass('blank') &&
                !section.hasClass('additional') &&
                !section.hasClass('direction') &&
                !section.hasClass('reflection') &&
                !section.hasClass('explanations') &&
                !section.hasClass('reflection-two')
            ) {
                $(this).addClass('not-active')
            }

            //Highlight when proceeding to next step with adding emotion
            $('input[name=emotion]').addClass('input-highlight')
            setTimeout(function () {
                $('input[name=emotion]').removeClass('input-highlight')
            }, 700)
        }
    })
})

// ---- Button to start new session is pressed ----
$('a.start-new').on('click', function () {
    if (!confirm('Vai tiešām vēlies pabeigt sesiju?')) {
        return;
    } else {
        sessionInProgress = faqTabs = 0;
        location.reload()
    }
})

$('#finish button').each(function () {
    $(this).on('click', function (e) {
        e.preventDefault()
        // -------- If user decides to go back --------
        if ($(this).hasClass('back')) {
            reflectionTwo = reflectionTwoQuestions.length - 1;
            $('#finish').addClass('d-none')
            $('#desk-progress').removeClass('d-none')
            // -------- If user decides to proceed with next step --------
        } else if ($(this).hasClass('continue')) {
            $('#finish .close-session').addClass('d-none')
            $('#finish .thank-you').removeClass('d-none')
            if (sessionInProgress) {
                sessionInProgress = faqTabs = 0; // if user ends session variables set back to 0
            }
            beginBtns.each(function(){
                let updateBtnText = $(this).text().replace('Turpināt', 'Sākt');
                $(this).text(updateBtnText);
            })
        }
    })
})

// -------- Adding additional emotions --------
$('#emotionForm input[name=emotion]').on('keyup', function (e) {
    e.preventDefault()

    let continueBtn = $('#desk-progress.additional a.continue')
    addingEmotion = $(this).val().length > 0

    //if emotion name is longer than 0 symbols continue button is restricted until user chooses emotion size by clicking on it or
    // if erases the emotion name so input is empty
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

// -------- Preparation step drop down buttons --------
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
    $('.slider').each(function(){
        $(this).slider({
            min: 0,
            max: 360,
        })
    })
})
