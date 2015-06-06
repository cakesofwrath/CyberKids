var fs = require("fs"),
	path = require("path"),
	gutil = require("gulp-util"),
	through = require("through2");

var PluginError = gutil.PluginError;

var sections = ["what", "how", "now"]; //current sections

var token = /\#\#.[a-zA-Z0-9_]*\#\#/g;

// var ContentCompiler = function(options) {
module.exports = function(options) {
	console.log("hai");
	// console.log(fs.readdirSync("../app/views/content/"));
	function getParent(fileName) {
		var sp = fileName.split("/");
		if(sp[sp.length-1].length === 0 || !sp[sp.length-1].trim() )//get rid of last empty one
			sp.pop();
		sp.pop(); // get parent dir
		return sp.join("/") + "/";
	};
	function imgIt(s) {
		return "<img class=\"lessonImg\" src=\"/views/content/" + s + "\"/>";
	};
	function transform(file, encoding, callback) {
		/*
			Get the what, how, etc. files and combine their html into a JSON.
			Put each section under content field of json
			Replace all image tokens w/ appropro <img> tags,
			delete "img" field from original json
			IMAGES IN TEXT SHOULD HAVE FILE EXTS
		*/
		if(file.isNull())
			return callback(null, file);
		var dir = getParent(file.path);
		console.log(dir);
		var lessonNum = dir.charAt(dir.length - 2);
		var data = JSON.parse(file.contents.toString("utf-8"));
		console.log(data);
		var imgs = fs.readdirSync(dir + "img/");
		data.content = {};
		for(var i in sections) {
			var htmlFile = null;
			try {
				htmlFile = fs.readFileSync(dir + sections[i] + ".html", "utf-8");
			}
			catch(err) {
				if(err.code !== "ENOENT")
					throw e;
				return cb(new PluginError("ContentCompiler", err));
			}
			var m;
			do {
				m = token.exec(htmlFile);
				if(m) {
					var repld = m.replace("#","");
					if(imgs.indexOf(repld) === -1) {
						return cb(new PluginError("ContentCompiler", "Image not found: " + repld));
					}
					// htmlFile.replace(new RegExp("/" + m + "/g"), m.substring(2, m.length - 1))
					htmlFile = htmlFile.replace(
						new RegExp("/" + m + "/g"), 
						"<img class=\"lessonImg\" src=\"/views/content/" + lessonNum + "/img/" + repld
					);
				}
			}
			while(m);

			data.content[sections[i]] = htmlFile;
		}
		delete data.imgs;
		file.contents = new Buffer(JSON.stringify(data));
		callback(null, file);
	}
	return through.obj(transform);
};

// module.exports = ContentCompiler;
