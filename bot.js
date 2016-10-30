// based on this awesome tutorial: https://mvalipour.github.io/node.js/2015/11/10/build-telegram-bot-nodejs-heroku/

var config = require('./config'); // rename config.js.example into config.js and set keys and tokens inside it

var Bot = require('node-telegram-bot-api');
var bot;

if(process.env.NODE_ENV === 'production') {
  bot = new Bot(config.TelegramToken);
  bot.setWebHook(config.TelegramProductionURL + bot.token);
}
else {
  bot = new Bot(config.TelegramToken, { polling: true });
}

//var Bot = require('node-telegram-bot-api'),
//    bot = new Bot(config.TelegramToken, { polling: true });

console.log('secon-bot server started...');

bot.getMe().then(function(me)
{
    console.log('Hello! My name is %s!', me.first_name);
    console.log('My id is %s.', me.id);
    console.log('And my username is @%s.', me.username);
});

var stndrt_opts = {
	disable_web_page_preview: true,
	parse_mode: 'markdown',
	disable_notification: true
};	


bot.on('new_chat_participant', function(msg)
{
	var messageNChatId = msg.chat.id;
    var messageNText = msg.text;
    var messageNDate = msg.date;
    var messageNUsr = msg.from.username;
	var messageNChatType = msg.chat.type;
	var messageNewUserName = msg.new_chat_participant.first_name;
	
	bot.sendMessage(messageNChatId, 'Приветствую, '+messageNewUserName+'.\n*Добро пожаловать челябинскую ячейку Team Mystic!*\n\n*Правила:*\n_ Уважаем других участников, сильно не флудим, вот это всё.\n\n Вместо правил, пожелание — пользуйтесь командами ботов в личку. Удачной игры!_\n\n*Команды бота:*\n\/info — полезные ссылки;\n\/map — карта;\n\/meet — информация о встречах;\n\/download — pokemongGo на APKMirror;\n\/gym — рейтинг покемонов по атаке\/защите в зависимости от набора движений;\n\/tips — подсказки (таблица эффективности по типам, список покемонов падающих из яиц, расшифровка оценки от Blanche.*\n\nСоветуем сразу отключить оповещения:*\nС телефона: _троеточие → mute → disable;_\nС компа: _название чата → notification → off._', stndrt_opts);
	
	//console.log(msg);	
});

bot.on('left_chat_participant', function(msg)
{
	var messageLChatId = msg.chat.id;
    var messageLText = msg.text;
    var messageLDate = msg.date;
    var messageLUsr = msg.from.username;
	var messageLChatType = msg.chat.type;
	//var messageLewUserName = msg.new_chat_participant.first_name;
	
	bot.sendMessage(messageLChatId, 'Плак...');
	bot.sendSticker(messageLChatId, 'BQADAgADIwADR_sJDHnc7lQbIschAg');
	
	//console.log(msg);	
});


