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
    "./key.pem",
    null,
    // process.env.PEM_KEY,
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
if(args.length !== 2) {
    console.error("Usage: node getContent <lesson/project> <comma separated numbers or ranges of lessons>");
    process.exit(1);
}

var tokens = args[1].split(","), 
    lessonNums = [];

for(var i in tokens) {
    var occs = (tokens[i].match(/-/g) || []);

    if(occs.length === 1) {
        var num1 = parseInt(tokens[i].split("-")[0]), 
            num2 = parseInt(tokens[i].split("-")[1]);
            
        if(num1 >= num2 || isNaN(num1) || isNaN(num2)) {
            console.error("Usage: node getContent <lesson/project> <comma separated numbers or ranges of lessons>");
            console.error("Invalid range.");
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
            console.error("Usage: node getContent <lesson/project> <comma separated numbers or ranges of lessons>");
            console.error("Invalid number.");
            process.exit(1);
        }
        lessonNums.push(num);
    }
    else {
        console.error("Usage: node getContent <lesson/project> <comma separated numbers or ranges of lessons>");
        console.error("Invalid range.");
        process.exit(1);
    }
}

var saveText = function(path, item) {
    

    /*if(err) {
        console.error(err);
    }
    else {
        var sections = body.split("\r\n\r\n\r\n");
        for(var s in sections) {
            var finalHtml = sections[s].split("\r\n").map(function getParas(row) {
                return row.match(/\#\#.[a-zA-Z0-9_.]*\#\#/g) === null ? "<p class=\"content\">" + row + "</p>" : "<div class=\"img\">" + row + "</div>";
            }).join("\n");
            fs.writeFile(path + ".html", finalHtml, { "flags": "w+", "encoding": "utf-8" }, function writeErr(err) { if(err) console.error(err); });
        }
    }*/
};

var saveImage = function(err, path, uri) {
    mkdirp.sync(path + "/img/");
    var file = fs.createWriteStream(path)
}
