//currently selected file in viewer
let currentselection = 0
//'state' of PC i.e. what app is open
let pcState = 5
let months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER']
//our game is set in October (month 10, item 9 in array)
let selectedmonth = 9

let NewmouseX
let NewmouseY
//initiate 3D array to hold all chat data for messages (imported from csv file)
let MESSAGES = []
//Stores chat 'indexes' from CSV for later use
let CHATINDEX = []
//stores array of recent message indexes
let RECENTS = []
//globalises variable to which csv is imported
let TEXTTABLE
//standardises message in app to always be on same one when program first run
let OpenMessage = 1
//certain aspects of 'PC' start off locked
let secureLocked = true


function preload() {
  //preload all assets to speed up program running

  //background of computer
  BACKGROUNDIMG = loadImage("BACKGROUND.png")
  //icon in top bar of file app
  FILEICON = loadImage("FILEICON.png")
  //HDD icon seen in file viewer
  HDDICON = loadImage("HDDICON.png")
  //standard 'iphone style' profile picture
  MESSAGEPFP = loadImage("messagePFP.png")
  SENDICON = loadImage("SENDICON.png")
  ATTACHICON = loadImage("ATTACHICON.png")
  //icons found in file viewer
  DESKTOPICON = loadImage("DESKTOPICON.jpg")
  DOCUMENTICON = loadImage("DOCUMENTICON.png")
  DOWNLOADICON = loadImage("DOWNLOADICON.png")
  FOLDERICON = loadImage("FOLDERICON.png")
  PICTUREICON = loadImage("PICTUREICON.jpg")
  //sound that plays whenever mouse is clicked
  CLICKNOISE = loadSound("CLICK.mp3")
  //csv file containing message information
  TEXTTABLE = loadTable('TEXTMESSAGES.csv', 'header')
  //icons on homescreen for different apps
  CALENDARAPP = loadImage("CALENDARAPP.png")
  FILEAPP = loadImage("FILEAPP.png")
  MESSAGESAPP = loadImage("MESSAGESAPP.png")
  NOTESAPP = loadImage("NOTESAPP.png")

  //icons in top corners of windows (except file viewer, loaded earlier)
  TCNOTES = loadImage("TOPCORNERNOTES.png")
  TCCALENDAR = loadImage("TOPCORNERCALENDAR.png")
  TCMESSAGES = loadImage("TOPCORNERMESSAGES.png")

  //images found in file viewer, under images
  Tabby = loadImage("Tabby.png")
  Elsie = loadImage("Elsie.png")
  Party1 = loadImage("Party1.png")
  Party2 = loadImage("Party2.png")
  Party3 = loadImage("Party3.png")
  JASONNN = loadImage("JASON.png")

  //images/assets on Milo's halloween invite
  HALLOWEEN1 = loadImage("HALLOWEEN1.jpg")
  HALLOWEEN2 = loadImage("HALLOWEEN2.jpg")
  HALLOWEEN3 = loadImage("HALLOWEEN3.jpg")
  PUMPKIN = loadImage("PUMPKIN.png")

  //crochet pattern seen under downloads
  CROCHETPATTERN = loadImage("CROCHETPATTERN.png")

  //on secured items in file viewer
  LOCKICON = loadImage("LOCK.png")
  UNLOCKICON = loadImage("UNLOCK.png")

  MAPFILE = loadImage("MAP.png")

  //sketches seen in creative folder of portfolio, showcasing image resizing and arranging
  PORTFOLIO1 = loadImage("PurpleGhostfacePhysical.jpg")
  PORTFOLIO2 = loadImage("Spidey.jpg")
  PORTFOLIO3 = loadImage("DuMetPhysicalRedTone.jpg")
  PORTFOLIO4 = loadImage("DigitalArt1.jpg")
}

function setup() {
  //general set up
  //dynamically resizing window (see also windowResized())
  createCanvas(windowWidth, windowHeight);
  //working in degrees because, and I'll say it 100 times again, radians SUCK
  angleMode(DEGREES)
  //draw images and shapes from their center
  imageMode(CENTER)
  rectMode(CENTER)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background('white')
}

