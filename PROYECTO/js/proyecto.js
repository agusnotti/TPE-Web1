let input=  document.getElementById('input-captcha');

input.addEventListener('input',function(){
  if (this.value.length > 4) 
     this.value = this.value.slice(0,4); 
})