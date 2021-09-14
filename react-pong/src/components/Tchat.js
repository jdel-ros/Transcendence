import React from "react";
import { useState, useEffect } from "react";
import { socket } from "../App";

const Input = (props) => {
	const [input, setInput] = useState(""); // '' is the initial state value

    return (
        <div id="write-msg">
			<input type="text" placeholder="Connexion au chat..." disabled="" id="chat-input" value={input} onInput={(e) => setInput(e.target.value)} />
			<div id="send-msg" width="0px" style= {{backgroundImage: "url(../img/send.svg)"}} type="submit" onClick={(e) => {props.onSubmit(input);}}/>
		</div>
    );
};

const Tchat = () => {
	function active(){
		const tchat_button= document.getElementById('tchat-button');

		tchat_button.classList.toggle('tchat-open');
	}

	function chan(){
		const room_bar= document.getElementById('room-bar');

		room_bar.classList.toggle('room-open');
	}

	const [actuel_chan, setactuel] = useState("General");

	const [chan0, setchan0] = useState("General");
	function actuel0(){
		setactuel(chan0);
	}

	const [chan1, setchan1] = useState("manaccac");
	function actuel1(){
		setactuel(chan1);
	}

	const [chan2, setchan2] = useState("");
	function actuel2(){
		setactuel(chan2);
	}
	const [chan3, setchan3] = useState("");
	function actuel3(){
		setactuel(chan3);
	}
	const [chan4, setchan4] = useState("");
	function actuel4(){
		setactuel(chan4);
	}
	const [chan5, setchan5] = useState("");
	function actuel5(){
		setactuel(chan5);
	}
	const [chan6, setchan6] = useState("");
	function actuel6(){
		setactuel(chan6);
	}
	const [chan7, setchan7] = useState("");
	function actuel7(){
		setactuel(chan7);
	}
	const [chan8, setchan8] = useState("");
	function actuel8(){
		setactuel(chan8);
	}
	const [chan9, setchan9] = useState("");
	function actuel9(){
		setactuel(chan9);
	}

	function newchan(){
		if(chan1 == "")
			setchan1(prompt("enter chan name"))
		else if(chan2 === "")
			setchan2(prompt("enter chan name"))
		else if(chan3 === "")
			setchan3(prompt("enter chan name"))
		else if(chan4 === "")
			setchan4(prompt("enter chan name"))
		else if(chan5 === "")
			setchan5(prompt("enter chan name"))
		else if(chan6 === "")
			setchan6(prompt("enter chan name"))
		else if(chan7 === "")
			setchan7(prompt("enter chan name"))
		else if(chan8 === "")
			setchan8(prompt("enter chan name"))
		else if(chan9 === "")
			setchan9(prompt("enter chan name"))
	}

	const [messages, setMessages] = useState([]);
    const onSubmit = (input) => {
        // socket.chat.emit()
        socket.chat.emit("chatToServer", input);
        // setMessages((old) => [...old, input]);
    };

    useEffect(() => {
        socket.chat.on("chatToClient", (message) => {
            setMessages((old) => [...old, message]);
        });
        return () => {
            socket.chat.offAny("chatToClient");
        };
    }, []);

	return (
		<div id="tchat-button">
			<div id="tchat-bar">
				<img src="../img/tchat.svg" alt="tchat" id="img_tchat" onClick={active}/>
				<div id="chan-bar">
					<div id="back-actuel"><li id="tchat-actuel"> {actuel_chan} </li></div>
					<div id="boutton-salon" onClick={chan}>salon <span id="arrow">{'>'}</span></div>
					<div id="room-bar">
						<li id="chan-room0" onClick={actuel0}>{chan0}</li>
						<li id="chan-room1" onClick={actuel1}>{chan1}</li>
						<li id="chan-room2" onClick={actuel2}>{chan2}</li>
						<li id="chan-room3" onClick={actuel3}>{chan3}</li>
						<li id="chan-room4" onClick={actuel4}>{chan4}</li>
						<li id="chan-room5" onClick={actuel5}>{chan5}</li>
						<li id="chan-room6" onClick={actuel6}>{chan6}</li>
						<li id="chan-room7" onClick={actuel7}>{chan7}</li>
						<li id="chan-room8" onClick={actuel8}>{chan8}</li>
						<li id="chan-room9" onClick={actuel9}>{chan9}</li>
						<div id="bt-more-chan" onClick={newchan}><li id="chan-more">+</li></div>
					</div>
				</div>
				<div id="chat">
					<p>
                	    {messages.map((msg, index) => (
                	        <li key={index}>{msg}</li>
                	    ))}
					</p>
				</div>
				<div id="box-msg">
					<Input onSubmit={onSubmit}></Input>
				</div>
			</div>
		</div>
	);
};

export default Tchat;