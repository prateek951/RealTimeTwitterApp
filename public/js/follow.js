//Making the ajax call here to follow a user

$(function(){
    $(document).on('click','#follow',function(e){
        e.preventDefault();
        var user_id = $('#user_id').val();
        $.ajax({
            type: "post",
            url: "/follow/"+user_id,
            success: function (response) {
                //this will run when we have successfully followed a person
                $('#follow').removeClass('btn-default').addClass('btn-primary')
                .html('Following').attr('id','unfollow');
            },
            error : function(data){
                console.log(data);
            }
        });
    })




})