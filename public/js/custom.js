$(function(){
    var socket = io();

    $('#sendTweet').submit(function(){
        var content = $('#tweet').val();
        socket.emit('tweet', {content : content});
        $('#tweet').val('');
        return false;
    });

    socket.on('incomingTweets',data => {
        var html = '';
        html += `
                        
                <div id="tweets">
                <div class="media">
                    <div class="media-left">
                        <a href="#"><img class="media-object" src="${data.user.photo}" alt=""></a>
                    </div>
                    <div class="media-body">
                        <h4 class="media-heading">${data.user.name}</h4>
                        <p>${data.data.content}</p>
                    </div>
                </div>
                </div>      
        `;
        $('#tweets').prepend(html);
    })
});