function mouseClicked() {
  //play click noise whenever screen clicked
  CLICKNOISE.play()

  //whenever min/max/exit buttons in top corner of window clicked, revert to 'home' screen
  if (NewmouseY > 6 && NewmouseY < 18) {
    if (NewmouseX > 558 && NewmouseX < 595) {
      pcState = 5
    }
  }

  //if on messages tab...
  if (pcState == 1) {
    //messages
    //only works when mouse hovered over side bar containing contact names
    if (NewmouseX > 4 && NewmouseX < 144) {
      if (NewmouseY < 47) {
        //nothing
      //allows selection of different contacts in list based on Y coordinate of mouse at time of click
      } else if (NewmouseY > 47 && NewmouseY < 97) {
        OpenMessage = 1
      } else if (NewmouseY < 146) {
        OpenMessage = 2
      } else if (NewmouseY < 196) {
        OpenMessage = 3
      } else if (NewmouseY < 245) {
        OpenMessage = 4
      } else if (NewmouseY < 296) {
        OpenMessage = 5
      } else if (NewmouseY < 345) {
        OpenMessage = 6
      } else if (NewmouseY < 396) {
        OpenMessage = 7
      } else if (NewmouseY < 446) {
        OpenMessage = 8
      } else if (NewmouseY < 496) {
        OpenMessage = 9
      } else if (NewmouseY > 496) {
        //nothing
      }
      Messages()
    }
  //if on calendar tab...
  } else if (pcState == 2) {
    //calendar
    //selection of arrows to cycle between months
    if (NewmouseY > 40 && NewmouseY < 105) {
      if (NewmouseX > 4 && NewmouseX < 95) {
        //if already at January, cycle round to December
        if (selectedmonth < 1) {
          selectedmonth = 11
        } else {
        selectedmonth --
        }
      } if (NewmouseX > 500 && NewmouseX < 595) {
        //if already at December, cycle round to January
        if (selectedmonth > 10) {
          selectedmonth = 0
        } else {
        selectedmonth ++
        }
      }
    }
  } else if (pcState == 3) {
    //file viewer
    //30 items
    //selection of files, similar to contacts in messages tab (contain to certain X coords, and differentiate based on Y coord at time of click)
    if (NewmouseX > 4 && NewmouseX <164) {
      if (NewmouseY < 41) {
        //nothing
      } else if (NewmouseY > 40 && NewmouseY < 58) {
        currentselection = 0
      } else if (NewmouseY < 73) {
        currentselection = 1
      } else if (NewmouseY < 88) {
        currentselection = 2
      } else if (NewmouseY < 103) {
        currentselection = 3
      } else if (NewmouseY < 118) {
        currentselection = 4
      } else if (NewmouseY < 133) {
        currentselection = 5
      } else if (NewmouseY < 148) {
        currentselection = 6
      } else if (NewmouseY < 163) {
        currentselection = 7
      } else if (NewmouseY < 178) {
        currentselection = 8
      } else if (NewmouseY < 193) {
        currentselection = 9
      } else if (NewmouseY < 208) {
        currentselection = 10
      } else if (NewmouseY < 223) {
        currentselection = 11
      } else if (NewmouseY < 238) {
        currentselection = 12
      } else if (NewmouseY < 253) {
        currentselection = 13
      } else if (NewmouseY < 268) {
        currentselection = 14
      } else if (NewmouseY < 283) {
        currentselection = 15
      } else if (NewmouseY < 298) {
        currentselection = 16
      } else if (NewmouseY < 313) {
        currentselection = 17
      } else if (NewmouseY < 328) {
        currentselection = 18
      } else if (NewmouseY < 343) {
        currentselection = 19
      } else if (NewmouseY < 358) {
        currentselection = 20
      } else if (NewmouseY < 373) {
        currentselection = 21
      } else if (NewmouseY < 388) {
        currentselection = 22
      } else if (NewmouseY < 403) {
        currentselection = 23
      } else if (NewmouseY < 418) {
        currentselection = 24
      } else if (NewmouseY < 433) {
        currentselection = 25
      } else if (NewmouseY < 448) {
        currentselection = 26
      } else if (NewmouseY < 463) {
        currentselection = 27
      } else if (NewmouseY < 478) {
        currentselection = 28
      } else if (NewmouseY < 493) {
        currentselection = 29
      } else if (NewmouseY > 493) {
        //nothing
      }
    }
    fileViewer()
  } else if (pcState == 4) {
    //notes
  } else if (pcState == 5) {
    //Selecting icons in top left of screen opens corresponding app
    if (mouseX > 6 && mouseX < 43) {
      if (mouseY > 6 && mouseY < 46) {
        pcState = 2
      } else if (mouseY < 89) {
        pcState = 4
      } else if (mouseY < 129) {
        pcState = 1
      } else if (mouseY < 172) {
        pcState = 3
      } else if (mouseY > 172) {
        //nothing
      }
    }
  }
}

function openWindow() {

  //changes fill colour of window outline depending on opened app
  if (pcState == 1) {
    //messages = blue
    fill(0, 85, 230)
  } else if (pcState == 2) {
    //calendar = red
    fill(168, 33, 33)
  } else if (pcState == 3) {
    //file viewer = green
    fill(127, 209, 129)
  } else if (pcState == 4) {
    //notes = yellow
    fill(253, 204, 105)
  }

  //Creates 'window' in centre of actual window
  rect(0, 0, 600, 500)

  //Creates pale yellow inner part of fake window
  push()
  fill(240, 237, 228)
  //Leaves space for thicker bar at top of window, where details + max/min buttons go
  translate(0, 10)
  rect(0, 0, 590, 475)
  pop()

  //Uses shapes to mimic maximise/minimise/close window buttons
  push()
  translate(288, -238)
  stroke('black')
  strokeWeight(1)
  //exit button
  fill('black')
  square(0, 0, 10)
  //cross within exit button
  fill('white')
  textStyle(BOLD)
  textSize(8)
  text('X', 0, 0)
  //maximise button
  translate(-12, 0)
  fill('black')
  square(0, 0, 10)
  //maximise symbol
  stroke('white')
  square(0, 0, 4)
  //minimise button
  translate(-12, 0)
  stroke('black')
  square(0, 0, 10)
  translate(0, -2)
  //minimise symbol
  textSize(10)
  fill('white')
  text("_", 0, 0)
  pop()

}

