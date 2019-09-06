$('#sidebarCollapse').on('click', function(){
    $('#sidebar').toggleClass('active');
});

$(document).ready(function(){


$( function() {
    $( ".draggable" ).draggable();
  });

$( function() {
    $( ".accordion" ).accordion({
      collapsible: true
    });
});


  $('[data-toggle="popover"]').popover();
});

// end jquery functions

var quill = new Quill('#editor', {
  theme: 'snow'
});

var quill = new Quill('#configsQuill', {
  theme: 'snow'
});

$('#quickNotesModal').modal(options)