/*
* This file is generated and updated by Sencha Cmd. You can edit this file as
* needed for your application, but these edits will have to be merged by
* Sencha Cmd when upgrading.
*/
var loader=function(){
   setTimeout(function(){
       preloader();
   },500);
}

var preloader=function(){

 Ext.get('pre-loading').hide();
 Ext.create('Arbela.view.MyViewport');
}
Ext.application({
   name: 'Arbela',
   ADDSERIES : 0,
   EDITSERIES : 0,
   extend: 'Arbela.Application',
   
   //autoCreateViewport: 'Arbela.view.MyViewport'
   launch:function(){
       loader();
   }
   //-------------------------------------------------------------------------
   // Most customizations should be made to Arbela.Application. If you need to
   // customize this file, doing so below this section reduces the likelihood
   // of merge conflicts when upgrading to new versions of Sencha Cmd.
   //-------------------------------------------------------------------------
});