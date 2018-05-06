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
    });

    $(document).on('click','#unfollow',function(e){

        e.preventDefault();
        var user_id = $('#user_id').val();
        $.ajax({
            type: "post",
            url: "/unfollow/" + user_id,
            // data: "data",
            // dataType: "dataType",
            success: function (response) {
                $('#unfollow').removeClass('btn-primary').addClass('btn-default')
                .html('follow').attr('id','follow');
            },
            err : function(data){
                console.log(data);
            }
        });
    });

    $(document).on('mousenter','#unfollow',function(e){
        $(this).remove('btn-primary').addClass('btn-danger').html('Unfollow');
    });

    $(document).on('mouseleave','#unfollow',function(e){
        $(this).removeClass('btn-danger').addClass('btn-primary').html('Following');
    });


});