function fileViewer() {
  //Creates pale yellow inner part of fake window
  push()
  fill(240, 237, 228)
  //Leaves space for thicker bar at top of window, where details + max/min buttons go
  translate(0, 10)
  rect(0, 0, 590, 475)
  //Creates thin side window containing file explorer details
  fill(220, 217, 208)
  translate(-215, 0)
  rect(0, 0, 160, 475)
  pop()

  translate(-225, 10)

  //Highlight bar showing which item is currently selected
  push()
  translate(10, -208)
  //Each piece of text is 15px below the previous. Highlight bar moves down by 15px multiplied by which item is currently selected
  let selectedcategory = (15 * currentselection)
  //current selection (^) changes based on mouse click position
  strokeWeight(1)
  translate(0, selectedcategory)
  stroke(180, 177, 168)
  fill(200, 197, 188)
  rect(0, 0, 158, 15)
  pop()

  push()
  //lighter highlight bar follows mouse when within given coords (over list of files) to mimic potential selections (not sure how to explain)
  if (NewmouseX > 4 && NewmouseX <164) {
    if (NewmouseY > 46 && NewmouseY < 484) {
      strokeWeight(1)
      translate(10, NewmouseY-255)
      stroke(180, 177, 168)
      fill(200, 197, 188, 0.8)
      rect(0, 0, 158, 15)
    }
  }
  pop()

  push()
  //List of files on Kayla's PC
  translate(-45, -225)
  textSize(12)
  textAlign(LEFT, CENTER)
  fill('black')
  textStyle(BOLD)
  text(" Kayla's PC", 0, 0)
  textStyle(NORMAL)
  translate(-10, 0)
  image(HDDICON, 0, 0, 40, 40)
  translate(18, 17)

  image(DESKTOPICON, 0, 0, 10, 10)
  translate(10, 1)

  text("Desktop", 0, 0)
  translate(10, 15)
  text("Calendar App", 0, 0)
  translate(0, 15)
  text("Messages App", 0, 0)
  translate(0, 15)
  text("Notes App", 0, 0)
  translate(-20, 13)

  image(DOWNLOADICON, 0, 0, 18, 18)
  translate(10, 2)

  text("Downloads", 0, 0)
  translate(10, 15)
  text("Milo_Invite.pdf", 0, 0)
  translate(0, 15)
  text("Crochet_Patt26.pdf", 0, 0)
  translate(-20, 14)

  image(PICTUREICON, 0, 0, 12, 12)
  translate(10, 1)

  text("Pictures", 0, 0)
  translate(10, 15)
  text("Pets", 0, 0)
  translate(15, 15)
  text("Tabby.jpg", 0, 0)
  translate(0, 15)
  text("Elsie.jpg", 0, 0)
  translate(-15, 15)
  text("Friends", 0, 0)
  translate(15, 15)
  text("Party1.png", 0, 0)
  translate(0, 15)
  text("Party2.png", 0, 0)
  translate(0, 15)
  text("Party3.png", 0, 0)
  translate(0, 15)
  text("JASONNNN.jpg", 0, 0)
  translate(-35, 13)

  image(DOCUMENTICON, 0, 0, 15, 15)
  translate(10, 2)

  text("Documents", 0, 0)
  translate(10, 15)
  text("Admin", 0, 0)
  translate(15, 15)
  text("Finances.xlsx", 0, 0)
  translate(0, 15)
  text("Invoice.pdf", 0, 0)
  translate(-15, 15)
  text("Creative", 0, 0)
  translate(15, 15)
  text("Portfolio.jpg", 0, 0)
  translate(0, 15)
  text("Fairground.docx", 0, 0)
  translate(0, 15)
  text("Map.png", 0, 0)
  translate(-15, 15)
  text("SECURE FOLDER", 0, 0)
  translate(15, 15)
  text("xxxxx.docx", 0, 0)
  translate(0, 15)
  text("xxxxxxxxx.pdf", 0, 0)
  translate(-35, 13)

  image(FOLDERICON, 0, 0, 12, 12)
  translate(10, 2)

  text("Other", 0, 0)
  translate(10, 15)
  text("SystemNotes.zip", 0, 0)
  translate(0, 15)
  text("DeletedFile", 0, 0)
  translate(-20, 15)
  pop()

  //Details in top bar of fake window
  push()
  translate(-62, -248)
  image(FILEICON, 0, 0, 18, 18)
  fill('black')
  textStyle(BOLD)
  text('File Viewer', 45, 0)
  pop()

  //categories otherwise containing no information (e.g. category headings) show a '...' sign in center of window
  push()
  translate(305, 10)
  if (currentselection < 5 || currentselection == 7 || currentselection == 16 || currentselection == 27) {
    if (currentselection != 1 && currentselection != 2 && currentselection != 3) {
    textSize(50)
    fill('black')
    text("...", 0, 0)
    //nothing
    }
  //below items contain 'document' type things, so provide a standardised white base for text/info to go on top of
  } else if (currentselection < 7 || currentselection == 18 || currentselection == 19 || 24 > currentselection && currentselection > 20 || currentselection == 25 || currentselection == 26) {
    fill('white')
    rect(0, 0, 400, 450)
  }
  pop()

  //Pictures folder, based on selection
  push()
  translate(305, 0)
  let imageused
  if (currentselection == 9) {
    imageused = Tabby
  } else if (currentselection == 10) {
    imageused = Elsie
  } else if (currentselection == 12) {
    imageused = Party1
  } else if (currentselection == 13) {
    imageused = Party2
  } else if (currentselection == 14) {
    imageused = Party3
  } else if (currentselection == 15) {
    imageused = JASONNN
  }

  //standardises displayed image to same size as others whilst maintaining dimensions (not stretching weirdly)
  if (currentselection > 8 && currentselection < 16 && currentselection != 11) {
    rect(0, 0, 410, 410, 5)
    let size = min(imageused.width, imageused.height)
    let displayimage = imageused.get(((imageused.width - size)/2), ((imageused.height - size)/2), size, size)
    displayimage.resize(400, 400)
    image(displayimage, 0, 0)
  }
  pop()

  //Shows icons.app under respective desktop categories (mostly just to take up space so window looks more full)
  push()
  translate(305, 0)
  fill('black')
  textSize(12)
  textStyle(BOLD)
  if (currentselection == 1) {
    image(CALENDARAPP, 0, 0, 50, 50)
    text("Calendar.app", 0, 30)
  } else if (currentselection == 2) {
    image(MESSAGESAPP, 0, 0)
    text("Messages.app", 0, 30)
  } else if (currentselection == 3) {
    image(NOTESAPP, 0, 0)
    text("Notes.app", 0, 30)
  }
  pop()

  //design and layout of Milo's halloween party invite
  push()
  translate(305, 0)
  textWrap(WORD)
  fill('black')
  if (currentselection == 5) {
    textStyle(BOLD)
    textSize(25)
    text("Milo's Halloween Extravaganza", 0, -190, 500)
    text("===================", 0, -170)
    textSize(20)
    textStyle(NORMAL)
    text("29/10/2016", 0, -150)
    textSize(12)
    textStyle(ITALIC)
    text("@ Milo's Place (yk where!)", 0, -128)
    text("===================", 0, -115)
    image(HALLOWEEN1, -130, -45, 125, 125)
    image(HALLOWEEN2, 90, 125, 200, 200)
    image(HALLOWEEN3, -105, 112, 175, 175)
    text("Contact me @m1lomadness on insta :)", -105, 218, 150)
    textSize(20)
    textStyle(BOLD)
    text("Costumes ENCOURAGED!", 70, -90)
    strokeWeight(0)
    fill(189, 113, 0)
    translate(-20, -30)
    circle(0, 0, 80)
    textSize(15)
    fill('black')
    rotate(-30)
    text("BYOB and snacks", 0, 0, 50)
    rotate(30)
    translate(100, 0)
    rotate(30)
    image(PUMPKIN, 0, 0, 100, 100)
    rotate(-30)
    translate(75, 0)
    rotate(-15)
    image(PUMPKIN, 0, 0, 75, 75)
  }
  pop()

  //self-explanatory
  push()
  if (currentselection == 6) {
    image(CROCHETPATTERN, 305, 0, 390, 390)
  }
  pop()

  //Folder headings show standardised icon plus 'folder: folder name'
  push()
  if (currentselection == 8 || currentselection == 11 || currentselection == 17 || currentselection == 20 || currentselection == 24) {
    translate(300, 0)
    image(FOLDERICON, 0, 0, 100, 100)
    textSize(20)
    fill('black')
    textStyle(BOLD)
    if (currentselection == 8) {
      text("Folder: Pets", 0, 60)
    } else if (currentselection == 11) {
      text("Folder: Friends", 0, 60)
    } else if (currentselection == 17) {
      text("Folder: Admin", 0, 60)
      //locked folders have an additional icon that shows whether they remain locked or have been unlocked
      if (secureLocked == true) {
        image(LOCKICON, 0, 10, 20, 20)
      } else {
        image(UNLOCKICON, 0, 10, 20, 20)
      }
    } else if (currentselection == 20) {
      text("Folder: Creative", 0, 60)
    } else if (currentselection == 24) {
      text("Folder: SECURE FOLDER", 0, 60)
      //locked folders have an additional icon that shows whether they remain locked or have been unlocked
      if (secureLocked == true) {
        image(LOCKICON, 0, 10, 20, 20)
      } else {
        image(UNLOCKICON, 0, 10, 20, 20)
      }
    }
  }
  pop()

  //lengthy text document in the style of a word doc, mimicking a creative writing exercise
  push()
  if (currentselection == 22) {
    textWrap(WORD)
    translate(300, 0)
    fill('black')
    textSize(20)
    textStyle(BOLD)
    text("Creative Writing", 0, -190)
    textSize(15)
    text("--Fairground--", 0, -170)

    textStyle(NORMAL)
    textSize(10)

    text("The Ferris wheel crunched to a stop, the operator’s face growing in shock as he registered the blood soaked corpse slumped in the chair, and the panicked individual vaulting the railing and sprinting into the crowd. It took him a second to fling open the door of the control box and give chase, as the crowd around started to realise what was happening - giving me a valuable head start. I weaved in between families and couples, apologising profusely although I knew it wouldn’t matter.", 0, -120, 380)

    text("Reaching the metal fence around the edge of the fairground, I hesitated. Barely a second, but long enough for a beefy worker in a striped red shirt to grip my shoulder firmly. Wriggling free, I heaved myself over the fence, sprawling the other side and leaving my blood streaked denim jacket hanging from the worker’s hand. Sprinting through the long grass, I dared to risk a glance back. No one was following, but I could see the worker glaring menacingly at me across the field, whilst another spoke rapidly into a phone. It wouldn’t be long before the whine of sirens pierced the night and it was essential I get far away before that happened. Once they arrived I couldn’t outrun them - all would be lost.", 0, -20, 380)

    text("I breathed a sigh of relief as I broke through the thick foliage into the dense wood. It was dark and gloomy, only a few patches of dappled moonlight reached the forest floor through the thick canopy high overhead. Slowing as a painful stitch ripped through my abdomen, it felt as if huge weights were attached to my body, dragging me to the floor. I managed to make it to a huge bush before collapsing, dragging my legs in tight so I wouldn’t be seen. Ideally I’d have dressed more camouflaged but honestly I didn’t expect to commit a murder tonight. In fact, it was bizarre to think that just three hours ago I’d been getting ready with excitement, expecting my first kiss at the fair. Funny how rapidly things could change…", 0, 100, 380)
    text("I could hear the sirens. With the adrenaline rush gone, I was left drained on the ground, my mind reeling with horror at what I’d done. Of course they would never believe what actually happened. I’d be written off as insane, the crazy kid who murdered the boy on the Ferris Wheel. I mean who could blame them - if someone tried to tell me a month ago that demons walked the Earth I’d have laughed in their face.", 0, 195, 380)
  }
  pop()

  //'system files' (binary nonsense)
  push()
  if (currentselection == 28) {
    strokeWeight(3)
    stroke('black')
    textWrap(WORD)
    rect(300, 0, 375, 350, 10)
    fill('white')
    textSize(15)
    textStyle(BOLD)
    text("01001000 01100101 01111001 00100001 00100000 01001001 00100000 01101000 01100001 01100100 00100000 01110011 01101111 00100000 01101101 01110101 01100011 01101000 00100000 01100110 01110101 01101110 00100000 01110111 01101111 01110010 01101011 01101001 01101110 01100111 00100000 01101111 01101110 00100000 01110100 01101000 01101001 01110011 00101100 00100000 01100001 01101110 01100100 00100000 01001001 00100000 01110111 01101001 01110011 01101000 00100000 01001001 00100000 01100011 01101111 01110101 01101100 01100100 00100000 01101000 01100001 01110110 01100101 00100000 01100100 01101111 01101110 01100101 00100000 01110011 01101111 01101101 01100101 00100000 01101101 01101111 01110010 01100101 00100000 01110100 01101111 00100000 01100010 01100101 00100000 01101000 01101111 01101110 01100101 01110011 01110100 00101110 00100000 01001101 01100001 01111001 01100010 01100101 00100000 01110111 01101000 01100101 01101110 00100000 01001001 00100000 01101000 01100001 01110110 01100101 00100000 01110011 01101111 01101101 01100101 00100000 01100110 01110010 01100101 01100101 00100000 01110100 01101001 01101101 01100101 00100000 01001001 00100111 01101100 01101100 00100000 01100110 01101001 01111000 00100000 01101001 01110100 00100000 01110101 01110000 00100000 01110000 01110010 01101111 01110000 01100101 01110010 01101100 01111001 00101100 00100000 01101010 01110101 01110011 01110100 00100000 01100110 01101111 01110010 00100000 01101101 01111001 00100000 01101111 01110111 01101110 00100000 01100101 01101110 01110100 01100101 01110010 01110100 01100001 01101001 01101110 01101101 01100101 01101110 01110100 00101110", 300, 10, 350)
  }
  pop()

  //self-explanatory
  push()
  if (currentselection == 23) {
    image(MAPFILE, 305, 0, 375, 300)
  }
  pop()
  
  //arranging and sizing pictures to mimic a 'portfolio' or sketches/art
  push()
  if (currentselection == 21) {
    translate(300, 0)
    image(PORTFOLIO1, 100, -95, 150, 225)
    image(PORTFOLIO2, -100, 105, 180, 250)
    image(PORTFOLIO3, -85, -120, 200, 160)
    image(PORTFOLIO4, 100, 130, 200, 200)
  }
  pop()

  //locked folders!
  push()
  if (currentselection == 25 || currentselection == 26 || currentselection == 19 || currentselection == 18) {
    if (secureLocked == true) {
      fill('red')
      rect(305, 0, 398, 60)
      fill('black')
      textStyle(NORMAL)
      textSize(55)
      textFont('impact')
      text("! ! ! LOCKED ! ! !", 305, 0)
    }
  }
  pop()

}

