var db = new PouchDB('stickyNotes');
    var lastIndex = 1;
    var remoteCouch = false;
   
    function map(doc) {
      if (doc.title) {
        emit(doc.title);
      }
    }
   
    db.query({map: map}, {id: 'ultimate_sticky'}, function(err, final_response) { 
        for (var key in final_response) {
            if (final_response[key].doc.key=='ultimate_sticky' && final_response[key].doc.content!='') {
              var sticky_content = final_response[key].doc.content;
              //$('#sticky_notes_area').append("<div class='color_sticky'><p>"+i+". "+sticky_content+'</p></div>');
              ('#txt').val(sticky_content)
            }else{
              var sticky_note = {
                _id: 'ultimate_sticky',
               content: ""
              };
              db.put(sticky_note, function callback(err, result) {
                if (!err) {
                  console.log('Successfully added a sticky note!');
                }
              });
            }
          }
    
    });
     
    $(document).ready(function(){
      
      $('#txt').keyup(function(){
        var content = $('#txt').val();
        if(content!=''){
        var sticky_note = {
                _id: 'ultimate_sticky',
               content: content
              };
              db.put(sticky_note, function callback(err, result) {
                if (!err) {
                  console.log('Successfully added a sticky note!');
                }
              });
        }
      });
      
      
    });