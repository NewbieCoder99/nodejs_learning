$('#sidebarCollapse').on('click', function() {
    $('#sidebar').toggleClass('active');
});

$(document).ready(function() {

	$(function() {
		$( ".draggable" ).draggable();
	});

	$( function() {
		$( ".accordion" ).accordion({
		  collapsible: true
		});
	});

	$('[data-toggle="popover"]').popover();
});
