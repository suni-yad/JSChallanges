// Budget Controller
var budgetController =(function(){

    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
         };
        
         Expense.prototype.calcPercentage = function(totalIncome){

            if(totalIncome > 0){
             
                 this.percentage = Math.round((this.value /totalIncome)*100);
            }else {
                 this.percentage =-1;
            }
        };

        Expense.prototype.getPercentage = function(){
            return this.percentage;
        };

    var Income = function(id, description, value){
        this.id = id,
        this.description = description,
        this.value = value
        };

    var calculateTotal = function(type){
            var sum = 0;
            data.allItems[type].forEach(function(current){
                sum += current.value;
            });
            data.totalItems[type]=sum;
        };
    
    var data = {
            allItems:{
               exp :[],
               inc : []
            },
            totalItems:{
                exp : 0,
                inc : 0
            },

            budget :0,
            percentage : -1

        };

  
        return {
            addItem: function(type,des,val){
                var newItem,ID;
                if(data.allItems[type].length>0){
                ID = data.allItems[type][data.allItems[type].length -1].id+1;
                }else{
                     ID = 0;
                }
                
                if(type==='exp'){
                    newItem = new Expense(ID,des,val);
                }else if(type==='inc'){
                    newItem = new Income(ID,des,val);
                }
                data.allItems[type].push(newItem);
                return newItem;
            },

            deleteItem : function(type,id){
                var ids, index;
                //console.log('reaching here');
             ids = data.allItems[type].map(function(current){
                //console.log('reaching here too ');
                    return current.id ;
                });
               
                index = ids.indexOf(id);
                if(index!== -1){
                data.allItems[type].splice(index,1);

               }
            },


            calculateBudget : function(){
                // calculate total income & expenses
                    calculateTotal('inc');
                    calculateTotal('exp');
                
    
                // calculate budget = income - expenses
               data.budget = data.totalItems.inc - data.totalItems.exp;
                // calculate percentage
                if (data.totalItems.inc>0){
                data.percentage = Math.round((data.totalItems.exp/ data.totalItems.inc) * 100);
                }else data.percentage =-1;
            },

            //calculate percentages

            calculatePercentages : function(){

                data.allItems.exp.forEach(function(current){
                    current.calcPercentage(data.totalItems.inc);
                });
            },

            getPercentages : function(){

               var allPercentages = data.allItems.exp.map(function(current){
                   return current.getPercentage();
                });
                return allPercentages;
            },
            getBudget : function(){
                return{
                    budget : data.budget,
                    totalIncome : data.totalItems.inc,
                    totalExpenses : data.totalItems.exp,
                    percentage : data.percentage

                };

            },          
         
            testing: function(){
                console.log(data);
            }
        };
        
})();

//UI Controller

