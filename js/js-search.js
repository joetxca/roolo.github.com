var isAccessibleSearch = true;
jQuery('#search-field').keyup(function(j){
  searchField = j.currentTarget;

  if(isAccessibleSearch) {
    isAccessibleSearch = false;
    searchField.disabled = 'disabled';
  } else {
    return
  }

  searchTerm = searchField.value;
  articlesData = jQuery.parseJSON(jQuery('#articles').attr('data-articles'));

  if(articlesData == null) {
//      if(true) {
    $.get(  '/articles.json',
            (new Date().getTime()),
            function(data, textStatus, jqXHR){
      jQuery('#articles').attr('data-articles', data);
      articlesData = jQuery.parseJSON(data);
    }).error(function(e){
          console.log('e.state()');
          console.log(state());
        });

    if(articlesData == null) {
      console.log('Does not compute!');
      return
    }
  }

  var searchPattern = new RegExp('/'+searchTerm+'/',im);

  jQuery.map(articlesData['data'], function(post,index){
    console.log(searchPattern.test(post['title']));
    console.log(searchPattern.test(post['content_blob']));

    return false
  });


  searchField.removeAttribute('disabled');
  isAccessibleSearch = true;
});
