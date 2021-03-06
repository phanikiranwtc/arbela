/*
 * File: app/view/common/NewWindowViewModel1.js
 *
 * This file was generated by Sencha Architect version 3.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Arbela.view.db.card.NewCardViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.dbnewcard',

    data: {
    	typeData: [],
        datasources: null
        // summary: false,
        // grouping:false,
        // groupingsummary:false,
        // summaryType:true,
        // groupField:true,
        // datasources:null,
        // charttype:null,
        // chartseries:true,
        // polartype:null,
        // markerfield:false,
        // interactions:false,

    }

    // formulas: {
    //     enablegroupingsummary: function (get) {

    //         return !(get('summary') || get('grouping'));
    //     },
    //     enableSummeryColumns: function(get){

    //         return !(get('summary') || get('groupingsummary'));
    //     },

    //     enableGroupColumns: function(get){

    //         return !(get('groupingsummary') || get('grouping'));
    //     },

    //     enableDataSource: function(get){

    //         return (get('datasources') !== null);
    //     },

    //     enableTextFieldValue: function(get){

    //         if(get('datasources') == null){
    //             return Arbela.util.Utility.api.summary;
    //         }else{
    //             return null;
    //         }
    //     },

    //     enableCartesianInteractions: function(get){

    //         return !(get('interactions') && get('charttype')=='Cartesian');
    //     },

    //     enablePolarInteractions: function(get){

    //          return !(get('interactions') && get('charttype')=='Polar');
    //     },

    //     enableLegendFieldset: function(get){

    //          return (!get('charttype') || get('polartype')=='pie3d' || get('polartype') == 'gauge');
    //     },

    //     enableXAxisFieldset: function(get){

    //         return !(get('charttype')=='Cartesian' || get('polartype')=='radar' || get('polartype') == 'gauge');
    //     },

    //     enableYAxisFieldset: function(get){

    //         return !(get('charttype')=='Cartesian' || get('polartype')=='radar');
    //     },
    //     enableInteractionsFieldset: function(get){

    //         return !(get('charttype'));
    //     },

    //     enableMarkerField: function(get){

    //     	return (get('polartype')== 'pie'||get('polartype')== 'pie3d'||get('polartype')== 'gauge');
    //     },

    //     enableXaxisgrid: function(get){
    //         return get('polartype')== 'gauge' ? true : false;
    //     },

    //     enableXaxisfield: function(get){
    //         return get('polartype')== 'gauge' ? true : false;
    //     },
    //     enablePolarFieldlabel: function(get){
    //         return !(get('charttype') == 'Polar' && get('polartype') == 'pie'|| get('polartype') =='pie3d' || get('polartype') == 'gauge')
    //     },
    //     enableColorfield: function(get){
    //         return !(get('polartype')=='gauge')
    //     },
    //     enableStylefield: function(get){
    //         return (get('polartype')=='gauge' || get('polartype') == 'pie3d')
    //     }
    // }

});