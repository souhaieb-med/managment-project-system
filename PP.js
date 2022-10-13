
var title = document.getElementById('title')
var price = document.getElementById('price')
var ads = document.getElementById('ads')
var taxes = document.getElementById('taxes')
var discount = document.getElementById('discount')
var total = document.getElementById('total')
var submit =document.getElementById('submit')
var count = document.getElementById('count')
var system = 'create'
var waku ; //

// Function total 
function getTotal() {
    if(price.value != ''){
        var result =( +price.value + +ads.value + +taxes.value ) - +discount.value
        total.innerHTML = result
    }
    else{
        total.innerHTML = ''
    }
}

// Create product
var dataProduct;
if(localStorage.product != null){
  dataProduct=JSON.parse(localStorage.product)
}
else{
  dataProduct=[];
}


submit.onclick = function(){
    var newProd ={
         title:title.value,
         price:price.value,
         taxes:taxes.value,
         ads:ads.value,
         discount:discount.value,
         total:total.innerHTML,
         count:count.value, 
    }
    if(system === 'create'){
      if(newProd.count > 1){
        for(var i = 0 ; i<newProd.count; i++){
          dataProduct.push(newProd)
        }
      }
      else{

      }
    }
      else{
        dataProduct[waku] = newProd;
        system = 'create';
        submit.innerHTML = 'Create';
        count.style.display = 'block';
      }
    
    
    // Save localStorage
    localStorage.setItem('product', JSON.stringify(dataProduct))

    clearData()
    showData()

}


// Function clear data 

function clearData(){
    title.value = '';
    price.value = '';
    ads.value =  '';
    taxes.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = ''; 
    
   
}

// Function read  

function showData(){
    var  table = ''
    for( var i = 0 ; i < dataProduct.length ; i++ ){
        table += `
        <tr id="table"+i>
        <td>${i}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].discount}</td>
        <td><button onclick="updateData(${i})" id="update" >Update</button></td>
        <td><button onclick="deleteData(${i})" id="delete" >Delete</button></td>
        </tr>
        `
        
    }

    document.getElementById('tbody').innerHTML = table
    var btnDelete = document.getElementById('deleteAll')
    if(dataProduct.length > 0 ){
      btnDelete.innerHTML = `<button onclick="deleteAll()">delete All</button>`
    }
    else{
      btnDelete.innerHTML = ''
    }
  }
showData()

// Function delete  

function deleteData(i){
  console.log(i)
  dataProduct.splice(i,1)
// Delete it from the localStorage
  localStorage.product = JSON.stringify(dataProduct)
  showData()
}

// Function delete all  

function deleteAll(){
  localStorage.clear()
  dataProduct.splice(0)
  showData()
}

// Function update

function updateData(i){
  title.value = dataProduct[i].title;
  price.value = dataProduct[i].price;
  ads.value = dataProduct[i].ads;
  taxes.value = dataProduct[i].taxes;
  discount.value = dataProduct[i].discount;
  getTotal()
  count.style.display = 'none';
  submit.innerHTML = 'Update';
  system = 'update';
  waku = i ;
  
}


