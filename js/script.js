var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productModel = document.getElementById("productModel");
var productDescription = document.getElementById("productDescription");

var allProduct;
var localStorageData = localStorage.getItem("allProduct")
var textChange = document.getElementById("tChange")

var myInputName = document.querySelector("input.myInputName")
var myInputModel = document.querySelector("input.myInputModel")

if (localStorageData) {
    allProduct = JSON.parse(localStorageData)
    displayProduct(allProduct);

} else {
    allProduct = []
}

function addProduct() {
      var validName = validateProductNamed()
      var validModel = validateProductModel()
   if(validName && validModel) {
    var product = {
        name: productName.value,
        price: productPrice.value,
        model: productModel.value,
        description: productDescription.value,
    }

    allProduct.push(product)
    sitInLocalStorage()
    displayProduct(allProduct)
    updateForm()
   }

   
}

function displayProduct(productData) {
    var countanr = '';
    for (var i = 0; i < productData.length; i++) {
        countanr += `      <tr>
        <td>${i + 1}</td>
        <td>${productData[i].name}</td>
        <td>${productData[i].price}</td>
        <td>${productData[i].model}</td>
        <td>${productData[i].description}</td>
        <td>
            <button class="btn btn-warning" onclick="updateProduct(${i}) ">Update</button>
        </td>
         <td>
            <button class="btn btn-danger" onclick="deleteProduct(${i}) ">Delete</button>
        </td>
         </tr> `

    }

    document.getElementById("rowData").innerHTML = countanr;

}

function updateForm(values) {

    productName.value = values ? values.name:"";
    productPrice.value = values ? values.price:"";
    productModel.value = values ? values.model:"";
    productDescription.value = values ? values.description:"";

}

function deleteProduct(index) {
    allProduct.splice(index,1)
    displayProduct();
    sitInLocalStorage()




}

function sitInLocalStorage() {
    localStorage.setItem("allProduct", JSON.stringify(allProduct))
}




function searchProduct(termValue) {
    var matchedItem = []
    for (var i= 0; i < allProduct.length; i++){
        
        if(allProduct[i].name.toLowerCase().includes(termValue.toLowerCase()) == true){
            matchedItem.push(allProduct[i]);
        }
        
    }
    displayProduct(matchedItem)
}




function validateProductNamed(){
    var regex = /^[A-Z][a-z]{3,7}$/;
    if (regex.test(productName.value)){
        document.getElementById("name_error").innerHTML=""
        return true
    }else{
        document.getElementById("name_error").innerHTML = "<span class ='text-danger'> start with capital letter </span>"
        return false
    }

}


myInputName.addEventListener("keyup",validateProductNamed)


function validateProductModel() {
    var regex =/^(tv|laptop|ipade|mobile)$/i;
    if(regex.test(productModel.value)){
        document.getElementById("model_error").innerHTML =""
        return true 
    }else{
        document.getElementById("model_error").innerHTML = "<span class ='text-danger'> should be tv or mobile or laptop or ipade </span>"
        return false
    }
    
}
myInputModel.addEventListener("keyup",validateProductModel)


 




