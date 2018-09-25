jQuery('.logoutButton').click(function()
{
    jQuery.ajax({
    	url 		: '/api/logout',
    	method 		: 'GET',
    	dataType 	: 'json',
    	success 	: function(res)
    	{
	    	Materialize.toast(res.message);
	    	setTimeout(function()
	    	{
	    		window.location.replace("/");
	    	}, 500);
    	}
    });
});