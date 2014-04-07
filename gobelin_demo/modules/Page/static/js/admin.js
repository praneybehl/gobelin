//Aloha editor stuff
Aloha.ready( function() {
       var $ = Aloha.jQuery
       $('.editable').aloha()
       $('.aloha-sidebar-handle').hide()
})
Aloha.bind('aloha-editable-deactivated', function (evt, editable) {
   contentText = Aloha.activeEditable.getContents()
   contentName = $(editable.editable.obj[0]).attr("data-cms-block")
   $.ajax({
     type: "POST",
     url: "/admin/page/newContent",
     data: { "slug":$("html").attr("data-cms-page"),"newContent" : contentText, "contentName": contentName}
   })
})

//Menu drag and drop
var cols = document.querySelectorAll('ul.nav li');
   [].forEach.call(cols, function(col) {
   col.addEventListener('dragstart', handleDragStart, false)
   col.addEventListener('dragover', handleDragOver, false)
   col.addEventListener('drop', handleDrop, false)
})
var drgElem = null
function handleDragStart(e) {
   drgElem = this
   $(this).addClass("over")
   e.dataTransfer.effectAllowed = 'move'
   e.dataTransfer.setData('text/html', this.innerHTML)
}
function handleDragOver(e) {
   if (e.preventDefault) {
      e.preventDefault()
   }
   e.dataTransfer.dropEffect = 'move'
   if (drgElem != this) {
      if (parseInt($(this).attr("data-cms-order"))>parseInt($(drgElem).attr("data-cms-order"))){
         $(drgElem).insertAfter(this)
      }else{
         $(drgElem).insertBefore(this)
      }
   }
   $("ul.nav li a").each(function(index) {
      $(this).parent('li').attr("data-cms-order",index)
   })
   return false
}
function handleDrop(e) {
   if (e.stopPropagation) {
      e.stopPropagation()
   }
   if (drgElem != this) {
      if ($(this).attr("data-cms-order")>$(drgElem).attr("data-cms-order")){
         $(drgElem).insertAfter(this)
      }else{
         $(drgElem).insertBefore(this)
      }
   }
   newPagesOrder = []
   $("ul.nav li a").each(function(index) {
      $(this).parent('li').removeClass("over")
      $(this).parent('li').attr("data-cms-order",index)
      newPagesOrder.push({"slug": $(this).attr("data-cms-slug"), "order": index})
   })
   $('.oActive').addClass('active')
   $.ajax({
     type: "POST",
     url: '/admin/page/reorder',
     data: { "newPagesOrder":newPagesOrder}
   })
   return false
}
