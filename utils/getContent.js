var googleapis = require("googleapis"),
	drive = googleapis.drive("v2"),
	OAuth2 = googleapis.auth.OAuth2,
	fs = require("fs"),
	request = require("request"),
	mkdirp = require("mkdirp");

var SERVICE_ACCOUNT_EMAIL = "155475534929-6jptuljhi8hms5342lj1ggjmk8iq3f5u@developer.gserviceaccount.com",
	CLIENT_ID = "155475534929-6jptuljhi8hms5342lj1ggjmk8iq3f5u.apps.googleusercontent.com",
	SCOPE = ["https://www.googleapis.com/auth/drive.readonly"];

var jwt = new googleapis.auth.JWT(
	SERVICE_ACCOUNT_EMAIL,
	null,
	process.env.PEM_KEY,
	SCOPE
	);
	
var sectionTitles = ["what", "how", "now"];
	
var uniq = function(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
};

var args = process.argv.slice(2);
if(args.length !== 1) {
	console.error("Usage: node getContent <comma separated numbers or ranges of lessons>");
	process.exit(1);
}

var tokens = args[0].split(",");	
var lessonNums = [];

for(var i in tokens) { // not currently needed b/c async
	var occs = (tokens[i].match(/-/g) || []);
	
	if(occs.length === 1) {
		var num1 = parseInt(tokens[i].split("-")[0]), 
			num2 = parseInt(tokens[i].split("-")[1]);
			
		if(num1 >= num2 || isNaN(num1) || isNaN(num2)) {
			console.error("Usage: node getContent <comma separated numbers or ranges of lessons>");
			console.error("Invalid lesson range.");
			process.exit(1);
		}
		var range = Array.apply(null, Array(num2 - num1 + 1)).map(
			function (_, i) {return i + num1;}
		);
		lessonNums.push.apply(lessonNums, range);
	}
	else if(occs.length === 0){
		var num = parseInt(tokens[i]);
		if(isNaN(num)) {
			console.error("Usage: node getContent <comma separated numbers or ranges of lessons>");
			console.error("Invalid lesson.");
			process.exit(1);
		}
		lessonNums.push(num);
	}
	else {
		console.error("Usage: node getContent <comma separated numbers or ranges of lessons>");
		console.error("Invalid lesson range.");
		process.exit(1);
	}
}

if(lessonNums.length > 1) {
	console.error("Currently, multiple lessons at once are not supported.");
	process.exit(1);
}

jwt.authorize(function auth(error, tokens) {
	if(error) {
		console.error(error);
	}	
	else {
		jwt.credentials = tokens;
	}
	var lessonStr = uniq(lessonNums).map(function(val) {
		return "title = '" + val + "'";	
	}).join(" or ");
	var foldersQuery = "mimeType = 'application/vnd.google-apps.folder' and ( " + lessonStr + " )";
	
	drive.files.list({ auth: jwt, q: foldersQuery}, function listFolders(err, foldersResp) { // oh my god.... callback hell
		if(err) {
			console.error(err);
		}
		else {
			var items = foldersResp.items;
			for(var i in items) {
				var folderId = items[i].id, lessonNum = items[i].title;
				drive.files.list({ auth:jwt, q: "'" + folderId + "' in parents"}, function listItems(err, fRes) {
					if(err) {
						console.error(err);
					}
					else {
						var path = "./app/views/content/" + lessonNum;
						var fItems = fRes.items;
						for(var j in fItems) {
							var item = fItems[j];
							if(item.mimeType.indexOf("image") == -1) {
								mkdirp.sync(path); // b/c ENOENT
								fs.writeFile(path + "/lesson.json", JSON.stringify({
									"title": item.title
								}, null, 2), { "flags": "w+", "encoding": "utf-8" }, function writeErr(err) { if(err) console.error(err); });
								
								request.get({
									uri: item.exportLinks["text/plain"],
									"headers": {
										"Authorization": "Bearer " + tokens.access_token
									}
								}, function processText(err, txtRes, body) {
									if(err) {
										console.error(err);
									}
									else {
										// console.log(JSON.stringify(body));
										var sections = body.split("\r\n\r\n\r\n");
										for(var s in sections) {
											// var paras = sections[s].split("\r\n");
											var finalHtml = sections[s].split("\r\n").map(function getParas(row) {
												return row.match(/\#\#.[a-zA-Z0-9_.]*\#\#/g) === null ? "<p class=\"content\">" + row + "</p>" : "<div class=\"img\">" + row + "</div>";
											}).join("\n");
											fs.writeFile(path + "/" + sectionTitles[s] + ".html", finalHtml, { "flags": "w+", "encoding": "utf-8" }, function writeErr(err) { if(err) console.error(err); })
										}
									}
								});
							}
							else {
								mkdirp.sync(path + "/img/");
								var file = fs.createWriteStream(path + "/img/" + item.title, { "flags": "w+", "encoding": null });
								request.get({ 
									"uri": item.downloadUrl,
									"headers": {
										"Authorization": "Bearer " + tokens.access_token
									}
								}).pipe(file);
							}
							
						}
					}
				});
			}
		}
	});
});
