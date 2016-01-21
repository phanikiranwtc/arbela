Ext.define('Arbela.overrides.layout.container.Dashboard',{
    override:'Ext.layout.container.Dashboard',
    // config:{
    //     done :false
    // },
    calculateItems: function(ownerContext, containerSize) {
        var me = this,
            columnCount = me.columnCount,
            targetContext = ownerContext.targetContext,
            items = ownerContext.childItems,
            len = items.length,
            contentWidth = 0,
            gotWidth = containerSize.gotWidth,
            blocked, availableWidth, i, itemContext, itemMarginWidth, itemWidth;
						//debugger;
        if (gotWidth === false) {


            targetContext.domBlock(me, 'width');
            blocked = true;
        } else if (gotWidth) {
            availableWidth = containerSize.width;
        } else {


            return true;
        }

				// prepare rows from childs
				
				var rowContentWidths=[];
        for (i = 0; i < len; ++i) {
            itemContext = items[i];

            if (columnCount) {
                if (i % columnCount) {
                    itemContext.setProp('clear', null);
                } else {
                    itemContext.setProp('clear', me.clearSide);
                }
            }



            itemMarginWidth = itemContext.getMarginInfo().width;
            if (!itemContext.widthModel.calculated) {
                itemWidth = itemContext.getProp('width');
                if (typeof itemWidth !== 'number') {
                    itemContext.block(me, 'width');
                    blocked = true;
                }
								//debugger;
								rowContentWidths[itemContext.row.index] =(rowContentWidths[itemContext.row.index]?rowContentWidths[itemContext.row.index]:0)+itemWidth + itemMarginWidth;
                contentWidth += itemWidth + itemMarginWidth;
            }
        }
				// console.log(rowContentWidths);
        if (!blocked) {
            availableWidth = (availableWidth < contentWidth) ? 0 : availableWidth - contentWidth;
            for (i = 0; i < len; ++i) {
                itemContext = items[i];
                if (itemContext.widthModel.calculated) {
									var rowContentWidth = rowContentWidths[itemContext.row.index]?rowContentWidths[itemContext.row.index]:0;
									var rowAvailableWidth = (containerSize.width < rowContentWidth) ? 0 : containerSize.width - rowContentWidth;
									
                    itemMarginWidth = itemContext.marginInfo.width;

                    itemWidth = itemContext.target.columnWidth;
                    itemWidth = Math.floor(itemWidth * rowAvailableWidth) - itemMarginWidth;
                    itemWidth = itemContext.setWidth(itemWidth);

                    contentWidth += itemWidth + itemMarginWidth;
                }
            }
            ownerContext.setContentWidth(contentWidth + ownerContext.paddingContext.getPaddingInfo().width);
        }

        return !blocked;
    }
});