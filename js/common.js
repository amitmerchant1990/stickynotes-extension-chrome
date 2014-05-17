var db = new PouchDB('stickyNotes');
    var lastIndex = 1;
    var remoteCouch = false;
   
    function addSticky(sticky){
      
      var sticky_note = {
        _id: new Date().toISOString(),
       content: sticky
      };
      db.put(sticky_note, function callback(err, result) {
        if (!err) {
          console.log('Successfully added a sticky note!');
        }
      });
      
    }
    
    function fetchStickys(){
      db.allDocs({include_docs: true}, function(err, response) {
          console.log(response.rows);
          var final_response = response.rows;
          var i = 1;
          for (var key in final_response) {
            if (final_response.hasOwnProperty(key)) {
              var sticky_content = final_response[key].doc.content;
              $('#sticky_notes_area').append("<p class='color_sticky'>"+i+". "+sticky_content+'</p>');
            }
            i++;
            lastIndex = i;
          }
          
      });
    }
    
    $(document).ready(function(){
      fetchStickys();
      $('#sticky_notes_add').click(function(){
        var content = $('#sticky_notes_text').val();
        
        addSticky(content);
        
        $('#sticky_notes_text').val('');
        $('#sticky_notes_area').append("<p class='color_sticky'>"+lastIndex+". "+content+'</p>');
        lastIndex++;
      });
      
      
    });