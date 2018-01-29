Ext.define('Arbela.view.db.main.DashboardViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.dbdashboard',

  columnIdx: 0,
  handleChageSettings: function(panel) {
    var me = this;
    var blades = this.getAvailableBlades();
    var newCard = Ext.create('Arbela.view.db.card.NewCard', {
      y: 0,
      editing: true,
      originalContainerRef: panel,
      typeData: blades,
      title: 'Edit Card',
      listeners: {
        addcard: me.handleAddCardEvent,
        scope: me
      },
      datasources: this.getViewModel().getData().datasources
    });
    var s = newCard.down('bladeform');
    newCard.down('form').remove(s);
    var itemsLen = panel.items.length;
    var form = newCard.down('form');
    var l = form.items.length;
    var name = [];
    var settings = [];
    for (var i = 0; i < itemsLen; i++) {
      var component = panel.items.getAt(i);
      settings.push(component.settings);
      name.push(component.$className);
      form.insert(l, {
        xtype: 'bladeform'
      });
    }
    var arr = [];
    for (var j = 0; j <= form.items.length - 1; j++) {
      if (form.items.getAt(j).xtype == 'bladeform') {
        arr.push(form.items.getAt(j));
      }
    }
    for (var k = 0; k <= arr.length - 1; k++) {
      arr[k].items.getAt(0).setValue(name[k]);
      if (settings[k].length != 0) {
        arr[k].add({
          xtype: 'fieldset',
          title: 'Settings',
          items: settings[k],
          layout: 'anchor',
          defaults: { anchor: '100%' }
        });
      }
    }
    var bladeForms = form.query('bladeform');
    for (var is = 0; is < bladeForms.length; is++) {
      var formBladePanels = panel.formvalues.blades[is];
      bladeForms[is].charttype = formBladePanels.charttype;
      var seriesIndexblade = formBladePanels.seriesIndex + 1;
      var loopseriesIndexValue = 0;
      for (var xy = 0; xy < seriesIndexblade; xy++) {
        while (
          !formBladePanels.hasOwnProperty('xfield' + loopseriesIndexValue)
        ) {
          if (loopseriesIndexValue > 100) {
          }
          loopseriesIndexValue++;
        }
        bladeForms[is].presentSeriesIndex = loopseriesIndexValue;
        loopseriesIndexValue++;

        bladeForms[is].query('button[name=addSeries]')[0].el.dom.click();
      }
      if (formBladePanels.type == 'Arbela.view.blades.Grid') {
        var settingsGridStore = formBladePanels.typeObj.settingsGridStore;
        bladeForms[is].down('settingsgrid').setStore(settingsGridStore);
        if (formBladePanels.settingsData) {
          /// var gridStore = bladeForms[is].down('settingsgrid').getStore();
          var set;
          bladeForms[is].set = formBladePanels.settingsData;
          for (var i = 0; i <= formBladePanels.settingsData.length - 1; i++) {
            var record = formBladePanels.settingsData[i];
            bladeForms[is]
              .down('settingsgrid')
              .getStore()
              .add(record);
          }
        }
      }
    }

    if (panel.formvalues.titleStyle) {
      newCard
        .down('form')
        .getForm()
        .setValues({
          name: panel.formvalues.name,
          titleStyle: panel.formvalues.titleStyle
        });
    }
    if (panel.formvalues.showTitle == 'on') {
      newCard
        .down('form')
        .getForm()
        .setValues({
          name: panel.formvalues.name,
          showTitle: true
        });
    } else {
      newCard
        .down('form')
        .getForm()
        .setValues({
          name: panel.formvalues.name,
          showTitle: false
        });
    }
    if (panel.formvalues.hideTitleBar == 'on') {
      newCard
        .down('form')
        .getForm()
        .setValues({
          name: panel.formvalues.name,
          hideTitleBar: true
        });
    } else {
      newCard
        .down('form')
        .getForm()
        .setValues({
          name: panel.formvalues.name,
          hideTitleBar: false
        });
    }
    var newCardFBLen = newCard.down('form').items.length;
    var pfbl = panel.formvalues.blades.length;
    for (var p = 0; p <= pfbl - 1; p++) {
      var panelValues = panel.formvalues.blades[p];
      //this.setGridColumnType(newCard);
      arr[p].getForm().setValues(panelValues);
      /****** following code for polar field value setting ****/
      // var polartype = 'polartype'+p
      // if(panelValues[polartype] != ""){
      //     newCard.getViewModel().data.polartype = panelValues[polartype];
      // }
      /*************************ending*******************/
      var setRef = arr[p].down('fieldset'),
        store = Ext.ComponentQuery.query('dslist')[0].getStore();
      if (setRef !== null) {
        var datasrcCombo = setRef.down('combo[fieldLabel="DataSources"]');
        if (datasrcCombo !== null) {
          if (store.getData().length !== 0) {
            if (datasrcCombo.hidden == false) {
              if (panelValues.type !== 'Arbela.view.blades.Grid') {
                arr[p]
                  .down('fieldset')
                  .down('textfield[fieldLabel="Expression"]')
                  .setValue(panelValues.exprVal);
              }

              datasrcCombo.setStore(store);
              if (setRef.down('button[text="Load Meta-data"]')) {
                setRef.down('button[text="Load Meta-data"]').enable();
              }
            }
          } else {
            if (datasrcCombo !== null) {
              datasrcCombo.hide();
              datasrcCombo.reset();
              if (panelValues.type == 'Arbela.view.blades.Grid') {
                var labelRef = newCard
                  .down('bladeform')
                  .down('fieldset[title="Settings"]')
                  .down('label');
                if (!labelRef.hidden) {
                  labelRef.hide();
                }
              }
            }
          }
        }
      }
    }

    newCard.show();
  },

  /**
   ** fetch the avaiable baldes in the application and return them in an array with
   ** object as {klass:'',name:'',niceName:''}
   **/
  getAvailableBlades: function() {
    var classes = Ext.ClassManager.classes;
    var blades = [];

    for (var key in classes) {
      if (classes.hasOwnProperty(key)) {
        if (Ext.String.startsWith(key, 'Arbela.view.blades')) {
          var arr = key.split('.');
          blades.push({
            klass: key,
            name: arr[arr.length - 1],
            niceName: classes[key].niceName
          });
        }
      }
    }

    console.log('DATA: ', blades);
    return blades;
  },
  onToolbarAddcard: function(tb, btn, e, eOpts, eventOptions) {
    //TODO: move this to a common util as it is used for Datasource as well as Card/Blade
    var classes = Ext.ClassManager.classes;
    var blades = [];

    for (var key in classes) {
      if (classes.hasOwnProperty(key)) {
        if (Ext.String.startsWith(key, 'Arbela.view.blades')) {
          var arr = key.split('.');
          if (classes[key].niceName) {
            //added condition for only valid blades
            blades.push({
              klass: key,
              name: arr[arr.length - 1],
              niceName: classes[key].niceName
            });
          }
        }
      }
    }

    console.log('DATA: ', blades);

    var me = this;

    if (this.columnIdx >= this.getView().getMaxColumns()) {
      this.columnIdx = 0;
    }

    var newCard = Ext.create('Arbela.view.db.card.NewCard', {
      y: 0,
      typeData: blades,
      listeners: {
        addcard: me.handleAddCardEvent,
        scope: me
      },
      datasources: this.getViewModel().getData().datasources
    });
  },

  handleAddCardEvent: function(win, values) {
    var me = this;
    var oldPanel = win.config.originalContainerRef;
    if (oldPanel) {
      oldPanel.formvalues = values;
      var newBladesLen = values.blades.length;
      var newBlade = [];
      var oldBlade = [];
      var newHeight = 0;
      oldPanel.removeAll(true);

      for (var b = 0; b <= newBladesLen - 1; b++) {
        newBlade.push(values.blades[b].typeObj);
        oldPanel.add(newBlade[b]);
      }
      /*for(var w = 0;w<=oldPanel.items.length-1;w++){
                //newHeight += oldPanel.items.getAt(w).height;
            }*/
      var showTitle = values.showTitle;
      var title;
      if (showTitle) {
        title = values.name;
      }
      oldPanel.setTitle(title);
      oldPanel.applyTitleStyles(oldPanel, values);
      oldPanel.expand();
    } else {
      var blades = values.blades;
      var l = blades.length;
      var items = [];
      for (var i = 0; i < l; i++) {
        var vt = blades[i].typeObj;
        items.push(vt);
      }

      //var columnIndex = values.colIdx ? values.colIdx : me.columnIdx;

      /*
            *  validating values coming from Saved dashboard card or Newly added card.
            *
            */

      if (!Ext.isEmpty(values.colIdx)) {
        if (me.getView().items.items.length == 0) {
          me.getView().columnWidths.push(values.columnWidth);
          var card = me.getView().addView(
            {
              title: values.showTitle ? values.name : '',
              type: 'card',
              columnIndex: values.colIdx
              //columnWidth:values.columnWidth
            },
            values.colIdx
          );

          card.add(items);
          //card.up('container').columnWidth = values.columnWidth;
          card.formvalues = values;
        } else {
          me.getView().columnWidths.push(values.columnWidth);
          me.getView().on(
            'add',
            function(ct, cmp, idx) {
              cmp.add(items);
              cmp.formvalues = values;
              // cmp.up('container').columnWidth = values.columnWidth;
              //cmp.up('conatiner').setColumnWidth(values.columnWidth);
            },
            this,
            { single: true }
          );

          var card = me.getView().addView(
            {
              title: values.showTitle ? values.name : '',
              type: 'card',
              columnIndex: values.colIdx
              //columnWidth:values.columnWidth
            },
            values.colIdx
          );

          card.formvalues = values;
        }

        card.applyTitleStyles(card, values);
      } else {
        if (me.getView().items.items.length == 0) {
          me.getView().columnWidths.push(0.3333333333);
          var card = me.getView().addView(
            {
              title: values.showTitle ? values.name : '',
              type: 'card',
              columnIndex: me.columnIdx
              // columnWidth:0.3
            },
            0
          );

          card.add(items);
          values.colIdx = me.columnIdx;
          card.formvalues = values;
        } else {
          me.getView().columnWidths.push(0.3333333333);
          me.getView().on(
            'add',
            function(ct, cmp, idx) {
              cmp.add(items);
              cmp.formvalues = values;
            },
            this,
            { single: true }
          );

          var card = me.getView().addView(
            {
              title: values.showTitle ? values.name : '',
              type: 'card',
              columnIndex: me.columnIdx
              // columnWidth:0.3
            },
            me.columnIdx
          );

          values.colIdx = me.columnIdx;
          card.formvalues = values;
        }

        card.applyTitleStyles(card, values);
        me.columnIdx++;
      }
    }
  },

  onToolbarClonedashboard: function(tb, btn, e, eOpts, eventOptions) {
    //alert('Clone Dashboard');
    var v = this.getView();
    var title = v.getTitle();
    var store = this.getView()
      .up('wsworkspace')
      .down('dslist')
      .getStore();
    var dataLength = store.data.length;
    var dataSourceArray = [];
    for (var m = 0; m <= dataLength - 1; m++) {
      var dataListItem = store.data.items[m].data;
      delete dataListItem.typeObj;
      dataSourceArray.push(dataListItem);
    }

    if (v.items.items[0]) {
      var cardsArray = [],
        jsonObj = {};
      //var cardsLen = v.items.items[j].items.items.length;
      var cards = v.query('panel[cls=arbelaCard]');
      var cardsLen = cards.length;
      var dashboardColumns = v.query('[initialCls=x-dashboard-column]');

      var columnWidth = [];
      for (var i = 0; i < cardsLen; i++) {
        var bladeData = cards[i].formvalues;
        var colIndex = cards[i].columnIndex;
        //var columnWidth = cards[i].up('container').columnWidth;
        var bladesLen = bladeData.blades.length;
        for (var l = 0; l <= bladesLen - 1; l++) {
          if (bladeData.blades[l].type == 'Arbela.view.blades.Grid') {
            if (bladeData.blades[l].typeObj) {
              if (bladeData.blades[l].typeObj.settingsGridStore) {
                var newGridDataLen =
                    bladeData.blades[l].typeObj.settingsGridStore.data.length,
                  itemsArr = [];
                for (var m = 0; m <= newGridDataLen - 1; m++) {
                  var itemData =
                    bladeData.blades[l].typeObj.settingsGridStore.data.items[m]
                      .data;
                  itemsArr.push(itemData);
                }
                bladeData.blades[l].settingsData = itemsArr;
              }
            }
          }
        }
        bladeData.colIdx = colIndex;
        // TODO: Need to work around this
        bladeData.columnWidth = 0.3333333333;//dashboardColumns[i].columnWidth;
        cardsArray.push(bladeData);
      }

      //cardsArray.push(dataSourceArray);
      jsonObj['data'] = cardsArray;
      var datasource = dataSourceArray;
      jsonObj['datasource'] = datasource;
      console.log(jsonObj);
      var dataLen = jsonObj.data.length;

      for (var j = 0; j <= dataLen - 1; j++) {
        if (jsonObj.data[j].blades) {
          var bladesLen = jsonObj.data[j].blades.length;
          for (var k = 0; k <= bladesLen - 1; k++) {
            delete jsonObj.data[j].blades[k].typeObj;
          }
        }
      }
      var jsonString = JSON.stringify(jsonObj);
      Ext.Ajax.request({
        //url: 'http://192.168.1.54/steven/Arbela-ProductApps/Arbela-Product/json.php',
        url: 'http://arbela.walkingtree.in/json.php',
        method: 'POST',
        //Send the query as the message body
        //jsonData: jsonStr,
        params: {
          json: jsonString,
          title: title
        },
        success: function(response) {
          return Ext.Msg.show({
            title: 'Custom Dashboard',
            message: "Saved your's dashboard",
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.INFO
          });
        },
        failure: function(error) {
          return Ext.Msg.show({
            title: 'Custom Dashboard',
            message: "Failed to save your's dashboard",
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.ERROR
          });
        }
      });
      //Ext.Msg.alert("INFO",'success');
    } else {
      Ext.Msg.alert(
        'INFO',
        'We could not save your data because you did not provide any cards on dashboard'
      );
    }
  },

  onRemoveDashboard: function(button, e, eOpts) {
    var v = this.getView();
    v.fireEvent('removedashboard', v);
  },

  settingCards: function(board) {
    if (!board.flag) {
      var str = window.location.href;
      var db = str.indexOf('=') + 1;
      var dashboardName = str.substr(db);
      //board.setTitle(dashboardName);
      if (db != 0) {
        Ext.Ajax.request(
          {
            url: 'resources/data/' + dashboardName + '.json',
            //params: params,
            success: function(response) {
              var me = this,
                responseData = Ext.decode(response.responseText);
              me.settingCardsData(responseData);
            },
            failure: function(error) {
              return Ext.Msg.show({
                title: 'Custom Dashboard',
                message: 'You did not save dashboard before!',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
              });
            },
            scope: this
          },
          this
        );
      }
    }
  },
  settingCardsData: function(responseData) {
    var cardsData = responseData.data,
      cardsLen = cardsData.length;
    if (responseData.datasource) {
      var datasourceData = responseData.datasource;
      datasourcesLen = datasourceData.length;
      for (var k = 0; k <= datasourcesLen - 1; k++) {
        var type = datasourceData[k].type;
        responseData.datasource[k].typeObj = Ext.create(type, {});
        delete responseData.datasource[k].id;
        var grid = Ext.ComponentQuery.query('dslist')[0];
        // var grid = Ext.create('Arbela.view.ds.List',{});
        // grid.getStore().add(datasourceData[k]);

        grid
          .getViewModel()
          .getData()
          .datasources.add(datasourceData[k]);
        //grid.getViewModel().getStore().setData(datasourceData[k]);
        grid.fireEvent('addeddatasource', grid, datasourceData[k]);
      }
    }
    for (var i = 0; i <= cardsLen - 1; i++) {
      var cardsValues = cardsData[i],
        x = Ext.create('Arbela.view.db.card.NewCard', {
          listeners: {
            addcard: this.handleAddCardEvent,
            scope: this
          }
        });
      x.getController().handleSaveBtnClick(cardsValues);
    }
  }
});
