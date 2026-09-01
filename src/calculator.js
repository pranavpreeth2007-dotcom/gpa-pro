export const DEFAULT_SCALE = Object.freeze({'A+':4,A:4,'A-':3.7,'B+':3.3,B:3,'B-':2.7,'C+':2.3,C:2,'C-':1.7,'D+':1.3,D:1,'D-':0.7,F:0});
export const LEVEL_BONUS = Object.freeze({Regular:0,Honors:.5,AP:1,IB:1,'Dual Credit':1});
export const CORE_SUBJECTS = new Set(['English','Math','Science','Social Studies','World Language']);
const round = value => Math.round(value*1000)/1000;

export function calculateGpa(courses, settings={}) {
  const scale={...DEFAULT_SCALE,...(settings.scale||{})}, bonus={...LEVEL_BONUS,...(settings.levelBonus||{})};
  const eligible=courses.filter(c=>!c.passFail&&c.grade!=='P'&&c.grade in scale&&!(settings.excludeFreshman&&c.year==='Freshman')&&!(settings.coreOnly&&!CORE_SUBJECTS.has(c.subject))&&!c.replaced);
  let weight=0,unweightedPoints=0,weightedPoints=0;
  for(const c of eligible){const w=settings.creditMode===false?1:Number(c.credits)||0,base=scale[c.grade];weight+=w;unweightedPoints+=base*w;weightedPoints+=Math.min(base+(bonus[c.level]||0),Number(settings.weightedCap)||5)*w;}
  return {unweighted:weight?round(unweightedPoints/weight):null,weighted:weight?round(weightedPoints/weight):null,totalCredits:round(eligible.reduce((s,c)=>s+(Number(c.credits)||0),0)),courseCount:eligible.length,excludedCount:courses.length-eligible.length};
}
export function semesterStats(courses,settings){const groups=new Map();for(const c of courses){const key=`${c.year} · ${c.term}`;if(!groups.has(key))groups.set(key,[]);groups.get(key).push(c);}return [...groups].map(([label,items])=>({label,...calculateGpa(items,settings)}));}
export function requiredFutureGpa(courses,settings,target,futureCredits){const current=calculateGpa(courses,settings);if(current.weighted==null||!futureCredits||target<=0)return null;const w=settings.creditMode===false?current.courseCount:current.totalCredits;return round(((target*(w+futureCredits))-current.weighted*w)/futureCredits);}
export function explainSettings(s){const p=[s.creditMode===false?'Every course counts equally':'Courses are weighted by credit'];if(s.excludeFreshman)p.push('freshman courses are excluded');if(s.coreOnly)p.push('only core academic subjects are included');p.push(`weighted GPA is capped at ${s.weightedCap||5}.0`);return `${p.join('; ')}. Pass/fail and replaced courses do not affect GPA.`;}
