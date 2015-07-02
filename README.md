# Cyber Kids
A website for a summer computer science course, taught in Scratch.

Definitely a WIP, built in Angular + Express.js + Gulp + some more node.

Setup with ```npm install```

Uses Google Drive as a CMS.
To authenticate, get a Google APIs pem key and run ```export PEM_KEY="`cat key.pem`"```
Then, run ```node utils/getContent.js <lesson number> ``` to pull in new lesson content
(Obviously, you can't use this unless you have access to the drive files. If you want to contribute, let me know.)

Run the dev server with ```gulp dev```. My gulpfile might still be messed up though
