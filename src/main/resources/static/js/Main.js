let game;
let customBounds;
let startTime;
let zhalan;
let zhalan_quarantine;
let virus_live;
let skills;
let inputText;
let backSpace;
let muti_virus;
let tempInfecting=0;
let quarantineBoolean=false;
let enterListener;
let wordMap=new Map();//wordMap is used for storing hyphenation words.
let wordSize=0;
let virusCreateNumber=0;// For calculating how many virus was created.
let mapEntries;
let level=3; //the level of the game;
let information;
let bloods ;
let stormWorld;
let passTime=0; //The time about player win or lose the game;
let overStateName;
let winOrLose='lose';
let arrStromCollideVirus={};
let arrIndex=0;
let bgmMain;
let bgmBoolean=true;
let score=0;// 10 points will gain by killing a virus.
let scoreText;

let infecting=0; // The index of infecting, it is zero at beginning.
let icu_number=1;//icu numbers;
let money=500;
let moneyText;
let healthyPeople=100; //The number of healthy people
let infectedPeople=0;
let infectedPeopleText;
let healthyPeopleText;
 window.onload = function() {
	 game = new Phaser.Game(1830, 1065, Phaser.AUTO);
	 game.States = {};
	game.States.boot=function(){
		this.preload=function(){

		}
		this.create = function() {
			game.state.start('preload');
		};
	};
	/**
	 *All the source for building the game will be preloaded into cache at this state.
	 *
	 * @author Qiu Mengke
	 */
	game.States.preload=function(){
		this.preload=function(){
			var data = JSON.parse(listInJson);
			//console.log(data);
			for(var key in data){
				//console.log('zz')
				wordMap.set(key,data[key]);
			}
			wordSize=wordMap.size;
			mapEntries=wordMap.entries();
			level=3;
			game.load.image('skillCDMask','assets/mask.png');															//Src:made by myself
			game.load.image('zhalan','assets/zhalan02.png');															//Src: http://www.aigei.com/s?q=%E6%A0%85%E6%A0%8F&type=game; http://www.aigei.com/view/70449.html#items
			game.load.image('zhalan_quarantine','assets/zhalan_q.png');													//Src:http://www.aigei.com/view/70449.html#items; http://www.aigei.com/s?q=%E6%A0%85%E6%A0%8F&type=game;
			game.load.image('background', 'assets/bg.png');																//Src:http://www.aigei.com/s?q=%E8%8D%89%E5%9C%B0&type=game
			game.load.image('pause','assets/pause.png');																//Src:http://www.aigei.com/s?q=%E7%BB%A7%E7%BB%AD%E6%8C%89%E9%92%AE&type=game&page=3
			game.load.image('continue','assets/continue.png');															//Src:http://www.aigei.com/s?q=%E7%BB%A7%E7%BB%AD%E6%8C%89%E9%92%AE&type=game&page=5
			game.load.image('music','assets/music.png');																//Src:http://www.aigei.com/s?q=%E7%BB%A7%E7%BB%AD%E6%8C%89%E9%92%AE&type=game&page=5
			game.load.audio('closeTheDoor', ['assets/audio/closeTheDoor.mp3']);											//Src:http://www.aigei.com/s?q=%E5%85%B3%E9%97%A8%E5%A3%B0&type=sound
			game.load.audio('errorAudio', ['assets/audio/errorAudio.mp3']);												//Src:http://www.aigei.com/s?q=%E9%94%99%E8%AF%AF&type=sound&detailTab=file
			game.load.audio('stormAudio', ['assets/audio/stormAudio.mp3']);												//Src:http://www.aigei.com/s?q=%E9%BE%99%E5%8D%B7%E9%A3%8E&type=sound&detailTab=file
			game.load.audio('bgm',['assets/audio/bgm.mp3']);															//Src:http://www.aigei.com/s?q=%E9%B8%9F%E5%8F%AB%E5%A3%B0&type=sound&detailTab=file
			game.load.audio('coinAudio',['assets/audio/coinAudio.mp3']);												//Src:http://www.aigei.com/s?q=%E9%87%91%E5%B8%81&type=sound&detailTab=file
			game.load.audio('enterAudio',['assets/audio/EnterAudio.mp3']);												//Src:http://www.aigei.com/s?q=%E6%8C%89%E9%94%AE-%E5%99%94%E7%9A%84%E4%B8%80%E5%A3%B0&type=sound
			game.load.audio('killAudio',['assets/audio/killAudio.mp3']);												//Src:http://www.aigei.com/s?q=%E5%AD%A4%E5%8D%95%E6%8A%A2%E6%89%8B2%E9%9F%B3%E6%95%88-kamik%2B%E6%AD%BB%E4%BA%A1&type=sound&detailTab=file
			game.load.audio('deleteAudio',['assets/audio/deleteAudio.mp3']);											//Src:http://www.aigei.com/s?q=Aliens%2Bvs.%2BPredator-%E5%8D%95%E5%87%BB%E9%94%AE%E7%9B%98&type=sound&detailTab=file
			game.load.audio('typeAudio',['assets/audio/typeAudio.mp3']);												//Src:http://www.aigei.com/s?q=Aliens%2Bvs.%2BPredator-%E5%8D%95%E5%87%BB%E9%94%AE%E7%9B%98&type=sound&detailTab=file
			game.load.image('virus_blank','assets/virus_blank1.png');													//Src:http://www.aigei.com/s?q=%E9%BE%99%E6%97%8F%E9%AA%91%E5%A3%AB%E5%9B%A2%E7%B4%A0%E6%9D%90%E6%89%93%E5%8C%85-%E6%96%87%E6%9C%AC%E6%A1%86%E4%B8%AD%E5%8D%A0%E6%8D%AE%E6%8E%92%E5%90%8D%E5%A5%96%E5%8A%B1&type=game
			game.load.image('information','assets/information02.png');													//Src:http://www.aigei.com/s?q=%E4%BF%A1%E6%81%AF%E6%A0%8F&type=game&page=4
			game.load.spritesheet('blood','assets/blood.png',54,76,6);		//Src:Src:http://www.aigei.com/s?q=%E7%97%85%E6%AF%92&type=game
			game.load.image('icu','assets/icu.png');																	//Src:https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4257454116,1310488213&fm=26&gp=0.jpg
			game.load.image('input','assets/keyboard_input.png');														//Src:http://www.aigei.com/s?q=%E4%B8%AD%E5%8D%8E%E5%A4%A7%E4%BB%99-%E5%9C%B0%E5%9B%BE-%E7%8C%B4%E7%8E%8B-%E6%96%87%E6%9C%AC%E6%A1%86&type=2d
			game.load.image('scoreBlank','assets/scoreBlank.png');														//Src:http://www.aigei.com/s?q=%E9%9D%92%E8%9B%99%E8%B7%B3%E8%B7%83+%E5%88%86%E6%95%B0&type=2d
			game.load.spritesheet('storm','assets/storm.png',60,70,3);		//Src:http://www.aigei.com/s?q=%E9%BE%99%E5%8D%B7%E9%A3%8E&type=2d&page=2
			game.load.spritesheet('virus_live','assets/virus_live.png',65,73,5);//Src:http://www.aigei.com/s?q=%E7%97%85%E6%AF%92&type=game
			game.load.spritesheet('virus_live_red','assets/virus_live_red.png',65,73,5);//Src:http://www.aigei.com/s?q=%E7%97%85%E6%AF%92&type=game
			game.load.spritesheet('virus_live_blue','assets/virus_live_blue.png',65,73,5);//Src:http://www.aigei.com/s?q=%E7%97%85%E6%AF%92&type=game
			game.load.spritesheet('skills','assets/skills.png',80,79,4);	//Src:https://www.dynamicx.co.nz/imagedetails/103971428/IST_19205_394306-Isignstock-Contributors-fan-icon-vector-design.html;
																															//https://icon-icons.com/icon/quarantine-social-distancing-coronavirus-covid-wfh/141616;
																															//http://www.51yuansu.com/sc/vqrhnyzmlw.html
			game.load.spritesheet('addIcon','assets/addIcon.png',36,37,1);	//Src:http://www.aigei.com/s?q=%E5%8A%A0%E5%8F%B7&type=game
			game.load.image('introBg','assets/introBg.png');															//Src:http://www.aigei.com/s?q=%E5%BD%A9%E8%99%B9%E5%B2%9B&type=game
			game.load.image('skillsIntro','assets/skillsIntro.png');													//Src:https://www.dynamicx.co.nz/imagedetails/103971428/IST_19205_394306-Isignstock-Contributors-fan-icon-vector-design.html;
			game.load.image('inputIntro','assets/keyboard_inputIntro.png');												//Src:http://www.aigei.com/s?q=%E4%B8%AD%E5%8D%8E%E5%A4%A7%E4%BB%99-%E5%9C%B0%E5%9B%BE-%E7%8C%B4%E7%8E%8B-%E6%96%87%E6%9C%AC%E6%A1%86&type=2d
			game.load.image('zhalanIntro','assets/zhalanIntro.png');													//Src: http://www.aigei.com/s?q=%E6%A0%85%E6%A0%8F&type=game; http://www.aigei.com/view/70449.html#items
			game.load.image('healthyIntro','assets/healthyIntro.png');													//Src:https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQSx_YnXuUyLWQklu3R8EnnOlIGs6keQk1xbx5CZeG6C4Bm59yz&usqp=CAU
			game.load.image('infectedIntro','assets/InfectedIntro.png');												//Src:https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ8aqFKFpSGxWsVRWBIp20Iwu8IGOZsuKKZiNkF7pYGrVxMrGbA&usqp=CAU
			game.load.image('nextBtn','assets/nextBtn.png');															//Src:http://www.aigei.com/s?q=next&type=2d&page=3
			game.load.audio('clickAudio', ['assets/audio/clickAudio.mp3']);												//Src:http://www.aigei.com/s?q=%E5%86%92%E9%99%A9%E5%B2%9B-Bt%2B%E9%BC%A0%E6%A0%87&type=sound
			game.load.audio('clickAudio02', ['assets/audio/clickBtn01.mp3']);											//Src:http://www.aigei.com/s?q=%E5%86%92%E9%99%A9%E5%B2%9B-Bt%2B%E9%BC%A0%E6%A0%87&type=sound
			game.load.audio('keyboardClick', ['assets/audio/keyBoardClick.mp3']);										//Src: made by myself
			game.load.audio('storyLineMusic',['assets/audio/storyLineBgm.mp3']);										//Src:http://www.aigei.com/s?q=%E5%B0%91%E5%A5%B3%E5%BF%83&type=music
		};
		this.create=function(){
			game.state.start('storyLine');
		};
	};


	 /**
	  *  A brief introduction about the background story of this game will be presented in this state.
	  *
	  * @author Qiu Mengke
	  */
	 game.States.storyLine=function(){
		 this.create=function(){
			 this.bg=game.add.image(0,0,'introBg');
			 storyLineText = game.add.text(410, 300, '', { font: "35px Arial", fill: "#000000" });
			 nextLine();
			 var bgm=game.sound.play('storyLineMusic');
			 game.add.button(1700, 1000, 'nextBtn', function () {
				 bgm.stop();
				 game.sound.play('clickAudio02');
				 //game.sound.play('clickAudio');
				 game.state.start('intro');
			 }, this, 2, 1, 0);

		 }
	 }
	 /*
	 The introduction state for introducing how to play the game.
	  */
	 game.States.intro=function(){
		 this.create = function() {
			 this.bg=game.add.image(0,0,'introBg');
			 //
			 var virusIntro=game.add.sprite(100, 100, 'virus_live', 3);
			 game.physics.enable(virusIntro, Phaser.Physics.ARCADE);
			 virusIntro.animations.add('walk');
			 virusIntro.animations.play('walk', 5, true);
			 var style = { font: "30px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: 600, align: "center" };
			 game.add.text(200, 100, 'The virus with less than 3 syllables.', style)

			 //
			 var virusIntro_Blue=game.add.sprite(100, 300, 'virus_live_blue', 3);
			 game.physics.enable(virusIntro_Blue, Phaser.Physics.ARCADE);
			 virusIntro_Blue.animations.add('walk');
			 virusIntro_Blue.animations.play('walk', 5, true);
			 game.add.text(200, 300, 'The virus with 3 syllables.', style);

			 //
			 var virusIntro_Red=game.add.sprite(100, 500, 'virus_live_red', 3);
			 game.physics.enable(virusIntro_Red, Phaser.Physics.ARCADE);
			 virusIntro_Red.animations.add('walk');
			 virusIntro_Red.animations.play('walk', 5, true);
			 game.add.text(200, 500, 'The virus with more than 3 syllables.', style);

			 //
			 var skillImage=game.add.image(30,700,'skillsIntro');
			 game.add.text(250, 700, 'There are four skills which you can use for killing virus. Please bear in mind that you need to spend your money to use skills', style);

			 //
			 game.add.image(100,900,'healthyIntro');
			 game.add.text(200, 900, 'The icon stand for the number of healthy people in your community, once it decreases to zero, you will lose the game.', style);

			 //
			 game.add.image(900,100,'inputIntro');
			 game.add.text(1100, 100, 'The virus will be killed once the right hyphenated word is input,for instance, virus with the word "rejoice" should be input as "re-joice". A tips will help when you input wrongly more than three times', style);

			 //
			 game.add.image(900,350,'zhalanIntro');
			 game.add.text(1100, 400, 'Try your best to protect your community. Once the virus enter the community, they will start to infect the people inside.', style);

			 //
			 game.add.image(950,650,'icu');
			 game.add.text(1100, 650, 'The icu stand for the medical level of your community, the more icu capacity you have, they more people you can save once the virus broke out inside.', style);

			 //
			 game.add.image(950,900,'infectedIntro');
			 game.add.text(1100, 920, 'The icon stand for the number of infected people in your community', style);

			 //
			 game.add.button(1700, 1000, 'nextBtn', function () {
				 game.sound.play('clickAudio02');
				 //game.sound.play('clickAudio');
				 game.state.start('main');
			 }, this, 2, 1, 0);

		 };
	 };

	 /**
	  * The game 'Protect my community'.
	  * @author Qiu Mengke
	  */
	game.States.main=function(){
		this.create=function(){
			startTime=game.time.totalElapsedSeconds().toFixed(0);
			bgmMain=game.sound.play('bgm');

			game.physics.startSystem(Phaser.Physics.ARCADE) //open physics engine
			this.bg=game.add.image(0,0,'background'); //background

			//blood
			bloods = game.add.group();

			//information blank
			information=game.add.sprite(1300,0,'information');
			game.physics.enable(information, Phaser.Physics.ARCADE);
			information.body.immovable=true;

			//'score' module;
			this.scoreBlank=game.add.image(1360,120,'scoreBlank');
			var scoreStyle = { font: "35px Arial", fill: "#f5f1f1", wordWrap: true, wordWrapWidth: 400, align: "center" };
			scoreText=game.add.text(1480,120,': '+score,scoreStyle);


			//'ICU' module
			this.icu=game.add.image(1360,400,'icu'); // add the 'icu' icon
			var style = { font: "30px Arial", fill: "#FFFF37", wordWrap: true, wordWrapWidth: 400, align: "center" };
			let icuNumberText=game.add.text(1450, 420, 'ICU Capacity:'+icu_number, style)
			this.icugroup=game.add.group();
			var icuAdd=this.icugroup.create(0,0,'addIcon');
			icuAdd.x=1670;
			icuAdd.y=420;
			icuAdd.frame=0;
			icuAdd.inputEnabled=true;
			this.icugroup.getChildAt(0).events.onInputDown.add(function() {// skill "icu add"
				if(!spendMoney(2000)){
					return;
				}
				icu_number++;
				icuNumberText.setText('ICU Capacity:'+icu_number);

				//console.log('icuadd');
			});



			//'Money' module
			let moneyStyle = { font: "30px Arial", fill: "#FFFF37", wordWrap: true, wordWrapWidth: 400, align: "center" };
			moneyText=game.add.text(1440, 740, 'Finance:'+money, moneyStyle)

			//Infected people display module.
			let infectedPeopleStyle={ font: "33px Arial", fill: "#ea0000", wordWrap: true, wordWrapWidth: 400, align: "center" };
			infectedPeopleText=game.add.text(1445, 854, 'Infected:'+infectedPeople, infectedPeopleStyle);

			//Healthy people module
			let healthyPeopleStyle={ font: "33px Arial", fill: "#34ac12", wordWrap: true, wordWrapWidth: 400, align: "center" };
			healthyPeopleText=game.add.text(1440, 970, 'Healthy:'+healthyPeople, healthyPeopleStyle);


			//hyphenation word input area
			this.text_area=game.add.image(1360,600,'input')//add input text;

			muti_virus=game.add.group();//virus group
			muti_virus.enableBody=true;



			// text
			var style = { font: "20px Arial", fill: "#977C00", align: "center" };
			 inputText = game.add.text(1385,610, "Type word at here..", style);

			 //backspace listener
			backSpace = game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
			backSpace.onDown.add(deleteOneChar,this);

			enterListener = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
			enterListener.onDown.add(checkHyphenation,this);

			game.input.keyboard.addCallbacks(this, null, null, keyPress); //listen the input char

			//skills=game.add.image(1380,200,'skills');//Four skills icon.
			//skill
			this.skills=game.add.group();
			for(var i =0;i<4;i++){
				var skillIcon=this.skills.create(0,0,'skills');
				skillIcon.x=1380+i * skillIcon.width;
				skillIcon.y=230;
				skillIcon.frame=i;
				skillIcon.inputEnabled=true;
			}

			this.storm = this.add.group();
			game.physics.enable(this.storm, Phaser.Physics.ARCADE);
			this.storm.enableBody = true;

			this.skills.getChildAt(0).events.onInputDown.add(function(){// skill "ventilation"
				console.log("testing0");
				if(!spendMoney(300)){
					return;
				}

				if (this.storm.length>0) {
					for (var i = 0; i < this.storm.length; i++) {
						if (this.storm.getChildAt(i).x>this.game.world.width) {
							this.storm.getChildAt(i).destroy();
						}
					}
				}
                game.sound.play('stormAudio');
				for (var i = 0; i < muti_virus.children.length; i++) {
					var storm_ = this.storm.create(0,0,'storm');
					storm_.scale.set(2.5);
					storm_.x = 500;
					storm_.y = 450;
					storm_.animations.add('storm',[0,1,2],5,true);
					storm_.animations.play('storm');
					game.physics.arcade.moveToXY(storm_,muti_virus.children[i].x,muti_virus.children[i].y-100,150);
				}
				skillCoolDown(this.skills.getChildAt(0),8000);
			}, this);
			stormWorld=this.storm;


			this.skills.getChildAt(1).events.onInputDown.add(function(){// Skill "wearing a mask"
				console.log("this is mask");
				if(!spendMoney(400)){
					return;
				}
				if(infecting<2){
					infecting=0;
				}else{
					infecting-=2;
				}
				skillCoolDown(this.skills.getChildAt(1),8000);
			}, this);

			this.skills.getChildAt(2).events.onInputDown.add(function(){//Skill "wash you hand"
				console.log("testing3");
				skillCoolDown(this.skills.getChildAt(2),8000);
			}, this);

			/*
			Skill "quarantine"
			 */
			this.skills.getChildAt(3).events.onInputDown.add(function(){
				if(!spendMoney(600)){
					return;
				}
				game.sound.play('closeTheDoor');
				//Add skill's animation
				zhalan_quarantine=game.add.image(470,400,'zhalan_quarantine');
				/*
				Ensure the virus and its text blank on the top.
				 */
				for(var i=muti_virus.children.length-1; i>=0; i--){
					var virusTop=muti_virus.children[i];
					virusTop.wordBlank.bringToTop();
					virusTop.bringToTop();
					virusTop.wordText.bringToTop();
				}
				quarantineBoolean=true;
				tempInfecting=infecting;
				game.time.events.add(5000,doQuarantine,null);
				//After using each skill, there are 8 seconds for "cooling down".
				skillCoolDown(this.skills.getChildAt(3),8000);
			}, this);

			zhalan=game.add.sprite(470,400,'zhalan',2);
			game.physics.enable(zhalan, Phaser.Physics.ARCADE);
			zhalan.body.immovable=true;
			game.physics.enable(muti_virus, Phaser.Physics.ARCADE);
			/*
			The number of healthy people and the number of infected people will be updated at here based on infectedIndex and ICU capacity.
			 */
			let timer = game.time.create(false);
			timer.loop(2000,updateHealthyAndInfectedNumber, this);
			timer.start();
			/*
			 Add a pause button to pause the game
			 */
			var pauseBtn = game.add.button(1627, 50, 'pause', function () {
				game.paused=true;
			}, this, 2, 1, 0);

			game.input.onDown.add(unpause, self);

			var continueBtn = game.add.button(1672, 50, 'continue', function () {
			}, this, 2, 1, 0);

			var musicBtn = game.add.button(1717, 50, 'music', function () {
				if(bgmBoolean){
					console.log("aaa");
					bgmMain.pause();
					bgmBoolean=false;
				}else{
					bgmMain.resume();
					bgmBoolean=true;
				}
			}, this, 2, 1, 0);

			//bgmMain.loopFull(0.8);
		};
		this.render=function(){
			//game.debug.spriteBounds(zhalan);
		}

		this.update=function(){
			console.log("infecting:"+infecting+"::: icu:"+icu_number);
			if(quarantineBoolean){
				infecting=0;
			}

			//Auto generate virus if the number of the virus do not reach the max;
			if(muti_virus.children.length<level) {
				autoGenerate();
			}

			for(var i=0; i<muti_virus.children.length; i++){
				var temp_virus=muti_virus.children[i];
				if(!temp_virus.alive){
					if(infecting>0 && temp_virus.collideWithZhalan){
						infecting--;
					}
					addScore(temp_virus.score);
					temp_virus.destroy();
					wordNumberDecrease();
					continue;
				}
				//Once the virus collide with 'community', the function will be used.
				game.physics.arcade.collide(zhalan,temp_virus,function(){
					temp_virus.body.velocity=0;
					temp_virus.collideWithZhalan=true;
					infecting++;
				})

				//Make sure the text always above the virus.
				var tempText=temp_virus.wordText;
				tempText.x=Math.floor(temp_virus.x + temp_virus.width / 2);
				tempText.y = Math.floor(temp_virus.y + temp_virus.height / 2-50);

				//Make sure the word blank always above the virus.
				var wordBlank=temp_virus.wordBlank;
				wordBlank.x=Math.floor(temp_virus.x + temp_virus.width / 2-150);
				wordBlank.y=Math.floor(temp_virus.y + temp_virus.height / 2-75);
				for(let i=0 ; i<stormWorld.children.length; i++) {
					 var storm1=stormWorld.children[i];
					if(checkOverlap(storm1,temp_virus)){
						storm1.destroy();
						temp_virus.wordText.destroy();
						temp_virus.wordBlank.destroy();
						temp_virus.kill();
						killVirusBlood(temp_virus);
					}
				}
			}

		};
	};

	/*
	This state will be showed after players win the game.
	 */
	game.States.overWin=function(){
		this.preload=function(){
			game.load.image('overBg','assets/overbg.png');
			game.load.image('clouds','assets/clouds.png');
			if(winOrLose=='win') {
				game.load.image('WinLoseIcon', 'assets/youWin.png');
			}else if(winOrLose=='lose'){
				game.load.image('WinLoseIcon', 'assets/youLose.png');
			}
			game.load.audio('winMusic',['assets/audio/winMusic.mp3']);
			game.load.audio('loseMusic',['assets/audio/loseMusic.mp3']);
			game.load.image('underline','assets/underline.png');
			game.load.image('tryAgainBtn','assets/tryAgainBtn.png');
			game.load.image('mainPageBtn','assets/mainPageBtn.png');
		}

		this.create=function () {
			if(winOrLose=='win') {
				game.sound.play('winMusic');
			}else if(winOrLose=='lose'){
				game.sound.play('loseMusic');
			}
			game.stage.backgroundColor='#374649';
			game.add.image(0,0,'clouds');
			game.add.image(0,265,'overBg');
			game.add.image(750,300,'WinLoseIcon');
			game.add.image(730,650,'underline');
			passTime=game.time.totalElapsedSeconds().toFixed(0)-startTime;
			var overTextStyle = { font: "45px Arial", fill: "#eaeae3", wordWrap: true, wordWrapWidth: 800, align: "center" };
			game.add.text(550, 400, ' You spend '+calculateTime(passTime)+' to pass the game!', overTextStyle);
			// let moneyStyle = { font: "30px Arial", fill: "#FFFF37", wordWrap: true, wordWrapWidth: 400, align: "center" };
			// moneyText=game.add.text(1440, 740, 'Finance:'+money, moneyStyle)
			game.add.text(570, 530, 'Leave your name to attend ranking!', overTextStyle);

			var tryAgainBtn = game.add.button(734, 670, 'tryAgainBtn', function () {
				document.getElementById('playerName').value=overStateName.text;
				document.getElementById('playerScore').value=score+'';
				document.getElementById('winOrLose').value="win";
				document.getElementById('next').value='tryAgain';
				//passTime=game.time.totalElapsedSeconds().toFixed(0);
				document.getElementById('passTime').value=passTime;
				document.getElementById('passTimeString').value=calculateTime(passTime);
				var form=document.getElementById('formData');
				form.submit();
			}, this, 2, 1, 0);

			var mainPageBtn=game.add.button(960, 670, 'mainPageBtn', function () {
				document.getElementById('playerName').value=overStateName.text;
				document.getElementById('playerScore').value=score+'';
				document.getElementById('winOrLose').value="win";
				document.getElementById('next').value='mainPage';
				//passTime=game.time.totalElapsedSeconds().toFixed(0);
				document.getElementById('passTime').value=passTime;
				document.getElementById('passTimeString').value=calculateTime(passTime);
				var form=document.getElementById('formData');
				form.submit();
			}, this, 2, 1, 0);


			var overStateNameStyle={ font: "35px Arial", fill: "#050502", wordWrap: true, wordWrapWidth: 800, align: "center" };
			overStateName=game.add.text(734, 605, 'Please type your name..', overStateNameStyle);
			//backspace listener
			backSpace = game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
			backSpace.onDown.add(deleteOneCharInOverState,this);
			game.input.keyboard.addCallbacks(this, null, null, keyPressInOverState);
		}
	};
	game.state.add('boot', game.States.boot);
	game.state.add('preload', game.States.preload);
	game.state.add('storyLine',game.States.storyLine);
	game.state.add('intro',game.States.intro);
	game.state.add('main', game.States.main);
	game.state.add('overwin',game.States.overWin);
	game.state.start('boot');

 };
/**
 *  The function will be used for listening player's words input, the input blank will be cleaned at first char input.
 *
 * @param char:player's input char.
 * @type {boolean}
 * @author Qiu Mengke
 */
var firstType=true;
 function keyPress(char){
 	if(firstType){
		game.sound.play('typeAudio');
 		inputText.setText(char);
		game.sound.play('typeAudio');
		firstType=false;
		return;
	}
 	/*
		An 'error' string will be presented at input blank once a wrong hyphenated word is input by player,
  		therefore the input blank will be reset in next char input
 	 */
 	if(inputText.text=='error'){
 		inputText.setText(char);
		game.sound.play('typeAudio');
 		return;
	}
	 game.sound.play('typeAudio');
 	inputText.setText(inputText.text+char);
 }

/**
 * Listening the name input in over state, the functionality is similar to the function above.
 *
 *  @type {boolean}
 * @author Qiu Mengke
 */
var firstChar=true;
 function keyPressInOverState(char){
 	if(firstChar){
 		overStateName.setText('');
 		firstChar=false;
	}
 	overStateName.setText(overStateName.text+char);
 }

/**
 * This function is used to check whether the input word is match the virus's hyphenated word or not,
 * the player's input will be compared to each virus's word in the map currently, if the input match one of
 * virus's word, this virus will be killed, else if the input match the virus's original word but does not match
 * the hyphenated word, the 'errotTimes' parameter in virus will increment 1. Once the virus's 'errorTimes', the correct
 * hyphenated word will be presented. As a result, the player will gain no money and scores for killing this kind of virus.
 *
 * @author Qiu Mengke
 */
function checkHyphenation(){
	game.sound.play('enterAudio');
	var tempText=inputText.text; //Get the input text
	//Iterate all virus on the battlefield.
 for(var i=0; i<muti_virus.children.length; i++){
 	var tempVirus=muti_virus.children[i];
 	/*
 		If player incorrectly input words greater than 3 times,
 		the hyphenated word will be presented as a tips for players.
 		As a result, the player will not gain any money after watching the answer.
 	 */
 		if(tempText==tempVirus.wordAfter){
 			if(tempVirus.errorTimes<3) {//Check the error times at first.
				money += tempVirus.money;
				moneyText.setText('Finance:'+money);
			}
 			/*
 			Check whether the virus already collide with community,
 			decrease the infected index if true.
 			 */
 			if(infecting>0 &&tempVirus.collideWithZhalan){
 				infecting--;
			}
			//Add score after killing the virus.
			addScore(tempVirus.score);
 			killVirusBlood(tempVirus);
			tempVirus.destroy();
			tempVirus.textBlank.destroy();
			tempVirus.wordBlank.destroy();
			inputText.setText('');
			wordNumberDecrease();
			return;
		}else if(tempText.replace("-","")==tempVirus.wordBefore){
			game.sound.play('errorAudio');
 			tempVirus.errorTimes+=1;
 			//If the error times are greater than three,update the word on virus's head.
 			if(tempVirus.errorTimes>=3){
 				tempVirus.textBlank.setText(tempVirus.wordAfter);
			}
			inputText.setText('error');
 			return;
		}
 	}
	game.sound.play('errorAudio');
}

/**
 * Calculate the playing time for recording.
 *
 * @author Qiu Mengke
 * @param passTime
 * @returns {string}
 */
function calculateTime(passTime){
	var min=Math.floor(passTime/60);
	var seconds=passTime%60;
	return min+' minutes,'+seconds+' seconds';
}

/**
 * Listening the 'Backspace' key. Once the key is pressed, one char will be deleted in input blank.
 *
 * @author Qiu Mengke
 */
 function deleteOneChar(){
 	var temp=new String(inputText.text);
 	temp=temp.substring(0,temp.length-1);
 	inputText.setText(temp.toString());
	 game.sound.play('deleteAudio');
 }

function deleteOneCharInOverState(){
	var temp=new String(overStateName.text);
	temp=temp.substring(0,temp.length-1);
	overStateName.setText(temp.toString());
}

/**
 * The is the core function in this game, virus will be created in this function, different kind of virus will be created
 * according to the number of syllables, a blue eye virus will be created if the number of syllables is three, and a red eye
 * virus will be created if the number of syllables over 3. Moreover, the player will gain more money and score if the number
 * of syllables is more.
 *
 *@author Qiu Mengke
 * @type {boolean}
 */
let timeBoolean=false;
 function autoGenerate() {
 	if(virusCreateNumber==wordMap.size){
 		return;
	}
 	if(muti_virus.children.length<level){
 		var position=returnPosition1();
 		var tempEntry=mapEntries.next(); //get a new word from map
		var tempValue;
		if(tempEntry!=undefined) {
			tempValue = tempEntry.value;
		}else{
			return;
		}
		var wordBefore=tempValue[0];// wordBefore is the word before hyphenation;
		var wordAfter=tempValue[1];// wordAfter is the word after hyphenation;

		/*
		Difference types of virus will be created according the number of syllables.
		The player will gain more money and more score when the virus level become higher.
		The moving speed of the virus will increase either.
		 */
		var syllablesNum=checkVirusLevel(wordAfter);
		var virusTemp;
		if(syllablesNum<3){
			virusTemp=game.add.sprite(position.x, position.y, 'virus_live', 3);
			virusTemp.score=10;
			virusTemp.speednum=10;
		}else if(syllablesNum==3){
			virusTemp=game.add.sprite(position.x, position.y, 'virus_live_blue', 3);
			virusTemp.score=20;
			virusTemp.speednum=30;
		}else{
			virusTemp=game.add.sprite(position.x, position.y, 'virus_live_red', 3);
			virusTemp.score=40;
			virusTemp.speednum=40;
		}
		virusTemp.p=p;
		virusTemp.wordBefore=wordBefore;
		virusTemp.wordAfter=wordAfter;
		virusTemp.errorTimes=0;
		virusTemp.collideWithZhalan=false;
		//virusTemp.score=10;
		virusTemp.money=checkSyllables(virusTemp.wordAfter);
		virusTemp.wordBlank=game.add.image(0,0,'virus_blank');//
		var style = { font: "28px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: virusTemp.width, align: "center" };
		var textAboveVirus=game.add.text(0, 0, virusTemp.wordBefore, style);
		game.physics.enable(textAboveVirus, Phaser.Physics.ARCADE);
		textAboveVirus.anchor.set(0.5);
		virusTemp.textBlank=textAboveVirus;
		game.physics.enable(virusTemp, Phaser.Physics.ARCADE);
		virusTemp.animations.add('walk');
		virusTemp.animations.play('walk', 5, true);
		virusTemp.wordText=textAboveVirus;
		//virus_live.body.velocity.x = 50;
		//game.physics.arcade.moveToObject(virusTemp,zhalan, 50);
		game.physics.arcade.moveToXY(virusTemp,640,500,virusTemp.speednum);
		muti_virus.add(virusTemp);
		timeBoolean=false;
 	}
 	virusCreateNumber++;
 }


function returnPostition() {
	var x=Math.random()*1300;
	var y=Math.random()*1065;
 	while((x>130 && x<1100) && (y>70 && y<930) ){
 		if(x>130 && x<1100)
 			x=Math.random()*1300;
 		if(y>70 && 930>y)
 			y=Math.random()*1065;
	}
	return {y,x};
}

/**
 *  A suitable position axis will be generated automatically and return in this function.
 *  this function will ensure the virus does not overlap each other.
 *  @author Qiu Mengke
 *  @param p1,p2,p3,p4,p: Stand for the different position in the map,
 * @returns {{x: number, y: number}}
 */

var p1=false;
var p2=false;
var p3=false;
var p4=false;
var p;

function returnPosition1(){
	if(!p1){
		p='p1';
		var x=43;
		var y=1029;
		p1=true;
		return {x,y,p};
	}else if(!p2){
		p='p2';
		var x=1181;
		var y=998;
		p2=true;
		return {x,y,p};
	}else if(!p3){
		p='p3';
		var x=1089;
		var y=70;
		p3=true;
		return {x,y,p};
	}else if(!p4){
		p='p4';
		var x=72;
		var y=57;
		p4=true;
		return {x,y,p};
	}
}

function returnPosition(){
	var x=Math.random()*1300;
	var y=Math.random()*1065;
	while(!((x<238 && y>724) || (x>1051 && y>816) || (x<262 && y<257) || (x>980 && y<206))){
		if((x<238 && y>724)){
			if(p1){
				x=Math.random()*1300;
				y=Math.random()*1065;
				console.log(11);
				continue;
			}else{
				p1=true;
				p="p1";
				console.log(11);
				break;
			}

		}else if(x>1051 && y>816){
			if(p2){
				x=Math.random()*1300;
				y=Math.random()*1065;
				console.log(22);
				continue;
			}else{
				//p1=false;
				p2=true;
				p="p2";
				console.log(2);
				//p3=false;
				//p4=false;
				break;
			}

		}else if(x<262 && y<257){
			if(p3){
				x=Math.random()*1300;
				y=Math.random()*1065;
				console.log(33);
				continue;
			}else{
				//p1=false;
				//p2=false;
				console.log(3);
				p3=true;
				p="p3";
				//p4=false;
				break;
			}

		}else if(x>980 && y<206){
			if(p4){
				x=Math.random()*1300;
				y=Math.random()*1065;
				console.log(44);
				continue;
			}else{
				console.log(4);
				p4=true;
				p="p4";
				break;
			}

		}else{
			x=Math.random()*1300;
			y=Math.random()*1065;
		}

	}
	return {x,y};
}

 /**
  *   This function will return a money number by checking the number of syllables of a word, 2 syllables= 300, 3 syllables= 400, greater than 3 = 500
  *   @return the number of syllables will be returned, the result will used while creating virus in function 'autoGenerate'.
  *   @author Qiu Mengke
  */
function checkSyllables(word){
	var arr=word.split("-");
	if(arr.length<=2){
		return 300;
	}else if(arr.length==3){
		return 400;
	}else if(arr.length>3){
		return 500;
	}
}

/**
 * The function will be used when the player use the skill 'storm', if the storm overlap with virus, the virus will be killed
 * @param spriteA
 * @param spriteB
 * @return {boolean}
 */
function checkOverlap(spriteA, spriteB) {
	// Get bounds
	var boundsA = spriteA.getBounds();
	var boundsB = spriteB.getBounds();
	// Check whether two sprites is overlap
	return Phaser.Rectangle.intersects(boundsA, boundsB);
}

/**
 * This function will be used when the skill 'quarantine' is clicked, the infecting index will be set to zero in 30 seconds
 *
 * @author Qiu Mengke
 */
function doQuarantine() {
	//Finish the quarantine time
	quarantineBoolean=false;
	infecting=tempInfecting;
	tempInfecting=0;
	zhalan_quarantine.destroy();
}

/**
 * This function will update the number of healthy people and infected people,what's more, once the healthy people decrease
 * to zero, the 'overstate' will be presented and the player will lose the game.
 *
 * @author: Qiu Mengke
 */
function updateHealthyAndInfectedNumber() { //update the number of healthy and infected people.
	healthyPeople=healthyPeople-infecting+icu_number;
	if(healthyPeople>=100){
		healthyPeople=100;
	}
	if(healthyPeople<=0){
		healthyPeople=0;
	}
	if(healthyPeople==0){
		winOrLose='lose';
		game.state.start('overwin');
		bgmMain.stop();
		return;
	}
	infectedPeople=100-healthyPeople;

	healthyPeopleText.setText('Healthy:'+healthyPeople);
	infectedPeopleText.setText('Infected:'+infectedPeople);
}

/**
 * Once player use skill or add ICU capacity, the function will be first used for checking whether player's money is enough.
 * If the money is not enough for using skill, and tips will be alerted for players.
 * @param fee
 * @return {boolean}
 * @author Qiu Mengke
 */
function spendMoney(fee){
	if(fee>money){
		game.sound.play('errorAudio');
		alert("This skill need "+fee+" coins, your money is not enough.");
		return false;
	}
	game.sound.play('coinAudio');
	money=money-fee;
	moneyText.setText('Finance:'+money);
	console.log('spend money:'+fee);
	return true;
}
/**
 * Update the scores of game.
 * @param scoreNumber
 * @author Qiu Mengke
 */
function addScore(scoreNumber){
	score+=scoreNumber;
	scoreText.setText(': '+score);
}

/**
 * All the words will be loaded in cache at first, the words number will decrease one when an virus is created.
 * If the words number decreases to zero, player will win the game
 *
 * @author Qiu Mengke
 */
//if the wordSize decreases to zero, players win the game.
function wordNumberDecrease(){
	wordSize--;
	if(wordSize==0){
		//Game over!!
		winOrLose='win';
		game.state.start('overwin');
		bgmMain.stop();
	}
}
//Skill cool down.
function skillCoolDown(skillIcon,duration,callback){//技能图标遮罩层
	var maskCD = game.add.image(0,0,'skillCDMask');//Skill CD
	maskCD.alpha = 0.3;
	maskCD.x = skillIcon.x;
	maskCD.y = skillIcon.y;
	skillIcon.inputEnabled = false;
	game.add.tween(maskCD).to( { height: 0 }, duration, "Linear", true).onComplete.add(function(){
		maskCD.destroy();
		skillIcon.inputEnabled = true;
		if (typeof callback!=='undefined') {
			callback();
		}
	});
}

/**
 * The numbers of syllables of one word will be calculate in this function.
 * @param word :The hyphenated word.
 * @returns the number of syllables.
 */
function checkVirusLevel(word){
	var num=word.split('-').length;
	return num;
}

/**
 * Several animation will be loaded after the virus is killed
 *
 * @author Qiu Mengke
 */
function killVirusBlood(temp_virus){
	var blood = bloods.create(temp_virus.x,temp_virus.y,'blood');
	//temp_virus.p=false;
	switch (temp_virus.p){
		case 'p1':
			p1=false
			break;
		case 'p2':
			p2=false;
			break;
		case 'p3':
			p3=false;
			break;
		case 'p4':
			p4=false;
			break;
	}
	game.sound.play('killAudio');
	blood.animations.add('blood');
	blood.animations.play('blood',10).onComplete.add(function(){
		bloods.destroy();
		bloods = game.add.group();
		bloods.enableBody = true;
	},this);
}

/**
 * Uppause the game
 * @param event
 * @author Qiu Mengke
 */
function unpause(event){
	if(game.paused){
		game.paused=false;
		console.log('unpause');
	}
}

/**
 * The words in story line text will be printed one by one through using function nextline() and nextWord();
 *
 * @author Qiu Mengke
 */
var content = [
	"The story happened at a peaceful island which locates at the middle of Pacific." ,
	" in three hundreds years ago, a pandemic virus outbroke in the earth. " ,
	" There is no preventive drug for killing this virus, all we can do is try " ,
	"our best to prevent the situation become worse. One day, with the help of a linguist" ,
	", the way of killing virus by using hyphenation was found out....Let's start the story!\n"
];
var storyLineText;
var line = [];
var wordIndex = 0;
var lineIndex = 0;
var wordDelay = 120;
var lineDelay = 400;
//text emerge one by one
function nextLine() {
	if (lineIndex === content.length) {
		return;
	}
	line = content[lineIndex].split(' ');
	wordIndex = 0;	
	game.time.events.repeat(wordDelay, line.length, nextWord, this);
	lineIndex++;

}

function nextWord() {
	storyLineText.text = storyLineText.text.concat(line[wordIndex] + " ");
	wordIndex++;
	if (wordIndex === line.length) {
		game.sound.play('keyboardClick',0.5);
		storyLineText.text = storyLineText.text.concat("\n");
		game.time.events.add(lineDelay, nextLine, this);
	}
}
