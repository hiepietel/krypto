var express = require('express');
const { exec } = require('child_process');
var app = express();

class Test{
  constructor(soft,test){
    this.soft=soft;
    this.test=test;
    this.status="ready";
    this.output="";
  }

  static fullTestName(x){
    return x.soft+": "+x.name;
  }
}
//TEST COMMANDS
NIST= new Map();
NIST.set("frequency-test","ls");
NIST.set("frequency-within-block-test","ls -la");
NIST.set("runs-test","echo \"dupa\"");
NIST.set("longest-run-of-ones-in-block-test","ps");
NIST.set("binary-matrix-rank-test","df");
NIST.set("spectral-test","echo \"lol\"");
NIST.set("non-overlapping-template-matching-test","cat {file}");
NIST.set("overlapping-template-matching-test","nist -f {file}");
NIST.set("universal-statistical-test","nist -f {file}");
NIST.set("linear-complexity-test","nist -f {file}");
NIST.set("serial-test","nist -f {file}");
NIST.set("approximate-entropy-test","nist -f {file}");
NIST.set("cumulative-sums-test","nist -f {file}");
NIST.set("random-exvursions-test","nist -f {file}");
NIST.set("random-excursions-variant-test","nist -f {file}");
DIEHARD = new Map();
DIEHARD.set("birthday-spacings-test","diehard -f {file}");
DIEHARD.set("overlapping-permutations-test","diehard -f {file}");
DIEHARD.set("ranks-of-matrices-test","diehard -f {file}");
DIEHARD.set("monkey-test","diehard -f {file}");
DIEHARD.set("count-1s-test","diehard -f {file}");
DIEHARD.set("parking-lot-test","diehard -f {file}");
DIEHARD.set("minimum-distance-test","diehard -f {file}");
DIEHARD.set("random-spheres-test","diehard -f {file}");
DIEHARD.set("squeeze-test","diehard -f {file}");
DIEHARD.set("overlapping-sums-test","diehard -f {file}");
DIEHARD.set("runs-test","diehard -f {file}");
DIEHARD.set("craps-test","diehard -f {file}");
ENT = new Map();
ENT.set("input-is-stream-byte-test", "ent -b {file}");
ENT.set("occurences-count-test","ent -c {file}" );
ENT.set("upper-to-lower-test", "ent -f {file}");
ENT.set("csv-output-test", "ent -t {file}");
ENT.set("help-test", "ent -u {file}");


app.use('/',express.static('public'));
console.log("ASD");
app.use('/run/:soft/:test/:file', function(req, res){
  var msg = "Running "+ req.params.soft + " with test " + req.params.test + " on file " + req.params.file;
  console.log(msg);

  test = new Test(req.params.soft,req.params.test)

  cmd = "";
  if(test.soft=="nist"){
    cmd = NIST.get(test.test);
  }else if(test.soft=="diehard"){
    cmd = DIEHARD.get(test.test);
  }else if(test.soft="ent"){
    cmd = ENT.get(test.test);
  }

  cmd.replace("{file}",req.params.file);

  exec(cmd, (err, stdout, stderr) => {
	test.output=stderr+stdout;
    test.output=test.output.replace(/\n/g,"</br>");
    if (err) {
	  test.status="error";
    }else{
	  test.status="ok";			
  	  console.log(`stdout: ${stdout}`);
  	  console.log(`stderr: ${stderr}`);
    }

	response=JSON.stringify(test);
    res.send(response);
  });
});

app.listen(8080);
