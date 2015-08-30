$(document).ready(function(){
    

    var form = document.getElementById('file-form');
    var fileSelect = document.getElementById('file-select');
    var uploadButton = document.getElementById('upload-button');

    $(form).fileupload({
        autoUpload:false,
        type: 'PUT',
        multipart: false,
        beforeSend: function(xhr, data) {
            // Necessary to prevent filename and attachment being set (which forces the file to be downloaded when clicked on)
            xhr.setRequestHeader("Content-Disposition", "");
        },
        
        limitConcurrentUploads:1,
        add: function(e, data){

            // Get the signed URL from Lambda
            $.post(
                'https://l4ur9byy57.execute-api.eu-west-1.amazonaws.com/test/getsigneds3uploadurl', 
                JSON.stringify({contentType: data.files[0].type}), 
                function(result){

                    if(!result.errorMessage){


                        data.url = result.oneTimeUploadUrl
                        data.contentType = data.files[0].type
                        data.resultUrl = result.resultUrl

                        // Upload the file to the new signed URL
                        data.submit()
                    }else{
                            alert(result.errorMessage)
                    }
                    
            },'json')
            
        },
       progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#progress .bar').css(
                'width',
                progress + '%'
            );
        },
        done: function (e, data) {
            $('#output').html('<img src="'+data.resultUrl+'" class="preview"/>')
        }
    });

})