bot.on('text', function(msg) {
	var messageChatId = msg.chat.id;
	var messageUserId = msg.from.id;
    var messageText = msg.text;
    var messageDate = msg.date;
    var messageUsr = msg.from.username;
	var messageChatType = msg.chat.type;
	var messageUserFName = msg.from.first_name;
	var messageUserLName = msg.from.last_name;
	var iscommand = msg.entities;
 
	//пишем сообщение в базу
	/*if(iscommand === undefined){
		MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
			if(!err) {
				//console.log('Yay, connected!');
				}
				var collection = db.collection('usersTM');
						collection.count({uid: messageUserId}, function(err, result) {
							if(!err) {
							////console.log(result);	
							//bot.sendMessage (messageChatId,'Countd uid:'+result);	
								if (result===1){
									//bot.sendMessage (messageChatId,'Уже есть '+result);
										//магия
										db.close();
										MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
										if(!err) {
											//console.log('Yay, connected!');
											}
										var collection = db.collection('usersTM');
										//магия
										collection.findOneAndUpdate({uid: messageUserId}, {$set: {username: messageUsr, first_name: messageUserFName, last_name: messageUserLName},$inc: {txts_count_total: 1}});
										//bot.sendMessage (messageChatId,'плюсанули');
											});
								} else if (result===0) {
										//магия
										db.close();
										MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
										if(!err) {
											//console.log('Yay, connected!');
											}
										var collection = db.collection('usersTM');
										//магия
										collection.insert({
											uid: messageUserId,
											username: messageUsr,
											first_name: messageUserFName,
											last_name: messageUserLName,
											txts_count_total: 1,
											stckrs_count_total: 0,
											audios_count_total: 0,
											documents_count_total: 0,
											photos_count_total: 0,
											videos_count_total: 0,
											voices_count_total: 0,
											locations_count_total: 0
										});
									//bot.sendMessage (messageChatId,'Ща запишем!');
										});
								} else {
									//bot.sendMessage (messageChatId,'Говно '+result);
								}		
							}
						});
				db.close();
			});	
	}*/ 
 
    if (messageText === '/gym') {
		var optsON = {
			reply_to_message_id: msg.message_id,
			reply_markup: JSON.stringify({
				keyboard: [
					[{'text':'attack ranking','callback_data':'attackers'},{'text':'defense ranking','callback_data':'defenders'}],
					[{'text':'attackers vs. defenders','callback_data':'vs'}]
				],
			one_time_keyboard: true,
			selective: true,
			disable_notification: true
		})
	};
        bot.sendMessage(messageChatId, 'what do you want?', optsON);
    }
 
      if (messageText === '\/gym@chelMapBot') {
        bot.sendMessage(messageChatId, 'Команда работает только в личку', optsOFF);
    }
 
     if (messageText === '\/tips') {
		var optsON = {
			reply_to_message_id: msg.message_id,
			reply_markup: JSON.stringify({
				keyboard: [
					[{'text':'type chart'}],
					[{'text':'eggs 2 km'},{'text':'eggs 5 km'},{'text':'eggs 10 km'}],
					[{'text':'buddy 1 km'},{'text':'buddy 3 km'},{'text':'buddy 5 km'}],
					[{'text':'Blanche appraisal'}]
				],
			one_time_keyboard: true,
			selective: true,
			disable_notification: true
		})
	};
        bot.sendMessage(messageChatId, 'what do you want?', optsON);
    }
	
	    if (messageText === '\/tips@chelMapBot') {
        bot.sendMessage(messageChatId, 'Команда работает только в личку', optsOFF);
    }
 
     if (messageText === 'type chart') {
		var optsOFF = {
			reply_to_message_id: msg.message_id,
			reply_markup: JSON.stringify({
			hide_keyboard: true,
			disable_notification: true
			})
		};
        bot.sendPhoto(messageChatId, 'http://i.imgur.com/DLmswWH.png', optsOFF);
    }
	
	    if (messageText === 'eggs 2 km') {
		var optsOFF = {
			reply_to_message_id: msg.message_id,
			reply_markup: JSON.stringify({
			hide_keyboard: true,
			disable_notification: true
			})
		};
        bot.sendPhoto(messageChatId, 'http://i.imgur.com/c8By2cU.png', optsOFF);
    }
	
	    if (messageText === 'eggs 5 km') {
		var optsOFF = {
			reply_to_message_id: msg.message_id,
			reply_markup: JSON.stringify({
			hide_keyboard: true,
			disable_notification: true
			})
		};
        bot.sendPhoto(messageChatId, 'http://i.imgur.com/XgGg59O.png', optsOFF);
    }
	
	    if (messageText === 'eggs 10 km') {
		var optsOFF = {
			reply_to_message_id: msg.message_id,
			reply_markup: JSON.stringify({
			hide_keyboard: true,
			disable_notification: true
			})
		};
        bot.sendPhoto(messageChatId, 'http://i.imgur.com/3wLKABh.png', optsOFF);
    }
		    if (messageText === 'buddy 1 km') {
		var optsOFF = {
			reply_to_message_id: msg.message_id,
			reply_markup: JSON.stringify({
			hide_keyboard: true,
			disable_notification: true
			})
		};
        bot.sendPhoto(messageChatId, 'http://i.imgur.com/izAdFlt.png', optsOFF);
    }
	
	    if (messageText === 'buddy 3 km') {
		var optsOFF = {
			reply_to_message_id: msg.message_id,
			reply_markup: JSON.stringify({
			hide_keyboard: true,
			disable_notification: true
			})
		};
        bot.sendPhoto(messageChatId, 'http://i.imgur.com/lovSR5z.png', optsOFF);
    }
	
	    if (messageText === 'buddy 5 km') {
		var optsOFF = {
			reply_to_message_id: msg.message_id,
			reply_markup: JSON.stringify({
			hide_keyboard: true,
			disable_notification: true
			})
		};
        bot.sendPhoto(messageChatId, 'http://i.imgur.com/8WRZMIc.png', optsOFF);
    }
 
     if (messageText === 'Blanche appraisal') {
		var optsOFF = {
			reply_to_message_id: msg.message_id,
			reply_markup: JSON.stringify({
			hide_keyboard: true,
			disable_notification: true
			})
		};
        bot.sendMessage(messageChatId, '*Процентное соотношение IV:*\n\n_Overall, your (Pokemon Name) is a wonder! What a breathtaking Pokemon!_ - *82.2%-100%*\n\n_Overall, your (Pokemon Name) has certainly caught my attention._ - *66.7% - 80.0%*\n\n_Overall, your (Pokemon Name) is above average._ - *51.1% - 64.4%*\n\n_Overall, your (Pokemon Name) is not likely to make much headway in battle._ - *0% - 48.9%*\n\n*Соотношение IV по характеристикам:*\n\n_Its stats exceed my calculations. It\'s incredible!_ - У покемона как минимум одна характеристика *максимальна*.\n\n_I am certainly impressed by its stats, I must say._ - У покемона как минимум одна характеристика *13 или 14*.\n\n_Its stats are noticeably trending to the positive._ - У покемона как минимум одна характеристика от *8 до 12*.\n\n_Its stats are not out of the norm, in my opinion._ - У покемона как минимум одна характеристика от *0 до 7*.', stndrt_opts);
		bot.sendSticker(messageChatId, 'BQADAgADHgADf8fMAc7UX8y-L5XqAg', optsOFF);
    }
 
    if (messageText === 'attack ranking') {
		var optsOFF = {
			reply_to_message_id: msg.message_id,
			reply_markup: JSON.stringify({
			hide_keyboard: true,
			disable_notification: true
			})
		};
        bot.sendPhoto(messageChatId, 'https://i.imgur.com/wwsCp7f.png', optsOFF);
    }
 
    if (messageText === 'defense ranking') {
		var optsOFF = {
			reply_to_message_id: msg.message_id,
			reply_markup: JSON.stringify({
			hide_keyboard: true,
			disable_notification: true
			})
		};
        bot.sendPhoto(messageChatId, 'https://i.imgur.com/g8enekS.jpg', optsOFF);
    }
	
    if (messageText === 'attackers vs. defenders') {
		var optsOFF = {
			reply_to_message_id: msg.message_id,
			reply_markup: JSON.stringify({
			hide_keyboard: true,
			disable_notification: true
			})
		};
        bot.sendPhoto(messageChatId, 'https://www.newmobilelife.com/wp-content/uploads/2016/08/a-picture-can-teach-you-how-to-beat-dragonite_01.jpg', optsOFF);
    }	
	
if (messageText === '\/info@chelMapBot') {
	bot.sendMessage(messageChatId, '*Полезные ссылки: *\n_• гайд по игре _ goo.gl\/KKS4jN\n_• 10 советов для новичков _ goo.gl\/wBAv8O\n_• статус серверов _ goo.gl\/Y4QLen\n_• список серверов _ goo.gl\/xLlCWx\n_• калькулятор XP за эволюции _ goo.gl\/KtVqUP\n_• калькулятор CP после эволюции _ goo.gl\/UUNIux\n\n_ Чтобы не засорять чат однообразными ответами бота на команды, хорошим тоном считается общаться с ботами в личку._', stndrt_opts)}
	
if (messageText === '/admintest') {
	bot.sendMessage(messageChatId, '*Добро пожаловать челябинскую ячейку Team Mystic!*\n\n*Правила:*\n_ Уважаем других участников, сильно не флудим, вот это всё.\n\n Вместо правил, пожелание — пользуйтесь командами ботов в личку. Удачной игры!_\n\n*Команды бота:*\n\/info — полезные ссылки;\n\/map — карта;\n\/meet — информация о встречах;\n\/download — pokemongGo на APKMirror;\n\/gym — рейтинг покемонов по атаке\/защите в зависимости от набора движений;\n\/tips — подсказки (таблица эффективности по типам, список покемонов падающих из яиц, расшифровка оценки от Blanche.*\n\nСоветуем сразу отключить оповещения:*\nС телефона: _троеточие → mute → disable;_\nС компа: _название чата → notification → off._', stndrt_opts)}
  //console.log(msg);

  if (messageText === '\/info') {
	bot.sendMessage(messageChatId, '*Полезные ссылки: *\n_• гайд по игре _ goo.gl\/KKS4jN\n_• 10 советов для новичков _ goo.gl\/wBAv8O\n_• статус серверов _ goo.gl\/Y4QLen\n_• список серверов _ goo.gl\/xLlCWx\n_• калькулятор XP за эволюции _ goo.gl\/KtVqUP\n_• калькулятор CP после эволюции _ goo.gl\/UUNIux\n\n_ А ты молодец ;)_', stndrt_opts)}
  //console.log(msg);
  
  if (messageText === '\/map@chelMapBot') {
		bot.sendMessage(messageChatId, 'goo.gl\/4rBXAo\n_временное решение, может работать нестабильно_', stndrt_opts);
		//bot.sendSticker(messageChatId, 'BQADAgADYgMAAlvD2wGiJJ6VfDl8owI')
		}
  //console.log(msg);

  if (messageText === '\/map') {
		bot.sendMessage(messageChatId, 'goo.gl\/4rBXAo\n_временное решение, может работать нестабильно_', stndrt_opts);
	//bot.sendSticker(messageChatId, 'BQADAgADYgMAAlvD2wGiJJ6VfDl8owI')
	}
  //console.log(msg);*/
  
    if (messageText === '\/download@chelMapBot') {
	bot.sendMessage(messageChatId, '*apkMirror * goo.gl/WgCxJp', stndrt_opts)}
  //console.log(msg);

  if (messageText === '\/download') {
	bot.sendMessage(messageChatId, '*apkMirror * goo.gl/WgCxJp', stndrt_opts)}
  //console.log(msg);
  
    if (messageText === '\/meet@chelMapBot') {if (messageDate < 1474761599) {
	bot.sendMessage(messageChatId, '*Массовый фарм люров x.1*\nСуббота, 24.09, 19:00 на «Торговом центре».\n\n*Массовый фарм люров x.2*\nВторник, 27.09, 19:00 на «Торговом центре».\n\n_Запасайтесь чаем в термосах и тёплой одеждой. Желаем удачного фарма!_', stndrt_opts);bot.sendLocation(messageChatId, 55.1717114,61.3938271, stndrt_opts)} else {bot.sendMessage(messageChatId, '_ничего пока не планируем_', stndrt_opts);/*bot.sendLocation(messageChatId, 55.1717114,61.3938271, stndrt_opts)*/}}
  //console.log(msg);

    if (messageText === '\/meet') {if (messageDate < 1474761599) {
	bot.sendMessage(messageChatId, '*Массовый фарм люров x.1*\nСуббота, 24.09, 19:00 на «Торговом центре».\n\n*Массовый фарм люров x.2*\nВторник, 27.09, 19:00 на «Торговом центре».\n\n_Запасайтесь чаем в термосах и тёплой одеждой. Желаем удачного фарма!_', stndrt_opts);bot.sendLocation(messageChatId, 55.1717114,61.3938271, stndrt_opts)} else {bot.sendMessage(messageChatId, '_ничего пока не планируем_', stndrt_opts);/*bot.sendLocation(messageChatId, 55.1717114,61.3938271, stndrt_opts)*/}}
  //console.log(msg);

  
	var messageText = messageText.toLowerCase();

	if (~messageText.indexOf('сиськи')) {
		if (messageUserId === 258313197) {
			bot.sendSticker(messageChatId, 'BQADAgADNQEAAn-zKAvjBwUQzeWuiwI');
		}
	}
	
		if (~messageText.indexOf('котлет')) {
		if (messageUserId === 3550328) {
			bot.sendSticker(messageChatId, 'BQADAgADGwADf8fMAV_v_u0nYKqIAg');
		}
	}
	
		if (~messageText.indexOf('пирог')) {
		if (messageUserId === 131752188) {
			bot.sendSticker(messageChatId, 'BQADAgAD4wADzFRJCVAECjbgQtEaAg');
		}
	}

		if (~messageText.indexOf('уху')) {
		if (messageUserId === 246383913) {
			bot.sendSticker(messageChatId, 'BQADAgADmgEAAhhC7gjsvHum0bq7BAI');
		}
	}
		//bot.sendMessage(messageChatId, 'Админ, кикни нафиг это чудовище!!!', stndrt_opts);}
	
	/*if (~messageText.indexOf('ботлох')) {
		bot.sendMessage(messageChatId,  messageUserName+', иди в жопу, я фея!');
		bot.sendSticker(messageChatId, 'BQADAgADPQEAAn-zKAuy6Q-eS4JYUQI');}
		//bot.sendMessage(messageChatId, 'Админ, кикни нафиг это чудовище!!!', stndrt_opts);*/

  /*if (messageText === '\/meet') {
	bot.sendMessage(messageChatId, '_ничего пока не планируем_', stndrt_opts)} */
});

module.exports = bot;
