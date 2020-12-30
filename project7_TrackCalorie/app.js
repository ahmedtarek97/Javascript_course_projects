// Storage Controller



// Item Controller
const ItemCtrl = (function(){
    // Item Constructor
    const Item = function(id,name,calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    } 


    // Item state
    const data = {
        items:[
            
        ],
        currentItem:null,
        totalCalories:0
    }
// public mehods
    return{
        getItems: function(){
            return data.items;
        },
        addItem: function(name,calories){
           // create id
           if(data.items.length > 0){
               ID = data.items[data.items.length - 1].id + 1;
            
           }else{
               ID = 0;
           }

           // calories to  a number
            calories = parseInt(calories);
            newItem = new Item(ID,name,calories);
            data.items.push(newItem);

            return newItem;
        },
        getItemById: function(id){
            let found = null;
            // Loop through items
            data.items.forEach(function(item){
              if(item.id === id){
                found = item;
                //break;
              }
            });
            return found;
        },
        updateItem: function(name, calories){
            // Calories to number
            calories = parseInt(calories);      
            let found = null;      
            data.items.forEach(function(item){
              if(item.id === data.currentItem.id){
                item.name = name;
                item.calories = calories;
                found = item;
              }
            });
            return found;
        },
        deleteItem: function(id){
            // Get ids
            const ids = data.items.map(function(item){
              return item.id;
            });      
            // Get index
            const index = ids.indexOf(id);      
            // Remove item from the array
            data.items.splice(index, 1);
        },
        clearAllItems: function(){
            data.items = [];
        },
        setCurrentItem: function(item){
            data.currentItem = item;
        },
        getCurrentItem: function(){
            return data.currentItem;
        },
        getTotalCalories: function(){
           let total = 0;
           data.items.forEach(function(item){
               total += item.calories;
           });
           data.totalCalories = total;

           return data.totalCalories;
        },
        logData: function(){
            return data;
        }
    }

})();


// UI Controller
const UICtrl = (function(){
    const UISelectors = {
        itemList: '#item-list',
        listItems: '#item-list li',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        clearBtn: '.clear-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories'
    }
    
   // public mehods 
    return{
        populateItemList: function(items){
            let html = '';
            items.forEach(function(item){
                html +=` <li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                  <i class="edit-item fa fa-pencil"></i>
                </a>
              </li>`;
            })

            //insert the list items in the <ul>
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },

        getItemInput: function(){
            return{
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }

        },
        addListItem: function(item){
            // show the list
            document.querySelector(UISelectors.itemList).style.display = 'block';
            // create the li
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.id = `item-${item.id}`;
            li.innerHTML = ` <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a>`
            // insert the created element
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend',li)

        },
        updateListItem: function(item){
            let listItems = document.querySelectorAll(UISelectors.listItems);      
            // Turn Node list into array
            listItems = Array.from(listItems);      
            listItems.forEach(function(listItem){
              const itemID = listItem.getAttribute('id');      
              if(itemID === `item-${item.id}`){
                document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                  <i class="edit-item fa fa-pencil"></i>
                </a>`;
              }
            });
        },
        deleteListItem: function(id){
            const itemID = `#item-${id}`;
            const item = document.querySelector(itemID);
            item.remove();
        },
        clearInput: function(){
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';

        },
        addItemToForm: function(){
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
        },
        removeItems: function(){
            let listItems = document.querySelectorAll(UISelectors.listItems);      
            // Turn Node list into array
            listItems = Array.from(listItems);      
            listItems.forEach(function(item){
              item.remove();
            });
        },        
        hideList: function(){
            document.querySelector(UISelectors.itemList).style.display = 'none';

        },
        showTotalCalories: function(totalCalories){
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },
        clearEditState: function(){
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },
        showEditState: function(){
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },
        getSelectors: function(){
            return UISelectors;
        }
    };

})();



    // App Controller
    const App = (function(ItemCtrl,UICtrl){
        // Event Listeners
        const loadEventListeners = function(){
        const UISelectors = UICtrl.getSelectors();

        // Add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click',itemAddSubmit)
        // Disable submit on enter
        document.addEventListener('keypress', function(e){
        if(e.key=== 13 || e.keyCode === 13 || e.which === 13){
          e.preventDefault();
          return false;
        }
      });
        // Edit icon click event
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);
        // Update item event
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);
        // Back button event
        document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);
        // Delete item event
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);
        // Clear items event
        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
        
        }

        // Add item submit
        const itemAddSubmit = function(e){        
            // get form input
            const input = UICtrl.getItemInput();
            
            // check if name and value are not empty
            if(input.name !== '' && input.calories !== ''){

                // add item      
            const newItem = ItemCtrl.addItem(input.name,input.calories); 
            UICtrl.addListItem(newItem); 
            // get the total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            //show total calories in ui
            UICtrl.showTotalCalories(totalCalories);           
            // clear for fields
            UICtrl.clearInput();    
            }
            e.preventDefault();
        }

    // Update item at click edit icon
    const itemEditClick = function(e){
        if(e.target.classList.contains('edit-item')){      
        const listId = e.target.parentNode.parentNode.id;      
        const listIdArr = listId.split('-');     
        const id = parseInt(listIdArr[1]);      
        const itemToEdit = ItemCtrl.getItemById(id);  
        ItemCtrl.setCurrentItem(itemToEdit);
        
        UICtrl.addItemToForm();
        }

        e.preventDefault();
    }

    // Update item submit
    const itemUpdateSubmit = function(e){

        const input = UICtrl.getItemInput();
        // Update item
        const updatedItem = ItemCtrl.updateItem(input.name, input.calories);
        // Update UI
        UICtrl.updateListItem(updatedItem);       
        const totalCalories = ItemCtrl.getTotalCalories();        
        UICtrl.showTotalCalories(totalCalories);
        UICtrl.clearEditState();

        e.preventDefault();
    }

    // Delete button event
    const itemDeleteSubmit = function(e){    
        const currentItem = ItemCtrl.getCurrentItem();
        ItemCtrl.deleteItem(currentItem.id);
        UICtrl.deleteListItem(currentItem.id);    
        const totalCalories = ItemCtrl.getTotalCalories();    
        UICtrl.showTotalCalories(totalCalories);
        UICtrl.clearEditState();
        
        e.preventDefault();
    }

    // Clear items event
  const clearAllItemsClick = function(){
        // Delete all items from data structure
        ItemCtrl.clearAllItems();        
        const totalCalories = ItemCtrl.getTotalCalories();        
        UICtrl.showTotalCalories(totalCalories);
        // Remove from UI
        UICtrl.removeItems();
        // Hide UL
        UICtrl.hideList();
    
    }


  

    // public mehods
    return{
        init: function(){

            // remove the edit state bottons  
            UICtrl.clearEditState();  
            // fetch items from the data structure
            const items = ItemCtrl.getItems();

            // check if there is no items
            if(items.length === 0){
                UICtrl.hideList();

            }else{
                UICtrl.populateItemList(items);
               
            }

            // get the total calories
           const totalCalories = ItemCtrl.getTotalCalories();
           //show total calories in ui
           UICtrl.showTotalCalories(totalCalories);      

            loadEventListeners();
            
            
            }
    }

})(ItemCtrl,UICtrl);

App.init();

