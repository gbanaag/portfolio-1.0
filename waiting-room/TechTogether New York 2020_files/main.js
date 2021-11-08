
// construct HTML for tentative schedule by reading JSON file with schedule information
$(document).ready(function () {
  // create 3 tables, one for each day
  for (let i = 1; i <= 3; i++) {
    let json_file = `json-files/schedule-day${i}.json`; // json file with event data for specified day
    let day = `day${i}`;
    let classes = "accordion";
    if (i == 1) {
      classes += " active";
    }
    let html = `<div class="${classes}" id="${day}">`;
    $.getJSON(json_file, function (data) {
      html = build_schedule(data, html, i) + "</div>"; // call method to build table
      document.getElementById("schedule-content").innerHTML += html;
    });
  }
});

// build tentative schedule table - data is contained in json file
function build_schedule(data, html, day) {
  for (let i = 0; i < data.length; i++) {
    let heading = `heading${day}${i}`;
    let data_target = `collapse${day}${i}`;

    let addId = i == 0 ? 'id="first-card"' : "";
    html += `<div class="card" ${addId}> <div class="card-header" id="${heading}">`;
    html += `<table class="table" data-toggle="collapse" data-target="#${data_target}" aria-expanded="true">`;

    // column with date/time and event category
    html += `<tbody><tr class="${data[i].Class}">`;
    html += `<th scope="row">${data[i].Time}<br><span>${data[i].Category}</span></th>`;

    // column with event title and location
    html += `<td colspan="2" class="event"><span> ${data[i].Title} </span><br>`;
    html += `<span> ${data[i].Host} </span></td>`;

    // add level icons for workshops only
    if (data[i].Class === "wshop") {
      html += '<td class="level text-left" style="vertical-align: middle;">';
      const levelToLabelMap = {
        1: "Beginner",
        2: "Intermed",
        3: "Advanced",
      };
      html += `<span style="border-radius: 20px; background-color: #ffdaff; color: #f196db; padding: 10px; font-weight: 800"> ${
        levelToLabelMap[data[i].Level]
      } </span>`;
      html += "</td>";
    }

    // column with calendar icon
    //html += `<td class="cal text-center" style="vertical-align: middle;""><a target="_blank" href="${data[i].GCal_Event}">`;
   // html += '<i class="fa fa-calendar"></i></a></td>';
    html += "</tr></tbody></table></div>";
    html += `<div id="${data_target}" class="collapse" aria-labelledby="${heading}" data-parent="#day${day}">`;

    // card body with event description
    html += `<div class="card-body ${data[i].Class}"> ${data[i].Description} </div></div></div>`;
  }
  return html;
}

// construct HTML for tentative schedule by reading JSON file with FAQs information
$(document).ready(function () {
  $.getJSON("json-files/faqs.json", function (data) {
    let left_data = data.FAQs_Left; // array for FAQs in left column
    let right_data = data.FAQs_Right; // array for FAQs in right column

    let html = build_faqs(left_data, "L") + build_faqs(right_data, "R"); // call methods to build FAQ cards
    document.getElementById("faqs-content").innerHTML = html;
  });
});

// build FAQs section - data is json file, col is L (left col) or R (right col)
function build_faqs(data, col) {
  let data_parent = `faq-${col}cards`;
  let html = `<div id="${data_parent}" class="col-md-6 col-sm-6 col-xs-6">`;

  for (let i = 0; i < data.length; i++) {
    let heading = `heading${col}${i}`;
    let data_target = `collapse${col}${i}`;

    html += '<div class="card text-left">';

    // question on card header
    html += `<div class="card-header" id="${heading}">`;
    html += `<button class="btn" type="button" data-toggle="collapse" data-target="#${data_target}" aria-expanded="false">`;
    html += `${data[i].Question}<i class="fa fa-caret-down rotate-icon"></i></button></div>`;

    // answer on card body
    html += `<div id="${data_target}" class="collapse" aria-labelledby="${data_target}" data-parent="#${data_parent}">`;
    html += `<div class="card-body"> ${data[i].Answer} </div></div></div>`;
  }

  html += "</div>";
  return html;
}

// response to user clicking tab (day) name in tentative schedule
var btns = document.querySelectorAll(".day-btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function (event) {
    // inactivates currently-active button and content
    let target = event.target;
    let active_elems = document.querySelectorAll(
      ".day-btn.active, #schedule-content .active"
    );
    for (let i = 0; i < active_elems.length; i++)
      active_elems[i].classList.remove("active");

    // activates clicked button and its respective content
    target.className += " active";
    let btn_name = target.getAttribute("data-tab");
    document.getElementById(btn_name).className += " active";
  });
}

// enables tooltips
$(document).ready(function () {
  $("body").tooltip({ selector: "[data-toggle=tooltip]" });
});

//for auto scrolling version 1
// function offsetAnchor() {
//   if (location.hash.length !== 0) {
//     window.scrollTo(window.scrollX, window.scrollY - 100);
//   }
// }
// $(document).on('click', 'a[href^="#"]', function(event) {
//   window.setTimeout(function() {
//     event.preventDefault();
//     offsetAnchor();
//   }, 100);
// });
// window.setTimeout(offsetAnchor, 100);

//for auto scrolling version 2
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();

//         document.querySelector(this.getAttribute('href')).scrollIntoView({
//             behavior: 'smooth'
//         });
//     });
// });


//for auto scrolling version 3
var $root = $('html, body');
$('a[href^="#"]').click(function() {
    var href = $.attr(this, 'href');

    $root.animate({
        scrollTop: $(href).offset().top - 100
    }, 700, function () {
      window.scrollTo(window.scrollX, window.scrollY - 100);
      window.location.hash = href;
    });

    return false;
});


//for auto scrolling version 4
// Select all links with hashes
// $('a[href*="#"]')
//   // Remove links that don't actually link to anything
//   .not('[href="#"]')
//   .click(function(event) {
//     // On-page links
//     if (
//       location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
//       && 
//       location.hostname == this.hostname
//     ) {
//       // Figure out element to scroll to

//       var target = $(this.hash);
//       target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
//       // Does a scroll target exist?
//       if (location.hash.length !== 0) {
//         // Only prevent default if animation is actually gonna happen
//         event.preventDefault();
//         $('html, body').animate({
//           scrollTop: target.offset().top
//         }, 800, function() {
//           // Callback after animation
//           // Must change focus!
//           var $target = $(target);
//           $target.focus();
//           if ($target.is(":focus")) { // Checking if the target was focused
//             return false;
//           } else {
//             window.scrollTo(window.scrollX, window.scrollY - 50);
//             $target.focus(); // Set focus again
//           };
//         });
//       }
//     }
//   });


//carousel smooth scrolling
$('.carousel').on('slide.bs.carousel', function (event) {
  // var height = $(event.relatedTarget).height();
  var $innerCarousel = $(event.target).find('.carousel-inner');
  
  // $innerCarousel.animate({
  //   height: height
  // });
});