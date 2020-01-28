class Test{
  constructor(soft,test,name){
    this.soft=soft;
    this.test=test;
    this.name=name;
    this.status="ready";
    this.output="";
  }

  static checkboxClassId(x){
    return "check-" + x.soft + "-" + x.test;
  }
  static outputClassId(x){
    return "output-" + x.soft + "-" + x.test;
  }
  static statusClassId(x){
    return "status-" + x.soft + "-" + x.test;
  }
  static fullTestName(x){
    return x.soft+": "+x.name;
  }
}

tests=[
  new Test("nist","frequency-test","The Frequency (monobit) test"),
  new Test("nist","frequency-within-block-test","Frequency Test within a Block"),
  new Test("nist","runs-test","The Runs Test"),
  new Test("nist","longest-run-of-ones-in-block-test","Tests for the Longest-Run-of-Ones in a Block"),
  new Test("nist","binary-matrix-rank-test","The Binary Matrix Tank Test"),
  new Test("nist","spectral-test","The Discrete Fourier Transform (Spectral) Test"),
  new Test("nist","non-overlapping-template-matching-test","The Non-overlapping Template Matching Test"),
  new Test("nist","overlapping-template-matching-test","The Overlapping Template Matching Test"),
  new Test("nist","universal-statistical-test","Maurer's \"Universal Statistical\" Test"),
  new Test("nist","linear-complexity-test","The Linear Complexity Test"),
  new Test("nist","serial-test","The Serial Test"),
  new Test("nist","approximate-entropy-test","The Approximate Entropy Test"),
  new Test("nist","cumulative-sums-test","The Cumulative Sums (Cusums) Test"),
  new Test("nist","random-excursions-test","The Random Excursions Test"),
  new Test("nist","random-excursions-variant-test","The Random Excursions Variant Test"),
  new Test("diehard","birthday-spacings-test","Birthday spacings"),
  new Test("diehard","overlapping-permutations-test","Overlapping permutations"),
  new Test("diehard","ranks-of-matrices-test","Ranks of matrices"),
  new Test("diehard","monkey-test","Monkey tests"),
  new Test("diehard","count-1s-test","Count the 1s"),
  new Test("diehard","parking-lot-test","Parking lot test"),
  new Test("diehard","minimum-distance-test","Minimum distance test"),
  new Test("diehard","random-spheres-test","Random spheres test"),
  new Test("diehard","squeeze-test","The squeeze test"),
  new Test("diehard","overlapping-sums-test","Overlapping sums test"),
  new Test("diehard","runs-test","Runs test"),
  new Test("diehard","craps-test","The craps test"),
  new Test("ent", "input-is-stream-byte-test","The input is treated as a stream of bits rather than of 8-bit bytes"),
  new Test("ent", "occurences-count-test","Print a table of the number of occurrences of each possible byte"),
  new Test("ent", "upper-to-lower-test","Fold upper case letters to lower case before computing statistics"),
  new Test("ent", "csv-output-test","Terse mode: output is written in Comma Separated Value (CSV) format"),
  new Test("ent", "help-test","Print how-to-call information")
];
