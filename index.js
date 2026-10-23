//Zandile 

//Show the instructions before the game begins
 alert(
 "Welcome to ESCAPE THE EVIL AI!\n\n" +

 "You find yourself in a dark room with a flashing computer screen.\n" +
 "A robotic voice echoes from the speakers:\n\n" +

 "'Hello, human! I have trapped you inside my digital fortress!\n" +
 "There are rooms to explore, clues to discover and choices to make.\n" +
 "But be careful - your earlier decisions may change what happens next!\n" + 
 "Only your logic can help you escape!'"
 );

 alert(
 "You must explore three locations:\n" +
 "1. The Security Room\n"+
 "2. The Power Room\n" +
 "3. The Exit Chamber\n\n" +

 "Each room contains clues or choices that could help you escape.\n\n" +
 "Your mission is to find the access key, restore the power if " +
 "necessary, and reach the exit before the evil AI catches you."
 );

 alert(
 "NOTE:\n" +
 "Use the numbered choices in each prompt.\n" +
 "You can return to the Security Room and revisit places.\n" + 
 "Your progress will be remembered.\n\n" +

 "TO START:\n" + 
 "Right-click, select Inspect, then select Console.\n" + 
 "Press Cancel in any prompt to end the game."
 );


 //Luis





 //Obadea

//Shared game progress - remembered across rooms.
//Luis: use these variables in the Power Room and Exit Chamber, do not redeclare them.
//powerRestored should be set to true when the generator is repaired.
let hasAccessKey = false;
let powerRestored = false;

//Room 1: Security Room
function securityRoom() {
  alert(
    "You are in the Security Room.\n\n" +
    "You discover a computer and a locked cabinet."
  );

  while (true) {
    let choice = prompt(
      "What do you want to do?\n\n" +
      "1. Search the cabinet\n" +
      "2. Check the computer\n" +
      "3. Leave for another room"
    );

    //Pressing Cancel ends the game
    if (choice === null) {
      alert("Game over. Thanks for playing!");
      return;
    }

    choice = choice.trim();

    if (choice === "1") {
      if (hasAccessKey) {
        alert("You already searched the cabinet - you have the access key.");
      } else {
        hasAccessKey = true;
        alert(
          "You force the locked cabinet open and find... the ACCESS KEY!\n\n" +
          "Progress saved: access key collected."
        );
      }
    } else if (choice === "2") {
      alert(
        "The computer screen flickers and shows a clue about the exit:\n\n" +
        "'The Exit Chamber lies beyond the Power Room.\n" +
        "The exit door opens only for one who carries the access key\n" +
        "and restores the power.'"
      );
    } else if (choice === "3") {
      leaveSecurityRoom();
    } else {
      alert("Invalid choice. Type 1, 2 or 3.");
    }
  }
}

//Hand-off point: when Luis's Power Room is ready it is called here automatically.
function leaveSecurityRoom() {
  if (typeof powerRoom === "function") {
    powerRoom();
  } else {
    alert(
      "The passage to the Power Room is still sealed.\n" +
      "(The Power Room is not built yet.)\n\n" +
      "You stay in the Security Room."
    );
  }
}

//The game starts here in the Security Room.
//Luis: declare your rooms as functions (powerRoom, exitChamber) and they will
//be reached from here - function declarations can appear anywhere in this file.
securityRoom();