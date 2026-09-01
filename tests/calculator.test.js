import test from 'node:test';
import assert from 'node:assert/strict';
import {calculateGpa,requiredFutureGpa} from '../src/calculator.js';

const course=(grade,level='Regular',credits=1,extra={})=>({grade,level,credits,year:'Sophomore',subject:'Math',passFail:false,replaced:false,...extra});

test('calculates credit-weighted unweighted and weighted GPA',()=>{
  const result=calculateGpa([course('A','AP',1),course('B','Regular',.5)],{creditMode:true,weightedCap:5});
  assert.equal(result.unweighted,3.667);
  assert.equal(result.weighted,4.333);
  assert.equal(result.totalCredits,1.5);
});

test('supports plus/minus grades',()=>{
  assert.equal(calculateGpa([course('A-'),course('B+')],{}).unweighted,3.5);
});

test('excludes pass/fail, replaced, freshman, and non-core courses when configured',()=>{
  const courses=[course('A'),course('A','Regular',1,{passFail:true}),course('A','Regular',1,{replaced:true}),course('A','Regular',1,{year:'Freshman'}),course('A','Regular',1,{subject:'Arts'})];
  const result=calculateGpa(courses,{excludeFreshman:true,coreOnly:true});
  assert.equal(result.courseCount,1);
  assert.equal(result.excludedCount,4);
});

test('calculates required future GPA',()=>{
  assert.equal(requiredFutureGpa([course('B')],{creditMode:true,weightedCap:5},3.5,1),4);
});
