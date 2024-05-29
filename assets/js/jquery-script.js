$(document).ready(function(){
    //take html tags with assigned values and set to variable.
    //set textarea to the value of "blank", and add to values.

    $("textarea").keypress(function(e){
        var keyCode = e.which;
        /*
        8 - (backspace)
        32 - (space)
        48-57 - (0-9)Numbers
        */
        if ( (keyCode != 8 || keyCode == 32 ) && (keyCode < 48 || keyCode > 57 )) { 
        return false;
        }
    });

    let previousKeyType = '';
    
    $('#1,#2,#3,#4,#5,#6,#7,#8,#9,#0,#add, #subtract, #multiply, #divide').click(function(){
      var v = $(this).val();

      // if ( ( v == '*' || v == '/' ) && ( !$('textarea').val() || $('textarea').val() == '*' || $('textarea').val() == '/' || $('textarea').val() == '-' || $('textarea').val() == '+' ) ) { 
      //   return false;
      // } else if ( !$('textarea').val() && v == '.' ) {
      //   $('textarea').val('0.');
      // } else if ( ( ($('textarea').val()).includes('.') && v == '.' ) ) {
      //   var total = $('textarea').val($('textarea').val());
      // } else if ( 
      //       ( ( (($('textarea').val()).slice(-1)) == '+' ) && ( (v == '+') || (v == '-') || (v == '*') || (v == '/') ) ) ||
      //       ( ( (($('textarea').val()).slice(-1)) == '-' ) && ( (v == '+') || (v == '-') || (v == '*') || (v == '/') ) ) || 
      //       ( ( (($('textarea').val()).slice(-1)) == '*' ) && ( (v == '+') || (v == '-') || (v == '*') || (v == '/') ) ) || 
      //       ( ( (($('textarea').val()).slice(-1)) == '/' ) && ( (v == '+') || (v == '-') || (v == '*') || (v == '/') ) )            
      //     ) {
      //         total = $('textarea').val($('textarea').val().substring(0, $('textarea').val().length - 1) + v);
      // } else {
      //   total = $('textarea').val($('textarea').val() + v);
      // }

      const textareaVal = $('textarea').val();

      if ( previousKeyType === 'calculate' && !['+', '-', '*', '/' /* , '.' */].includes(v) )  { // after user click equals => new numbers should not append to result but start anew => but if user clicks on operator contniue to append
        previousKeyType = '';
        $('textarea').val(v);    
      } else if (['*', '/'].includes(v) && (!textareaVal || ['*', '/', '-', '+'].includes(textareaVal))) { // can only accept + or - at the start
        return false;
      } /* else if (!textareaVal && v === '.') { // add 0 at start if user click .
        previousKeyType = '';
        $('textarea').val('0.');
      } else if (textareaVal.includes('.') && v === '.') { // when user input already have a . => do nothing if user clicks . again
        return;
      } */ else if (['+', '-', '*', '/'].includes(textareaVal.slice(-1)) && ['+', '-', '*', '/'].includes(v)) { // if user already have an operator and user clicks an operaror again replace existing operator
        previousKeyType = '';
        $('textarea').val(textareaVal.slice(0, -1) + v);
      } else { // default, appends userinput to the existing value in display
        previousKeyType = '';
        $('textarea').val(textareaVal + v);
      }


    });

    $("#dot").click(function() {
      var val = $(this).val();      
      var currVal = $('textarea').val();
      var parts = currVal.split(/[\+\-\*\/]/);
    
      // Check if the current value already contains a decimal point
      var lastPart = parts[parts.length-1];

      if (lastPart.indexOf(".") === -1 || val !== ".") {
        $('textarea').val(currVal + val);
      }
    });
    
    //clicking equal sign evaluates the textarea
    $('#equal').click(function(){
      $('textarea').val(eval($('textarea').val()));

      previousKeyType = 'calculate';
    });  
    
    $('#clear').click(function(){
        $('textarea').val('');
    });    
      
    $('#backspace').click(function(){
        $('textarea').val($('textarea').val().substring(0, $('textarea').val().length - 1));
    });

  });

  