var UIController = (function(){
    var DOMStrings ={
            inputType : '.add__type',
            inputDesc : '.add__description',
            inputValue : '.add__value',
            inputBtn : '.add__btn',
            incomeContainer :' .income__list',
            expenseContainer :'.expenses__list',
            incomeLabel: '.budget__income--value',
            expenseLabel : '.budget__expenses--value',
            budgetLabel : '.budget__value',
            percentageLabel : '.budget__expenses--percentage',
            container : '.container',
            expPercentageLabel : '.item__percentage',
            dateLabel: '.budget__title--month'
        };

        var format = function(num, type){

            var numSplit,int,dec,type;
    
            num = Math.abs(num);
            num = num.toFixed(2);
    
            numSplit = num.split('.');
            int = numSplit[0];
            int = int.substr(0, int.length-3) +','+ int.substr(int.length-3 , 3);
            dec = numSplit[1];
            return /*(type === 'exp' ? '-' : '+') + ' '+ */int +'.'+ dec;
        };
    
    

   return{
      getInput : function(){
          return{
               type : document.querySelector(DOMStrings.inputType).value,
               description : document.querySelector(DOMStrings.inputDesc).value,
               value : parseFloat(document.querySelector(DOMStrings.inputValue).value)
      };
    },
    addListItem : function(obj,type){
        var html,newHtml,element;

        // create an HTML string with placeholder text
        if(type==='inc'){
            element = DOMStrings.incomeContainer;

       html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        
    } else if (type ==='exp'){
        element =DOMStrings.expenseContainer;

            html='<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                                }
        //replace placeholder text with actual data
        
        newHtml = html.replace('%id%', obj.id);
        newHtml = newHtml.replace('%description%' , obj.description);
        newHtml= newHtml.replace('%value%',format(obj.value,type));

        //insert HTML into DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)

    },
    deleteListItem : function(deleteItemID){
        var element = document.getElementById(deleteItemID);
        element.parentNode.removeChild(element);
       
    },

    clearFields : function(){
        var fields, fieldsArr;
        fields = document.querySelectorAll(DOMStrings.inputDesc + ','+DOMStrings.inputValue);
        fieldsArr = Array.prototype.slice.call(fields);         
        fieldsArr.forEach(function(current, index, array){
            current.value =  "";

        });
        fieldsArr[0].focus();
    },

    displayBudget : function(obj){

        document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
        document.querySelector(DOMStrings.expenseLabel).textContent = obj.totalExpenses;
        document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalIncome;
        if(obj.percentage>0){
            document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + ' %';
        } else {
            document.querySelector(DOMStrings.percentageLabel).textContent = "---";
        }
    },
    displayPercentage : function(percentages){
        var fields = document.querySelectorAll(DOMStrings.expPercentageLabel);

        var nodeListForEach =function(list,callback){
            for(var i=0; i< list.length; i++){
                callback(list[i],i);
            }
        };

        nodeListForEach(fields, function(current, index){
         if(percentages[index]>0){
            current.textContent = percentages[index] + '%';
         }
         else{
            current.textContent = '---';
         }
        });

    },
    displayMonth: function() {
        var now, months, month, year;
        
        now = new Date();
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        month = now.getMonth();
         year = now.getFullYear();
        document.querySelector(DOMStrings.dateLabel).textContent = months[month] + ' ' + year;
    },

    

      
   
       GetDOMStrings : function(){
           return DOMStrings;
            }
       };


})();



//Global Controller
var controller = (function(budgetCtrl , UICtrl){
    var setUpEventListener = function(){
        var DOM = UICtrl.GetDOMStrings();
        document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);
    
        document.addEventListener('keypress',function(event){
            if(event.which===13 || event.keyCode ===13){
    
               ctrlAddItem();
           }
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
    
    };

    // Calculate Budget 

    var updateBudget = function(){
       
        //calculate budget
        budgetCtrl.calculateBudget();


        //display total budget
        var budget = budgetCtrl.getBudget();

        //display budget in UI
        UICtrl.displayBudget(budget);
       
    };
    
    var ctrlAddItem = function(){
        var input, newItem;
        // Get Input data
        var input = UICtrl.getInput();
        //console.log(input);

        if(input.description!=="" && !isNaN(input.value) && input.value > 0){

            //add the item to budget controller
            newItem = budgetCtrl.addItem(input.type, input.description,input.value);
            //add the item to UI
            UICtrl.addListItem(newItem,input.type);

            //Clear input fields for new value
            UICtrl.clearFields();

            //total budget
            updateBudget();
            // update percentage
            updatePercentage();
    }
        
    };

        var ctrlDeleteItem = function(event){
            var itemID, splitID , type , ID;
              itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
              if(itemID){

               splitID= itemID.split('-');
               type = splitID[0];
               ID = parseInt(splitID[1]);
                //delete the item from data structure
                budgetCtrl.deleteItem(type,ID);
                //delete the item from UI
                UICtrl.deleteListItem(itemID);

                //update budget 
                updateBudget();
                // update percentage
                updatePercentage();
            }
              
        };
        var updatePercentage = function(){

            // Calculate percentage
               budgetCtrl.calculatePercentages();
    
            // get percentage 
                var percentages =budgetCtrl.getPercentages();

            // update percentage in UI
                UICtrl.displayPercentage(percentages);
        };

  return{
    init: function(){
        console.log('Application has started');
       UICtrl.displayMonth();
        UICtrl.displayBudget({
                    budget : 0,
                    totalIncome : 0,
                    totalExpenses : 0,
                    percentage : -1
        });

        setUpEventListener();
    }
};   

})(budgetController, UIController);

controller.init();