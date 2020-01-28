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
DIEHARD.set("birthday-spacings-test",			"LD_LIBRARY_PATH=lib bin/dieharder -f {file} -d 0");
DIEHARD.set("overlapping-permutations-test",	"LD_LIBRARY_PATH=lib bin/dieharder -f {file} -d 1");
DIEHARD.set("ranks-of-matrices-test",			"LD_LIBRARY_PATH=lib bin/dieharder -f {file} -d 2");
DIEHARD.set("monkey-test",						"LD_LIBRARY_PATH=lib bin/dieharder -f {file} -d 4");
DIEHARD.set("count-1s-test",					"LD_LIBRARY_PATH=lib bin/dieharder -f {file} -d 8");
DIEHARD.set("parking-lot-test",					"LD_LIBRARY_PATH=lib bin/dieharder -f {file} -d 10");
DIEHARD.set("minimum-distance-test",			"LD_LIBRARY_PATH=lib bin/dieharder -f {file} -d 11");
DIEHARD.set("random-spheres-test",				"LD_LIBRARY_PATH=lib bin/dieharder -f {file} -d 12");
DIEHARD.set("squeeze-test",						"LD_LIBRARY_PATH=lib bin/dieharder -f {file} -d 13");
DIEHARD.set("overlapping-sums-test",			"LD_LIBRARY_PATH=lib bin/dieharder -f {file} -d 14");
DIEHARD.set("runs-test",						"LD_LIBRARY_PATH=lib bin/dieharder -f {file} -d 15");
DIEHARD.set("craps-test",						"LD_LIBRARY_PATH=lib bin/dieharder -f {file} -d 16");
ENT = new Map();
ENT.set("input-is-stream-byte-test", "ent -b {file}");
ENT.set("occurences-count-test","ent -c {file}" );
ENT.set("upper-to-lower-test", "ent -f {file}");
ENT.set("csv-output-test", "ent -t {file}");
ENT.set("help-test", "ent -u {file}");


app.use('/',express.static('public'));
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
  console.log(req.params.file);
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
