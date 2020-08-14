var rect = require('./rectange');
const rectange = require('./rectange');

function solveRect(l, b) {
    console.log('Solving for rectange with l = ' + l + " and b = " + b);
    
    rect(l, b, (err, rectange) => {
        if(err) {
            console.log("Error: ", err.message);
        }
        else {
            console.log('Area: ' + rectange.area());
            console.log('Perimeter: ' + rectange.perimeter() + '\n');
        }
    });
}
 
solveRect(2, 4);
solveRect(3, 5);
solveRect(0, 5);
solveRect(-3, 5);