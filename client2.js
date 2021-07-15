function showMessage(messageHTML) {
		$('#chat-box').append(messageHTML);
	}

	$(document).ready(function(){
		var socket = new WebSocket('ws://localhost:100',"ws"); 
		socket.onopen = function(event) { 
			console.log("connection open\n");
//showMessage("<div class='chat-connection-ack'>Connection is established!</div>");		
		}
		socket.onmessage = function(event) {
			var Data = JSON.parse(event.data);
console.log("message from server:\n"+Data.message_type+"\n"+Data.message)
	//		showMessage("<div class='"+Data.message_type+"'>"+Data.message+"</div>");
		//	$('#chat-message').val('');
		};
		
		socket.onerror = function(event){
			console.log("socket error\n")
			//showMessage("<div class='error'>Problem due to some Error</div>");
		};
		socket.onclose = function(event){
			console.log("socket closed\n");
		//	showMessage("<div class='chat-connection-ack'>Connection Closed</div>");
		}; 
		
		$('#submit').on("click",function(event){
			//event.preventDefault();
			//$('#chat-user').attr("type","hidden");		
			var messageJSON = {
				"chat_message": $('input').val()
			};
		socket.send(JSON.stringify(messageJSON));
		});
	});