function Calendar() {
  //Details in top bar of fake window
  push()
  translate(-286, -238)
  strokeWeight(0)
  fill('black')
  rect(0, 0, 18, 18, 2)
  image(TCCALENDAR, 0, 0, 18, 18)
  fill('black')
  textStyle(BOLD)
  text('Calendar', 38, 0)
  pop()

  push()
  //splits window into 'calendar-type' squares (7 across and 6 down)
  translate(0, -200)
  fill('black')
  strokeWeight(2)
  translate(0, 15)
  for (let x = 0; x < 6; x++) {
    translate(0, 62.5)
    line(294, 0, -294, 0)
  }
  translate(-295, -155)
  for (let y = 0; y < 6; y++) {
    translate(84.29, 0)
    line(0, 212, 0, -157)
  }
  pop()

  push()
  let days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  textStyle(ITALIC)
  textSize(12)
  fill('LightSlateGrey')
  translate(-287, -112)
  for (let d = 0; d < 7; d++) {
    text(days[d], 0, 0)
    translate(84.29, 0)
  }
  pop()

  push()
  //I checked the dates against an actual 2016 calendar to make sure the dates and days matched right
  //The empty spaces at the front of the arrays offset the dates to show overflow from previous months into the standard 7 day week (hard to explain)
  let JAN = ['', '', '', '', '', 1, 2, 3, 4, 5, 6, 7, 8,9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
  let FEB = ['', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
  let MAR = ['', '', 1, 2, 3, 4, 5, 6, 7, 8,9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
  let APR = ['', '', '', '', '', 1, 2, 3, 4, 5, 6, 7, 8,9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
  let MAY = [1, 2, 3, 4, 5, 6, 7, 8,9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
  let JUN = ['', '', '', 1, 2, 3, 4, 5, 6, 7, 8,9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
  let JUL = ['', '', '', '', '', 1, 2, 3, 4, 5, 6, 7, 8,9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
  let AUG = ['', 1, 2, 3, 4, 5, 6, 7, 8,9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
  let SEP = ['', '', '', '', 1, 2, 3, 4, 5, 6, 7, 8,9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
  let OCT = ['', '', '', '', '', '', 1, 2, 3, 4, 5, 6, 7, 8,9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
  let NOV = ['', '', 1, 2, 3, 4, 5, 6, 7, 8,9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
  let DEC = ['', '', '', '', 1, 2, 3, 4, 5, 6, 7, 8,9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]

  textStyle(ITALIC)
  textSize(12)
  textStyle(BOLD)
  fill(168, 33, 33)
  translate(-223, -112)
  for (let nd = 0; nd < 42; nd++) {

    if (selectedmonth == 0) {
      text(JAN[nd], 0, 0)
    } else if (selectedmonth == 1) {
      text(FEB[nd], 0, 0)
    } else if (selectedmonth == 2) {
      text(MAR[nd], 0, 0)
    } else if (selectedmonth == 3) {
      text(APR[nd], 0, 0)
    } else if (selectedmonth == 4) {
      text(MAY[nd], 0, 0)
    } else if (selectedmonth == 5) {
      text(JUN[nd], 0, 0)
    } else if (selectedmonth == 6) {
      text(JUL[nd], 0, 0)
    } else if (selectedmonth == 7) {
      text(AUG[nd], 0, 0)
    } else if (selectedmonth == 8) {
      text(SEP[nd], 0, 0)
    } else if (selectedmonth == 9) {
      text(OCT[nd], 0, 0)
    } else if (selectedmonth == 10) {
      text(NOV[nd], 0, 0)
    } else if (selectedmonth == 11) {
      text(DEC[nd], 0, 0)
    }

    if ((nd+1) % 7 == 0) {
      translate(-(84.29*6), 62.5)
    } else {
      translate(84.29, 0)
    }
  }
  pop()
  
  push()
  //add in significant dates based on selected month
  textWrap(WORD)
  textStyle(ITALIC)
  fill('black')
  textSize(12)
  if (selectedmonth == 0) {
    text("New Year's Day", 170, -90, 50)
    text("Carys' Birthday", 0, 160, 50)
  } else if (selectedmonth == 1) {
    text("Pancake Day", -85, -30, 50)
    text("Valentine's Day", -255, 35, 50)
  } else if (selectedmonth == 2) {
    text("Emily's Birthday!!", -85, 95, 50)
    text("Easter", -255, 160, 50)
  } else if (selectedmonth == 4) {
    text("Job Interview", -255, -30, 50)
  } else if (selectedmonth == 6) {
    text("Summer Holiday Start", -255, 35, 50)
    text("Summer Holiday End", -255, 160, 50)
  } else if (selectedmonth == 9) {
    text("Halloween", -170, 220, 50)
    push()
    //puts selection box over 'current' date
    strokeWeight(3)
    stroke(170, 167, 158)
    fill(0, 0, 0, 0.8)
    rect(-253, 219, 80, 54)
    textStyle(BOLD)
    textSize(90)
    fill(170, 167, 158)
    translate(-255, 220)
    rotate(100)
    text("/", 0, 0)
    pop()
    text("Milo's Halloween Party!!!", 255, 160, 50)
  } else if (selectedmonth == 10) {
    text("Milo's Birthday", 85, 35, 50)
  } else if (selectedmonth == 11) {
    text("Boxing Day", -170, 160, 50)
    text("Christmas", -255, 160, 50)
    text("Christmas Eve", 255, 100, 50)
  }
  pop()

  push()
  //details at top, change based on selected month to reflect i.e. JANUARY, FEBRUARY etc...
  fill('black')
  textSize(60)
  textStyle(BOLD)
  text(months[selectedmonth], 0, -190)
  textSize(30)
  textStyle(NORMAL)
  text('-- 2016 --', 0, -152)
  translate(0, -175)
  textStyle(BOLD)
  textSize(40)
  text("<", -250, 0)
  text(">", 250, 0)
  pop()

}

function MessageConversation() {
  //loads and organises text message info from csv file into 3D array for later access
  MESSAGES = []
  CHATINDEX = []

  let tableRows = TEXTTABLE.getRows();
  for (let row of tableRows) {
    let ChatNum = row.getString('Chat');
    let ContactName = row.getString('Name');
    let MessageText = row.getString('Message');

    //All message info from csv
    MESSAGES.push([ChatNum, ContactName, MessageText])
    //indexes for each row in csv file, indicating which thread each message is from (used later)
    CHATINDEX.push(ChatNum)
  }
}

function Messages() {
  //Details in top bar of fake window
  push()
  translate(-286, -238)
  strokeWeight(0)
  fill('black')
  rect(0, 0, 18, 18, 2)
  image(TCMESSAGES, 0, 0, 18, 18)
  fill('black')
  textStyle(BOLD)
  text('Messages', 39, 0)
  pop()

  //Creates pale yellow inner part of fake window
  push()
  fill(240, 237, 228)
  //Leaves space for thicker bar at top of window, where details + max/min buttons go
  translate(0, 10)
  rect(0, 0, 590, 475)
  //Creates thin side window containing file explorer details
  fill(220, 217, 208)
  translate(-225, 0)
  rect(0, 0, 140, 475)
  MessageConversation()
  drawMessageBoxes()
  translate(295, -12)
  rect(0, 0, 450, 74)

  push()
  //Changes name and profile pic at top of message box based on open contact/thread
  translate(0, -8)
  fill('black')
  textStyle(BOLD)
  textSize(11)
  textAlign(CENTER, CENTER)
  if (OpenMessage == 1) {
    image(MESSAGEPFP, 0, 0, 50, 50)
    translate(-20, 35)
    text('Carys', 20, 0)
  } else if (OpenMessage == 2) {
    image(MESSAGEPFP, 0, 0, 50, 50)
    translate(-20, 35)
    text('Milo', 20, 0)
  } else if (OpenMessage == 3) {
    image(MESSAGEPFP, 0, 0, 50, 50)
    translate(-20, 35)
    text('Emily', 20, 0)
  } else if (OpenMessage == 4) {
    image(MESSAGEPFP, 0, 0, 50, 50)
    translate(-20, 35)
    text('Boss', 20, 0)
  } else if (OpenMessage == 5) {
    image(MESSAGEPFP, 0, 0, 50, 50)
    translate(-20, 35)
    text('Kirsty', 20, 0)
  } else if (OpenMessage == 6) {
    image(MESSAGEPFP, 0, 0, 50, 50)
    translate(-20, 35)
    text('Chloe', 20, 0)
  } else if (OpenMessage == 7) {
    image(MESSAGEPFP, 0, 0, 50, 50)
    translate(-20, 35)
    text('Jason', 20, 0)
  } else if (OpenMessage == 8) {
    image(MESSAGEPFP, 0, 0, 50, 50)
    translate(-20, 35)
    text('Mum', 20, 0)
  } else if (OpenMessage == 9) {
    image(MESSAGEPFP, 0, 0, 50, 50)
    translate(-20, 35)
    text('Damien', 20, 0)
  }
  pop()

  //decorative icons either side of contact info in main message window when contact opened ('back' and 'more' buttons)
  push()
  textStyle(BOLD)
  fill('black')
  textSize(25)
  translate(-225, 0)
  text('<', 25, 0)
  translate(400, -8)
  text('...', 20, 0)
  pop()

  push()
  //bar at bottom of page, where messages would traditionally be typed and sent, along with icons to 'attach' files and send the message (none functional). Space left underneath where pre-written options for message sending will be added
  fill(180, 177, 168)
  translate(0, 370)
  rect(0, 0, 450, 133)
  fill(200, 197, 188)
  translate(0, -76)
  rect(0, 0, 450, 30)
  fill(240, 237, 228)
  rect(0, 0, 390, 20, 10)
  image(SENDICON, 208, 0, 20, 20)
  image(ATTACHICON, -208, 0, 20, 20)
  pop()

  //style of text boxes where messages would be put, depending on sender ('Kayla' or contact she is talking to)
  push()
  translate(0, -130)
  let MESSAGESREMAINING = 0
  //So each message in a thread is bumped up instead of layering over each other
  let MessageOffset = 0
  for (let senttexts = 0; senttexts < CHATINDEX.length; senttexts++) {
  push()
  textSize(13)
  textStyle(NORMAL)
  textWrap(WORD)
  MESSAGESREMAINING = (CHATINDEX.length) - senttexts - 1
  //Works backwards through message list, creating message boxes and included text from the 4 most recent messages (the most that will fit in the window space)
    if (MESSAGES[MESSAGESREMAINING][0] == OpenMessage) {
      if (MESSAGES[MESSAGESREMAINING][1] == "Kayla") {
        //Kayla's messages on right in light blue box
        fill(176, 211, 246)
        rect(145, 375 - (MessageOffset * 60), 150, 50, 5)
        MessageOffset++
        textAlign(RIGHT, CENTER)
        fill('black')
        text(MESSAGES[MESSAGESREMAINING][2], 145, 435 - (MessageOffset * 60), 145)
      } else {
        //Other messages on left in darker blue 
        fill(15, 124, 232)
        rect(-145, 375 - (MessageOffset * 60), 150, 50, 5)
        MessageOffset++
        textAlign(LEFT, CENTER)
        fill('black')
        text(MESSAGES[MESSAGESREMAINING][2], -145, 435 - (MessageOffset * 60), 145)
      }
    } else {
      MessageOffset = 0
    }
    //only 4 most recent messages
    if (MessageOffset > 3) {
      senttexts = CHATINDEX.length
    }
  pop()
  }
  pop()

}

function Notes() {
  //Details in top bar of fake window
  push()
  translate(-286, -238)
  strokeWeight(0)
  fill('black')
  rect(0, 0, 18, 18, 2)
  image(TCNOTES, 0, 0, 18, 18)
  fill('black')
  textStyle(BOLD)
  text('Notes', 28, 0)
  pop()

  //Creates pale yellow inner part of fake window
  push()
  fill(240, 237, 228)
  //Leaves space for thicker bar at top of window, where details + max/min buttons go
  translate(0, 10)
  rect(0, 0, 590, 475)
  pop()

  push()
  //an array of different sized rectangles representing 'notes' 
  fill(246, 222, 174)
  rect(-240, -172, 100, 100, 0, 0, 10, 0)
  rect(-102.5, -172, 168, 100, 10, 0, 0, 0)
  rect(-190, -68, 200, 100, 0, 0, 0, 10)
  rect(190, 142, 200, 200, 10, 0, 0, 0)
  rect(240, -144, 100, 156, 10, 0, 0, 0)
  rect(240, -12, 100, 100, 0, 10, 0, 0)
  rect(85, -92, 200, 260, 0, 0, 10, 0)
  rect(-240, 23, 96, 75, 10, 0, 0, 0)
  rect(-138, 23, 96, 75, 0, 0, 10, 0)
  rect(-188, 152, 200, 175, 0, 0, 10, 0)
  rect(-52, -40, 65, 155, 0, 10, 0, 0)
  rect(1, 142, 170, 200, 0, 0, 10, 0)
  pop()
}

function drawMessageBoxes() {
  //Lists contacts down left side, with name and profile picture, as well as most recent message
  let ContactNameList = ['Carys', 'Milo', 'Emily', 'Boss', 'Kirsty', 'Chloe', 'Jason', 'Mum', 'Damien']
  translate(0, -188)
  push()
  fill('black')
  textSize(20)
  textStyle(BOLD)
  textAlign(RIGHT, CENTER)
  translate(-58, -42)
  text('...', 12, 0)
  translate(100, 5)
  textSize(10)
  textStyle(NORMAL)
  text('New Message', 25, 0)
  pop()
  for (let x = 0; x < 9; x++) {
    push()
    translate(0, 50*x)
    rect(0, 0, 140, 50)
    translate(-50, 0)
    image(MESSAGEPFP, 0, 0, 30, 30)
    translate(58, -10)
    textWrap(WORD)
    textAlign(LEFT, CENTER)
    fill('black')
    textStyle(BOLD)
    textSize(11)
    text(ContactNameList[x], 12, 0, 100)
    translate(0, 8)
    fill('LightSlateGray')
    textStyle(NORMAL)
    textSize(10)

    let recentmessage = 1
    for (let rm = 0; rm < CHATINDEX.length; rm++) {
      if (CHATINDEX[rm] > recentmessage) {
        RECENTS.push(rm)
      }
      recentmessage = CHATINDEX[rm]
    }
    RECENTS.push(CHATINDEX.length)
    
    textAlign(LEFT, TOP)
    text(MESSAGES[RECENTS[x]-1][2], 12, 12, 100, 25)
    pop()
  }
}

function draw() {
  pcState = 1
  strokeWeight(1)
  background('white');
  translate(windowWidth/2, windowHeight/2)
  //windows XP background image fills HEIGHT of window
  image(BACKGROUNDIMG, 0, 0, 0, windowHeight)
  textFont('Tahoma')
  textAlign(CENTER, CENTER)

  if (pcState != 5) {
    openWindow()
  } 

  if (pcState == 1) {
    Messages()
  } else if (pcState == 2) {
    Calendar()
  } else if (pcState == 3) {
    fileViewer()
  } else if (pcState == 4) {
    Notes()
  } else {
    //Homescreen (state 5 / default) top corner shows icons of different available apps
    push()
    resetMatrix()
    translate(5, 5)
    fill(240, 237, 228)
    rect(20, 85, 38, 165, 5)
    image(CALENDARAPP, 20, 25, 40, 40)
    image(NOTESAPP, 20, 65, 40, 40)
    image(MESSAGESAPP, 20, 105, 40, 40)
    image(FILEAPP, 20, 145, 40, 40)
    pop()
  }


  push()
  resetMatrix()
  fill('black')
  strokeWeight(2)
  //Calculates new mouse coordinates based on center of screen instead of default top left corner, thus allowing coordinates to remain same regardless of window resizing - crucial when calculating mouse click position across different window sizes
  NewmouseX = mouseX - (windowWidth/2 - 300)
  NewmouseY = mouseY - (windowHeight/2 - 250)
  text(NewmouseX, mouseX+50, mouseY)
  text(NewmouseY, mouseX+50, mouseY + 10)
  text(mouseX, mouseX+100, mouseY)
  text(mouseY, mouseX+100, mouseY + 10)
  pop()

}
