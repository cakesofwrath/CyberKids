var fs = require("fs"),
	gutil = require("gulp-util"),
	mkdirp = require("mkdirp"),
	through = require("through2");

var PluginError = gutil.PluginError;

var sections = ["what", "how", "now"]; //current sections

var imgToken = /\#\#.[a-zA-Z0-9_.]*\#\#/g,
	preToken1 = /\[scratchblocks\]/g,
	preToken2 = /\[\/scratchblocks\]/g;


module.exports = function() {
	function getParent(fileName) {
		var sp = fileName.split("/");
		if(sp[sp.length-1].length === 0 || !sp[sp.length-1].trim() ) { // get rid of last empty one
			sp.pop();
		}
		sp.pop(); // get parent dir
		return sp.join("/") + "/";
	}

	function transform(file, encoding, callback) {
		/*
			Get the what, how, etc. files and combine their html into a JSON.
			Put each section under content field of json
			Replace all image imgTokens w/ appropro <img> tags,
			delete "img" field from original json
			IMAGES IN TEXT SHOULD HAVE FILE EXTS
		*/
		if(file.isNull()) {
			return callback(null, file);
		}
		var dir = getParent(file.path);
		// console.log(dir);
		var lessonNum = dir.split("/")[dir.split("/").length - 2];
		var data = JSON.parse(file.contents.toString("utf-8"));
		// console.log(data);
		var imgs = fs.existsSync(dir + "img/") ? fs.readdirSync(dir + "img/") : null;
		data.content = {};
		for(var i in sections) {
			var htmlFile = null;
			try {
				htmlFile = fs.readFileSync(dir + sections[i] + ".html", "utf-8");
			}
			catch(err) {
				if(err.code !== "ENOENT") {
					throw err;
				}
				return callback(new PluginError("ContentCompiler", err));
			}
			var m;
			do {
				m = imgToken.exec(htmlFile);
				if(m) {
					var repld = m[0].replace(/\#/g, "");
					if(imgs && imgs.indexOf(repld) === -1) {
						return callback(new PluginError("ContentCompiler", "Image not found: " + repld));
					}
					htmlFile = htmlFile.replace(
						m[0], 
						"<img class=\"lessonImg\" src=\"/views/content/" + lessonNum + "/img/" + repld + "\" >"
					);
				}
			}
			while(m);
			htmlFile = htmlFile.replace(preToken1, "<pre class=\"blocks\">");
			htmlFile = htmlFile.replace(preToken2, "</pre>");
			data.content[sections[i]] = htmlFile;
		}
		var isFound = false;
		mkdirp.sync("dist/views/content/");
		try {
			var stats = fs.lstatSync("dist/views/content/lessons.json");
			if(stats.isFile()) {
				isFound = true;
			}
			else {
				isFound = false;
			}
		}
		catch(e) {}
		
		var lessons = isFound ? JSON.parse(fs.readFileSync("dist/views/content/lessons.json", "utf-8")) : { "data":[] };
		lessons.data[parseInt(lessonNum)] = {
			"title": data.title,
			"thumb": imgs ? "/views/content/" + lessonNum + "/img/" + imgs[0] : null,
			"number": lessonNum
		};
		
		fs.writeFileSync("dist/views/content/lessons.json", JSON.stringify(lessons), "utf-8", "w+");
		
		file.contents = new Buffer(JSON.stringify(data));

		callback(null, file);
	}
	return through.obj(transform);
};
