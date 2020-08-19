/*var budgeController = (function(){
    var x=30;
    var add = function(a){
        return a+x;
  }
  return {
      publicTest: function(b){
        console.log(add(b));
      }
  }
  }) ();*/
  /*
  var age = 28;
  var obj = { 
      age :30,
      name : 'sunita'
  };

  function change(a,b) {
      a = 20;
      b.name = 'Bimla'
      
  }

  change(age, obj);
  console.log(age);
  console.log(obj.name);
  console.log(obj.age);
   */
/*
   var yearOfBirth = [ 1987,1986,1968,1978];
   function calcArray(arr , fn) {
       var arrResult = [];
       for(i=0;i<arr.length;i++)
       {
           arrResult.push(fn(arr[i]));
       }
       return arrResult;
   }

     function calculateAge(year) {

         return 2020 - year;
     }
     function ageFull(year) {
         return year >=18;
     }
  
     var ages = calcArray(yearOfBirth,calculateAge); 
     var ageIsFull=calcArray(yearOfBirth,ageFull);
    console.log(ages);
    console.log(ageIsFull);
         
     */

/*
     function interviewQue(job) {
         if(job==='teacher'){ return function(name) {

            console.log('what subject do you teach '+ name+' ?');
             }} else if (job==='Designer'){
                        return function(name) {
                           console.log(name +', what is UX ?');
                       }}else {
                           return function(name) {
                               console.log(name +', what do you do ?');
                               
                           }
                       }
            }

            var question = interviewQue('teacher');
             question('Amayra');
             interviewQue('Designer')('sunita');*/

/*
function retirement(retiremenmtAge){
    var a = ' is the retirement age.';
    return function(birthYear) { 
        var age = 2020 - birthYear;
        console.log(age + a);
        
    }
}


retirement(70)(1987);*/
/*
function interview(job) {
   
    return function(name) {
        if(job === 'designer'){
            
   console.log('hey '+ name+' what is UX design Pattern');
        }else if(job === 'teacher'){
            console.log('Hi '+ name + ' what subject do you teach ?');
        }else{
            console.log('what do you do '+ name +' ?');
        }
    }
}
 interview('teacher')('sunita') ;  

*/
 var john = {
     name : 'John',
     Job : 'Designer',
     age : 34,
     presentation: function(style,timeOfDay)
     {
         if(style==='formal'){
             console.log('Hi, Ladies and Gentlemen, '+ ' Good '+ timeOfDay+' !! I am '+this.name+'. I\'m a '+this.Job +' and I\'m '+ this.age +' years old.');
         }
         else if(style==='friendly'){
             console.log('Hey, Whats up !!'+'goooood '+timeOfDay+'!!  I am '+this.name+'. I\'m a '+this.Job +' and I\'m '+ this.age +' years old.');
         }
     }
 };
var Emily ={
    name:'Emily',
    Job:'Reporter',
    age : 25
};
 john.presentation('friendly','Morning');
 john.presentation.call(Emily,'formal', 'afternoon');
 var johnFormal = john.presentation.bind(john,'formal');
  johnFormal('morning');



























