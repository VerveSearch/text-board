# TextSpinner

A TextSpinner Widget that can be used with any language.  

## Usage 

```javascript

var txt = new vs.TextSpinner(4,'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789!@#$%^&*()-_=+§±[]{};:\'"\\|,./?<>`~');
txt.setText('Suhail Abood'); 

setTimeout(function(){
	txt.setText('This is Awesome');
},2000);

```

## Dependencies 
1. jQuery 

## Future work
1. Look into removing jQuery as a dependencies (shouldn't be that difficult, just need to find the time to do it and write tests for it.)
2. Adding animations for new places once created. 