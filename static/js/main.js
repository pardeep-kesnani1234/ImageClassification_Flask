$(document).ready(function () {
    // Init
    $('.image-section').hide();
    $('.loader').hide();
    $('#label').hide();
    $('#conf').hide();
    $('#imageCapture').hide();	
 
    
    // Upload Preview
    function readURL(input) {
	document.getElementById('imagePreview').innerHTML = "";	
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUpload").change(function () {
        $('.image-section').show();
        $('#btn-predict').show();
        $('#btn-predict-capture').hide();	
        $('#label').text('');
        $('#label').hide();
        $('#conf').text('');
        $('#conf').hide();
	$('#my_camera').hide();
	readURL(this);
 	$('#IntCamera').show();
	$('#imageCapture').hide();	
	
	
	
    });
	
    




        //$('.image-section').show();

        $('#btn-predict').hide();
	$('.image-section').hide();
        $('#label').text('');
        $('#label').hide();
        $('#conf').text('');
        $('#conf').hide();
 	//console.log("ok");
	
 

    });

    // upload predict 
    $('#btn-predict').click(function () {
        var form_data = new FormData($('#upload-file')[0]);
	//var array = form_data1.split(" ");
	//var form_data1 = array;  
	//console.log(form_data);
        // Show loading animations
        $(this).hide();
        $('.loader').show();

        // Make prediction by calling api /predict
        $.ajax({
            type: 'POST',
            url: '/predict',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result

                $('.loader').hide();
                $('#label').fadeIn(600);
                $('#label').text(' Prediction:  ' + data.split(",")[0] );
		$('#conf').fadeIn(600);
                $('#conf').text(' Confidence:  ' + data.split(",")[1] );
                console.log('Success!');
            },
        });




});
