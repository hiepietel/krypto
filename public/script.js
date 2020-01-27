function initialize(){
  tests.forEach(attachCheckbox);

function attachCheckbox(item, index) {
  document.getElementById("check-"+item.soft).innerHTML += "<div class=\"form-check\"><input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\""+Test.checkboxClassId(item)+"\"><label class=\"form-check-label\" for=\""+Test.checkboxClassId(item)+"\">"+item.name+"</label></div>";
}
}

function cleanResults(){
  runningTests=[];
  runningTestIndex=0;
  document.getElementById("output-list").innerHTML = "";
}

function startTests(){
  cleanResults();
  document.getElementById("button-test-launch").disabled = true;

//fill list
  tests.forEach(prepareTest);
function prepareTest(item, index) {
  if(document.getElementById(Test.checkboxClassId(item)).checked==true){
    runningTests.push(item);
    document.getElementById("output-list").innerHTML += "<li class=\"list-group-item\"><div class=\"row\"><div class=\"col-2\"><button class=\"btn btn-secondary\" type=\"button\" data-toggle=\"collapse\" data-target=\"#"+Test.outputClassId(item)+"\" aria-expanded=\"false\" aria-controls=\""+Test.outputClassId(item)+"\">Show output</button></div><div class=\"col-9\"><b>"+Test.fullTestName(item)+"</b></div><div class=\"col-1\" id=\""+Test.statusClassId(item)+"\"><span class=\"badge badge-pill badge-secondary\">PENDING</span></div></div><div class=\"collapse\" id=\""+Test.outputClassId(item)+"\"><div class=\"card card-body\"></div></div></li>";
  }
}
//setup progress bar
  document.getElementById("test-progress").innerHTML = "0 / "+runningTests.length;
  document.getElementById("test-progress").setAttribute("aria-valuemax",runningTests.length);
  document.getElementById("test-progress").setAttribute("aria-valuenow" ,0);
  document.getElementById("test-progress").setAttribute("style","width: "+(runningTestIndex/runningTests.length)*100+"%;");
  document.getElementById("status").hidden=false;
//start test
runTest(runningTests[runningTestIndex])
}

function testResultUpdate(responseTest){
  foundIndex=0;
  runningTests.forEach(mergeTestObj);
  function mergeTestObj(item, index) {
    if(item.test == responseTest.test && item.soft == responseTest.soft){
      foundIndex=index;
      item.output=responseTest.output;
      item.status=responseTest.status;
    }
}

  runningTestIndex += 1;
  document.getElementById("test-progress").innerHTML = runningTestIndex+" / "+runningTests.length;
  document.getElementById("test-progress").setAttribute("aria-valuenow",runningTestIndex);
  document.getElementById("test-progress").setAttribute("style","width: "+(runningTestIndex/runningTests.length)*100+"%;");

  document.getElementById(Test.outputClassId(runningTests[foundIndex])).innerHTML = runningTests[foundIndex].output;

  if(runningTests[foundIndex].status == "ok"){
    document.getElementById(Test.statusClassId(runningTests[foundIndex])).innerHTML = "<span class=\"badge badge-pill badge-success\">OK</span>";
  } else if(runningTests[foundIndex].status == "error") {
    document.getElementById(Test.statusClassId(runningTests[foundIndex])).innerHTML = "<span class=\"badge badge-pill badge-danger\">ERROR</span>";
  }

  if(runningTests.length > runningTestIndex){
    runTest(runningTests[runningTestIndex])
  } else {
    document.getElementById("button-test-launch").disabled = false;
    document.getElementById("status").hidden=true;
  }
}

function runTest(test){
  document.getElementById(Test.statusClassId(test)).innerHTML = "<span class=\"badge badge-pill badge-primary\">RUNNING</span>";
  file = "file.txt"
  var xhttp = new XMLHttpRequest();
  xhttp.onload = function() {testResultUpdate(JSON.parse(this.responseText));};
  xhttp.open("GET", "run/"+test.soft+"/"+test.test+"/"+file,true);
  xhttp.send();
}
