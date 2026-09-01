import test from 'node:test';
import assert from 'node:assert/strict';
import {parseTranscript} from '../src/importer.js';
import {coursesCsv} from '../src/exporter.js';

test('parses common transcript lines and flags unknown rows',()=>{
  const result=parseTranscript('AP Biology, A-, 1\nUnclear line');
  assert.equal(result.rows.length,1);
  assert.equal(result.rows[0].grade,'A-');
  assert.equal(result.rows[0].level,'AP');
  assert.equal(result.rejected.length,1);
});

test('neutralizes spreadsheet formulas in CSV exports',()=>{
  const csv=coursesCsv([{name:'=HYPERLINK("bad")',grade:'A',level:'Regular',credits:1,year:'Freshman',term:'Semester 1',subject:'Other',planned:false}]);
  assert.match(csv,/"'=HYPERLINK/);
});
