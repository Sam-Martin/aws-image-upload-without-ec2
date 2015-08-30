$(document).ready(function () {
    
    $('#file-form').fileupload({
        autoUpload: false,
        type: 'PUT',
        multipart: false,
        beforeSend: function (xhr, data) {
          // Prevent the Content-Disposition header being populated during the uploading of the file.
          // This is necessary to prevent filename and attachment being set (which forces the file to be downloaded when clicked on)
          xhr.setRequestHeader('Content-Disposition', '');
        },
        limitConcurrentUploads: 1,
        add: function (e, data) {
          
          // Get the signed URL from our Lambda-backed API Gateway
          $.post('https://l4ur9byy57.execute-api.eu-west-1.amazonaws.com/test/getsigneds3uploadurl', JSON.stringify({ contentType: data.files[0].type }), function (result) {

            // Check there wasn't an error getting the signed URL
            if (!result.errorMessage) {

                // Set the upload URL with our new signed URL
                data.url = result.oneTimeUploadUrl;
                data.contentType = data.files[0].type;
                
                // Hijack the data object so we can re-use resultURL later
                data.resultUrl = result.resultUrl;
                
                // Upload the file to the new signed URL
                data.submit();
            } else {
                
                // Print that error if there was an error getting the signed URL
                alert(result.errorMessage);
            }
          }, 'json');
        },
        progressall: function (e, data) {

            // Show progress of the upload by extending the progress bar as we go.
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#progress .bar').css('width', progress + '%');
        },
        done: function (e, data) {
            
            // Show preview image
            $('#output img').replaceWith('<img src="' + data.resultUrl + '" class="preview"/>');
            // Populate output URL textbox
            $('#output-url').css('display','block').attr('value',data.resultUrl);
        }
    });
}); 